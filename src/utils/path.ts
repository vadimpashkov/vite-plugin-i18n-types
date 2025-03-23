import path from 'path';

export const normalizePath = (p: string) => path.normalize(p).replace(/\\/g, '/');
