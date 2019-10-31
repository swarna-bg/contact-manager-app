const express = require("express");
const { mongoose } = require("./config/database");
const router = require("./config/routes");
const cors=require('cors')

const app = express();
app.use(cors())
const port = 3010;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("contacts information");
});

app.use("/",router)

app.listen(port, () => {
  console.log("listening to the port", port);
});
