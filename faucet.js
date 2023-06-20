import { MongoClient } from 'mongodb';

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
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

queryUserFaucets();