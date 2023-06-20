import { MongoClient } from 'mongodb';
import fs from 'fs';

async function queryUserFaucets() {
  const uri = 'mongodb+srv://bridgeuser:Gk4FPxxs8m5cNURc@cluster0.gizdv.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const walletAddresses = [
    'GuheVhQyxjFK32cUjaWKfww69QNnJw6NCPuctjVX8Lgt',
    '',
    '',
    '',
    'D1RQA7SnvKEc5H97N9RBQPeT1gBqeTffm2SkghQHQM1m',
    '2g5Pf477xBUsss2qFx9hfkhxKurpxi9NKqjp98Gb2uq',
    'He1q6XRboRGFM9nHcweURwSrnpuw3K7nytXyX3RZm5od',
    'DgJcP5gpxzHWe3Dd4K1UGPR3ytLNs76pKrxF6bZkLZdL',
    '',
    '',
    'BeYqtVnHnFBfay1dN2fx9B9hLYs9HGvpFzfpuKm9ZJCD',
    '',
    '2cidVmMEpfo5ZpkeTvxUUFC2Bv9zHWjbbk9y4qdCG41e',
    '',
    '',
    '',
    '2J5psw3CRzn7fwAU5iChwJkpxsZ1ynVf4X1Hth3Emn5',
    '25kaXe6iTUhvHjSyiScS8zWHasiWt8dZxvT7MLxJRLWH',
    'GL6ZCZgT6TCJpvJFbTt5iDYTGK8PbbCAbbF4Wp7ad9C8',
    '6yu5ucpYGeRv2rspjq8dS7gLLpruTrdueLZmdi7YVV6U',
    '8pN7eGD8zggRtMZ6Em6o6kxmVTWLTpcH24kqTDi2nRdJ',
    'BP84smSsFwmsk3aE7Rpz42MA7ttJvCUTyM7jBa7ZMkSw',
    '8V6s4sdM7tmcgvXTbnp9324NXigTyPRu95mjtHCK1f2o',
    'Eiru29juDRLyKU9yx4bdXetxrJfSJBCwwAB12kXY5Wyr',
    '',
    'Chyc5fRqo7ECqhEuNC4fUPrbVemCkAXdAcS8YZrBV2iH',
    'FA4pwaSRpK7kFU4eDDMib5aNwEQpLbS5i15n3gYc9q1m',
    'JCfCVNbqWgogEjiHSQ9Z1VyC2A1kMxRNKQhtZVpJmNs1',
    'FaRDLKTcYtDwCzei2CXhfR8sa94WFZSFDkppJ1EuQrBb',
    'C44QQfpLcYJvbMy4VS6Kgp8yfamapUcpMMtjpRkb8dMQ',
    '',
    '',
    '',
    '7v5ypMpgMZ67gachc27wAAS9ThGFtquETxxrG6n2CswK',
    'B13MziHpKRA9yGCZWGdvvUJhCpYWWhxYDc6X2LsLcwXW',
    '',
    '',
    'FxkvpbZ99z5AErxPGPUHSG5NXPJdxr3FqAYviHxkeu28',
    '',
    '',
    '8hboKTFg3VUsNqg8Z9XLUxyT3rCXAPvV1PW8kFBFpaNj',
    '6TYqW9LgTLpY7WupneXLs37bEmd8Xu47GU8zgLYEVZjJ',
    '',
    '48Qt797KFqXaRmWn58R5kWkqkLho1GGNbs5CiDR4Z81',
    '5WVEzFKdqzzZqNCknApnRxdLaccLqYvo45E7vPRG6yLQ',
    '',
    'EvSLsStaKDcZieAsbcD9stYqc3GM986n1eShVWARyDZK',
    'A8ECNYDC2NuLZD1WgkHayUBjSD4hKfKEtDpkrdgtzt5U',
    '4XbKLmq6FQCnz2BFWaNhCsSgxdwZeFiJRJrLiprvESB',
    'E6ptd6PVi4wLrxL6tkn97hsZKxMA4xDc679wwGj4924Z',
    '2K4MEWNrEXDUha3nwf46J7LBWvkFDys169dU3h21Mth',
    '7aDj6awoKHyupg6ttTVzadVWhUYmj4JNEzTSLYtvvyQJ',
    '',
    '43F43orfuwgQfGg4Eji3fDqcgE6kbxyGUkzjEzMCaoH',
    '',
    '',
    '7e5grNpmS8TQjwY1wY5BFknR5D34wXHc9GLMwu1mn71d',
    '',
    '',
    '9oYSqpyD89QCdNJ9uQe5CSBkQNP1H44sweDq9hqg8QQ8',
    'HRB85kMRVFeLq3YNAAErjhUDnMywe6oDJsJmjBMJaokb',
    'CzHDKS6hhncGJKeikYuE7nVEDKSAA37a3Wfo4La6Sgd7',
    '',
    '3QY8DtJsoTHsAUqDomeLfqEK9q3wBnwjGn769Xe8ha9',
    '2pgvagqTzFawNYtbkyLTKVyNfZKVjhUqXmvsb27qqSN9',
    'CwEZj7qHJwsJteruH6eAjCvoUUNXuBmE4iCh8khJ1xVU',
    '842JiQoVRZjUrZTgrtHz5vrq27TYW2i4ikZvd1nEns3K',
    'CRuQqzMjr3KDU9rpjLyGXEHQ2kFHp9j6wLHSeEQgYbnh',
    'DuWjUgYPRJAdEKKkY8KNpyqNsTEiMi2oj7g8W3pLwW93',
    'BGb379uusfLDFQfJLdqSVTs5onZSpwTmy1K8P2CAwF6J',
    'HrXktDRDnqcYAdpBYXTaA7QieBzK9hQYjDqCE6WKzm4g',
    'JDYfU5Q7mwfsgpqtxGRghbTBXtSP7wM5DQRE9cKSq83Z',
    '',
    '7aWun13RhQHPW5bP1UFrEofZfQkW3uPnuosK19emSabS',
    'Fj1Qp8K5tnDxwn27ASuvRSS9vtBvJZJsEZz7kGFLd8Kr',
    'BRBsn2PkSR91p7owE7Smw1EJXJ8jr4Nhva63hGdQjFTh',
    '',
    '58BzHNN1kSxic1D3JUFxBoyCzSkqxLX7vpCARkCRm1sk',
    '',
    'GU4R4TtM6X9Zxc8wWvuHr3MyfeV2a9yU1dmKixZw1cXR',
    'EPs55k7jc3KfmZ8Q7Yisk2ivzavS1ZMZMeawR5B3SETp',
    '2j9x95nPav6pAgJh6cqGMhNxVZaZRMpN9pASyaevcQTQ',
    'Bm3ZmEzyjDkGmPvTUQdQ4bbWxAvY6a8enBwqbY2mZYFv',
    '31Ji7nusDtYe4EbD5Zoq9XL5fQ5UerGaMs8QZarDbW1',
    'HeVqESVPpHEwFZpTiNnCF4qojNr1mHXXLaRwuoJtcP2b',
    'EUEZfB3QX5tDR47r2N4NtDzd6VBdf5HTz7o5C6xYBXQ8',
    'BzPnjC1KBPZUuWPEpw2hrzGXZ5m96FbumTLJszKRRx7D',
    'GNG6qubC2DafAB4xUMPGk2WfFroVj5a5Kna222f2PGnv',
    '',
    'EQqW2cKX2hMU1FiLC8dkKZq5BSxY27wk4QD2CXWwKvUq',
    '',
    '7Rc68fjD9cddNstoMfNQQcV5npyUe6NssgHeMhBytcAw',
    'DavUUAV8ghhJh266isudYLtFQvVn4LFWSRw2agydXxgj',
    '9fcVtX3pYcwAnancPHnaad5Mc5WnfaVncEaM7oEM3tzc',
    'GfpoEAksEYTmJXjv1jvxongQT8PEGKcrWASq6mDAnN7R',
    'F4uqZETrHZoZ6V8BB4GbiCceeKxEK98aNZmCNhcBqgmP'
  ]

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('test');
    const collection = database.collection('userfaucets');

    const query = { walletAddress: { $in: walletAddresses } };
    const documents = await collection.find(query).toArray();
    console.log('Matching documents:', documents);

    const organizedData = {};
    for (const address of walletAddresses) {
      const matchingDocument = documents.find(doc => doc.walletAddress === address);
      organizedData[address] = matchingDocument ? matchingDocument : null;
    }

    const outputFilePath = './information.json';
    const jsonData = JSON.stringify(organizedData, null, 2);
    fs.writeFileSync(outputFilePath, jsonData, 'utf8');
    console.log('Information saved to file:', outputFilePath);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

queryUserFaucets();
