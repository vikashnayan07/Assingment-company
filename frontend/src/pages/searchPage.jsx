import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SearchPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const validStatusCodes = [
  100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
  301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406,
  407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423,
  424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507,
  508, 510, 511,
];

const SearchPage = () => {
  const [filter, setFilter] = useState("");
  const [images, setImages] = useState([]);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const handleFilterChange = async (e) => {
    const filter = e.target.value;
    setFilter(filter);

    const matchedCodes = validStatusCodes.filter((code) =>
      code.toString().startsWith(filter)
    );

    if (matchedCodes.length === 0) {
      setImages([{ code: 404, url: "https://http.dog/404.jpg" }]);
      return;
    }

    try {
      const imagePromises = matchedCodes.map(async (code) => {
        const response = await axios.get(`/api/proxy/http-dog/${code}`);
        return { code, url: response.data.url };
      });

      const results = await Promise.all(imagePromises);
      setImages(results);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to fetch images");
      setImages([{ code: 404, url: "https://http.dog/404.jpg" }]);
    }
  };

  const handleSaveList = async () => {
    if (!listName.trim()) {
      toast.error("List name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/lists/save",
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
      console.error("Error saving list:", error);
      toast.error("Failed to save list");
    }
  };
  const handleShowList = () => {
    navigate("/lists");
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
            <div className="flex g-4 justify-between">
              <button className={styles.btn} onClick={handleSaveList}>
                Save List
              </button>
              <button className={styles.btn} onClick={handleShowList}>
                List Without Save
              </button>
            </div>
            <div className={styles.imageGrid}>
              {images.length > 0 ? (
                images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.code}
                    className={styles.image}
                  />
                ))
              ) : (
                <img
                  src="https://http.dog/404.jpg"
                  alt="404 Not Found"
                  className={styles.image}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
