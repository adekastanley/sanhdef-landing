import db, { ensureDbInitialized } from "../lib/db";

async function main() {
    await ensureDbInitialized();

    const heroData = {
        title: "Systems-Level Thinking. Ground-Level Execution.",
        description: "Bridging the gap between macro policy intent and field-level execution across Nigeria and Africa.",
        buttonText: "Get Involved",
        buttonLink: "/get-involved"
    };

    const focusAreasData = {
        title: "Intelligence built in the boardroom. Progress sustained in the community.",
        description: "SANHDEF brings macro logic straight to the field without dilution. We integrate rigorous systems thinking with community-centered engagement, ensuring that every intervention is structurally sound and locally sustained.",
        buttonText: "More About Us",
        buttonLink: "/about",
        imageUrl: "/assets/samg.webp",
        benefits: [
            "Deep Local Intelligence",
            "Boardroom-Grade Rigor",
            "Policy-to-Implementation Seamlessness",
        ],
        features: [
            { title: "Health Programmes", desc: "Design & implementation" },
            { title: "Climate Change", desc: "Environmental resilience" },
            { title: "Education", desc: "Human capital development" },
            { title: "Agriculture", desc: "Food security & systems" },
            { title: "Policy Analysis", desc: "Development & advisory" },
            { title: "Energy", desc: "Sustainable power solutions" },
            { title: "Social Empowerment", desc: "Equity & community focus" },
            { title: "Digital Transformation", desc: "Health-tech & systems" },
        ]
    };

    const statsData = {
        title: "Selected Institutional Engagements",
        buttonText: "View Impact Reports",
        buttonLink: "/projects",
        stats: [
            { title: "6+", subtitle: "Active Engagements", desc: "Active delivery across health systems." },
            { title: "4", subtitle: "Government Partners", desc: "Strategic planning and coordination." },
            { title: "3M+", subtitle: "Beneficiaries Reached", desc: "Impactful interventions across regions." },
            { title: "100%", subtitle: "Delivery Rate", desc: "Closing the gap between policy and execution." },
        ]
    };

    const insertOrUpdate = async (id: string, data: any) => {
        const contentStr = JSON.stringify(data);
        await db.execute({
            sql: "INSERT INTO site_content (id, content, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET content = excluded.content, updated_at = excluded.updated_at",
            args: [id, contentStr],
        });
        console.log(`Updated ${id}`);
    };

    await insertOrUpdate("hero", heroData);
    await insertOrUpdate("focus_areas", focusAreasData);
    await insertOrUpdate("stats", statsData);

    console.log("Seeding complete.");
}

main().catch(console.error);
