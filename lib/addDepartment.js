const db = require('../db/connections');
const inquirer = require('inquirer');

// adds a new dept to department table based on user input
function newDept(mainMenu){
    // request input new dept name
    return inquirer.prompt(
        [
            {
                type: 'text',
                name: 'deptName',
                message: 'Enter new department name'
            }
        ]
    )
    .then(data => {
        // add input department name into table
        let sql = `INSERT INTO department (name) VALUES ('${data.deptName}')`;
        db.query(sql, (err, result) =>{
            if (err){
                console.log(err);
                return;
            }
            // success message
            console.log(`
        NEW DEPARTMENT ADDED
        `);
            // return to main menu
            mainMenu();
        })
    })
};

module.exports = newDept;