import mongoose from "mongoose";
import { StudentSchema } from "../models/studentModel";
import bcrypt from "bcrypt";

const Student = mongoose.model('Student', StudentSchema);

//create student
export const createStudent = async (req, res) => {
    try {



        const student = req.body;

        if(student.studentStatus !== StatusStudentaEnum.Redovan || student.studentStatus !== StatusStudentaEnum.Vanredan){
            student.studentStatus = 0;
        }

           await Student.create({
                email: student.email,
                firstName: student.firstName,
                lastName: student.lastName,
                indexNumber: student.indexNumber,
               year: student.year,
               userId: req.payload.id,
               studentStatus: student.studentStatus,
               phone: student.phone,
                is_active: true
            })
                .then(() => {

                    res.json("Student created!");
                })
                .catch((err) => {
                    if (err) {
                        res.status(400).json({error: err});
                        console.log(err)
                    }
                });
    }
    catch (error){
        throw new Error("Error creating student!");
    }
}


export const getAllStudents = async (req, res) => {
    try{
        const userID = req.payload.id;




        const pageOptions = {
            page: parseInt(req.body.query.page, 10) || 0,
            limit: parseInt(req.body.query.limit, 10) || 10
        }

        let totalRecords = await Student.countDocuments({is_active: true, userId: userID});

        let queryOptions =
        {
            userId : userID,
            is_active: true
        }



        await Student.find(queryOptions)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .sort("-firstName")
            .exec(function (err, doc) {
                if(err) { res.status(500).json(err); return; };
                let response = {}
                response.data = doc;
                response.totalRecords = totalRecords;
                res.status(200).json(response);

            });
    }
    catch (error){
        throw new Error("Cannot get students");
    }
}

export const deleteStudent = async (req, res) => {
    try{
        const {id} = req.body;


        const student = await Student.findOne({_id : id});
        if(!student){
            throw new Error("Student not found");
        };

        student.is_active = false;
        await student.save().then(() => {

            res.json({message: 'Student deleted!',
            });
        });





    }catch (error){
        throw new Error("Cannot delete student");
    }
}


export const updateStudent = async (req, res) => {
    try{
        const userID = req.payload.id;
        const updatedStudent = req.body;


       const student = await Student.findOne({_id: updatedStudent._id, is_active: true, userId: userID});
       if(!student){
           throw new Error("Cannot find student");
       }
       student.firstName = updatedStudent.firstName;
       student.lastName = updatedStudent.lastName;
       student.studentStatus = updatedStudent.studentStatus;
       student.year = updatedStudent.year;
       student.phone = updatedStudent.phone;
       student.email = updatedStudent.email;

       await student.save().then(() => res.status(200).json("Student updated!"));


    }
    catch (e){
        throw new Error("Cannot update student!");
    }
}




