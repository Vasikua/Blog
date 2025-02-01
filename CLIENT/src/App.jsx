import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import AddBlog from "./page/AddBlog/AddBlog";
import Header from "./component/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />
      </Routes>
    </>
  );
}

export default App;
