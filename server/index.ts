import express from "express";
import cors from "cors";
import hashMessage from "./scripts/hashMessage";
import { toHex } from "ethereum-cryptography/utils";
const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances: any = {
  "0x73ee322e6c3ea6f09064027da20b629f521f4132": 100,
  "0x28ad07892e6a2612b5a0b532221deed887adbeeb": 50,
  "0x629a7571cc5a621e7cacae89e4886a143886a264": 75,
};

const usedSignatures: string[] = [];

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);
  const sigHash = toHex(hashMessage(signature));

  if (usedSignatures.indexOf(sigHash) !== -1) {
    res.status(400).send({ message: "Signature has been used!" });
  } else if (sender === recipient) {
    res.status(400).send({ message: "Cannot send funds to yourself!" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    usedSignatures.push(sigHash);
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address: any) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
