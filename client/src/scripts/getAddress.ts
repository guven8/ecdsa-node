import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, hexToBytes } from "ethereum-cryptography/utils";

function getAddressFromPubKey(publicKeyHex: string) {
  const publicKey = hexToBytes(publicKeyHex);
  const keccak = keccak256(publicKey.slice(1));
  return toHex(keccak.slice(-20));
}

export default getAddressFromPubKey;
