exports = async function(changeEvent) {
  try {
    const targetUserId = "2cR7vQSmJ9MIuQLqPUpP3PnmBGf2";

    // 1. Get the service (Using your confirmed name)
    const mongo = context.services.get("ArtifexDB");
    if (!mongo) throw new Error("Mongo service 'ArtifexDB' not found.");

    const collection = mongo.db("publefy_db").collection("users");

    // 2. Universal Count: Uses count() which is supported in your environment
    const totalUsers = await collection.count({});
    console.log(`Total users: ${totalUsers}`);

    // 3. Hardcoded Secret (as a string)
    const firebaseSecret = "C4iICsvSYfVnMGBZIUfACV7ZyqEkLS485h24yeXb";
    const firebaseUrl = `https://worthefy-default-rtdb.firebaseio.com/users/${targetUserId}/networth.json?auth=${firebaseSecret}`;

    // 4. Update Firebase
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