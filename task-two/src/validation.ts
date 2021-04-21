/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
import dns from 'dns';
import fs from 'fs';
import readline from 'readline';
import path from 'path';
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
function validateEmailAddresses(inputPath: string[], outputFile: string) {
  // console.log('Complete the implementation in src/validation.ts');
  inputPath.forEach((file) => {
    const filePath = path.join(__dirname, '..', file);
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath, 'utf8'),
      output: process.stdout,
      terminal: false,
    });
    rl.on('line', (line) => {
      const value = JSON.parse(JSON.stringify(line));
      if (value !== undefined) {
        if (validateMail(value)) {
          const domain = value.split('@')[1];
          dns.resolve(domain, 'MX', (err, addresses) => {
            if (err) {
              console.log('Error');
            } else if (addresses && addresses.length > 0) {
              console.log('Mail as valid.');
              fs.appendFileSync(outputFile, `${JSON.stringify(value)}\n`);
            }
          });
        }
      }
    });
  });
}
function validateMail(str: string) {
  // check for @
  const atSymbol = str.indexOf('@');
  if (atSymbol < 1) return false;
  const dot = str.indexOf('.');
  if (dot <= atSymbol + 2) return false;
  // check that the dot is not at the end
  if (dot === str.length - 1) return false;
  return true;
}
export default validateEmailAddresses;
