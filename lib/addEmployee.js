const db = require('../db/connections');
const inquirer = require('inquirer');

const employeePrompts = [
    {
        type: 'text',
        name: 'first_name',
        message: "Employee's first name"
    },
    {
        type: 'text',
        name: 'last_name',
        message: "Employee's last name"
    },
    {
        type: 'number',
        name: 'role_id',
        message: 'Role id?'
    },
    {
        type: 'number',
        name: 'manager_id',
        message: 'Manager ID?'
    }
];

function newEmployee(){
    return inquirer.prompt(employeePrompts)
    .then(data => {
        let sql = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES
            ('${data.first_name}', '${data.last_name}', '${data.role_id}', '${data.manager_id}')`;
        
        db.query(sql, (err, result) => {
            if (err){
                console.log(err);
                return;
            }
            console.log(result.affectedRows);
            mainMenu();
        })
    })
};

module.exports = newEmployee;