import { LogoCloudManager } from "@/components/admin/LogoCloudManager";
import { HeroManager } from "@/components/admin/HeroManager";
import { FocusAreasManager } from "@/components/admin/FocusAreasManager";
import { StatsManager } from "@/components/admin/StatsManager";
import { FAQManager } from "@/components/admin/FAQManager";

export default function LandingPageManagement() {
	return (
		<div className="flex flex-1 flex-col gap-8 p-4 pt-0">
			<div>
				<h1 className="text-3xl font-bold">Landing Page Management</h1>
				<p className="text-muted-foreground">Manage sections and content for the public landing page.</p>
			</div>
			
			<div className="grid gap-8">
				<section className="bg-card p-6 rounded-lg border shadow-sm">
					<HeroManager />
				</section>
				
				<section className="bg-card p-6 rounded-lg border shadow-sm">
					<FocusAreasManager />
				</section>
				
				<section className="bg-card p-6 rounded-lg border shadow-sm">
					<LogoCloudManager />
				</section>
				
				<section className="bg-card p-6 rounded-lg border shadow-sm">
					<StatsManager />
				</section>
				
				<section className="bg-card p-6 rounded-lg border shadow-sm">
					<FAQManager />
				</section>
			</div>
		</div>
	);
}
