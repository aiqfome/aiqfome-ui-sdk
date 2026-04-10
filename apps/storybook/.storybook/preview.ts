import type { Preview } from '@storybook/web-components';

import '@aiqfome-sdk/themes/tokens.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    actions: { argTypesRegex: '^on.*' },
  },
};

export default preview;
