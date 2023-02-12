module.exports = {
	ci: {
		collect: {
			url: ['http://localhost:4200/', 'http://localhost:4201/'],
			startServerCommand:
				'npx nx run web-admin:serve:production & npx nx run web-portal:serve:production',
			numberOfRuns: 1,
			startServerReadyTimeout: 20000
		},
		assert: {
			assertions: {
				'categories:performance': ['error', { minScore: 0.9 }],
				'categories:accessibility': ['error', { minScore: 0.9 }],
				'categories:best-practices': ['error', { minScore: 0.9 }],
				'categories:seo': ['error', { minScore: 0.8 }]
			}
		},
		upload: {
			target: 'temporary-public-storage'
		}
	}
};
