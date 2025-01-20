import express from "express";
import cors from "cors";
// import { db } from "./SERVER/DB/index";
import  blogRoute  from "./SERVER/route/blogRoute.js";


const app = express(); 

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoute);
app.use("/api", (req, res) => {
    res.send("Hello User");

})

app.listen(5000, () => console.log("App is running at port 5000..."));