import { Connection, PublicKey } from '@_koi/web3.js';
import fs from 'fs';
const getAccountInfoAndContext = async () => {
  try {
    const connection = new Connection('https://k2-testnet.koii.live');
    const publicKey = new PublicKey('6AK3q7qCCC9mVyhQYZsjHseRM3tUG8LpZHA9os6QxSiZ');
    // Fetching account info with context
    const response = await connection.getConfirmedSignaturesForAddress2(publicKey, {
      commitment: 'confirmed'
    });
    // Save response to a JSON file
    fs.writeFileSync('test.json', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error(error);
  }
};
getAccountInfoAndContext();

//TODO Take the first signature from the json output. in this case
//TODO "4TDVMJPkVNfVwRETUm2MQvqaUL9sPkWwUMCWHJUGuCCAGZNp2Hxug2Z4RWfrknuYq8H446WpiCCyxa5PaJ9zwh8M"
//TODO  search the transaction history for that tx id and return the results
//TODO  check getConfirmedTransaction()
//TODO 