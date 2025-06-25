import { create } from 'zustand';
export interface FormStore{
    formUrl: string;
    setFormUrl: (url: string) => void;
    webViewKey: number;
    setWebViewKey: (key: number) => void;
    cookies: string | null;
    setCookies: (cookies: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    script: string;
    setScript: (script: string) => void;
    showWebView: boolean;
    setShowWebView: (show: boolean) => void;
    formhtml: string | null;
    setformhtml: (html: string | null) => void;
    setCanReload:(canReload: boolean) => void;
    canReload: boolean;
    reset: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
    formUrl: '',
    canReload: true,
    setCanReload: (canReload: boolean) => set({ canReload }),
    setFormUrl: (url: string) => set({ formUrl: url }),
    webViewKey: 0,
    setWebViewKey: (key: number) => set({ webViewKey: key }),
    cookies: null,
    setCookies: (cookies: string | null) => set({ cookies }),
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),
    script: '', 
    setScript: (script: string) => set({ script }),
    showWebView: false, 
    setShowWebView: (show: boolean) => set({ showWebView: show }),
    formhtml: null,
    setformhtml: (html: string | null) => set({ formhtml: html }),
    reset: () => set({
        formUrl: '',
        webViewKey: 0,
        cookies: null,
        loading: false,
        script: '',
        showWebView: false,
        formhtml: null
    })
}));