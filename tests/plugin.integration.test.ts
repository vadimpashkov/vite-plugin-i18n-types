import plugin from '@/index';
import type { Options } from '@/types/options';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { build, InlineConfig } from 'vite';
import { beforeEach, describe, expect, it } from 'vitest';

const createJsonFile = (filePath: string, content: object) => {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
};

describe('Vite plugin integration', () => {
	let tmpDir: string;

	beforeEach(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vite-plugin-integration-'));
	});

	it('generates types during Vite build', async () => {
		const localesDir = path.join(tmpDir, 'src', 'features', 'main', 'locales');
		const outputFile = path.join(tmpDir, 'src', 'types');
		createJsonFile(path.join(localesDir, 'en.json'), {
			menu: {
				open: 'Open',
				close: 'Close',
			},
		});

		const pluginOptions: Options = {
			rootDir: path.join(tmpDir, 'src'),
			outputFile,
			fileName: 'localization-keys.ts',
			typeName: 'LocalizationKeys',
			localesFoldersName: 'locales',
			enablePrettier: false,
		};

		const viteConfig: InlineConfig = {
			root: tmpDir,
			build: {
				outDir: path.join(tmpDir, 'dist'),
				emptyOutDir: true,
				lib: {
					entry: path.join(tmpDir, 'src', 'main.ts'),
					formats: ['es'],
				},
			},
			plugins: [plugin(pluginOptions)],
		};

		const entryPath = path.join(tmpDir, 'src', 'main.ts');
		fs.mkdirSync(path.dirname(entryPath), { recursive: true });
		fs.writeFileSync(entryPath, 'console.log("hello");');

		await build(viteConfig);

		const generatedPath = path.join(outputFile, 'localization-keys.ts');
		const content = fs.readFileSync(generatedPath, 'utf-8');

		expect(content).toContain('export type LocalizationKeys');
		expect(content).toContain('"menu.open"');
		expect(content).toContain('"menu.close"');
	});
});
