import mongoose from "mongoose";
import 'dotenv/config';
import express from "express";
import Employee from "./models/Employee.js";


const app = express()
const port = process.env.PORT || 3000;
app.use(express.static('public'))

try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to DB in main")
} catch (error) {
        console.log(error)
}

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
        res.render("home", {data: await Employee.find({})})
})

app.get('/generate', (req, res) => {
        const names = [
                "Arjun", "Krishna", "Aditya", "Rohit", "Aryan",
                "Priya", "Neha", "Meera", "Riya", "Kavya",
                "Vivaan", "Arun", "Rohan", "Ishaan", "Dev",
                "Diya", "Anaya", "Zara", "Kiara", "Advika",
                "Vihaan", "Aarav", "Kabir", "Reyansh", "Samar"
        ];
        const language = ["Python", "Java", "JavaScript", "C++", "C#", "Ruby", "PHP", "Swift", "Go", "Kotlin"];
        const city = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow"];
        const manager = [true,false];

        for (let index = 0; index < 10; index++) {
                const randomName = names[Math.floor(Math.random() * names.length)];
                const salary = "₹" + Math.floor(Math.random() * 30000).toString();
                const randomLanguage = language[Math.floor(Math.random() * language.length)];
                const randomCity = city[Math.floor(Math.random() * city.length)];
                const isManager = manager[Math.floor(Math.random() * manager.length)];
                // console.log(randomName, salary, randomLanguage, randomCity, isManager)

                const employee = new Employee({
                        name: randomName,
                        salary: salary,
                        language: randomLanguage,
                        city: randomCity,
                        isManager: isManager
                })
                // console.log(employee)
                employee.save()
                        .then(() => {
                                console.log("Employee saved to DB")
                        })
                        .catch((err) => {
                                console.log(err)
                        })

        }
        res.render("home",{data:[]})
})

app.get('/delete', (req, res) => {
        Employee.deleteMany({})
                .then(() => {
                        console.log("All employees deleted from DB")
                })
                .catch((err) => {
                        console.log(err)
                })
        res.render("home",{data:[]})
})

app.listen(port, () => {
        console.log(`Example app listening on port port`)
})
