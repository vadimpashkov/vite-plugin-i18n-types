export function extractKeys(obj: Record<string, unknown>, prefix = ''): string[] {
	const keys: string[] = [];

	for (const key of Object.keys(obj)) {
		const fullKey = prefix ? `${prefix}.${key}` : key;
		const value = obj[key];

		if (typeof value === 'object' && value !== null) {
			keys.push(...extractKeys(value as Record<string, unknown>, fullKey));
		} else {
			keys.push(fullKey);
		}
	}

	return keys;
}
