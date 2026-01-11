exports = async function(changeEvent) {
  try {
    const targetUserId = "2cR7vQSmJ9MIuQLqPUpP3PnmBGf2";

    // CHANGE: Use the modern default service name
    const mongo = context.services.get("mongodb-atlas"); 
    if (!mongo) throw new Error("Mongo service 'mongodb-atlas' not found.");

    const collection = mongo.db("publefy_db").collection("users");

    // Modern counting method
    const totalUsers = await collection.countDocuments({});
    console.log(`Total users: ${totalUsers}`);

    // Hardcoded Secret as a string
    const firebaseSecret = "C4iICsvSYfVnMGBZIUfACV7ZyqEkLS485h24yeXb";

    const firebaseUrl = `https://worthefy-default-rtdb.firebaseio.com/users/${targetUserId}/networth.json?auth=${firebaseSecret}`;

    const res = await context.http.put({
      url: firebaseUrl,
      headers: { "Content-Type": ["application/json"] },
      body: JSON.stringify(totalUsers),
      encodeBodyAsJSON: true
    });

    console.log(`Firebase status: ${res.statusCode}`);
    console.log(`Firebase body: ${res.body.text()}`);

  } catch (e) {
    console.log(`ERROR: ${e.message || e}`);
  }
};