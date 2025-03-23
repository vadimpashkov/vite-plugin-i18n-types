import { logger } from '@/utils/logger';
import { execSync } from 'child_process';

export function formatWithPrettier(filePath: string) {
	try {
		execSync(`npx prettier --write ${filePath} --ignore-path --log-level silent`, { stdio: 'inherit' });
	} catch {
		try {
			execSync(`bunx prettier --write ${filePath} --ignore-path --log-level silent`, { stdio: 'inherit' });
		} catch (error) {
			logger.error('Error while running Prettier:', error);
		}
	}
}
