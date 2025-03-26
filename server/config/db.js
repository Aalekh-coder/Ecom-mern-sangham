const { connect } = require("mongoose");

const connectToDB = async () => {
  try {
    await connect(
      "mongodb+srv://dheetaalekh:N8BA4zrqyyzdwWNf@cluster0.e72b8.mongodb.net/",
      { dbName: "EcomMern" }
    );
    console.log(`Connected to DB in NODE_ENV mode`);
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};
module.exports = connectToDB;
