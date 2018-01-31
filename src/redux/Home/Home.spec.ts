import * as mocha from 'mocha';
import { assert } from 'chai';

import reducer from './';
import { initState } from './Home';

suite('redux - Home', () => {});

test('reducer default', () => {
  const output = reducer({ isLoading: true }, { type: '' });

  assert.deepEqual(
    output,
    { ...initState, isLoading: true },
    'returns expected state'
  );
});
