
/* eslint no-console:off */

// to use V8's code cache to speed up instantiation time
require('v8-compile-cache');

/**
 * Catch and report unexpected error.
 * @param {any} error The thrown error object.
 * @returns {void}
 */
function onFatalError(error) {
  process.exitCode = 2;

  const { version } = require('../package.json');

  console.error(`
    Oops! Something went wrong! :(
    ESLint: ${version}
    ${error}`);
}

//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------
console.log('WOW');
(async function main() {
  process.on('uncaughtException', onFatalError);
  process.on('unhandledRejection', onFatalError);

  console.log('execution');

  // Otherwise, call the CLI.
  process.exitCode = await require('../src/index').execute(
    process.argv,
  );
}()).catch(onFatalError);
