import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex, hexToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function getAddressFromPubKey(publicKeyHex) {
  const publicKey = hexToBytes(publicKeyHex);
  const keccak = keccak256(publicKey.slice(1));
  return toHex(keccak.slice(-20));
}

function generateKeys() {
  const privKey = secp256k1.utils.randomPrivateKey();
  const pubKey = secp256k1.getPublicKey(privKey, true);
  console.log({
    privKey: toHex(privKey),
    pubKey: toHex(pubKey),
    address: getAddressFromPubKey(toHex(pubKey)),
  });
}

generateKeys();
