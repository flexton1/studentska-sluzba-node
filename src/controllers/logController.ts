import mongoose from "mongoose";
import {LogsSchema} from "../models/LogSchemaModel";

const Logs = mongoose.model('Logs', LogsSchema);
