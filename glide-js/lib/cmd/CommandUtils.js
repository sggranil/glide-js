const { execSync } = require('child_process'); // Importing execSync for executing shell commands

/**
 * Executes an npm command synchronously.
 * 
 * @param {string} cmd - The npm command to execute (e.g., 'start', 'build').
 * @throws Will log an error message if the command fails.
 */
const CommandExecutor = (cmd) => {
  try {
    // Execute the npm command synchronously and inherit the input/output streams
    execSync(`npm run ${cmd}`, { stdio: 'inherit' });
  } catch (error) {
    // Log an error message if command execution fails
    console.error(`Error executing command: ${error.message}`);
  }
};

// Exporting the CommandExecutor for use in other modules
module.exports = { CommandExecutor };
