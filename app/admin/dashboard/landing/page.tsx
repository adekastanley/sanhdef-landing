import { LogoCloudManager } from "@/components/admin/LogoCloudManager";
import { HeroManager } from "@/components/admin/HeroManager";
import { FocusAreasManager } from "@/components/admin/FocusAreasManager";
import { StatsManager } from "@/components/admin/StatsManager";
import { FAQManager } from "@/components/admin/FAQManager";
import { AboutHeroManager } from "@/components/admin/AboutHeroManager";
import { VisionManager } from "@/components/admin/VisionManager";
import { ResourcesHeroManager } from "@/components/admin/ResourcesHeroManager";
import { ResourcesListManager } from "@/components/admin/ResourcesListManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LandingPageManagement() {
	return (
		<div className="flex flex-1 flex-col gap-8 p-4 pt-0">
			<div>
				<h1 className="text-3xl font-bold">Pages Management</h1>
				<p className="text-muted-foreground">Manage sections and content for the public pages.</p>
			</div>

			<Tabs defaultValue="home" className="w-full">
				<TabsList className="mb-8">
					<TabsTrigger value="home">Home Page</TabsTrigger>
					<TabsTrigger value="about">About Page</TabsTrigger>
					<TabsTrigger value="resources">Resources Page</TabsTrigger>
				</TabsList>
				
				<TabsContent value="home" className="grid gap-8">
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
				</TabsContent>

				<TabsContent value="about" className="grid gap-8">
					<section className="bg-card p-6 rounded-lg border shadow-sm">
						<AboutHeroManager />
					</section>
					<section className="bg-card p-6 rounded-lg border shadow-sm">
						<VisionManager />
					</section>
				</TabsContent>

				<TabsContent value="resources" className="grid gap-8">
					<section className="bg-card p-6 rounded-lg border shadow-sm">
						<ResourcesHeroManager />
					</section>
					<section className="bg-card p-6 rounded-lg border shadow-sm">
						<ResourcesListManager />
					</section>
				</TabsContent>
			</Tabs>
		</div>
	);
}
