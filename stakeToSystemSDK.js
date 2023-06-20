import { Connection, PublicKey } from '@_koi/web3.js';
import bs58 from 'bs58';

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
  const hexString = publicKey._bn.toString('hex');
  return hexString;
};

const convertToBase58 = (publicKeyString) => {
  const publicKeyBytes = Buffer.from(publicKeyString, 'hex');
  const base58Key = bs58.encode(publicKeyBytes);
  return base58Key;
};

const getKey = async () => {
  const publicKey = await stakingKeyToPublicKey('6AK3q7qCCC9mVyhQYZsjHseRM3tUG8LpZHA9os6QxSiZ');
  const publicKeyString = convertToString(publicKey);
  const base58Key = convertToBase58(publicKeyString);
  console.log(base58Key);
};

getKey();

