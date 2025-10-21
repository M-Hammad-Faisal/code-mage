module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        // Performance metrics - warnings only
        'categories:performance': ['warn', { minScore: 0.7 }],
        'first-contentful-paint': ['warn', { minScore: 0.7 }],
        'speed-index': ['warn', { minScore: 0.7 }],
        'render-blocking-resources': ['warn', { maxLength: 5 }],
        'render-blocking-insight': ['warn', { maxLength: 5 }],
        'unused-javascript': ['warn', { maxLength: 5 }],
        'network-dependency-tree-insight': ['warn', { minScore: 0.5 }],
        
        // Non-performance categories - errors (must pass)
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
