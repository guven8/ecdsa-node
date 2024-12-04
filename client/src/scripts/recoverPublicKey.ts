import { secp256k1 } from "ethereum-cryptography/secp256k1";
import hashMessage from "./hashMessage";

function recoverPublicKey(
  message: string,
  signatureHex: string,
  recoverBit: number
) {
  const msgHash = hashMessage(message);
  const sig =
    secp256k1.Signature.fromCompact(signatureHex).addRecoveryBit(recoverBit);
  return sig.recoverPublicKey(msgHash).toHex();
}

export default recoverPublicKey;
