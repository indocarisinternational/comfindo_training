module.exports = {
  ci: {
    collect: {
      url: [
        'https://www.comfindo.co.id/',
        'https://www.comfindo.co.id/training',
        'https://www.comfindo.co.id/blog',
        'https://www.comfindo.co.id/contact',
        'https://www.comfindo.co.id/services'
      ],
      numberOfRuns: 1, // Start with 1 run for MVP
      settings: {
        preset: 'desktop', // Desktop where practical
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.70 }],
        'categories:accessibility': ['warn', { minScore: 0.85 }],
        'categories:best-practices': ['warn', { minScore: 0.85 }],
        'categories:seo': ['warn', { minScore: 0.90 }],
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%'
    }
  }
};
