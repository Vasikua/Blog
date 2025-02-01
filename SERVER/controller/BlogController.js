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
        title, 
        description, 
        date: currentDate
    });

    let session;

    try {
        session = await mongoose.startSession(); // ✅ Correctly start a session
        session.startTransaction();

        await newlyCreateBlog.save({ session }); // ✅ Pass session explicitly

        await session.commitTransaction();
        session.endSession(); // ✅ Always end the session

        return res.status(201).json({ newlyCreateBlog }); // ✅ Use 201 for resource creation
    } catch (error) {
        if (session) {
            await session.abortTransaction(); // ✅ Rollback if an error occurs
            session.endSession();
        }
        console.error("Error adding blog:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
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
    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    try {
        const updatedBlog = await blog.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true } // ✅ Return updated document & validate input
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json({ updatedBlog });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ message: "Something went wrong, please try again later" });
    }
};
