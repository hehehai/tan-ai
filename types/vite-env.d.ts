/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BETTER_AUTH_GOOGLE_CLIENT_ID: string;
	readonly VITE_BASE_URL: string;
	readonly VITE_CLOUD_FLARE_R2_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
