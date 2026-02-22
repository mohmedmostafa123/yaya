import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.communication.assistant.arabic',
    appName: 'مساعد التواصل الذكي',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        StatusBar: {
            style: 'DARK',
            backgroundColor: '#4f46e5',
            overlaysWebView: false
        }
    }
};

export default config;
