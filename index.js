const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table")



const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Fishontvjb1031',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  db.connect((err) => {
    if (err) throw err
    menu()
}) 

const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Please select one',
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"], 
        },
    ])
    .then((response) => {
        if(response.options === "View all departments") {
            viewDepartments();
         }
         else if (response.options === "View all roles"){
             viewRoles();
         } 
         else if (response.options === "View all employees") {
             viewEmployees();
         }
         else if (response.options === "Add a department") {
             addDepartment();
         }
         else if (response.options === "Add a role") {
             addRole();
         }
         else if (response.options === "Add an employee") {
            addEmployee();
         }
         else if (response.options === "Update an employee role") {
             updateEmployee();
         }
    })
};

// database quires
const viewDepartments = () => {
    db.query('SELECT * FROM employee_db.department', function (err, results) {
            console.table(results);
            menu();
        })
    
};

const viewRoles = () => {
        db.query('SELECT * FROM employee_db.roles', function (err, results) {
            console.table(results);
            menu();
        })
};

const viewEmployees = () => {
    db.query('SELECT * FROM employee JOIN roles ON employee.role_id = roles.id', function (err, results) {
        console.table(results);
            menu();
    })
};

const addDepartment = () => {
     inquirer.prompt(
        {
            type: 'input',
            name: "newDepartment",
            message: "What is the name of the new department",
         }
// add??
    ).then(data => {
        db.query("INSERT INTO department (name) VALUES (?) ", data.newDepartment, (err, departments) =>{
            console.log("New department added")
            menu();
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
          type: 'input',
          name: 'roleName',
          message: 'What is the role name?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the role salary?',  
        },
        {
          type: 'input',
          name: 'departmentNum',
          message: 'What is the department number?',  
        }
        // add to database
    ]).then(data => {
        console.log(data)
        db.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?) ", [data.roleName, data.salary, data.departmentNum], (err, roles) =>{
            console.log("New role added")
            menu();
        })
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?',
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?',
          },
          {
            type: 'input',
            name: 'employeeRole',
            message: 'What is the employees role?',
          },
          {
            type: 'input',
            name: 'employeeManager',
            message: 'Who is the employees manager?',
          }
    ]).then(data => {
        console.log(data)
     let sqlstatement=   db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?) ", [data.firstName, data.lastName, data.employeeRole, data.employeeManager], (err, employee) =>{
            console.log("New employee added")
            menu();
        })
        console.log(sqlstatement.sql)
    })
};

const updateEmployee = () => {

    return inquirer.prompt([
        {
           type: 'list',
           name: 'updatedName',
           massage: 'Select an employee to update',
           choices: []
        //    employee.first_name
        },
        // {
        //   type: 'list',
        //   name: 'updated'  
        // }
    ])
};




