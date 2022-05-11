// required packages
const db = require('./db/connections');
const inquirer = require('inquirer');
//const mysql = require('mysql2');
const cTable = require('console.table');

// imported functions
const newDept = require('./lib/addDepartment');
const newRole = require('./lib/addRole');
const newEmployee = require('./lib/addEmployee');
const updateRole = require('./lib/updateEmployeeRole');

// view department names and department ids
function viewAllDepts(){
    const sql = 'SELECT id, name AS department_name FROM department';
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        // display query result and return to main menu
        console.table(rows);
        mainMenu();    
    })
};

// view job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles(){
    const sql = `
        SELECT role.id AS role_id, role.title AS role_title, department.name AS department_name, role.salary
        FROM role
        LEFT JOIN department ON role.department_id = department.id
        `;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        // display query result and return to main menu
        console.table(rows);
        mainMenu();    
    })
};

function viewAllEmployees(){
    // had assistance from tutor with adding manager column
    const sql =`        
    SELECT e1.id, e1.first_name, e1.last_name, role.title AS job_title, 
    department.name AS department_name, role.salary, 
    CONCAT(e2.first_name, " ",e2.last_name) AS manager
    FROM employee e1
    LEFT JOIN role ON e1.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee e2 ON e1.manager_id = e2.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        // display query result and return to main menu
        console.table(rows);
        mainMenu();    
    })
};

// switch for menu options to direct to correct function
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
            newDept(mainMenu);
            break;
        case 'Add a role':
            newRole(mainMenu);
            break;
        case 'Add an employee':
            newEmployee(mainMenu);
            break;
        case 'Update an employee role':
            updateRole(mainMenu);
            break;        
        default:
            // following 2 lines provided by tutor
            // if user chooses to exit then app ends
            db.end();
            process.exit(0);    
    }
}

// main menu with user options for display tables, add, etc 
function mainMenu(){
    return inquirer.prompt(
        [
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
    )
    .then(data => {
        // sends input to switch statement
        return redirect(data);        
    })       
};

// tutor helped write this statement
// check db, display welcome message and display main menu options 
db.connect(function(err){
    if(err) throw err;
    // welcome message
    console.log(`
        ------------------
            WELCOME TO
         EMPLOYEE TRACKER
        ------------------
        `);
    // calls main menu
    mainMenu();
})