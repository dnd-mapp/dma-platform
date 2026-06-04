/** Constant bag of the three valid theme mode values. Prefer these over raw strings to avoid typos. */
export const ThemeModes = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system',
} as const;

/** The union of valid theme modes accepted by {@link ThemeService.setTheme}. */
export type ThemeMode = (typeof ThemeModes)[keyof typeof ThemeModes];
