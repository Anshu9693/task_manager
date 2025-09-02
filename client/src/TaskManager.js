import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const TaskManager = () => {
  const [taskname, setTaskname] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [copytaskList, setCopyTaskList] = useState([]);
  const [isDone] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  const fetchAllTask = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/task/fetch`);
      if (response.status === 200 || response.status === 201) {
        setTaskList(response.data.data);
        setCopyTaskList(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      toast("failed to fetch tasks");
    }
  };

  const handelAddTask = async (e) => {
    e.preventDefault();
    const newTask = {
      taskName: taskname,
      isDone: isDone,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_PORT}/task/create`,
        newTask
      );
      if (response.status === 200 || response.status === 201) {
        toast(response.data.message);
      }
      setTaskname("");
    } catch (error) {
      toast("failed to create task");
    }
    fetchAllTask();
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_PORT}/task/${taskId}`
      );
      if (response.status === 200 || response.status === 201) {
        toast(response.data.message);
        fetchAllTask();
      }
    } catch (error) {
      toast.error("failed to delete task");
    }
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_PORT}/task/${taskId}`,
        updatedTask
      );
      if (response.status === 200 || response.status === 201) {
        toast(response.data.message);
        fetchAllTask();
        setEditingTaskId(null);
        setEditingTaskName("");
      }
    } catch (error) {
      toast("failed to update task");
    }
  };

  const handleCheckUncheck = async (taskId) => {
    try {
      const task = taskList.find((task) => task._id === taskId);
      const updatedTask = { ...task, isDone: !task.isDone };
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_PORT}/task/${taskId}`,
        updatedTask
      );
      if (response.status === 200 || response.status === 201) {
        toast("task status changed");
        fetchAllTask();
      }
    } catch (error) {
      toast("failed to update task");
    }
  };


  const handleSearch = (e)=>{
      const term = e.target.value.toLowerCase();
      const oldTask = [...copytaskList];
      const filteredTask = oldTask.filter((task) =>task.taskName.toLowerCase().includes(term));
      setTaskList(filteredTask);
  }

  return (
    <div className="container-fluid px-2 px-md-5 py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="bg-white rounded-4 shadow p-3 p-md-5">
            <h1 className="mb-4 text-center">Smart Task Manager</h1>
            {/* input box */}
            <div className="row g-2 mb-4">
              <div className="col-12 col-md-7">
                <div className="input-group">
                  <input
                    onChange={(e) => setTaskname(e.target.value)}
                    value={taskname}
                    type="text"
                    placeholder="Add your task"
                    className="form-control"
                  />
                  <button
                    onClick={handelAddTask}
                    className="btn btn-success btn-sm"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-5">
                <div className="input-group">
                  <span className="input-group-text">
                    <FaSearch />
                  </span>
                  <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search tasks"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            {/* list of items */}
            <div className="task-list">
              {taskList.map((task, index) => (
                <div className="w-100" key={task._id}>
                  <div className="my-2 p-2 border bg-light rounded-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <div className="flex-grow-1 mb-2 mb-md-0">
                      {editingTaskId === task._id ? (
                        <input
                          type="text"
                          value={editingTaskName}
                          onChange={(e) => setEditingTaskName(e.target.value)}
                          onBlur={() => {
                            if (
                              editingTaskName.trim() &&
                              editingTaskName !== task.taskName
                            ) {
                              handleUpdateTask(task._id, {
                                taskName: editingTaskName,
                              });
                            } else {
                              setEditingTaskId(null);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              if (
                                editingTaskName.trim() &&
                                editingTaskName !== task.taskName
                              ) {
                                handleUpdateTask(task._id, {
                                  taskName: editingTaskName,
                                });
                              } else {
                                setEditingTaskId(null);
                              }
                            } else if (e.key === "Escape") {
                              setEditingTaskId(null);
                            }
                          }}
                          autoFocus
                          className="form-control me-2"
                          style={{ maxWidth: 200 }}
                        />
                      ) : (
                        <span
                          className={
                            task.isDone ? "text-decoration-line-through" : ""
                          }
                        >
                          {task.taskName}
                        </span>
                      )}
                    </div>
                    <div className="d-flex flex-row">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => {
                          setEditingTaskId(task._id);
                          setEditingTaskName(task.taskName);
                        }}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        onClick={() => {
                          handleCheckUncheck(task._id);
                        }}
                        type="button"
                        className="btn btn-sm btn-success me-2"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteTask(task._id);
                        }}
                        type="button"
                        className="btn btn-sm btn-danger"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* tostify */}
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
