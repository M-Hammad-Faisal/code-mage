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
      numberOfRuns: 3,
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
      url: ['http://localhost:3000'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
