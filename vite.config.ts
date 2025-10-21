import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 800,
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: id => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            // React core
            if (
              id.includes('react') &&
              !id.includes('react-dom') &&
              !id.includes('react-router')
            ) {
              return 'react-core';
            }
            // React DOM
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            // Router
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            // MDX related
            if (id.includes('@mdx-js') || id.includes('mdx')) {
              return 'mdx-vendor';
            }
            // Animation libraries
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            // UI libraries
            if (id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            // Syntax highlighting
            if (
              id.includes('prism') ||
              id.includes('highlight') ||
              id.includes('rehype')
            ) {
              return 'syntax-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }

          // MDX content files
          if (id.includes('content/blog/') && id.endsWith('.mdx')) {
            return 'blog-content';
          }

          // Page components
          if (id.includes('src/pages/')) {
            const pageName = id.split('/').pop()?.replace('.tsx', '');
            return `page-${pageName}`;
          }

          // Components
          if (id.includes('src/components/')) {
            return 'components';
          }

          // Utils and hooks
          if (
            id.includes('src/utils/') ||
            id.includes('src/hooks/') ||
            id.includes('src/lib/')
          ) {
            return 'utils';
          }
        },
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    sourcemap: false,
    target: 'es2020',
  },
  plugins: [
    react(),
    mdx({
      providerImportSource: '@mdx-js/react',
      rehypePlugins: [],
      remarkPlugins: [],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
