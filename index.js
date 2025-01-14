const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", (req, res) => {
    res.send("Hello User");

})

app.listen (5000, ()=>{console.log("App is running at port 5000...") })