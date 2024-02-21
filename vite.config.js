import { defineConfig } from 'vite';

import reactPlugin from '@vitejs/plugin-react';

export default {
  plugins: [reactPlugin()],
  build: {
    rollupOptions: {
      external: ['react-awesome-loaders'], // Add the library name here
    },
  },
};
