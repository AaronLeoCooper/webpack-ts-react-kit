module.exports = {
  index: function (name) {
    return `import ${name} from './${name}';

export default ${name};
`;
  },
  main: function(name, type) {
    switch (type.moduleType) {
      case 'redux':
        return `import { IAction } from '../ducks.d';

interface State {
  isLoading: boolean;
}

export const initState: State = {
  isLoading: false
};

export default function(state: State = initState, action: IAction): State {
  switch (action.type) {
    default:
      return state;
  }
}
`;

      case 'react-container':
      default:
        return `import * as React from 'react';
import { connect } from 'react-redux';

interface Props {}

class ${name} extends React.Component<Props> {
  render() {
    const {} = this.props;

    return (
      <div />
    );
  }
}

export default connect(
  () => ({}),
  {}
)(${name});
`;

      case 'react':
      default:
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
  },
  spec: function(name, type) {
    switch (type.moduleType) {
      case 'redux':
        return `import * as mocha from 'mocha';
import { assert } from 'chai';

import reducer from './';
import { initState } from './${name}';

suite('${type.name} - ${name}', () => {});

test('reducer default', () => {
  const output = reducer({ isLoading: true }, { type: '' });

  assert.deepEqual(
    output,
    { ...initState, isLoading: true },
    'returns expected state'
  );
});
`;

      case 'react-container':
      default:
        return `import * as React from 'react';
import * as mocha from 'mocha';
import { assert } from 'chai';
import { mount } from 'enzyme';

import ${name} from './';

const render = (props = {}) =>
  mount(
    <${name}
      {...props}
    />
  );

suite('${type.name} - ${name}', () => {});

test('defaults', () => {
  const node = render();
});`;

      case 'react':
      default:
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
  }
};
