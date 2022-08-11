/// <reference types="types-node-test" />

import { createElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import stringifyPropValueAs from './index';
import test from 'node:test';
import assert from 'node:assert';

test('stringify-prop-value-as', async (t) => {
  await t.test('custom prop value serialization', () => {
    const options = { test: 'hello', arr: [1, 2, 3] };
    const elm = createElement('h1', { options });
    assert.equal(
      reactElementToJSXString(elm),
      `<h1
        options={{
          arr: [
            1,
            2,
            3
          ],
          test: 'hello'
        }}
       />`.replace(/\n      /g, '\n'),
    );

    assert.ok(options === stringifyPropValueAs(options, 'MY_OBJECT'));
    assert.equal(reactElementToJSXString(elm), `<h1 options={MY_OBJECT} />`);
  });

  await t.test('does not overwrite constructor when not needed', () => {
    class Options {
      opts: any;
      constructor(opts: any) {
        this.opts = opts;
      }
    }
    const options = new Options({ test: 'hello', arr: [1, 2, 3] });
    const elm = createElement('h1', { options });
    assert.equal(
      reactElementToJSXString(elm),
      `<h1 options={[object Object]} />`,
    );
    assert.ok(options.constructor === Options);

    assert.ok(options === stringifyPropValueAs(options, 'MY_OBJECT'));
    assert.equal(reactElementToJSXString(elm), `<h1 options={MY_OBJECT} />`);
    assert.ok(options.constructor === Options);
  });

  await t.test('dynamic name', () => {
    const options = stringifyPropValueAs(
      { test: 'hello', arr: [1, 2, 3] },
      ({ test }) => `"${test}"`,
    );
    const elm = createElement('h1', { options });
    assert.equal(reactElementToJSXString(elm), `<h1 options={"hello"} />`);
  });
});
