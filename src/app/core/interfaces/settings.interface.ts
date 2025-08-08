export type AppTheme = 'light' | 'dark' | 'auto';

export interface AppSettings {
    navPos?: 'side' | 'top';
    dir?: 'ltr' | 'rtl';
    theme?: AppTheme;
    showHeader?: boolean;
    headerPos?: 'fixed' | 'static' | 'above';
    showUserPanel?: boolean;
    sidenavOpened?: boolean;
    sidenavCollapsed?: boolean;
    isDark: boolean;
    value: string;
}

export const defaults: AppSettings = {
    navPos: 'side',
    dir: 'ltr',
    theme: 'light',
    showHeader: true,
    headerPos: 'fixed',
    showUserPanel: true,
    sidenavOpened: true,
    sidenavCollapsed: false,
    isDark: false,
    value: 'rose-red-light'
};
