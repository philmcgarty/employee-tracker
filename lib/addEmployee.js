const db = require('../db/connections');
const inquirer = require('inquirer');
let roleList = [];
let managerList = [];

//const employeePrompts = ;

function newEmployee(mainMenu) {
    db.query('select id, title from role', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        roleList = data.map(dept => ({ value: dept.id, name: dept.title }))
        //console.log(roleList);
        db.query('select id, first_name, last_name from employee', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            managerList = data.map(manager => ({ value: manager.id, name: manager.first_name + " " + manager.last_name }))
            //console.log(managerList);
            
            const noManager = {value: 'NULL', name: 'None'};
            managerList.push(noManager);
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
                
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    //console.log(result.affectedRows);
                    mainMenu();
                })
            })
        })
    })
};

module.exports = newEmployee;