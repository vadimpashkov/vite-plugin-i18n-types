export interface Options {
	rootDir: string;
	outputFile: string;
	commonDir?: string;
	fileName?: string;
	localesFoldersName?: string;
	typeName?: string;
	enablePrettier?: boolean;
}

export type OptionsRequired = Required<Options>;
