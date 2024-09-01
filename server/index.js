const express=require('express')
const app=express()
const mongoose=require("mongoose")
const cors=require('cors')
const Taskmodel=require('./models/db')

app.use(express.json())
app.use(cors())

app.post("/add", (req,res)=>{
    const task=req.body.task;
    Taskmodel.create({
        task:task
    }).then(result=>res.json(result)).catch(err=>res.json(err))

})

app.get("/get",(req,res)=>{
    Taskmodel.find().then(result=>res.json(result)).catch(err=>res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    Taskmodel.findById(id)
        .then(task => {
            if (task) {
                Taskmodel.findByIdAndUpdate(id, { done: !task.done }, { new: true })
                    .then(result => res.json(result))
                    .catch(err => res.status(500).json(err));
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    Taskmodel.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});


app.listen(3001, (req, res) => {
    console.log("server is running on the port number 3001");
})


