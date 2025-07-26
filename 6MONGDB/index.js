const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

const clientFun = async function (c) {
  await client.connect();
  const db = client.db("mytest");
  return db.collection(c);
};
const main = async () => {
  var cc = await clientFun("cc");
  //   var d = await cc.find();
  //   var d = await cc.insertOne({ username: "Moncia", age: 60 });
  // var d = await cc.insertMany([
  //     { username: "Moncia", age: 12 },
  //     { username: "卡卡", age: 6 },
  //     { username: "安迪", age: 12 },
  //     { username: "朱丽叶", age:20 }

  // ]);

  //   var d = await cc.find({ age: { $gt: 15 } });

  //   var d = await cc.updateOne(
  //     { age: { $gt: 15 } },
  //     { $set: { username: "li" } }
  //   );
  //   var d = await cc.updateMany(
  //     { age: { $gt: 15 } },
  //     { $set: { username: "li" } }
  //   );



  var d = await cc.deleteOne({age:{$lt:10}})

  console.log(d);
  //   console.log(await d.toArray());
};
main().finally(() => {
  client.close();
});
