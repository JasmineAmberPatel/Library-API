const mongoose = require('mongoose');
const app = require('./src/app');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_CONN,
  { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log(mongoose.connect);
    app.listen(3000);
  }
);
