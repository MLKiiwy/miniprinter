#!/usr/bin/env node

const commander = require('commander');
const html2epaper = require('./');

commander
  .version('0.1.0')
  .arguments('<html>')
  .action(async function(html) {
    console.log('Start generating');
    await html2epaper(html);
    console.log('Done');
    process.exit(0);
  });

commander.parse(process.argv);
