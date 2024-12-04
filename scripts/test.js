import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes, hexToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function generateKeys() {
  const privKey = secp256k1.utils.randomPrivateKey();
  const pubKey = secp256k1.getPublicKey(privKey, true);
  return {
    privateKey: toHex(privKey),
    publicKey: toHex(pubKey),
  };
}

function getAddressFromPubKey(publicKeyHex) {
  const publicKey = hexToBytes(publicKeyHex);
  const keccak = keccak256(publicKey.slice(1));
  return toHex(keccak.slice(-20));
}

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);
  return toHex(hash);
}

function signMessage(msg, privKey) {
  const msgHex = hashMessage(msg);
  const sig = secp256k1.sign(msgHex, privKey);
  return [sig.toCompactHex(), sig.recovery];
}

function recoverPublicKey(message, signatureHex, recoverBit) {
  const msgHash = hashMessage(message);
  const sig =
    secp256k1.Signature.fromCompact(signatureHex).addRecoveryBit(recoverBit);
  return sig.recoverPublicKey(msgHash).toHex();
}

function main() {
  const message = "foo";
  const { privateKey, publicKey } = generateKeys();
  const address = getAddressFromPubKey(publicKey);
  const [sigHex, recoveryBit] = signMessage(message, privateKey);
  const recoveredPubKey = recoverPublicKey(message, sigHex, recoveryBit);
  const recoveredAddr = getAddressFromPubKey(recoveredPubKey);
  console.log({
    privKey: privateKey,
    pubKey: publicKey,
    address: address,
    recoveredPubKey: recoveredPubKey,
    recoveredAddr: recoveredAddr,
  });
}

main();
