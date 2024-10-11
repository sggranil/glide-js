const path = require('path'); // Required for handling file paths
const { CommandExecutor } = require('./CommandUtils'); // Importing command executor utilities
const { generateFile } = require('./FileHandler'); // Importing file generation utility
const packageInfo = require('../../../package.json'); // Importing package information from package.json

/**
 * Main command execution based on user input.
 * 
 * @param {string} command - The command to execute (e.g., 'run', 'build', 'version', 'generate').
 * @param {string} [env] - The environment variable indicating the environment (e.g., 'dev', 'prod', 'component', 'page').
 * @param {any} args - The argument variable for additional options (e.g., 'file path').
 */
const CommandHandler = (command, env, args) => {
    switch (command) {
        case 'run':
            // Handle 'run' command with environment-specific execution
            if (env === 'dev') {
                CommandExecutor('start'); // Execute the start command for development environment
            } else if (env === 'prod') {
                CommandExecutor('build'); // Execute the build command for production environment
            } else {
                console.log('Unknown environment. Use "gl run dev" or "gl run prod".');
            }
            break;

        case 'build':
            // Handle 'build' command
            CommandExecutor('build');
            break;

        case 'version':
            // Display version information
            console.log('GlideJS CLI: ' + packageInfo.version);
            console.log('Typescript: ' + packageInfo.devDependencies.typescript);
            break;

        case 'generate':
            // Handle file generation based on the environment
            const capitalizedEnv = env.charAt(0).toUpperCase() + env.slice(1);
            if (capitalizedEnv === 'Component' || capitalizedEnv === 'Page') {
                generateFile(capitalizedEnv, args); // Generate a file based on the specified environment
            } else {
                console.log('Unknown environment. Use "gl generate component" or "gl generate page".');
            }
            break;

        default:
            console.log('Unknown command. Use "gl run", "gl build", or "gl generate".');
            break;
    }
};

module.exports = { CommandHandler };
