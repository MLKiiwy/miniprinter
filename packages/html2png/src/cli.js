#!/usr/bin/env node

const commander = require('commander');
const html2png = require('./');

commander
  .version('0.1.0')
  .arguments('<html> [filepath]')
  .action(async function(html, filepath = './screenshot.png') {
    console.log('Start generating');
    await html2png(html, filepath);
    console.log('Done');
    process.exit(0);
  });

commander.parse(process.argv);
