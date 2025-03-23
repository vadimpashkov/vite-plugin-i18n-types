import { processLocaleFiles } from '@/core/processLocales';
import type { OptionsRequired } from '@/types/options';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { beforeEach, describe, expect, it } from 'vitest';

const createJsonFile = (filePath: string, content: object) => {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
};

describe('processLocaleFiles', () => {
	let tmpDir: string;

	beforeEach(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'locale-test-'));
	});

	it('extracts keys from nested locales and common dir', () => {
		const localeDir = path.join(tmpDir, 'features', 'auth', 'locales');
		const commonDir = path.join(tmpDir, 'common');

		createJsonFile(path.join(localeDir, 'en.json'), {
			auth: {
				login: 'Login',
				password: 'Password',
			},
		});

		createJsonFile(path.join(commonDir, 'common.json'), {
			app: {
				title: 'App Title',
			},
		});

		const options: OptionsRequired = {
			rootDir: tmpDir,
			outputFile: tmpDir,
			commonDir,
			fileName: 'types.d.ts',
			typeName: 'Keys',
			enablePrettier: false,
			localesFoldersName: 'locales',
		};

		const keys = processLocaleFiles(options);
		expect(keys).toContain('auth.login');
		expect(keys).toContain('auth.password');
		expect(keys).toContain('app.title');
	});
});
