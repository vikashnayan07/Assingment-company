import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SearchPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SearchPage = () => {
  const [filter, setFilter] = useState("");
  const [images, setImages] = useState([]);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const handleFilterChange = async (e) => {
    setFilter(e.target.value);

    try {
      const response = await axios.get(`/api/proxy/http-dog/${e.target.value}`);
      setImages([response.data]);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to fetch images");
    }
  };

  const handleSaveList = async () => {
    try {
      const response = await axios.post(
        "/api/lists/save",
        {
          name: listName,
          responseCodes: images.map((img) => img.code),
          imageLinks: images.map((img) => img.url),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("List saved successfully");
      navigate("/lists");
    } catch (error) {
      toast.error("Failed to save list");
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-screen py-5">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Search Response Codes</h4>
            <input
              type="text"
              placeholder="Enter filter (e.g., 2xx, 203)"
              value={filter}
              onChange={handleFilterChange}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="List Name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className={styles.input}
            />
            <button className={styles.btn} onClick={handleSaveList}>
              Save List
            </button>
            <div className={styles.imageGrid}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.code}
                  className={styles.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
