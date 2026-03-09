module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'started server on',
      startServerReadyTimeout: 60000,
      url: ['http://localhost:3000', 'http://localhost:3000/blog', 'http://localhost:3000/about'],
      settings: {
        chromeFlags: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    },
    assert: {
      assertions: {
        // Errors — must pass
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        // Warnings — notify but don't fail
        'categories:performance': ['warn', { minScore: 0.75 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],
        'unused-javascript': ['warn', { maxLength: 3 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
