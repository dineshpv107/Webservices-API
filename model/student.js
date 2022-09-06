import mongoose from "mongoose";
const newSchema = mongoose.Schema({
    name: String,
    age: Number,
    gender: String
});

export default mongoose.model("employee", newSchema);