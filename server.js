const db = require('./db/connections');
const inquirer = require('inquirer');
//const mysql = require('mysql2');
const cTable = require('console.table');

function viewAllEmployees(){
    const sql = 'SELECT * FROM employee'
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        return;    
    });
};
// test query
// const sql = 'SELECT * FROM employee'
// db.query(sql, (err, rows) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.table(rows);
//     return;
// });
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
            // insert query function
            console.log('You chose view all depts');
            break;
        case 'View all roles':
            console.log('You chose view all roles');
            // insert query function
            break;
        case 'View all employees':
            console.log('You chose view all employees');
            // insert query function
            break;
        case 'Add a department':
            console.log('You chose add dept');
            // insert query function
            break;
        case 'Add a role':
            console.log('You chose add role');
            // insert query function
            break;
        case 'Add an employee':
            console.log('You chose add employee');
            // insert query function
            break;
        case 'Update an employee role':
            console.log('You chose update employee');
            // insert query function
            break;        
        default:
            console.log('Exit');    
    }
    mainMenu();
}

function mainMenu(){
    return inquirer.prompt(menuOptions)
    .then(data => {
        if (data.menuOption !== 'Exit'){
            // console.log(data);
            return redirect(data);
        } else {
            console.log('You chose to exit, goodbye!');
        }        
    })    
};

mainMenu();
// options:
// view all departments
// view all roles
// view all employees
// add a department
// add a role
// add an employee
// update an employee role