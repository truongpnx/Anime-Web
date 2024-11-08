db.createUser({
    user: "moviedb",
    pwd: "moviedb123", // Change this to a secure password
    roles: [{ role: "readWrite", db: "moviedb" }]
  });
  