"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { type ActiveNigeriaState } from "@/app/actions/landing/nigeriaMap";

const nigeriaGeoUrl = "/nigeria-states.json";

interface MapProps {
	nigeriaStates?: ActiveNigeriaState[];
}

export default function Map({ nigeriaStates = [] }: MapProps) {
	const [content, setContent] = useState<React.ReactNode>("");

	return (
		<section className="py-16 bg-white w-full">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-slate-900 mb-4">
						Our Footprint in Nigeria
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto mb-6">
						We have a strong presence across Nigeria, delivering impactful health systems strengthening projects.
					</p>
				</div>

				<div className="w-full max-w-5xl mx-auto">
					<div className="w-full h-[600px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
						<ComposableMap
							projection="geoMercator"
							projectionConfig={{
								scale: 1800,
								center: [8, 9], // Center properly for Nigeria
							}}
							style={{ width: "100%", height: "100%" }}
						>
							<Geographies geography={nigeriaGeoUrl}>
								{({ geographies }: { geographies: any[] }) =>
									geographies.map((geo: any) => {
										const stateName = geo.properties.NAME_1;

										// Match active state
										const activeState = nigeriaStates.find(
											(s) => s.name === stateName,
										);
										const isActive = !!activeState;

										return (
											<Geography
												key={geo.rsmKey}
												geography={geo}
												data-tooltip-id="nigeria-map-tooltip"
												onMouseEnter={() => {
													if (activeState) {
														setContent(
															<div className="text-left">
																<div className="font-bold mb-1">
																	{stateName}
																</div>
																{activeState.projects &&
																activeState.projects.length > 0 ? (
																	<ul className="list-disc pl-4 text-xs">
																		{activeState.projects.map((p) => (
																			<li
																				key={p.id}
																				className="hover:text-blue-200 hover:underline"
																			>
																				{p.title}
																			</li>
																		))}
																	</ul>
																) : (
																	<div className="text-xs italic text-blue-200">
																		Active Presence
																	</div>
																)}
															</div>,
														);
													} else {
														setContent(stateName);
													}
												}}
												onMouseLeave={() => {
													setContent("");
												}}
												style={{
													default: {
														fill: isActive ? "#000" : "#E5E7EB",
														outline: "none",
														stroke: "#ffffff",
														strokeWidth: 0.5,
													},
													hover: {
														fill: isActive ? "#4c956c" : "#D1D5DB",
														outline: "none",
														stroke: "#ffffff",
														strokeWidth: 0.75,
														cursor: isActive ? "pointer" : "default",
													},
													pressed: {
														fill: isActive ? "#16425b" : "#9CA3AF",
														outline: "none",
													},
												}}
											/>
										);
									})
								}
							</Geographies>
						</ComposableMap>

						{/* Legend */}
						<div className="absolute bottom-6 left-6 bg-white/90 p-4 rounded-lg shadow-sm border text-xs">
							<div className="flex items-center gap-2 mb-2">
								<div className="w-3 h-3 bg-black rounded-full"></div>
								<span className="font-medium text-slate-900">
									Active Presence
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-gray-200 rounded-full"></div>
								<span className="text-muted-foreground">Other States</span>
							</div>
						</div>
					</div>
				</div>

				<Tooltip
					id="nigeria-map-tooltip"
					style={{
						backgroundColor: "#1e293b",
						color: "#fff",
						zIndex: 50,
					}}
				>
					{content}
				</Tooltip>
			</div>
		</section>
	);
}
