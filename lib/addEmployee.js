const db = require('../db/connections');
const inquirer = require('inquirer');

// variables to store retrieved data to add to inquirer as list options
let roleList = [];
let managerList = [];

// adds new employee data to employee table based on user input
function newEmployee(mainMenu) {
    // fetch role names for list options
    db.query('select id, title from role', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        roleList = data.map(dept => ({ value: dept.id, name: dept.title }))
        // fetch employee names to display as potential managers to choose from as list option
        db.query('select id, first_name, last_name from employee', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            managerList = data.map(manager => ({ value: manager.id, name: manager.first_name + " " + manager.last_name }))
            // option for no manager, added to managerList array             
            const noManager = {value: 'NULL', name: 'None'};
            managerList.push(noManager);
            // request input new employee info
            inquirer.prompt([
                {
                    type: 'text',
                    name: 'first_name',
                    message: "Employee's first name:"
                },
                {
                    type: 'text',
                    name: 'last_name',
                    message: "Employee's last name:"
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Role:',
                    choices: roleList
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Employee's manager:",
                    choices: managerList,
                    
                }
            ])
            .then(data => {
                // determine if manager has a name or no manager
                let sql = ''
                if (data.manager_id !== 'NULL'){
                    sql = `
                    INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES
                    ('${data.first_name}', '${data.last_name}', '${data.role_id}', '${data.manager_id}')`;

                } else {
                    sql = `
                    INSERT INTO employee (first_name, last_name, role_id)
                    VALUES
                    ('${data.first_name}', '${data.last_name}', '${data.role_id}')`;
                }
                // call query to insert new employee data
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // success message
                    console.log(`
        EMPLOYEE ADDED
                    `);
                    // return to main menu
                    mainMenu();
                })
            })
        })
    })
};

module.exports = newEmployee;