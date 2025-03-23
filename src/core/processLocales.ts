import type { OptionsRequired } from '@/types/options';
import { findAllJsonFiles, findLocaleFiles } from '@/utils/fs';
import { logger } from '@/utils/logger';
import { parseJsonFilesAndExtractKeys } from './parseJsonFilesAndExtractKeys';

export function processLocaleFiles(options: OptionsRequired): string[] {
	const localeFiles = findLocaleFiles(options.rootDir, options.localesFoldersName);
	const keys: Set<string> = new Set();

	if (localeFiles.length === 0) {
		logger.warn(`No localization files found in ${options.rootDir}/**/${options.localesFoldersName}`);
	}

	parseJsonFilesAndExtractKeys(localeFiles).forEach((k) => keys.add(k));

	if (options.commonDir) {
		const commonFiles = findAllJsonFiles(options.commonDir);
		parseJsonFilesAndExtractKeys(commonFiles).forEach((k) => keys.add(k));
	}

	logger.info(`Found ${keys.size} localization keys.`);

	return [...keys];
}
