const mongoose = require("mongoose");
const Connection = async (USERNAME, PASSWORD) => {
  console.log(PASSWORD);
  const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.cn7ck1p.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

module.exports = Connection;
