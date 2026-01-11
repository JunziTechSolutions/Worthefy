exports = async function(changeEvent) {
  try {
    const targetUserId = "2cR7vQSmJ9MIuQLqPUpP3PnmBGf2";

    const mongo = context.services.get("ArtifexDB");
    if (!mongo) throw new Error("Mongo service 'ArtifexDB' not found.");

    const collection = mongo.db("publefy_db").collection("users");

    let totalUsers;
    if (typeof collection.count === "function") {
      totalUsers = await collection.count({});
    } else {
      const r = await collection.aggregate([{ $count: "total" }]).toArray();
      totalUsers = r.length ? r[0].total : 0;
    }

    console.log(`Total users: ${totalUsers}`);

    // Put your Firebase secret in App Services -> Values as FIREBASE_DB_SECRET
    const firebaseSecret = context.values.get("FIREBASE_DB_SECRET");
    if (!firebaseSecret) throw new Error("Missing Value: FIREBASE_DB_SECRET");

    const firebaseUrl =
      `https://worthefy-default-rtdb.firebaseio.com/users/${targetUserId}/networth.json?auth=${firebaseSecret}`;

    const res = await context.http.put({
      url: firebaseUrl,
      headers: { "Content-Type": ["application/json"] },
      body: JSON.stringify(totalUsers)
    });

    console.log(`Firebase status: ${res.statusCode}`);
    console.log(`Firebase body: ${res.body.text()}`);
  } catch (e) {
    console.log(`ERROR: ${e && e.stack ? e.stack : e}`);
  }
};
