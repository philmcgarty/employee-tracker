const db = require('./db/connections');
const inquirer = require('inquirer');
//const mysql = require('mysql2');
const cTable = require('console.table');

const newDept = require('./lib/addDepartment');
const newRole = require('./lib/addRole');
const newEmployee = require('./lib/addEmployee');

let toExit = false;

// view department names and department ids
function viewAllDepts(){
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        return;    
    })
};

// view job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles(){
    const sql = `
        SELECT role.id as role_id, role.title as role_title, department.name AS department_name
        FROM role
        LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        return;    
    })
};

function viewAllEmployees(){
    const sql =`
        select employee.id, employee.first_name, employee.last_name, role.title as job_title, department.name as department_name, role.salary
        from employee
        inner join role on employee.role_id = role.id
        inner join department on role.department_id = department.id`; // add manager
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        return;    
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
            newRole();
            break;
        case 'Add an employee':
            newEmployee();
            break;
        case 'Update an employee role':
            console.log('You chose update employee');
            // insert query function
            break;        
        default:
            console.log('Exit');
            toExit = true;    
    }
}


function reset(){
    mainMenu();
}


function mainMenu(){
    return inquirer.prompt(menuOptions)
    .then(data => {        
            return redirect(data);        
    })
    .then( () => {
        if (!toExit){
            reset();
        }
        return;
    })       
};

mainMenu();