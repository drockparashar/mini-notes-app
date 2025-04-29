import mongoose from "mongoose";

const noteSchema=mongoose.Schema({
    title:{
        type: String,
        required:false,
        default:"New Note"
    },
    content:{
        type:String,
        required:false,
        default:""
    },
    },{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

const Note= mongoose.model('Notes',noteSchema);
export default Note;