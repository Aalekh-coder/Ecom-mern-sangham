const { connect } = require("mongoose");

const connectToDB = async () => {
  try {
    await connect(process.env.MONGO_URI,
      { dbName: "EcomMern" }
    );
    console.log(`Connected to DB in NODE_ENV mode`);
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};
module.exports = connectToDB;
