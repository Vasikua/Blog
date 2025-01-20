import { URL } from "./EnvVar";
import  mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

mongoose.connect(URL)
    .then(() => { console.log("connected mongoDB") })
    .catch(e => { console.error("Error connecting to MongoDB:", e) });