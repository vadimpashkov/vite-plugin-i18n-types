import fs from 'fs';
import path from 'path';

export const findAllJsonFiles = (dir: string): string[] => {
	if (!fs.existsSync(dir)) {
		return [];
	}
	const files: string[] = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...findAllJsonFiles(fullPath));
		} else if (entry.isFile() && fullPath.endsWith('.json')) {
			files.push(fullPath);
		}
	}
	return files;
};

export const findLocaleFiles = (rootDir: string, localesFoldersName: string): string[] => {
	if (!fs.existsSync(rootDir)) {
		return [];
	}
	const files: string[] = [];
	const entries = fs.readdirSync(rootDir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(rootDir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name === localesFoldersName) {
				files.push(...findAllJsonFiles(fullPath));
			} else {
				files.push(...findLocaleFiles(fullPath, localesFoldersName));
			}
		}
	}
	return files;
};
