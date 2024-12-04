import { secp256k1 } from "ethereum-cryptography/secp256k1";
import hashMessage from "./hashMessage.js";

async function signMessage(msg, privKey) {
  const msgHex = hashMessage(msg);
  const sig = secp256k1.sign(msgHex, privKey);
  console.log(sig.toCompactHex(), sig.recovery);
  return [sig.toCompactHex(), sig.recovery];
}

signMessage(process.argv[2], process.argv[3]);
