import { getContent } from "@/app/actions/landing";
import type { FocusArea } from "@/components/admin/FocusAreasManager";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

export default async function FocusAreaSinglePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = await params;
	const id = resolvedParams.id;

	const data = await getContent("focus_areas");
	const items: FocusArea[] = data?.items || [];
	const item = items.find((i) => i.id === id);

	if (!item) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-cream text-dark font-sans">
			{/* Hero Banner */}
			<div className="relative w-full h-[50vh] min-h-[400px] bg-navy overflow-hidden">
				{item.imageUrl ? (
					<img
						src={item.imageUrl}
						alt={item.title}
						className="absolute inset-0 w-full h-full object-cover opacity-80"
					/>
				) : (
					<div className="absolute inset-0 bg-navy/80" />
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
				
				<div className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-6 pb-16">
					<Link
						href="/focus-areas"
						className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 w-fit text-sm font-semibold uppercase tracking-widest"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Focus Areas
					</Link>
					
					{item.tag && (
						<div className="flex items-center gap-2 mb-6">
							<div className="bg-pink rounded-full p-1">
								<AlertCircle className="w-4 h-4 text-white" />
							</div>
							<span className="text-xs tracking-widest uppercase font-bold text-white shadow-sm">
								{item.tag}
							</span>
						</div>
					)}
					<h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
						{item.title}
					</h1>
				</div>
			</div>

			{/* Content Body */}
			<div className="max-w-4xl mx-auto px-6 py-20">
				<div className="prose prose-lg md:prose-xl prose-p:text-dark/80 prose-headings:text-navy max-w-none prose-a:text-pink hover:prose-a:text-pink-hover">
					{/* Render as simple text for now, but use Markdown if they use rich text in the future */}
					{item.fullText.split('\n').map((paragraph, index) => (
						<p key={index} className="mb-6 leading-relaxed">
							{paragraph}
						</p>
					))}
				</div>
			</div>
		</main>
	);
}
