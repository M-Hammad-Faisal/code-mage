module.exports = {
  ci: {
    assert: {
      assertions: {
        // Non-performance categories - errors (must pass)
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        // Performance metrics - warnings only
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['warn', { minScore: 0.7 }],
        'network-dependency-tree-insight': ['warn', { minScore: 0.5 }],
        'render-blocking-insight': ['warn', { maxLength: 5 }],
        'render-blocking-resources': ['warn', { maxLength: 5 }],
        'speed-index': ['warn', { minScore: 0.7 }],
        'unused-javascript': ['warn', { maxLength: 5 }],
      },
    },
    collect: {
      numberOfRuns: 1,
      settings: {
        chromeFlags: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 60000,
      url: ['http://localhost:4173'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
