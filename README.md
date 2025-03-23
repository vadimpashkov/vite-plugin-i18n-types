# vite-plugin-i18n-types

> 🧩 Vite plugin to generate TypeScript types from localization-like JSON files (e.g., i18n keys).

**Works with any nested JSON structure — not tied to a specific i18n library.**

---

## 📦 Install

```bash
npm i -D vite-plugin-i18n-types
```

## 🔧 Usage

```ts
// vite.config.ts
import generateLocalizationTypes from 'vite-plugin-i18n-types';

export default {
  plugins: [
    generateLocalizationTypes({
      rootDir: './src',
      outputFile: './src/types',
      fileName: 'localization-keys.ts',
      typeName: 'LocalizationKeys',
      localesFoldersName: 'locales',
      commonDir: './src/common-locales',
      enablePrettier: false,
    }),
  ],
};
```

## 📁 What it does

This plugin recursively scans for JSON files in your project (e.g., localization files) and generates a TypeScript type like:

```ts
export type LocalizationKeys = 'auth.login' | 'auth.password' | 'dashboard.stats.title';
// ...
```

- ✅ Supports any nested JSON structure
- 🌀 Automatically runs on `vite build`
- 🔁 Supports hot reload when localization files change

## ⚙️ Options

| Option               | Type      | Default                | Description                                     |
| -------------------- | --------- | ---------------------- | ----------------------------------------------- |
| `rootDir`            | `string`  | _required_             | Root folder to start searching.                 |
| `outputFile`         | `string`  | _required_             | Where to save the generated file.               |
| `fileName`           | `string`  | `localization-keys.ts` | Output file name.                               |
| `typeName`           | `string`  | `LocalizationKeys`     | Name of the exported type.                      |
| `commonDir`          | `string`  | `undefined`            | Optional shared/common JSON folder.             |
| `localesFoldersName` | `string`  | `locales`              | Folder name to match for nested locale folders. |
| `enablePrettier`     | `boolean` | `false`                | Format the output using Prettier.               |

## ✨ Examples

Imagine you have this file:

```json
{
  "auth": {
    "login": "Login",
    "password": "Password"
  }
}
```

The plugin will generate:

```ts
export type LocalizationKeys = 'auth.login' | 'auth.password';
```

## 📄 License

[MIT](./LICENSE)
