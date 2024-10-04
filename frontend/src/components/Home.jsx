import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get(
        "https://backend-oa64.onrender.com/get",
        {
          withCredentials: true,
        }
      );
      setTasks(data.tasks);
    } catch (error) {
      console.log(error + " error in getalltask");

      setTasks([]);
    }
  };

  const addTask = async () => {
    try {
      const { data } = await axios.post(
        "https://backend-oa64.onrender.com/add",
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      getAllTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://backend-oa64.onrender.com/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      getAllTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateTask = async (id) => {
    const updatedTask = tasks.find((task) => task._id === id);
    await axios
      .put(`https://backend-oa64.onrender.com/update/${id}`, updatedTask, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (taskId, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, [field]: value } : task
      )
    );
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/Login");
    }
    getAllTasks();
  }, [isAuthenticated]);

  return (
    <>
      <div className="Home_create_task">
        <section className="home">
          <h1>CREATE YOUR TASK</h1>
          <div className="create-task">
            <input
              type="text"
              placeholder="YOUR TASK TITLE"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />{" "}
            <textarea
              placeholder="YOUR TASK DISCRIPTION"
              value={description}
              rows={10}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <button onClick={() => addTask()}>CREATE TASK</button>
          </div>
          <div className="tasks">
            {tasks && tasks.length > 0 ? (
              tasks.map((element) => (
                <div className="card" key={element._id}>
                  <input
                    type="text"
                    value={element.title}
                    onChange={(e) =>
                      handleInputChange(element._id, "title", e.target.value)
                    }
                  />
                  <textarea
                    value={element.description}
                    onChange={(e) =>
                      handleInputChange(
                        element._id,
                        "description",
                        e.target.value
                      )
                    }
                  >
                    {}
                  </textarea>

                  <div>
                    <button
                      onClick={() => {
                        deleteTask(element._id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        updateTask(element._id);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1>NO TASKS CREATED!</h1>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
