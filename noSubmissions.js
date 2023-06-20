import { Connection, PublicKey } from '@_koi/web3.js';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import fs from 'fs';

const getStakedList = async () => {
  const connection = new Connection('https://k2-testnet.koii.live');
  const accountInfo = await connection.getAccountInfo(
    new PublicKey('4cj2aLZ7dGrsL4jm7b5bEzEKrYMoJzy8Juc2fWwLZrpW'),
  );
  const bytesView = JSON.parse(accountInfo.data + '');
  return bytesView.stake_list;
};

const getData = async () => {
  const uri = 'mongodb+srv://saim:Stephcurry7$@submissions.twztlmx.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();
  const database = client.db('submissions');
  const leaderboard = database.collection('allTimeLeaderboard');

  const data = await leaderboard.find().toArray();
  const submissionIds = data.map(item => item.submissionId);
  client.close()
  return submissionIds;
}

const checkStakeList = async () => {
  const submissions = await getData();
  const stakedList = await getStakedList();

  const stakedAddresses = Object.keys(stakedList);
  const missingAddresses = [];

  for (let i = 0; i < stakedAddresses.length; i++) {
    const address = stakedAddresses[i];
    let found = false;

    for (let j = 0; j < submissions.length; j++) {
      if (address === submissions[j]) {
        found = true;
        break;
      }
    }

    if (!found) {
      missingAddresses.push(address);
    }
  }

  return missingAddresses;
};

export const getMissingAddresses = async () => {
  try {
    const missingAddresses = await checkStakeList();
    return missingAddresses;
  } catch (error) {
    console.error('Error occurred while getting missing addresses:', error);
    return [];
  }
};
