import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }) => {
  // eslint-disable-next-line no-undef
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // convert the string to a number
  // eslint-disable-next-line no-undef
  const portToUseString = process.env.VITE_PORT || '3000';
  const portToUserNumber = parseInt(portToUseString, 10);

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
    server: {
      port: portToUserNumber,
    },
  });
};
