import React from "react";
import { ShieldCheck, HeartHandshake, Globe } from "lucide-react";

export function TrustBadges() {
	return (
		<section className="py-16 bg-white border-y border-dark/5">
			<div className="container mx-auto px-4 max-w-5xl">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-dark/10">
					
					<div className="flex flex-col items-center pt-8 md:pt-0 px-6">
						<div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center mb-4 text-blue">
							<ShieldCheck className="w-6 h-6" />
						</div>
						<h4 className="font-semibold text-navy mb-2">Secure Giving</h4>
						<p className="text-sm text-dark/60 leading-relaxed">
							Your transaction is protected with bank-level 256-bit encryption. We never store your credit card information.
						</p>
					</div>

					<div className="flex flex-col items-center pt-8 md:pt-0 px-6">
						<div className="w-12 h-12 rounded-full bg-pink/10 flex items-center justify-center mb-4 text-pink">
							<HeartHandshake className="w-6 h-6" />
						</div>
						<h4 className="font-semibold text-navy mb-2">Tax Deductible</h4>
						<p className="text-sm text-dark/60 leading-relaxed">
							SANHDEF is a registered non-profit organization. Your donation is fully tax-deductible to the extent allowed by law.
						</p>
					</div>

					<div className="flex flex-col items-center pt-8 md:pt-0 px-6">
						<div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-4 text-teal-600">
							<Globe className="w-6 h-6" />
						</div>
						<h4 className="font-semibold text-navy mb-2">Global Transparency</h4>
						<p className="text-sm text-dark/60 leading-relaxed">
							We are committed to open-book financials and regular impact reporting. You always know where your money goes.
						</p>
					</div>

				</div>
			</div>
		</section>
	);
}
