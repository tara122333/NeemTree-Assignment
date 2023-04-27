import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    mobile : {
        type : String,
        required : true,
    },
    dob : {
        type : String
    },
    experience : {
        type : String
    },
    resumeTitle : {
        type : String
    },
    currLoc : {
        type : String
    },
    postalAddress : {
        type : String
    },
    currEmployer : {
        type : String
    },
    currDesignation : {
        type : String
    }
},{timestamps:true});


export const EmployeeModel = mongoose.model("Employee", EmployeeSchema);