
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const LSCOLORS: string;
	export const COREPACK_ENABLE_AUTO_PIN: string;
	export const WINDOWID: string;
	export const npm_config_userconfig: string;
	export const COLORTERM: string;
	export const npm_package_exports___components___svelte: string;
	export const npm_config_cache: string;
	export const npm_package_devDependencies__types_node: string;
	export const LESS: string;
	export const npm_package_main: string;
	export const GNOME_KEYRING_CONTROL: string;
	export const npm_package_exports___utils_types: string;
	export const I3SOCK: string;
	export const NODE: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_package_author_url: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_package_scripts_check_watch: string;
	export const npm_package_devDependencies_publint: string;
	export const GRADLE_HOME: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const SDKMAN_CANDIDATES_DIR: string;
	export const npm_package_peerDependencies_svelte: string;
	export const npm_config_globalconfig: string;
	export const XCURSOR_SIZE: string;
	export const npm_package_exports___import: string;
	export const EDITOR: string;
	export const SDKMAN_BROKER_API: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const npm_package_devDependencies__tailwindcss_vite: string;
	export const npm_package_devDependencies_vite: string;
	export const LOGNAME: string;
	export const npm_package_devDependencies__testing_library_svelte: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_package_exports___svelte: string;
	export const npm_config_init_module: string;
	export const npm_package_scripts_build: string;
	export const _: string;
	export const npm_config_recursive: string;
	export const NoDefaultCurrentDirectoryInExePath: string;
	export const CLAUDECODE: string;
	export const MOTD_SHOWN: string;
	export const npm_package_scripts_package: string;
	export const HOME: string;
	export const LANG: string;
	export const npm_package_devDependencies_typescript: string;
	export const LS_COLORS: string;
	export const npm_package_version: string;
	export const SWAYSOCK: string;
	export const WAYLAND_DISPLAY: string;
	export const npm_package_files_0: string;
	export const npm_package_files_1: string;
	export const npm_package_scripts_test_integration: string;
	export const npm_package_devDependencies_daisyui: string;
	export const npm_package_dependencies_clsx: string;
	export const INIT_CWD: string;
	export const ALACRITTY_SOCKET: string;
	export const npm_lifecycle_script: string;
	export const npm_package_description: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_config_npm_version: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const XDG_SESSION_CLASS: string;
	export const npm_package_svelte: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const ZSH: string;
	export const npm_package_devDependencies_jsdom: string;
	export const npm_config_prefix: string;
	export const npm_package_type: string;
	export const USER: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_package_devDependencies_vitest: string;
	export const npm_package_exports___types: string;
	export const npm_package_scripts_test_components: string;
	export const SDKMAN_DIR: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const GIT_EDITOR: string;
	export const PAGER: string;
	export const XDG_VTNR: string;
	export const SDKMAN_CANDIDATES_API: string;
	export const npm_package_exports___utils_import: string;
	export const XDG_SESSION_ID: string;
	export const npm_config_user_agent: string;
	export const OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_execpath: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_scripts_test: string;
	export const XDG_RUNTIME_DIR: string;
	export const npm_package_dependencies_tailwind_variants: string;
	export const npm_package_module: string;
	export const CLAUDE_CODE_ENTRYPOINT: string;
	export const MKLROOT: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_devDependencies__sveltejs_package: string;
	export const npm_package_keywords_5: string;
	export const npm_package_keywords_4: string;
	export const npm_package_keywords_6: string;
	export const npm_package_keywords_1: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_keywords_0: string;
	export const npm_package_keywords_3: string;
	export const npm_package_keywords_2: string;
	export const npm_package_exports___components___import: string;
	export const npm_package_dependencies_tailwind_merge: string;
	export const npm_package_scripts_check: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const ALACRITTY_LOG: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_author_name: string;
	export const npm_package_devDependencies__playwright_test: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_package_license: string;
	export const SDKMAN_PLATFORM: string;
	export const npm_config_global_prefix: string;
	export const npm_package_exports___components___types: string;
	export const MAIL: string;
	export const npm_config_registry: string;
	export const ALACRITTY_WINDOW_ID: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_node_execpath: string;
	export const OLDPWD: string;
	export const npm_package_types: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		LSCOLORS: string;
		COREPACK_ENABLE_AUTO_PIN: string;
		WINDOWID: string;
		npm_config_userconfig: string;
		COLORTERM: string;
		npm_package_exports___components___svelte: string;
		npm_config_cache: string;
		npm_package_devDependencies__types_node: string;
		LESS: string;
		npm_package_main: string;
		GNOME_KEYRING_CONTROL: string;
		npm_package_exports___utils_types: string;
		I3SOCK: string;
		NODE: string;
		npm_package_devDependencies_tslib: string;
		npm_package_author_url: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_package_scripts_check_watch: string;
		npm_package_devDependencies_publint: string;
		GRADLE_HOME: string;
		COLOR: string;
		npm_config_local_prefix: string;
		SDKMAN_CANDIDATES_DIR: string;
		npm_package_peerDependencies_svelte: string;
		npm_config_globalconfig: string;
		XCURSOR_SIZE: string;
		npm_package_exports___import: string;
		EDITOR: string;
		SDKMAN_BROKER_API: string;
		XDG_SEAT: string;
		PWD: string;
		npm_package_devDependencies__tailwindcss_vite: string;
		npm_package_devDependencies_vite: string;
		LOGNAME: string;
		npm_package_devDependencies__testing_library_svelte: string;
		XDG_SESSION_TYPE: string;
		npm_package_exports___svelte: string;
		npm_config_init_module: string;
		npm_package_scripts_build: string;
		_: string;
		npm_config_recursive: string;
		NoDefaultCurrentDirectoryInExePath: string;
		CLAUDECODE: string;
		MOTD_SHOWN: string;
		npm_package_scripts_package: string;
		HOME: string;
		LANG: string;
		npm_package_devDependencies_typescript: string;
		LS_COLORS: string;
		npm_package_version: string;
		SWAYSOCK: string;
		WAYLAND_DISPLAY: string;
		npm_package_files_0: string;
		npm_package_files_1: string;
		npm_package_scripts_test_integration: string;
		npm_package_devDependencies_daisyui: string;
		npm_package_dependencies_clsx: string;
		INIT_CWD: string;
		ALACRITTY_SOCKET: string;
		npm_lifecycle_script: string;
		npm_package_description: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_config_npm_version: string;
		npm_package_devDependencies_svelte_check: string;
		XDG_SESSION_CLASS: string;
		npm_package_svelte: string;
		TERM: string;
		npm_package_name: string;
		ZSH: string;
		npm_package_devDependencies_jsdom: string;
		npm_config_prefix: string;
		npm_package_type: string;
		USER: string;
		npm_config_frozen_lockfile: string;
		npm_package_devDependencies_vitest: string;
		npm_package_exports___types: string;
		npm_package_scripts_test_components: string;
		SDKMAN_DIR: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		GIT_EDITOR: string;
		PAGER: string;
		XDG_VTNR: string;
		SDKMAN_CANDIDATES_API: string;
		npm_package_exports___utils_import: string;
		XDG_SESSION_ID: string;
		npm_config_user_agent: string;
		OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_execpath: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies_svelte: string;
		npm_package_scripts_test: string;
		XDG_RUNTIME_DIR: string;
		npm_package_dependencies_tailwind_variants: string;
		npm_package_module: string;
		CLAUDE_CODE_ENTRYPOINT: string;
		MKLROOT: string;
		DEBUGINFOD_URLS: string;
		npm_package_devDependencies__sveltejs_package: string;
		npm_package_keywords_5: string;
		npm_package_keywords_4: string;
		npm_package_keywords_6: string;
		npm_package_keywords_1: string;
		npm_package_scripts_dev: string;
		npm_package_keywords_0: string;
		npm_package_keywords_3: string;
		npm_package_keywords_2: string;
		npm_package_exports___components___import: string;
		npm_package_dependencies_tailwind_merge: string;
		npm_package_scripts_check: string;
		PATH: string;
		npm_config_node_gyp: string;
		ALACRITTY_LOG: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_author_name: string;
		npm_package_devDependencies__playwright_test: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_package_license: string;
		SDKMAN_PLATFORM: string;
		npm_config_global_prefix: string;
		npm_package_exports___components___types: string;
		MAIL: string;
		npm_config_registry: string;
		ALACRITTY_WINDOW_ID: string;
		npm_package_devDependencies_postcss: string;
		npm_node_execpath: string;
		OLDPWD: string;
		npm_package_types: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
