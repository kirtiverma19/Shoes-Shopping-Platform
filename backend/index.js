const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
    methods:"GET, POST, PUT, DELETE, PATCH",
  })
);
app.use(express.json());

app.use("/api", router);
app.get('/',(req,res)=>{
  res.send("Server is working");
})

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to db");
    console.log("Server is working");
  });
});
