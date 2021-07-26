const express = require("express");
const bodyParser = require("body-parser");
const { readDataFromFile, writeDataToFile } = require("./controllers");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// get specific data from file
app.get("/employees/:id", (req, res) => {
    const id = Number(req.params.id);
    const employees = readDataFromFile();
    const employee = employees.filter((employee) => employee.id === id);

    if (employee.length > 0) res.send(employee);
    else res.send(`No Employee on this id : ${id}`);
});

// Get all employees
app.get("/employees", (req, res) => {
    const employees = readDataFromFile();
    if (employees.length > 0) res.send(employees);
    else res.send("No employee data found");
});

// POST /employees
app.post("/employees", (req, res) => {
    const employee = req.body;

    const newEmployee = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
    };

    const employeeData = readDataFromFile();
    employeeData.push(newEmployee);
    writeDataToFile(employeeData);

    res.send(`Employee saved : ${newEmployee.name}, id :${newEmployee.id}`);
});

//base route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//listen to port
app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
});
