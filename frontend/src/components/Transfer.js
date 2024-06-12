import React from "react";
import { Input, Button } from "antd";
//import { CHAINS_CONFIG } from "../utils/chains";

const Transfer = ({
  balance,
  selectedChain,
  sendToAddress,
  amountToSend,
  onAddressChange,
  onAmountChange,
  onSendTokens,
}) => (
  <>
    <div className="sendRow">
      <p style={{ width: "90px", textAlign: "left", color:"#1E1E1E" }}>Sent Amount</p>
      <Input
        value={amountToSend}
        onChange={onAmountChange}
        placeholder="0.000001..."
        variant={false}
      />
    </div>
    <div className="sendRow">
      <p style={{ width: "90px", textAlign: "left",  color:"#1E1E1E"  }}>Send to</p>
      <Input
        style={{ width: "100%", borderRadius:"15px", height:"45px" }}
        value={sendToAddress}
        onChange={onAddressChange}
        placeholder="Enter public address (0x..)"
      />
      
    </div>
    <Button
      style={{ width: "100%", marginTop: "20px", marginBottom: "20px",  height:"40px" }}
      className="frontPageButton1"
      type="ghost"
      onClick={onSendTokens}
    >
      Send
    </Button>
  </>
);

export default Transfer;
