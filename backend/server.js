const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// mongoose atlas connect
const DB = process.env.MONGO_DB;

mongoose
  .connect(DB)
  .then((con) => {
    console.log('DB connected');
  })
  .catch((e) => {
    console.log(e);
  });

// Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
