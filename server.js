const db = require('./db/connections');
const inquirer = require('inquirer');
//const mysql = require('mysql2');
const cTable = require('console.table');

const newDept = require('./lib/addDepartment');
const newRole = require('./lib/addRole');
const newEmployee = require('./lib/addEmployee');


// view department names and department ids
function viewAllDepts(){
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        mainMenu();    
    })
};

// view job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles(){
    const sql = `
        SELECT role.id AS role_id, role.title AS role_title, department.name AS department_name
        FROM role
        LEFT JOIN department ON role.department_id = department.id
        `;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        mainMenu();    
    })
};

function viewAllEmployees(){
    // had assistance from tutor with adding manager column
    const sql =`        
    SELECT e1.id, e1.first_name, e1.last_name, role.title AS job_title, department.name AS department_name, role.salary, e2.first_name AS manager_first_name, e2.last_name AS manager_last_name
    FROM employee e1
    LEFT JOIN role ON e1.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee e2 ON e1.manager_id = e2.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        mainMenu();    
    })
};

const menuOptions = [
    {
        type: 'list',
        name: 'menuOption',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }
]

function redirect(data){
    switch(data.menuOption) {
        case 'View all departments':
            viewAllDepts();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'Add a department':
            newDept();
            break;
        case 'Add a role':
            newRole(mainMenu);
            break;
        case 'Add an employee':
            newEmployee(mainMenu);
            break;
        case 'Update an employee role':
            console.log('You chose update employee');
            // insert query function
            break;        
        default:
            // following 2 lines written by tutor
            db.end();
            process.exit(0);    
    }
}


function mainMenu(){
    return inquirer.prompt(menuOptions)
    .then(data => {        
            return redirect(data);        
    })       
};

// tutor helped write this statement 
db.connect(function(err){
    if(err) throw err;
    console.log("Welcome to Emp"); //change this line
    mainMenu();
})

module.exports = mainMenu;