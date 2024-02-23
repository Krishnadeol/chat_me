const connectToMongo = require('./db');
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());


// routes =>

app.use('/auth',require('./routes/auth'));
app.use('/setA',require('./routes/setA'));



const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}  for chat app`)
);
connectToMongo();
