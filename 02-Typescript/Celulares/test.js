'use strict';
var inquirer = require('inquirer');
var questions = [
    {
        type: 'input',
        name: 'first_name',
        message: "What's your first name"
    },
    {
        type: 'input',
        name: 'last_name',
        message: "What's your last name",
        default: function () {
            return 'Doe';
        }
    },
    {
        type: 'input',
        name: 'fav_color',
        message: "What's your favorite color",
    },
    {
        type: 'input',
        name: 'phone',
        message: "What's your phone number",
    }
];
inquirer.prompt(questions).then(function (answers) {
    var respuestas = answers;
    console.log(answers);
    // console.log(JSON.parse(answers))
    console.log(JSON.stringify(answers, null, '  '));
    console.log(JSON.parse(JSON.stringify(answers, null, '  ')));
});
