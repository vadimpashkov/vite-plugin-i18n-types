import { extractKeys } from '@/core/extractKeys';
import { describe, expect, it } from 'vitest';

describe('extractKeys', () => {
	it('extracts flat keys', () => {
		const input = { a: 'A', b: 'B' };
		const result = extractKeys(input);
		expect(result).toEqual(['a', 'b']);
	});

	it('extracts nested keys', () => {
		const input = {
			auth: {
				login: 'Login',
				password: 'Password',
			},
			dashboard: {
				stats: {
					title: 'Title',
				},
			},
		};
		const result = extractKeys(input);

		expect(result).toContain('auth.login');
		expect(result).toContain('auth.password');
		expect(result).toContain('dashboard.stats.title');
	});

	it('returns empty array for empty object', () => {
		const result = extractKeys({});
		expect(result).toEqual([]);
	});
});
