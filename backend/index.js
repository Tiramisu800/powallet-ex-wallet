const express = require("express");
const Moralis = require("moralis").default;
const axios = require("axios");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const cors = require("cors");
require("dotenv").config();
const User = require('./models/User'); // Correct import
const { scanAddress } = require("./utils/blacklist");
const CryptoJS = require("crypto-js");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get("/getTokens", async (req, res) => {
  const { userAddress, chain } = req.query;
  try {
    const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: chain,
      address: userAddress,
    });
    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: chain,
      address: userAddress,
      mediaItems: true,
    });
    const myNfts = nfts.raw.result.map((e) => {
      if (e?.media?.media_collection?.high?.url && !e.possible_spam && (e?.media?.category !== "video")) {
        return e["media"]["media_collection"]["high"]["url"];
      }
    });
    const balance = await Moralis.EvmApi.balance.getNativeBalance({
      chain: chain,
      address: userAddress
    });
    const jsonResponse = {
      tokens: tokens.raw,
      nfts: myNfts,
      balance: balance.raw.balance / (10 ** 18)
    };
    return res.status(200).json(jsonResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/getWalletTransactions", async (req, res) => {
  const { userAddress, chain } = req.query;
  try {
    const transactions = await Moralis.EvmApi.transaction.getWalletTransactions({
      chain: chain,
      address: userAddress,
    });
    return res.status(200).json({ transactions: transactions.result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/checkAddress", async (req, res) => {
  const { address } = req.body;
  try {
    const result = await scanAddress(address);
    if (result) {
      return res.status(200).json({ riskLevel: result.overall_assessment });
    } else {
      return res.status(500).json({ message: 'Error scanning address' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { password, mnemonic, seedPhrase } = req.body;
  try {
    if (password && mnemonic) {
      // Encrypt mnemonic with user's password
      const encryptedMnemonic = CryptoJS.AES.encrypt(mnemonic, password).toString();

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ password: hashedPassword, mnemonic: encryptedMnemonic });
      await newUser.save();

      return res.status(200).json({ message: 'User registered successfully', encryptedMnemonic });
    } else if (seedPhrase) {
      return res.status(200).json({ message: 'Seed phrase confirmed successfully' });
    } else {
      return res.status(400).json({ error: 'Bad request' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Error registering or confirming seed phrase' });
  }
});

app.post("/login", async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findOne(); // Adjust to find user by unique identifier if necessary
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful', encryptedMnemonic: user.mnemonic });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Error logging in user' });
  }
});

app.post("/recover", async (req, res) => {
  const { password, mnemonic } = req.body;
  try {
    const encryptedMnemonic = CryptoJS.AES.encrypt(mnemonic, password).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists with the given mnemonic
    const users = await User.find();
    let userFound = false;

    for (const user of users) {
      try {
        const bytes = CryptoJS.AES.decrypt(user.mnemonic, password);
        const decryptedMnemonic = CryptoJS.AES.decrypt(encryptedMnemonic, password).toString(CryptoJS.enc.Utf8);

        if (decryptedMnemonic === mnemonic) {
          userFound = true;
          user.password = hashedPassword;
          user.mnemonic = encryptedMnemonic;
          await user.save();
          return res.status(200).json({ success: true, message: 'Account recovered successfully' });
        }
      } catch (err) {
        console.error("Error decrypting mnemonic for user:", user._id, err);
        // If decryption fails, continue to the next user
        continue;
      }
    }

    if (!userFound) {
      const newUser = new User({ password: hashedPassword, mnemonic: encryptedMnemonic });
      await newUser.save();
      return res.status(200).json({ success: true, message: 'New account created successfully' });
    }

  } catch (error) {
    console.error('Error recovering account:', error);
    return res.status(500).json({ error: 'Error recovering account' });
  }
});

// Start the server
Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
