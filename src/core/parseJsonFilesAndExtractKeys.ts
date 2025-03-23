import { logger } from '@/utils/logger';
import fs from 'fs';
import { extractKeys } from './extractKeys';

export function parseJsonFilesAndExtractKeys(filePaths: string[]): Set<string> {
	const keys = new Set<string>();

	for (const filePath of filePaths) {
		try {
			const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
			if (typeof content !== 'object' || content === null) {
				continue;
			}
			extractKeys(content).forEach((key) => keys.add(key));
		} catch (error) {
			logger.error(`Error processing file ${filePath}:`, error);
		}
	}

	return keys;
}
