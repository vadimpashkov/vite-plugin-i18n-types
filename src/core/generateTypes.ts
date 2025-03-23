import type { OptionsRequired } from '@/types/options';
import { logger } from '@/utils/logger';
import { formatWithPrettier } from '@/utils/prettier';
import fs from 'fs';
import path from 'path';
import { processLocaleFiles } from './processLocales';

export function generateTypes(options: OptionsRequired) {
	const keys = processLocaleFiles(options);

	if (keys.length === 0) {
		logger.warn('No localization keys found! Types not updated.');
		return;
	}

	const filePath = path.join(options.outputFile, options.fileName);

	fs.mkdirSync(path.dirname(filePath), { recursive: true });

	const typeName = options.typeName;
	const content = `export type ${typeName} = ${keys.map((k) => `"${k}"`).join(' | ')};\n`;

	fs.writeFileSync(filePath, content);
	logger.info(`Localization types file updated: ${options.fileName}`);

	if (options.enablePrettier) {
		formatWithPrettier(filePath);
	}
}
