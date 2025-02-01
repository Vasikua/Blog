import  mongoose from "mongoose";
import dotenv from "dotenv";


const PASSWORD = "z94pNonPW7uZ1jBC";
const URL = `mongodb+srv://vasikua85:${PASSWORD}@cluster0.e4kn3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

dotenv.config();

mongoose.set("strictQuery", false);

mongoose.connect(URL)
    .then(() => { console.log("connected mongoDB") })
    .catch(e => { console.error("Error connecting to MongoDB:", e) });