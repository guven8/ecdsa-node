import { useState } from "react";
import server from "./server";

type P = {
  address: string;
  signature: string;
  setBalance: (balance: number) => void;
};

function Transfer({ address, setBalance, signature }: P) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  async function transfer(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!signature) {
      return alert("No Signature!");
    }
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature,
      });
      console.log(balance);
      setBalance(balance);
    } catch (ex: any) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
