import Datastore from "react-native-local-mongodb";

const database = new Datastore({ filename: "userDatabase", autoload: true });

// Function to add a user to the database
export const addUser = (user) => {
  return new Promise((resolve, reject) => {
    database.insert(user, (err, newDoc) => {
      if (err) {
        reject("Error adding user:", err);
      } else {
        console.log("User added successfully:", newDoc);
        resolve(newDoc);
      }
    });
  });
};

// Function to fetch all users from the database
export const getUsers = () => {
  return new Promise((resolve, reject) => {
    database.find({}, (err, docs) => {
      if (err) {
        reject("Error fetching users:", err);
      } else {
        console.log("Users fetched successfully:", docs);
        resolve(docs);
      }
    });
  });
};

// Function to update a user in the database
export const updateUser = (id, updates) => {
  return new Promise((resolve, reject) => {
    database.update({ _id: id }, { $set: updates }, {}, (err, numReplaced) => {
      if (err) {
        reject("Error updating user:", err);
      } else {
        console.log("User updated successfully:", numReplaced);
        resolve(numReplaced);
      }
    });
  });
};

// Function to delete a user from the database
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    database.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
        reject("Error deleting user:", err);
      } else {
        console.log("User deleted successfully:", numRemoved);
        resolve(numRemoved);
      }
    });
  });
};
