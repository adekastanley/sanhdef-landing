import { ContentTable } from "@/components/admin/content/ContentTable";

export default function AdminProjectsPage() {
	return (
		<div className="p-6">
			<ContentTable type="project" />
		</div>
	);
}
