import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function hashMessage(message: string): Uint8Array {
  // turn this into an array of bytes, the expected format for the hash algorithm
  const bytes = utf8ToBytes(message);
  // hash the message using keccak256
  const hash = keccak256(bytes);
  return hash;
}

export default hashMessage;
