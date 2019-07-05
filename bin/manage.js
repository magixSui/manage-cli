#!/usr/bin/env node
const program = require('commander')

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('ui')
  .description('start and open the code generator')
  .action((cmd) => {
    require('../lib/ui')(cleanArgs(cmd))
  })

  /**
 * Help.
 */

function help () {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}
help()

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}