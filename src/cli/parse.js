import program from 'commander'
import pkg from '../../package.json'
import airapi from '../index'

program
  .version(pkg.version)

program.command('init')
  .description('init project - get .airapi')
  .option('-l, --location <path>', 'Which path config to setup')
  .action(airapi.init)

program.command('build')
  .description('build apidoc from annotation')
  .option('-i, --input <path>', 'Input / source dirname')
  .option('-o, --output <path>', 'output dirname')
  .action(airapi.build)

module.exports = program
