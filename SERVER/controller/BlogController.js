import mongoose from "mongoose";
import blog from "../model/Blog.js";



export const blogListFetch = async (req, res) => {
    let blogList;
    try {
        blogList = await blog.find();
        
    } catch (error) {
        console.error("you have an error:", error);
    }
    if (!blogList) {
        return res.status(404).json({ message: "not blog found " })
    }
    return res.status(200).json({ blogList });
};

export const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = Date.now();

    const newlyCreateBlog = new blog({
        title, description, date: currentDate
    })

    try {
        await newlyCreateBlog.save();
    } catch (error) {
        console.error("error",error)
    }

    try {
        const session = mongoose.startSession();
        session.startTransaction()
        await newlyCreateBlog.save(session);
         session.commitTransaction()
    } catch (error) {
        return res.status(500).json({message: error})
    }

    return res.status(200).json({ newlyCreateBlog });
}

export const deleteBlog = async (req, res) => {
    const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    try {
        const findBlog = await blog.findByIdAndDelete(id);
        if (!findBlog) {
            return res.status(404).json({message:"blog not found"})
        }
        return res.status(200).json({message:"Successfully deleted blog"})  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to delete! please tyr agein later" });
    }
}

export const updateBlog = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body
    let toUpdatedBlog;

    try {
        toUpdatedBlog = await blog.findByIdAndUpdate(id,{title, description});

    } catch (error) {
        return res.send(500).json({ message: "Somthing went wrong! please try  agin later" });
    }
    if (! toUpdatedBlog) {
        return res.status(500).json({ message: "Unable to update" });
    }

    return res.status(200).json({  toUpdatedBlog });
}

