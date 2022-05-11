const db = require('../db/connections');
const inquirer = require('inquirer');

// var to store queried list of departments for user to choose from
let deptList = [];

// function adds new role to role table
function newRole(mainMenu) {
    // query to fetch list of dept names for user to choose from
    db.query('select id , name from department', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        deptList = data.map(e=>({value:e.id,name:e.name})) // tutor wrote this line - referenced and modified in addDepartment, addEmployee, updateEmployeeRole functions
        // prompt user input new role info
        inquirer.prompt([
            {
                type: 'text',
                name: 'title',
                message: 'Enter role name'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter role salary',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Enter department',
                choices: deptList
            }
        ])
            // query to insert new role info into role table
            .then(data => {
                let sql = `
            INSERT INTO role (title, salary, department_id)
            VALUES
            ('${data.title}', '${data.salary}', '${data.department_id}')`;
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // success message
                    console.log(`
        NEW ROLE ADDED
                    `);
                    // return to main menu
                    mainMenu();
                })
            })
    })
};

module.exports = newRole;