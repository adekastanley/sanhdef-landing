import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";

export default function AdminLoginPage() {
	return (
		<div className="flex min-h-screen bg-[#F3F4F6]">
			<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-white p-12 flex-col justify-between">
				{/* Gradient Background Decoration */}
				<div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-[#FF9D80] via-[#FEE2D1] to-[#FF8C66] opacity-90 overflow-hidden">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#FFDAB9,transparent_50%)]" />
					<div className="absolute top-[-10%] right-[-10%] w-2/3 h-2/3 bg-[#FFCBA4] rounded-full blur-[100px] opacity-60" />
				</div>

				<div className="relative z-10">
					<div className="flex items-center gap-2">
						<Logo className="h-8 w-auto " />
					</div>
				</div>

				<div className="relative z-10 max-w-md">
					<p className="text-dark/60 font-medium mb-4">
						Sigin into your account
					</p>
					<h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight tracking-tight">
						Only superadmin can create users
					</h1>
				</div>
			</div>

			<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 bg-white">
				<div className="mx-auto w-full max-w-sm lg:w-96">
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
