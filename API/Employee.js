import express from 'express';
import multer from 'multer';
import csv from 'csvtojson';
import XLSX from 'xlsx';

import { EmployeeModel } from '../Database/Employee';

const Router = express.Router();


// multer config
const storage = multer.diskStorage({
    destination : (req,file,callback) =>{
        callback(null, './public/uploads')
    },
    filename : (req,file,callback)=>{
        callback(null, file.originalname)
    }
})

const upload = multer({storage : storage});


/* 
method = Post
access = public
params = none
url = /upload
des = upload excel and store data in dbms
*/
Router.post("/upload", upload.single("file"),async(req,res)=>{
    try {

        var employeeData = [];

        // const file = req.files.file;
        // console.log(req.file);

        const workbook = XLSX.readFile(req.file.path);

        const sheetName = workbook.SheetNames[0];

        // Get the sheet data as an array of objects
        const response = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            for(var x=0; x<response.length; x++){
                // const keys = Object.keys(response[x]);
                const result = employeeData.filter(user => user.email === response[x].Email);
                const findEmail = await EmployeeModel.findOne({email : response[x].Email });
                if((result.length === 0 || !result) && (!findEmail)){
                    employeeData.push({
                        fullname : response[x]['Name of the Candidate'],
                        email : response[x].Email,
                        mobile : response[x]['Mobile No.'],
                        dob : response[x]['Date of Birth'],
                        experience : response[x]['Work Experience'],
                        resumeTitle : response[x]['Resume Title'],
                        currLoc : response[x]['Current Location'],
                        postalAddress : response[x]['Postal Address'],
                        currEmployer : response[x]['Current Employer'],
                        currDesignation : response[x]['Current Designation']
                    });
                }                
            }

        await EmployeeModel.insertMany(employeeData);


        return res.status(200).json({Message : "Success"});

    } catch (error) {
        return res.status(501).json({ Error : error.message});
    }
});



export default Router;