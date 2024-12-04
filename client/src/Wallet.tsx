import { ChangeEvent, useEffect } from "react";
import server from "./server";

type P = {
  address: string;
  setAddress: (addr: string) => void;
  balance: number;
  setBalance: (balance: number) => void;
};

function Wallet({ address, setAddress, balance, setBalance }: P) {
  const getBalanceFromAddress = async (address: string) => {
    const {
      data: { balance },
    } = await server.get(`balance/${address}`);
    setBalance(balance);
  };

  async function onChange(evt: ChangeEvent<HTMLInputElement>) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      getBalanceFromAddress(address);
    } else {
      setBalance(0);
    }
  }

  useEffect(() => {
    if (address) {
      getBalanceFromAddress(address);
    }
  }, [address]);

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
