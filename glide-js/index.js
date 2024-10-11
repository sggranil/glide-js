#!/usr/bin/env node
require('module-alias/register');

// Import the CommandHandler from the command handling module
const { CommandHandler } = require('./lib/cmd/CommandHandler');

// Get command and environment variables from command line arguments
const [command, env, args] = process.argv.slice(2);

// Handle the command using the CommandHandler
CommandHandler(command, env, args);
