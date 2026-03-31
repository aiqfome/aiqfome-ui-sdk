import type { Preview } from '@storybook/web-components';

import '../src/tokens/geraldo-tokens.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    actions: { argTypesRegex: '^on.*' },
  },
};

export default preview;
