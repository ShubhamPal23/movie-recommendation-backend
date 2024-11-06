const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee");



app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ status: "Success", user: { name: user.name, email: user.email } });
                } else {
                    res.json({ status: "Fail", message: "Incorrect Password" });
                }
            } else {
                res.json({ status: "Fail", message: "User Not Found" });
            }
        })
        .catch(err => res.json({ status: "Error", message: err.message }));
});


app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("server is running")
})