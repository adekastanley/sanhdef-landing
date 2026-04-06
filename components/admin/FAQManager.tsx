"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";
import { Trash2, Plus } from "lucide-react";

const defaultFaqs = [
	{
		question: "What does SANHDEF do?",
		answer: "SANHDEF works to improve public health, promote sustainable development, support environmental initiatives, and empower communities through evidence-based programs and partnerships.",
	},
	{
		question: "Where does SANHDEF operate?",
		answer: "We primarily operate across Nigeria, working closely with communities, government institutions, and development partners to deliver impactful interventions.",
	},
	{
		question: "Who can partner with SANHDEF?",
		answer: "We collaborate with government agencies, NGOs, donor organizations, private sector partners, and community-based groups aligned with our mission.",
	},
];

export function FAQManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		title: "Got questions?",
		description: "We've got answers. If you can't find what you're looking for, chat with our team.",
		faqs: defaultFaqs,
	});

	useEffect(() => {
		async function loadData() {
			const content = await getContent("faq");
			if (content) {
				setData(content);
			}
		}
		loadData();
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const res = await updateContent("faq", data);
			if (res.success) {
				toast.success("FAQ section updated successfully.");
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to update FAQ.");
		} finally {
			setIsLoading(false);
		}
	};

	const updateFaq = (index: number, key: keyof typeof data.faqs[0], value: string) => {
		const newFaqs = [...data.faqs];
		newFaqs[index] = { ...newFaqs[index], [key]: value };
		setData({ ...data, faqs: newFaqs });
	};

	const addFaq = () => setData({ ...data, faqs: [...data.faqs, { question: "", answer: "" }] });
	const removeFaq = (index: number) => setData({ ...data, faqs: data.faqs.filter((_, i) => i !== index) });

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">FAQ Section</h2>
				<p className="text-sm text-muted-foreground">Manage the questions and answers on the homepage.</p>
			</div>
			
			<div className="grid gap-4">
				<div className="space-y-2">
					<Label>Section Title</Label>
					<Input value={data.title} onChange={e => setData({...data, title: e.target.value})} />
				</div>
                
				<div className="space-y-2">
					<Label>Section Description</Label>
					<Textarea 
                        value={data.description} 
                        onChange={e => setData({...data, description: e.target.value})} 
                        rows={2} 
                    />
				</div>

				<div className="space-y-4 pt-4 border-t">
					<div className="flex justify-between items-center">
						<Label className="text-base font-semibold">FAQ Items</Label>
						<Button variant="outline" size="sm" onClick={addFaq}><Plus className="w-4 h-4 mr-1"/> Add FAQ</Button>
					</div>
					<div className="space-y-4">
						{data.faqs.map((faq, i) => (
							<div key={i} className="relative p-4 border rounded-md bg-muted/20">
								<Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeFaq(i)}>
									<Trash2 className="w-4 h-4" />
								</Button>
								<div className="grid gap-3 pr-8">
									<div className="space-y-1">
										<Label className="text-xs">Question</Label>
										<Input value={faq.question} onChange={e => updateFaq(i, 'question', e.target.value)} />
									</div>
									<div className="space-y-1">
										<Label className="text-xs">Answer</Label>
										<Textarea value={faq.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} rows={3} />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<Button onClick={handleSave} disabled={isLoading} className="mt-4">
					{isLoading ? "Saving..." : "Save FAQ Section"}
				</Button>
			</div>
		</div>
	);
}
