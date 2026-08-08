"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z.string().min(1, "Password is required."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);

    const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
    const [serverError, setServerError] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof LoginFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError("");
        setErrors({});

        const validation = loginSchema.safeParse(formData);
        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            validation.error.issues.forEach((issue) => {
                if (issue.path[0]) {
                    fieldErrors[String(issue.path[0])] = issue.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            let data;
            try {
                data = await res.json();
            } catch (err) {
                data = null;
            }

            if (!res.ok) {
                throw new Error(data?.message || data?.error || "Something went wrong — check your details and try again.");
            }

            setUser({
                uid: data.data.uid,
                username: data.data.username,
                email: data.data.email,
                avatar_id: data.data.avatar_id,
                xp: data.data.xp,
            });

            router.replace("/dashboard");
        } catch (err: any) {
            setServerError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="text-center mb-2">
                <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">Welcome Back</h1>
                <p className="font-body font-medium text-ink/70">Your quests are waiting.</p>
            </div>

            <div className="bg-white border-2 border-ink rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_var(--color-ink)]">
                {/* Error Banner */}
                {serverError && (
                    <div
                        className="mb-6 p-4 bg-puzzle-red/10 border-2 border-puzzle-red rounded-xl flex items-start gap-3"
                        role="alert"
                        aria-live="assertive"
                    >
                        <AlertCircle className="text-puzzle-red shrink-0 mt-0.5" size={20} />
                        <p className="font-body font-bold text-sm text-puzzle-red leading-snug">{serverError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="font-display font-bold text-sm ml-1">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            disabled={isLoading}
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-parchment border-2 rounded-xl px-4 py-3 font-body font-medium outline-none transition-colors ${errors.email ? "border-puzzle-red bg-puzzle-red/5" : "border-ink focus:border-sync-teal focus:bg-white"
                                }`}
                        />
                        {errors.email && <p className="text-xs font-bold text-puzzle-red ml-1" role="alert">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="font-display font-bold text-sm ml-1">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                disabled={isLoading}
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full bg-parchment border-2 rounded-xl px-4 py-3 pr-12 font-body font-medium outline-none transition-colors ${errors.password ? "border-puzzle-red bg-puzzle-red/5" : "border-ink focus:border-sync-teal focus:bg-white"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink/50 hover:text-ink transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-xs font-bold text-puzzle-red ml-1" role="alert">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full flex items-center justify-center px-6 py-4 bg-cloud border-2 border-ink rounded-2xl font-body font-bold text-lg shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--color-ink)] active:translate-y-1 active:shadow-[0px_0px_0px_var(--color-ink)] disabled:opacity-70 disabled:pointer-events-none transition-all"
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>

            {/* Footer */}
            <p className="text-center font-body font-bold text-sm">
                New here?{" "}
                <Link href="/signup" className="text-sync-teal hover:underline underline-offset-2">
                    Create an account
                </Link>
            </p>
        </div>
    );
}