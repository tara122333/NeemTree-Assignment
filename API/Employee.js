import express from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import async from 'async';

import { EmployeeModel } from '../Database/Employee';

const Router = express.Router();

// multer config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage });


Router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        // Get the sheet data as an array of objects
        const response = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        await async.eachSeries(response, async (row, callback) => {
            try {
                if(row.Email === ''){
                    console.log(`Empty Employee email Id So Data not stored`);
                    callback();
                    return;
                }
                const existingEmployee = await EmployeeModel.findOne({ email: row.Email });
                if (existingEmployee) {
                    console.log(`duplicate Employee email Id is : ${row.Email}`);
                    callback();
                    return;
                }
                const employee = new EmployeeModel({
                    fullname: row['Name of the Candidate'],
                    email: row.Email,
                    mobile: row['Mobile No.'],
                    dob: row['Date of Birth'],
                    experience: row['Work Experience'],
                    resumeTitle: row['Resume Title'],
                    currLoc: row['Current Location'],
                    postalAddress: row['Postal Address'],
                    currEmployer: row['Current Employer'],
                    currDesignation: row['Current Designation']
                });
                await employee.save();
                callback();
            } catch (error) {
                return res.status(501).json({ Error: error.message });
            }
        });
        return res.status(200).json({ Message: "Success" });
    } catch (error) {
        return res.status(501).json({ Error: error.message });
    }
});

export default Router;