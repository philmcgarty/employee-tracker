const db = require('../db/connections');
const inquirer = require('inquirer');
let employeeList = [];
let roleList = [];

function updateRole(mainMenu) {
    db.query('SELECT id, first_name, last_name FROM employee', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        employeeList = data.map(emp => ({ value: emp.id, name: emp.first_name + " " + emp.last_name }))

        db.query('select id, title from role', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            roleList = data.map(dept => ({ value: dept.id, name: dept.title }))

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
                    console.log(`
        EMPLOYEE RECORD UPDATED
                    `);
                    mainMenu();
                })
            })
        })
    })
}

module.exports = updateRole;