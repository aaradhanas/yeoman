/*
Source : https://geek.digit.in/2017/09/how-to-accelerate-your-web-development-with-yeoman/
*/

'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the shining ' + chalk.red('generator-demo-generator') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'userName',
        message: 'Please provide your name',
        validate: (input) => {
          return input.trim().length > 0 ? true : 'Please provide a valid name. Blank input is not counted.';
        }
      },
      {
        type: 'input',
        name: 'userEmail',
        message: 'Please provide your email id',
        validate: (input) => {
          let emailValidateRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailValidateRegEx.test(input) ? true : 'Please provide a valid email id.';
        }
      },
      {
        type: 'input',
        name: 'appName',
        message: 'Please provide your app name',
        default: () => 'DefaultValue',
        validate: (value) => {
          if (value.length > 214) {
            return 'App Name cannot be more than 214 chars';
          } else if (value.startsWith('.') || value.startsWith('_')) {
            return 'App name cannot start with . or _';
          } else {
            return true;
          }
        },
        filter: value => value.toLowerCase()
      },
      {
        type: 'input',
        name: 'port',
        message: 'Please enter the port number in which you would like to run the app',
        validate: (value) => {
          return (!value || isNaN(value)) ? 'Please provide a number' : true;
        }
      },
      {
        type: 'list',
        name: 'license',
        message: 'Please choose one of the license',
        choices: ['Apache-2.0', 'MIT']
      }
    ];

    return this.prompt(prompts).then(answers => {
      // To access answers later use this.answers.someAnswer;
      this.answers = answers;
    });
  }

  writing() {
    let packageJSONContent = {};
    packageJSONContent.name = this.answers.appName;
    packageJSONContent.description = "";
    packageJSONContent.scripts = {
      start: 'node app/app.js'
    };
    packageJSONContent.version = '0.0.1';
    packageJSONContent.author = {
      name: this.answers.userName,
      email: this.answers.userEmail
    };
    packageJSONContent.license = this.answers.license;

    //Writing package.json content to the destination path
    this.fs.writeJSON(this.destinationPath('package.json'), packageJSONContent);

    //Writing views folder completely to the destination path
    this.fs.copy(this.templatePath('view'), this.destinationPath('view'));

    //Writing the app.js from our app to the destination path app.js. With ejs template PORT value
    this.fs.copyTpl(this.templatePath('app/app.js'), this.destinationPath('app/app.js'), {PORT: this.answers.port});
  }

  install() {
    //Installing the express dependency
    this.npmInstall(['express'], {save: true});
    this.npmInstall(['ejs'], {save: true});
  }

  end() {
    //In the end. Saying good bye to the user
    this.log(yosay(`Thanks ${process.env.USER}. You app is ready to start. Just write ${chalk.blue.underline('npm start')} to start the application.`))
  }
};
