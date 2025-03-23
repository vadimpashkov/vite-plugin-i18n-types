import { Options, OptionsRequired } from '@/types/options';

export function getOptions(userOptions: Options): OptionsRequired {
	const defaultOptions: Partial<Options> = {
		fileName: 'localization-keys.ts',
		typeName: 'LocalizationKeys',
		localesFoldersName: 'locales',
		enablePrettier: false,
	};

	return {
		...defaultOptions,
		...userOptions,
	} as OptionsRequired;
}
