    const taskModel = require("../models/Task.model")
    const createTask= async (req,res)=>{
            const data = req.body;
            try {
                const model = new taskModel(data)
                await model.save()
                res.status(201).json({message:"Task is created",success:true})

            } catch (error) {
                res.status(500).json({message:"Failed to create task" ,success:false})
            }
    }




    const fetchTask= async (req,res)=>{
          
            try {
                const data = await taskModel.find({})
                res.status(201).json({message:"ALl task",success:true,data})

            } catch (error) {
                res.status(500).json({message:"Failed to getting task" ,success:false})
            }
    }

   // ...existing code...
const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const updatedTask = await taskModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found", success: false });
        }
        res.status(200).json({ message: "Task updated", success: true, data: updatedTask });
    } catch (error) {
        res.status(500).json({ message: `Failed to update: ${error.message}`, success: false });
    }
}
// ...existing code...


    const deleteTask= async (req,res)=>{
          
            try {
                const id = req.params.id;
                if(id){
                    const data = await taskModel.findByIdAndDelete(id)
                    return res.status(201).json({message:"Task deleted",success:true,data})
                }
                res.status(400).json({message:"Task id is required",success:false})

            } catch (error) {
                res.status(500).json({message:"Failed to getting task" ,success:false})
            }
    }

    module.exports =    {
        createTask,
        fetchTask,
        updateTask,
        deleteTask
    }