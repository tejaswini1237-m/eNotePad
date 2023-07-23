const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Note = require("../models/Note")


router.get("/fetchallnotes",fetchUser,async(req,res)=>{
    const notes = await Note.find({user:req.user.id})
    res.json(notes)
})

router.post("/addnote",fetchUser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
 ],async (req,res)=>{
 
    const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
    const note = new Note({
       title:req.body.title,
       description:req.body.description,
       user:req.user.id
    })
    const newNote = await note.save();
    res.json(newNote)
 })


 //update a note

 router.put("/updatenote/:id",fetchUser,async(req,res)=>{
    const newNote={};
    if(req.body.title){newNote.title=req.body.title}
    if(req.body.description){newNote.description=req.body.description}

    let note = await Note.findById(req.params.id);
    if(!note){
        res.status(401).json({errors:"Some error occured"})
    }
    if(note.user.toString()!==req.user.id){
        res.status(401).json({errors:"Some error occured"})
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
 })


 router.delete("/deletenote/:id",fetchUser,async(req,res)=>{
    let note = await Note.findById(req.params.id);
    if(!note){
        res.status(401).json({errors:"Some error occured"})
    }

    if(note.user.toString()!==req.user.id){
        res.status(401).json({errors:"Some error occured"})
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted",note:note})
 })
module.exports = router