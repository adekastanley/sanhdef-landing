import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { HeroHeader } from "@/components/header"
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { ChevronRight } from "lucide-react";
// import { Spotify } from '@/components/ui/svgs/spotify'
// import { VercelFull } from '@/components/ui/svgs/vercel'
// import { SupabaseFull } from '@/components/ui/svgs/supabase'
// import { Hulu } from '@/components/ui/svgs/hulu'
// import { Bolt } from '@/components/ui/svgs/bolt'
// import { FirebaseFull } from '@/components/ui/svgs/firebase'
// import { Beacon } from '@/components/ui/svgs/beacon'
// import { Claude } from '@/components/ui/svgs/claude'
// import { Figma } from '@/components/ui/svgs/figma'
// import { Cisco } from '@/components/ui/svgs/cisco'

export default function HeroSection() {
	return (
		<>
			<main className="overflow-x-hidden">
				<section>
					<div className="">
						<div className="aspect-2/3 relative z-10 flex flex-col justify-end px-6 lg:aspect-video">
							<div className="mx-auto w-full max-w-7xl pb-6 lg:px-12 lg:pb-32">
								<div className="max-w-lg">
									<h1 className="text-balance text-5xl md:text-6xl xl:text-7xl">
										The platform powering your operations
									</h1>

									<p className="mt-6 text-balance text-lg">
										Sanitas Health and Development Foundation (SANHDEF)
										establishes dynamic collaborations to tackle public health,
										development, environmental, and social challenges.
									</p>

									<div className="mt-8 flex items-center gap-2">
										<Button
											asChild
											size="lg"
											className="h-12 rounded-full pl-5 pr-3 text-base"
										>
											<Link href="/get-involved">
												<span className="text-nowrap">Get Involved</span>
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
					<div className="group relative m-auto max-w-7xl px-6">
						<div className="flex flex-col items-center md:flex-row">
							<div className="md:max-w-44 md:border-r md:pr-6">
								<p className="text-end text-sm">Proudly supported by:</p>
							</div>
							<div className="**:fill-foreground relative py-6 md:w-[calc(100%-11rem)]">
								{/* <InfiniteSlider
                                    speedOnHover={20}
                                    speed={40}
                                    gap={112}>
                                    <Bolt
                                        height={22}
                                        width={56}
                                    />
                         
                                </InfiniteSlider> */}

								<div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
								<div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
								<ProgressiveBlur
									className="pointer-events-none absolute left-0 top-0 h-full w-20"
									direction="left"
									blurIntensity={1}
								/>
								<ProgressiveBlur
									className="pointer-events-none absolute right-0 top-0 h-full w-20"
									direction="right"
									blurIntensity={1}
								/>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
