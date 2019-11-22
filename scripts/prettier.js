const chalk = require('chalk');
const glob = require('glob');
const prettier = require('prettier');
const fs = require('fs');
const listChangedFiles = require('./shared/listChangedFiles');
const prettierConfigPath = require.resolve('../prettierrc');

const mode = process.argv[2];
const shouldWrite = mode === 'write' || mode === 'write-changed';
const onlyChanged = mode === 'check-changed' || mode === 'write-changed';
const changedFiles = listChangedFiles();
let didError = false;
const files = glob
  .sync('**/*.{ts,tsx}', {ignore: '**/node_modules/**'})
  .filter(f => changedFiles.has(f));

if (!files.length) {
  return;
}

files.forEach( async file => {
  // const options = prettier.resolveConfig.sync(file, {
  //   config: prettierConfigPath,
  //   parser: 'babel'
  // });
  try {
    const input = await fs.readFileSync(file, 'utf8');
    const output = await prettier.format(input)
    
    if (output != input) {
        fs.writeFileSync(file, output, 'utf8');
    }

  } catch (error) {
    didError = true;
    console.log('\n\n' + error.message);
    console.log(file);

    didError = true;
  }

  if (didError) {
    process.exit(1);
  }
});
