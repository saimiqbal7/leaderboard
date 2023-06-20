import { getMissingAddresses } from './noSubmissions.js';
import { getKey } from './stakeToSystemSDK.js';

let addresses = [];
let keys = [];

const fetchData = async () => {
  try {
    addresses = await getMissingAddresses();
 
    await convertAddressesToKeys();

    displayAddressesAndKeys();
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const convertAddressesToKeys = async () => {
  for (let i = 0; i < 10; i++) {
    const address = addresses[i];
    const key = await getKey(address);
    keys.push(key);
  }
};

const displayAddressesAndKeys = () => {
  console.log('Addresses:', addresses);
  console.log('Keys:', keys);
};

//checking commit