const db = require('../db/connections');
const inquirer = require('inquirer');
let deptList = [];



function newRole(mainMenu) {
    db.query('select id , name from department', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        deptList = data.map(e=>({value:e.id,name:e.name})) // tutor wrote this line
        console.log(deptList);
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
                message: 'Enter department id',
                choices: deptList
            }
        ])
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
                    console.log(result.affectedRows);
                    mainMenu();
                })
            })
    })
};

module.exports = newRole;