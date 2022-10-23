import mongoose from "mongoose";

const Schema = mongoose.Schema;


export const LogsSchema = new Schema({
    time: {type: Date},
    file: {type: String},
    line: {type: String},
    info: {type: String},
    type: {type: String}
})
