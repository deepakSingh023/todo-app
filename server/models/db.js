const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://dsinghrana71:H67t6olkn6eYvTgO@cluster0.nkrfm.mongodb.net/todo-app')

const Todoschema = new mongoose.Schema({
    task:String,
    taskdone:{
        type:Boolean,
        default:false
    }

})

const Taskmodel=mongoose.model('todos',Todoschema)

module.exports=Taskmodel