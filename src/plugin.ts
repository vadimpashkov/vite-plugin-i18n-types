import { PLUGIN_NAME } from '@/config/pluginName';
import { generateTypes } from '@/core/generateTypes';
import type { Options } from '@/types/options';
import { getOptions } from '@/utils/getOptions';
import { logger } from '@/utils/logger';
import { normalizePath } from '@/utils/path';
import path from 'path';
import type { Plugin } from 'vite';

export function generateLocalizationTypesPlugin(userOptions: Options): Plugin {
	const options = getOptions(userOptions);

	if (!options.fileName.endsWith('.ts')) {
		options.fileName += '.ts';
	}

	const normalizedLocalesDir = normalizePath(path.join(options.rootDir, options.localesFoldersName));
	const normalizedCommonDir = options.commonDir ? normalizePath(options.commonDir) : null;

	return {
		name: PLUGIN_NAME,
		buildStart() {
			generateTypes(options);
		},
		handleHotUpdate({ file, server }) {
			const normalizedFile = normalizePath(file);
			const isLocaleFile = normalizedFile.startsWith(normalizedLocalesDir);
			const isCommonFile = normalizedCommonDir && normalizedFile.startsWith(normalizedCommonDir);

			if (isLocaleFile || isCommonFile) {
				logger.success(`Localization updated: ${file}`);

				generateTypes(options);

				server.ws.send({ type: 'full-reload' });
			}
		},
	};
}
