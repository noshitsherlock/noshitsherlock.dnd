const doNotDisturb = require('@sindresorhus/do-not-disturb');
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const availableCommands = ['status', 'enable', 'disable', 's', 'e', 'd'];

args._.forEach(element => {
    if (!availableCommands.includes(element))
        throw new Error(chalk.bgRed(`Command "${element}" not available`));
});

switch (args._[0]) {
    case "status":
    case "s":
        printStatus();
        break;
    case "e":
    case "enable":
        enableDnd();
        break;
    case "d":
    case "disable":
        disableDnd();
        break;
    default:
        console.log("No command supplied");
}

async function printStatus() {
    (async () => {
        await doNotDisturb.isEnabled().then(function (result) {
            result == true
                ? console.log(`Do Not Distub is: ${chalk.green('enabled')}`)
                : console.log(`Do Not Distub is: ${chalk.red('enabled')}`);
        })
    })();
}

async function enableDnd() {
    (async () => {
        await doNotDisturb.enable().then(function (result) {
            printStatus();
        })
    })();
}

async function disableDnd() {
    (async () => {
        await doNotDisturb.disable().then(function (result) {
            printStatus();
        })
    })();
}