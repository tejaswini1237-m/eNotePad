const mongoose = require('mongoose');

const NoteSchema={
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true  
    }  
}

const Note = mongoose.model("note",NoteSchema);

module.exports=Note;