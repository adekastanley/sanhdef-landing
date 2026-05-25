// import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NavHoverContentProps {
	overview: {
		title: string;
		description: string;
	};
	links: {
		title: string;
		items: Array<{ label: string; href: string }>;
	};
	inFocus: {
		title: string;
		image: string;
		articleTitle: string;
		articleDescription: string;
		articleLink: string;
		buttonText?: string;
	};
}

export default function NavHoverContent({
	overview,
	links,
	inFocus,
}: NavHoverContentProps) {
	return (
		<div className="flex rounded-3xl w-[800px] bg-navy text-cream shadow-xl border border-dark/10 overflow-hidden">
			{/* Left Column - Description */}
			<div className="w-1/3 border-r border-cream/10 p-8 bg-dark/20">
				<h3 className="mb-4 font-sans text-2xl font-bold tracking-tight">
					{overview.title}
				</h3>
				<p className="font-sans text-sm font-medium leading-relaxed text-cream/80">
					{overview.description}
				</p>
			</div>

			{/* Middle Column - Links */}
			<div className="w-1/3 border-r border-cream/10 p-8 bg-dark/10">
				<h4 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-pink">
					{links.title}
				</h4>
				<ul className="space-y-4">
					{links.items.map((item) => (
						<li
							key={item.label}
							className="border-b border-cream/10 pb-3 last:border-0"
						>
							<a
								href={item.href}
								className="block font-sans text-sm font-bold text-cream/90 hover:text-pink transition-colors"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Right Column - In Focus */}
			<div className="w-1/3 p-8">
				<h4 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-pink">
					{inFocus.title}
				</h4>
				<div className="group cursor-pointer">
					<div className="mb-5 overflow-hidden rounded-2xl border border-cream/10">
						<img
							src={inFocus.image}
							alt={inFocus.articleTitle}
							className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</div>
					<h3 className="mb-3 font-sans text-lg font-bold leading-tight">
						{inFocus.articleTitle}
					</h3>
					<p className="mb-5 text-sm font-medium text-cream/70 line-clamp-3 leading-relaxed">
						{inFocus.articleDescription}
					</p>
					<Button
						variant="outline"
						className="border-pink text-pink hover:bg-pink hover:text-navy font-bold rounded-full text-xs px-6 transition-colors"
						asChild
					>
						<a href={inFocus.articleLink}>
							{inFocus.buttonText || "Read More"}
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
