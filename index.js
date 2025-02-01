import express from "express";
import cors from "cors";
import  "./SERVER/DB/index.js";
import  blogRoute  from "./SERVER/route/blogRoute.js";
import  "./SERVER/DB/index.js";


const app = express(); 

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRoute);
app.listen(5000, () => console.log("App is running at port 5000..."));