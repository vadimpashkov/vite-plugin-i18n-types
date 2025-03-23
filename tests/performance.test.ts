import { parseJsonFilesAndExtractKeys } from '@/core/parseJsonFilesAndExtractKeys';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';

function generateLargeJson(depth: number, breadth: number): object {
	const generate = (level: number): object => {
		if (level >= depth) {
			return { value: 'test' };
		}

		const obj: Record<string, any> = {};
		for (let i = 0; i < breadth; i++) {
			obj[`key${i}`] = generate(level + 1);
		}

		return obj;
	};
	return generate(0);
}

describe('performance: parseJsonFilesAndExtractKeys', () => {
	it('handles large JSON files under time limit', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'plugin-test-'));
		const filePath = path.join(tmpDir, 'large.json');
		const largeJson = generateLargeJson(5, 5);

		fs.writeFileSync(filePath, JSON.stringify(largeJson));

		const start = performance.now();
		const keys = parseJsonFilesAndExtractKeys([filePath]);
		const end = performance.now();

		console.log(`Parsed ${keys.size} keys in ${(end - start).toFixed(2)}ms`);
		expect(keys.size).toBeGreaterThan(0);
		expect(end - start).toBeLessThan(1000);
	});
});
