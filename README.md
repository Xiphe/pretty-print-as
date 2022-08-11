# stringify-prop-value-as

customize how a prop value is stringified with [react-element-to-jsx-string](https://www.npmjs.com/package/react-element-to-jsx-string)

created in order to make [storybook source blocks](https://storybook.js.org/docs/react/writing-docs/doc-block-source) easier to digest when working with complex prop values.

## Install

```bash
npm i stringify-prop-value-as
# yarn add stringify-prop-value-as
```

## Use

```ts
import { createElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import stringifyPropValueAs from 'stringify-prop-value-as';

const options = stringifyPropValueAs(
  { test: 'hello', arr: [1, 2, 3] },
  'MY_OBJECT',
);

console.log(reactElementToJSXString(<h1 options={options} />));
/* <h1 options={MY_OBJECT} /> */
```
