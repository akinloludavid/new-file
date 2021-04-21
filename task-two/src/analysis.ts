/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
const fs = require('fs');
const path = require('path');
function analyseFiles(inputPaths: string[], outputPath: string) {
  let resultValue: {} = {}
  let value: string[] = []
  inputPaths.forEach((pathFile: string) => {
    const newPath: string = path.resolve(__dirname, '../' + pathFile);
    const data: Buffer = fs.readFileSync(newPath, 'utf-8');
    value = JSON.parse(JSON.stringify(data)).split('\n');
    value.pop();
    value.shift();
  });
  interface Counter {
    [key: string]: number;
  }
  const category: Counter = {};
  const validEmail: string[] = [];
  const domainNames: string[] = [];
  for (let index = 0; index < value.length; index++) {
    const item: string = value[index];
    if (validateMail(value[index])) {
      validEmail.push(item);
      domainNames.push(item.split('@')[1]);
      category[item.split('@')[1]] = (category[item.split('@')[1]] || 0) + 1
    }
  }
  resultValue = {
    validDomains: Object.keys(category),
    totalEmailsParsed: value.length,
    totalValidEmails: validEmail.length,
    categories: category,
  }
  fs.writeFileSync(outputPath, JSON.stringify(resultValue, null, 2))
}
function validateMail(email: string): boolean {

  const re = /\S+@\S+\.\S+/;

  return re.test(email);
}

export default analyseFiles;
