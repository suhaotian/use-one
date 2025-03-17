import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'index.react-native': 'src/index.react-native.ts',
    'index.react-server': 'src/index.react-server.ts',
  },
  outDir: './dist',
  splitting: true,
  format: ['esm', 'cjs'],
  minify: true,
  target: 'ES2015',
  dts: true,
  external: ['react', '@react-native-async-storage/async-storage', 'server-only']
});
