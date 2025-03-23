// REMARK: Выводить информацию в консоль можно только через этот модуль, по этому здесь разрешаем использование
/* eslint-disable no-console */

import { PLUGIN_NAME } from '@/config/pluginName';
import chalk from 'chalk';

const getTime = () => chalk.gray(new Date().toLocaleTimeString());

const logLevel = {
	info: chalk.blue,
	success: chalk.green,
	warn: chalk.yellow,
	error: chalk.red,
};

const log = (level: keyof typeof logLevel, message: string, ...args: unknown[]) => {
	if (__TEST__ === true) {
		return;
	}

	const formattedMessage = `${getTime()} ${chalk.bold(logLevel[level](`[${PLUGIN_NAME}]`))} ${message}`;
	if (level === 'error') {
		process.stderr.write(formattedMessage + '\n');
		console.error(...args);
	} else {
		console.log(formattedMessage, ...args);
	}
};

const info = (message: string, ...args: unknown[]) => log('info', message, ...args);
const success = (message: string, ...args: unknown[]) => log('success', message, ...args);
const warn = (message: string, ...args: unknown[]) => log('warn', message, ...args);
const error = (message: string, ...args: unknown[]) => log('error', message, ...args);

export const logger = { info, success, warn, error };
