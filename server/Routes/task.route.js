const express = require("express");
const { createTask, fetchTask, updateTask, deleteTask } = require("../controllers/task.controller");
const router = express.Router();


// to get all task
router.get("/", (req, res) => {
  res.send("Tasks route");
});

// to post task
router.post('/create',createTask)


// to get   all task
router.get('/fetch',fetchTask)

// to update all task
router.put('/:id',updateTask)


// to delete  all task
router.delete('/:id',deleteTask)



module.exports = router;