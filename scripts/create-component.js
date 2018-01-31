const path = require('path');
const prompt = require('prompt');
const changeCase = require('change-case');

const createFiles = require('./create-files');
const fileTemplates = require('./file-templates');
const config = require('./cc-config.json');

const err = checkErrors(config);

if (err) {
  throw err;
  process.exit(1);
};

const { src, types } = config;

const typeDesc = types
  .map((type, i) => `${i + 1}: ${type.name}`)
  .join(', ');

const typePattern = types.length > 1
  ? new RegExp(`^[1-${types.length}]$`)
  : /^1$/;

prompt.start();

prompt.get(
  [
    {
      name: 'typeVal',
      description: `Which type of module should be generated? (${typeDesc})`,
      required: true,
      pattern: typePattern,
      default: '1'
    },
    {
      name: 'name',
      description: 'What should the new module be called?',
      required: true
    }
  ],
  function(err, result) {
    const { name, typeVal } = result;

    const type = types[parseInt(typeVal, 10) - 1];

    if (!type) {
      throw new Error(`Invalid type: ${type}, typeVal: ${typeVal}`);
    }

    const moduleName = `${changeCase.pascalCase(name)}${type.suffix || ''}`;

    const dir = path.join(__dirname, `../src/${type.dirname}`);
    const moduleDir = path.join(dir, moduleName);

    const extension = type.isReact
      ? 'tsx'
      : 'ts';

    createFiles([
      {
        dir: moduleDir,
        filename: 'index.ts',
        content: fileTemplates.index(moduleName)
      },
      {
        dir: moduleDir,
        filename: `${moduleName}.${extension}`,
        content: fileTemplates.main(moduleName, type)
      },
      {
        dir: moduleDir,
        filename: `${moduleName}.spec.${extension}`,
        content: fileTemplates.spec(moduleName, type)
      }
    ])
      .then(() => {
        console.info(`Created ${moduleName} ${type.name}!
${moduleDir}`);
      })
      .catch((err) => {
        throw err;
      });
  }
);

function checkErrors(config) {
  if (!config.src) return new Error('cc-config.json has no "src" defined');
  if (!config.types) return new Error('cc-config.json has no "types" defined');
  if (!Array.isArray(config.types)) return new Error('cc-config.json "types" should be an array');
  if (config.types.length === 0) {
    return new Error(
      `cc-config.json "types" is empty, please provide at least 1 object containing:
  "name": string, "dirname": string, "isReact": boolean, "suffix": string (optional)`
    );
  }

  return false;
}
