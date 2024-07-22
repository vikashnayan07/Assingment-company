import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ListsPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ListsPage = () => {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("/api/getLists", {
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
      await axios.delete(`/api/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLists(lists.filter((list) => list._id !== id));
      toast.success("List deleted successfully");
    } catch (error) {
      toast.error("Failed to delete list");
    }
  };

  const handleEdit = (id) => {
    // Redirect to a new page or open a modal to edit the list
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-screen py-5">
        <div className={styles.glass}>
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
                    {list.imageLinks.map((link, index) => (
                      <img
                        key={index}
                        src={link}
                        alt={`response code ${list.responseCodes[index]}`}
                        className={styles.image}
                      />
                    ))}
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
