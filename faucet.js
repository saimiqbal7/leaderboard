import { MongoClient } from 'mongodb';
import fs from 'fs';

async function queryUserFaucets() {
  const uri = 'mongodb+srv://bridgeuser:Gk4FPxxs8m5cNURc@cluster0.gizdv.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('test');
    const collection = database.collection('userfaucets');

    const documents = await collection.find().toArray();
    console.log(documents);

    const organizedData = {};

    for (const document of documents) {
      const walletAddress = document.walletAddress;
      delete document.walletAddress; // Remove walletAddress from the document
      organizedData[walletAddress] = document;
    }

    const outputFilePath = './organizedData.json';
    const jsonData = JSON.stringify(organizedData, null, 2);
    fs.writeFileSync(outputFilePath, jsonData, 'utf8');
    console.log('Data saved to file:', outputFilePath);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

queryUserFaucets();
