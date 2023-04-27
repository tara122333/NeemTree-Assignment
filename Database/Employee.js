import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({

},{timestamps:true});


export default EmployeeModel = mongoose.model("Employee", EmployeeSchema);