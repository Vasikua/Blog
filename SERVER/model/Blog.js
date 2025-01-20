import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true, 
    trim: true,    
  },
  descriptions: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("blog", BlogSchema);