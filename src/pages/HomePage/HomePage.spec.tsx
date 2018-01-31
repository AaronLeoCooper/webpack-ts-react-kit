import * as React from 'react';
import * as mocha from 'mocha';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { Location } from 'history';

import HomePage from './';

const location: Location = {
  pathname: '/test',
  search: '',
  state: '',
  hash: '',
  key: ''
};

const render = (props = {}) =>
  shallow(
    <HomePage
      location={location}
      {...props}
    />
  );

suite('pages - HomePage', () => {});

test('defaults', () => {
  const node = render();

  assert.equal(node.text(), 'You\'re at: /test', 'has expected text');
});
