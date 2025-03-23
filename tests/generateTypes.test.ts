import { generateTypes } from '@/core/generateTypes';
import type { OptionsRequired } from '@/types/options';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { beforeEach, describe, expect, it } from 'vitest';

const createJsonFile = (filePath: string, content: object) => {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
};

describe('generateTypes', () => {
	let tmpDir: string;
	let outputFile: string;

	beforeEach(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'generate-test-'));
		outputFile = path.join(tmpDir, 'types');
		fs.mkdirSync(outputFile);
	});

	it('generates a type file with extracted keys', () => {
		const localesDir = path.join(tmpDir, 'features', 'main', 'locales');
		createJsonFile(path.join(localesDir, 'en.json'), {
			welcome: 'Welcome',
			dashboard: {
				title: 'Dashboard Title',
			},
		});

		const options: OptionsRequired = {
			rootDir: tmpDir,
			outputFile,
			fileName: 'generated.ts',
			typeName: 'LocaleKeys',
			enablePrettier: false,
			localesFoldersName: 'locales',
			commonDir: '',
		};

		generateTypes(options);

		const generated = fs.readFileSync(path.join(outputFile, 'generated.ts'), 'utf-8');
		expect(generated).toContain('export type LocaleKeys');
		expect(generated).toContain('"welcome"');
		expect(generated).toContain('"dashboard.title"');
	});
});
