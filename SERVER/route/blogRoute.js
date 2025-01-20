import express from "express";
import { updateBlog, deleteBlog, blogListFetch, addNewBlog } from "../controller/BlogController.js";

const blogRoute = express.Router();


blogRoute.get("/", blogListFetch);
blogRoute.post("/add", addNewBlog);
blogRoute.put("/update/:id", updateBlog);
blogRoute.delete("/delete/:id", deleteBlog);


export default blogRoute;
