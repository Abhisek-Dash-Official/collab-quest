"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

const AVATARS = Array.from({ length: 21 }, (_, i) => i.toString());

const registerSchema = z.object({
    username: z.string().min(1, "Username is required."),
    email: z.email("Please enter a valid email address."),
    password: z.string().min(6, "At least 6 characters required."),
    confirmPassword: z.string(),
    avatar_id: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);

    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar_id: "0"
    });

    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
    const [serverError, setServerError] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof RegisterFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleAvatarSelect = (id: string) => {
        setFormData((prev) => ({ ...prev, avatar_id: id }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError("");
        setErrors({});

        const validation = registerSchema.safeParse(formData);
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
            const res = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    avatar_id: formData.avatar_id
                }),
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

            router.replace("/login");
        } catch (err: any) {
            setServerError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="text-center mb-2">
                <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">Create Your Character</h1>
                <p className="font-body font-medium text-ink/70">This is you, from now on — pick wisely.</p>
            </div>

            <div className="bg-white border-2 border-ink rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_var(--color-ink)]">
                {serverError && (
                    <div className="mb-6 p-4 bg-puzzle-red/10 border-2 border-puzzle-red rounded-xl flex items-start gap-3" role="alert" aria-live="assertive">
                        <AlertCircle className="text-puzzle-red shrink-0 mt-0.5" size={20} />
                        <p className="font-body font-bold text-sm text-puzzle-red leading-snug">{serverError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Avatar Picker */}
                    <fieldset className="flex flex-col gap-3">
                        <legend className="font-display font-bold text-sm ml-1">Choose Your Avatar</legend>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 bg-parchment p-3 rounded-2xl border-2 border-ink/20 max-h-52 overflow-y-auto shadow-inner custom-scrollbar">
                            {AVATARS.map((id) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => handleAvatarSelect(id)}
                                    aria-label={`Avatar ${id}`}
                                    aria-pressed={formData.avatar_id === id}
                                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${formData.avatar_id === id
                                        ? "border-quest-gold shadow-[0_0_0_4px_var(--color-quest-gold)] scale-95"
                                        : "border-transparent hover:border-ink/30 hover:scale-105"
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-cloud/50" />
                                    <img
                                        src={`/avatars/avatar-${id}.png`}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover z-10"
                                        onError={(e) => e.currentTarget.style.display = 'none'}
                                    />
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    {/* Username Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="username" className="font-display font-bold text-sm ml-1">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            disabled={isLoading}
                            value={formData.username}
                            onChange={handleInputChange}
                            className={`w-full bg-parchment border-2 rounded-xl px-4 py-3 font-body font-medium outline-none transition-colors ${errors.username ? "border-puzzle-red bg-puzzle-red/5" : "border-ink focus:border-sync-teal focus:bg-white"
                                }`}
                        />
                        {errors.username && <p className="text-xs font-bold text-puzzle-red ml-1" role="alert">{errors.username}</p>}
                    </div>

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
                                autoComplete="new-password"
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
                        {errors.password
                            ? <p className="text-xs font-bold text-puzzle-red ml-1" role="alert">{errors.password}</p>
                            : <p className="text-xs font-bold text-ink/50 ml-1">At least 6 characters.</p>
                        }
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col gap-1.5 mb-2">
                        <label htmlFor="confirmPassword" className="font-display font-bold text-sm ml-1">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            disabled={isLoading}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full bg-parchment border-2 rounded-xl px-4 py-3 font-body font-medium outline-none transition-colors ${errors.confirmPassword ? "border-puzzle-red bg-puzzle-red/5" : "border-ink focus:border-sync-teal focus:bg-white"
                                }`}
                        />
                        {errors.confirmPassword && <p className="text-xs font-bold text-puzzle-red ml-1" role="alert">{errors.confirmPassword}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-6 py-4 bg-quest-gold border-2 border-ink rounded-2xl font-body font-bold text-lg text-ink shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--color-ink)] active:translate-y-1 active:shadow-[0px_0px_0px_var(--color-ink)] disabled:opacity-70 disabled:pointer-events-none transition-all"
                    >
                        {isLoading ? "Creating character..." : "Create My Character"}
                    </button>
                </form>
            </div>

            <p className="text-center font-body font-bold text-sm">
                Already on a quest?{" "}
                <Link href="/login" className="text-sync-teal hover:underline underline-offset-2">
                    Log in
                </Link>
            </p>
        </div>
    );
}