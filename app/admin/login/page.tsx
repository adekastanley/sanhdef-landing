import { LoginForm } from "@/components/login-form";

export default function AdminLoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold">Admin Access</h1>
					<p className="text-muted-foreground">
						Sign in to manage the platform
					</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
