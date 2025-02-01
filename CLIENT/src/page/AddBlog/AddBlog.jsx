import { useContext, useEffect } from "react";
import axios from "axios";
import css from "./AddBlog.module.css";
import { GlobalContent } from "../../contex/GlobalState";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddBlog() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContent);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDataToDB = async () => {
    try {
      const response = isEdit
        ? await axios.put(
            `http://localhost:5000/api/blogs/update/${location.state?.currentItem?._id}`,
            {
              title: formData.title,
              description: formData.description,
            }
          )
        : await axios.post("http://localhost:5000/api/blogs/add", {
            title: formData.title,
            description: formData.description,
          });

      if (response.data) {
        setIsEdit(false);
        setFormData({ title: "", description: "" });
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  useEffect(() => {
    if (location.state?.currentItem) {
      setIsEdit(true);
      setFormData({
        title: location.state.currentItem.title,
        description: location.state.currentItem.description,
      });
    }
  }, [location.state?.currentItem]);

  return (
    <div className={css.wrapper}>
      <h1>{isEdit ? "Edit Blog" : "Add Blog"}</h1>
      <div className={css.formWrapper}>
        <input
          name="title"
          id="title"
          placeholder="Enter title"
          type="text"
          value={formData.title}
          onChange={e => {
            setFormData({ ...formData, title: e.target.value });
          }}
        />
        <textarea
          name="description"
          placeholder="Enter description"
          id="description"
          value={formData.description}
          onChange={e => {
            setFormData({
              ...formData,
              description: e.target.value,
            });
          }}
        />
      </div>
      <button className={css.btnAddBlog} onClick={handleDataToDB}>
        {isEdit ? "Edit Blog" : "Add New Blog"}
      </button>
    </div>
  );
}
