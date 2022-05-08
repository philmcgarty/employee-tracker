const db = require('../db/connections');
const inquirer = require('inquirer');

const rolePrompts = [
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
        type: 'number',
        name: 'department_id',
        message: 'Enter department id'
    }
];

function newRole(){
    return inquirer.prompt(rolePrompts)
    .then(data => {
        let sql = `
            INSERT INTO role (title, salary, department_id)
            VALUES
            ('${data.title}', '${data.salary}', '${data.department_id}')`;
        db.query(sql, (err, result) => {
            if (err){
                console.log(err);
                return;
            }
            console.log(result.affectedRows);
            return;
        })
    })
};

module.exports = newRole;