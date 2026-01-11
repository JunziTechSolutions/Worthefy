exports = async function(changeEvent) {
  try {
    // 1. HARDCODED CONFIGURATION
    const firebaseSecret = "C4iICsvSYfVnMGBZIUfACV7ZyqEkLS485h24yeXb";
    // Updated to the user ID you specified
    const targetUserId = "2cR7vOSmJ9MIuOLdPUpP3Pnm0Gf2"; 
    const testValue = "8"; 

    // 2. TARGET URL
    const firebaseUrl = `https://worthefy-default-rtdb.firebaseio.com/users/${targetUserId}/networth.json?auth=${firebaseSecret}`;

    console.log(`Attempting to send '8' to user: ${targetUserId}`);

    // 3. HTTP PUT REQUEST
    const res = await context.http.put({
      url: firebaseUrl,
      headers: { "Content-Type": ["application/json"] },
      body: JSON.stringify(testValue), 
      encodeBodyAsJSON: false
    });

    // 4. LOGGING RESULTS
    console.log(`Firebase status: ${res.statusCode}`);
    console.log(`Firebase response: ${res.body.text()}`);

    if (res.statusCode === 200) {
      console.log("SUCCESS: Value '8' reached Firebase for the correct user!");
    } else {
      console.log(`FAILURE: Received status ${res.statusCode}. Check Secret or URL.`);
    }

  } catch (e) {
    console.log(`FUNCTION ERROR: ${e.message || e}`);
  }
};