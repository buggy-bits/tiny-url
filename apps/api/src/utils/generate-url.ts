import CryptoJS from 'crypto-js';
import { HMAC_SECRET_KEY } from '../config/env';

const ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = ALPHABET.length;

const SECRET_KEY = HMAC_SECRET_KEY || 'obviously-secret-key-exists';

function toBase62(num: number): string {
  let bigNum = BigInt(num);
  let result = '';
  // Convert the number to Base62
  while (bigNum > 0) {
    result = ALPHABET[Number(bigNum % BigInt(BASE))] + result;
    bigNum = bigNum / BigInt(BASE);
  }
  // Handle the case where the number is 0
  if (result === '') {
    return ALPHABET[0];
  }
  return result;
}

export function generateBase62Hash(num: number, length: number): string {
  const base62String = toBase62(num);
  const hash = CryptoJS.HmacSHA256(base62String, SECRET_KEY).toString(
    CryptoJS.enc.Hex
  );
  // take substring from the middle of the hash (why not)
  return hash.substring(BASE / length - length, BASE / length);
}
