import mongoose from "mongoose";
import { StudentSchema } from "../models/studentModel";
import bcrypt from "bcrypt";

const Student = mongoose.model('Student', StudentSchema);

//create student
export const createStudent = async (req, res) => {
    try {

        const student = req.body;
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
        await Student.find({userId: userID, is_active: true}).then((users) => {
            res.json(users)
        })
    }
    catch (error){
        throw new Error("Cannot get students");
    }
}

export const deleteStudent = async (req, res) => {
    try{
        const {id} = req.body;


        const student = await Student.findOne({where: {_id : id}});
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




