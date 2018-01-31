const path = require('path');
const prompt = require('prompt');
const changeCase = require('change-case');

const createFiles = require('./create-files');
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
    const componentDir = path.join(dir, moduleName);

    const extension = type.isReact
      ? 'tsx'
      : 'ts';

    createFiles([
      {
        dir: componentDir,
        filename: 'index.ts',
        content: getIndex(moduleName)
      },
      {
        dir: componentDir,
        filename: `${moduleName}.${extension}`,
        content: getComponent(moduleName)
      },
      {
        dir: componentDir,
        filename: `${moduleName}.spec.${extension}`,
        content: getSpec(moduleName)
      }
    ])
      .then(() => {
        console.info(`Created ${moduleName} ${type.name}!`);
      })
      .catch((err) => {
        throw err;
      });
  }
);

function getIndex(name) {
  return `import ${name} from './${name}';

export default ${name};
`;
}

function getComponent(name) {
  return `import * as React from 'react';

interface Props {}

export default class ${name} extends React.Component<Props> {
  render() {
    const {} = this.props;

    return (
      <div />
    );
  }
}
`;
}

function getSpec(name, type) {
  if (type.isReact) {
    return `import * as React from 'react';
import * as mocha from 'mocha';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import ${name} from './';

const render = (props = {}) =>
  shallow(
    <${name}
      {...props}
    />
  );

suite('${type.name} - ${name}', () => {});

test('defaults', () => {
  const node = render();
});`;
  }

  return `import * as mocha from 'mocha';
import { assert } from 'chai';

import ${name} from './';

suite('${type.name} - ${name}', () => {});

test('defaults', () => {});`;
}

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
