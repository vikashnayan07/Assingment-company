import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ListsPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";

const ListsPage = () => {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("/api/lists/getLists", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setLists(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch lists");
      }
    };
    fetchLists();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/lists/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLists(lists.filter((list) => list._id !== id));
      toast.success("List deleted successfully");
    } catch (error) {
      toast.error("Failed to delete list");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-screen py-5">
        <div className={styles.glass}>
          <div
            onClick={handleLogout}
            className="absolute top-5 right-5 flex items-center text-2xl gap-2 cursor-pointer  rounded-full bg-gradient-to-r to-sky-400 from-blue-500 p-2"
          >
            <BiLogOut /> <span className="font-semibold text-xl">Logout</span>
          </div>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Your Saved Lists</h4>
            <div className={styles.listGrid}>
              {lists.map((list) => (
                <div key={list._id} className={styles.listItem}>
                  <h5>{list.name}</h5>
                  <button
                    className={styles.btn}
                    onClick={() => handleEdit(list._id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => handleDelete(list._id)}
                  >
                    Delete
                  </button>
                  <div className={styles.imageGrid}>
                    {list.imageLinks && list.imageLinks.length > 0 ? (
                      list.imageLinks.map((link, index) => {
                        return (
                          <img
                            key={index}
                            src={link}
                            alt={`response code ${
                              list.responseCodes[index] || "N/A"
                            }`}
                            className={styles.image}
                          />
                        );
                      })
                    ) : (
                      <p>No images available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListsPage;
