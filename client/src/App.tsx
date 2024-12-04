import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Signature from "./Signature";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className="app">
      <Signature
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      {/* <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      /> */}
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
