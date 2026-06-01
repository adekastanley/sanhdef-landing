import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { HeroHeader } from "@/components/header"
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { ChevronRight } from "lucide-react";
import { LogoCloud } from "./ui/logo-cloud";
import { getContent } from "@/app/actions/landing";

export default async function HeroSection() {
	const data = await getContent("hero");

	const title =
		data?.title || "Systems-Level Thinking. Ground-Level Execution.";
	const description =
		data?.description ||
		"Bridging the gap between macro policy intent and field-level execution across Nigeria and Africa.";
	const buttonText = data?.buttonText || "Get Involved";
	const buttonLink = data?.buttonLink || "/get-involved";

	return (
		<>
			<main className="overflow-x-hidden">
				<section>
					<div className="">
						<div className="aspect-2/3 relative z-10 flex flex-col justify-end px-6 lg:aspect-video">
							<div className="mx-auto w-full max-w-7xl pb-6 lg:px-12 lg:pb-32">
								<div className="max-w-lg">
									<h1 className="text-balance text-white text-5xl md:text-6xl xl:text-7xl">
										{title}
									</h1>

									<p className="mt-6 text-balance text-white text-lg">
										{description}
									</p>

									<div className="mt-8 flex items-center gap-2">
										<Button
											asChild
											size="lg"
											className="h-12 rounded-full pl-5 pr-3 text-base bg-pink text-dark"
										>
											<Link href={buttonLink}>
												<span className="text-nowrap">{buttonText}</span>
												<ChevronRight className="ml-1" />
											</Link>
										</Button>
									</div>
								</div>
							</div>
						</div>
						<div className="aspect-2/3 pointer-events-none absolute inset-1 overflow-hidden rounded-3xl border border-black/10 lg:aspect-video lg:rounded-[3rem] dark:border-white/5">
							<video
								autoPlay
								loop
								className=" size-full -scale-x-100 object-cover"
								src="https://videos.pexels.com/video-files/35968183/15249566_1920_1080_30fps.mp4"
							></video>
						</div>
					</div>
				</section>
				<section className="bg-background py-6">
					{/* <div className="group relative m-auto max-w-7xl px-6">
						<div className="flex flex-col items-center md:flex-row"> */}
					<LogoCloud />
					{/* </div>
					</div> */}
				</section>
			</main>
		</>
	);
}
