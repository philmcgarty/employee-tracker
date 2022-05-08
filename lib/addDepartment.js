const db = require('../db/connections');
const inquirer = require('inquirer');

const deptPrompts = [
    {
        type: 'text',
        name: 'deptName',
        message: 'Enter new department name'
    }
];


function newDept(){
    return inquirer.prompt(deptPrompts)
    .then(data => {
        let sql = `INSERT INTO department (name) VALUES ('${data.deptName}')`;
        db.query(sql, (err, result) =>{
            if (err){
                console.log(err);
                return;
            }
            console.log(result.affectedRows);
            return;
        })
    })
};

module.exports = newDept;