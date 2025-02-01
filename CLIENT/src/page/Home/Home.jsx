import { useContext, useEffect } from "react";
import { GlobalContent } from "../../contex/GlobalState";
import axios from "axios";
import css from "./Home.module.css";

import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { pending, setPending, blogList, setBlogList } =
    useContext(GlobalContent);
  const navigate = useNavigate();

  async function fetchBlogList() {
    try {
      setPending(true);
      const response = await axios.get("http://localhost:5000/api/");
      const result = await response.data;
      if (result?.blogList) {
        setBlogList(result.blogList);
      } else {
        setPending(false);
        setBlogList([]);
      }
    } catch (e) {
      console.error("failed", e);
    } finally {
      setPending(false);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/blogs/delete/${id}`
      );
      const result = await response.data;
      if (result?.message) {
        fetchBlogList();
      }
    } catch (error) {
      console.error("failed", error);
    }
  }
  const handleEdit = currentItem => {
    navigate("/add-blog", { state: { currentItem } });
  };

  useEffect(() => {
    fetchBlogList();
  }, []);
  return (
    <div className={css.wrapper}>
      <h1> Home</h1>
      {pending ? <p>Loadind blog list...</p> : <p>No blogs available</p>}
      {blogList.length > 0 ? (
        blogList.map(item => (
          <div className={css.blogList} key={item._id}>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <FaEdit size={30} onClick={() => handleEdit(item)} />
            <FaTrash size={30} onClick={() => handleDelete(item._id)} />
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
}
