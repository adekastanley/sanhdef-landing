import { LogoCloudManager } from "@/components/admin/LogoCloudManager";

export default function LandingPageManagement() {
	return (
		<div className="flex flex-1 flex-col gap-8 p-4 pt-0">
			<div>
				<h1 className="text-3xl font-bold">Landing Page Management</h1>
				<p className="text-muted-foreground">Manage sections and content for the public landing page.</p>
			</div>
			
			<div className="grid gap-8">
				<section className="bg-card p-6 rounded-lg border shadow-sm">
					<LogoCloudManager />
				</section>
				
				{/* Add other sections here as needed (e.g., Hero, Stats, FAQ) */}
			</div>
		</div>
	);
}
