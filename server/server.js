import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use("/notes",notesRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log("Couldn't connect to database. Error:",err);
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server started on port:",process.env.PORT);
})