const db = require('../db/connections');
const inquirer = require('inquirer');

// array variables for storing list options
let employeeList = [];
let roleList = [];

// function to update an employee's role
function updateRole(mainMenu) {
    // query to fetch employee names for list option
    db.query('SELECT id, first_name, last_name FROM employee', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        employeeList = data.map(emp => ({ value: emp.id, name: emp.first_name + " " + emp.last_name }))
        // query to fetch potential roles for list options
        db.query('select id, title from role', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            roleList = data.map(dept => ({ value: dept.id, name: dept.title }))
            // prompt user input to choose employee to update, and new role
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Choose an employee to update',
                    choices: employeeList
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Choose new role',
                    choices: roleList
                }
            ])
            // query to update the selected employee role
            .then(data => {
                let sql =`
                    UPDATE employee SET role_id = ${data.role_id}
                    WHERE id = ${data.employee};   
                `
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // success message
                    console.log(`
        EMPLOYEE RECORD UPDATED
                    `);
                    // return to main menu
                    mainMenu();
                })
            })
        })
    })
}

module.exports = updateRole;