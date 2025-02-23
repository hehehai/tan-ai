import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
	function toggleTheme() {
		if (
			document.documentElement.classList.contains("dark") ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.remove("dark");
			localStorage.theme = "light";
		} else {
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
		}
	}

	return (
		<button
			type="button"
			onClick={toggleTheme}
			onKeyDown={toggleTheme}
			tabIndex={0}
			className="flex items-center gap-2 w-full"
		>
			<span className="w-fit">Toggle theme</span>
			<div className="relative size-6">
				<SunIcon className="absolute top-1/2 left-1/2 size-4 -translate-y-1/2 -translate-x-1/2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<MoonIcon className="absolute top-1/2 left-1/2 size-4 -translate-y-1/2 -translate-x-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</div>
		</button>
	);
}
