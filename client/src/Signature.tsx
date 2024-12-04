import { useEffect, useState } from "react";
import recoverPublicKey from "./scripts/recoverPublicKey";
import getAddressFromPubKey from "./scripts/getAddress";
import server from "./server";

type P = {
  address: string;
  setAddress: (addr: string) => void;
  balance: number;
  setBalance: (balance: number) => void;
};

export default function Signature({
  address,
  setAddress,
  balance,
  setBalance,
}: P) {
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  const getBalanceFromAddress = async (address: string) => {
    const {
      data: { balance },
    } = await server.get(`balance/${address}`);
    setBalance(balance);
  };

  const getAddressFromSig = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const pubKey = recoverPublicKey("sign", signature, parseInt(recoveryBit));
      const address = getAddressFromPubKey(pubKey);
      setAddress("0x" + address);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (address) {
      getBalanceFromAddress(address);
    }
  }, [address]);

  return (
    <div className="container wallet">
      <h1>Signature</h1>
      <form onSubmit={getAddressFromSig}>
        <label>
          Signature
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </label>
        <label>
          Recovery Bit
          <input
            type="number"
            value={recoveryBit}
            onChange={(e) => setRecoveryBit(e.target.value)}
            max={1}
          />
        </label>
        <input type="submit" className="button" value="Sign" />
      </form>
      {!!address && <div className="address">Address: {address}</div>}
      {!!address && <div className="balance">Balance: {balance}</div>}
    </div>
  );
}
