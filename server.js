const db = require('./db/connections');
const inquirer = require('inquirer');
//const mysql = require('mysql2');
const cTable = require('console.table');


function viewAllDepts(){
    const sql = 'SELECT * FROM department'
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        return;    
    })
};

function viewAllRoles(){
    const sql = 'SELECT * FROM role'
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
    const sql = 'SELECT * FROM employee'
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