import SQLite from "react-native-sqlite-storage";

// Enable debugging and promises for SQLite
SQLite.DEBUG(true);
SQLite.enablePromise(true);

let db;
let dbInitialized = false; // Initialize a flag to track database state

// Function to initialize the database
export const initDB = async () => {
  if (!dbInitialized) {
    try {
      // Open the database
      db = await SQLite.openDatabase({
        name: "userDatabase",
        location: "default",
      });
      console.log("Database opened successfully");
      await createTable(); // Ensure the table is created after the database is opened
      dbInitialized = true; // Set the flag to true after initialization
    } catch (error) {
      console.error("Error opening database:", error);
      db = null; // Reset db on error
    }
  }
};

// Function to create the Users table
export const createTable = async () => {
  if (db) {
    try {
      await db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT);"
        );
      });
      console.log("Table created successfully");
    } catch (error) {
      console.error("Error creating table:", error);
      alert("Error creating table"); // Alert user for quick feedback
    }
  } else {
    console.error("Database not initialized");
    alert("Database not initialized"); // Alert user for quick feedback
  }
};

// Function to insert a user into the Users table
export const insertUser = async (name, email, password) => {
  await initDB(); // Ensure the database is initialized
  return new Promise((resolve, reject) => {
    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Users (name, email, password) VALUES (?, ?, ?);",
          [name, email, password],
          (_, result) => {
            console.log("User inserted successfully:", result);
            resolve(result);
          },
          (_, error) => {
            console.error("Error inserting user:", error);
            reject(error);
          }
        );
      });
    } else {
      console.error("Database not initialized");
      reject(new Error("Database not initialized"));
    }
  });
};

// Function to get a user from the Users table
export const getUser = async (email, password) => {
  await initDB(); // Ensure the database is initialized
  return new Promise((resolve, reject) => {
    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Users WHERE email = ? AND password = ?;",
          [email, password],
          (_, result) => {
            // Check if user is found
            if (result.rows.length > 0) {
              console.log("User fetched successfully:", result.rows.item(0));
              resolve(result.rows.item(0)); // Resolve with the first matching user
            } else {
              console.log("No user found");
              resolve(null); // No user found
            }
          },
          (_, error) => {
            console.error("Error fetching user:", error);
            reject(error);
          }
        );
      });
    } else {
      console.error("Database not initialized");
      reject(new Error("Database not initialized"));
    }
  });
};

// Export the database instance for direct access if needed
export default db;
