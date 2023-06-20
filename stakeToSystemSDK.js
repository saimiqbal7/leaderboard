import { Connection, PublicKey } from '@_koi/web3.js';
import bs58 from 'bs58';
import fs from 'fs';

const stakingKeyToPublicKey = async (stakingKey) => {
  try {
    const connection = new Connection('https://k2-testnet.koii.live');
    const publicKey = new PublicKey(stakingKey);

    const response = await connection.getConfirmedSignaturesForAddress2(publicKey, {
      commitment: 'confirmed'
    });

    const feePayer = await getConfirmedTransaction(response[0].signature, connection);
    return feePayer;

  } catch (error) {
    console.error(error);
  }
};

const getConfirmedTransaction = async (signature, connection) => {
  try {
    const transaction = await connection.getConfirmedTransaction(signature, 'confirmed');
    return transaction.transaction.feePayer;
  } catch (error) {
    console.error(error);
  }
};

const convertToString = (publicKey) => {
  if (!publicKey) {
    throw new Error('Invalid public key provided.');
  }

  const hexString = publicKey._bn.toString('hex');
  return hexString;
};

const convertToBase58 = (publicKeyString) => {
  const publicKeyBytes = Buffer.from(publicKeyString, 'hex');
  const base58Key = bs58.encode(publicKeyBytes);
  return base58Key;
};

export const getKey = async (key) => {
  try {
    const publicKey = await stakingKeyToPublicKey(key);
    const publicKeyString = convertToString(publicKey);
    const base58Key = convertToBase58(publicKeyString);
    return base58Key;
  } catch (error) {
    console.error('Error occurred while converting address to key:', error);
    return '';
  }
};

const convertKeysFromFile = async (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const keysArray = JSON.parse(fileContent);

    const convertedKeys = [];

    for (let i = 0; i < keysArray.length; i++) {
      const key = keysArray[i];
      const convertedKey = await getKey(key);
      convertedKeys.push(convertedKey);
    }

    console.log('Converted Keys:', convertedKeys);
  } catch (error) {
    console.error('Error occurred while converting keys from file:', error);
  }
};

// Specify the path to the text file containing the keys
const filePath = './addresses.txt';

// Call the function to convert keys from the file
convertKeysFromFile(filePath);
