import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { HugeiconsGithub, HugeiconsNewTwitter } from "./icons";

export const SocialLinks = ({
	className,
}: {
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-row gap-2 items-center", className)}>
			<Button variant="secondary" size="icon" asChild>
				<a href="https://x.com/riverhohai" target="_blank" rel="noreferrer">
					<HugeiconsNewTwitter />
				</a>
			</Button>
			<Button variant="secondary" size="icon" asChild>
				<a
					href="https://github.com/hehehai/tan-ai"
					target="_blank"
					rel="noreferrer"
				>
					<HugeiconsGithub />
				</a>
			</Button>
		</div>
	);
};
