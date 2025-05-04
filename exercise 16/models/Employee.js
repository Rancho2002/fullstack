import mongoose from "mongoose";

try {
    await mongoose.connect("mongodb+srv://rancho2002:arijit2002..@fastapi.qgx0f7l.mongodb.net/company")
    console.log("connected to DB in models/Employee")
} catch (error) {
    console.log(error)
}

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    isManager: {
        type: Boolean,
        required: true
    }
})

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;