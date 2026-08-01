"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { z } from "zod";
import { useUserStore } from "@/store/useUserStore";
import { Bug, Lightbulb, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";

const feedbackSchema = z.object({
    email: z.email("Please enter a valid email address."),
    type: z.enum(["bug", "feature_request", "other"], {
        message: "Please select a feedback category.",
    }),
    message: z.string().min(10, "Message must be at least 10 characters long."),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;
type FeedbackType = "bug" | "feature_request" | "other" | null;

export default function ContactForm() {
    const { isAuthenticated, user } = useUserStore();

    const [type, setType] = useState<FeedbackType>(null);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState<Partial<Record<keyof FeedbackFormData, string>>>({});
    const [serverStatus, setServerStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [serverMessage, setServerMessage] = useState("");

    useEffect(() => {
        if (user?.email && !email) {
            setEmail(user.email);
        }
    }, [user, email]);

    const getPlaceholder = () => {
        if (type === "bug") return "What happened? Steps to reproduce help a lot.";
        if (type === "feature_request") return "What would make Collab Quest better for you?";
        return "Tell us what's on your mind.";
    };

    const isMessageValid = message.length >= 10;
    const isSubmitDisabled = !type || !email.includes("@") || !isMessageValid || serverStatus === "loading";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerStatus("idle");
        setServerMessage("");
        setErrors({});

        const formData = { email, type, message };
        const validation = feedbackSchema.safeParse(formData);

        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            validation.error.issues.forEach((issue) => {
                if (issue.path[0]) fieldErrors[String(issue.path[0])] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setServerStatus("loading");

        try {
            const res = await fetch("/api/feedback", {
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

            const msg = data?.message || data?.error || data?.data?.message || "Something went wrong — please try again.";

            if (!res.ok) {
                throw new Error(msg);
            }

            setServerMessage(msg);
            setServerStatus("success");
        } catch (err: any) {
            setServerMessage(err.message);
            setServerStatus("error");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-white border-2 border-ink rounded-3xl p-8 shadow-[8px_8px_0px_var(--color-ink)] text-center h-full flex flex-col items-center justify-center min-h-100">
                <h2 className="text-3xl font-display font-extrabold mb-4">Log In to Send Feedback</h2>
                <p className="font-body text-lg font-medium text-ink/80 mb-8 max-w-md">
                    We tie feedback to your account so we can follow up if we need more details.
                </p>
                <Link
                    href="/login?redirect=/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-cloud border-2 border-ink rounded-2xl font-body font-bold text-lg shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all mb-4"
                >
                    Log In
                </Link>
                <p className="font-body font-bold text-sm">
                    Don't have an account? <Link href="/register" className="text-sync-teal hover:underline underline-offset-2">Sign up</Link>
                </p>
            </div>
        );
    }

    if (serverStatus === "success") {
        return (
            <div className="bg-white border-2 border-ink rounded-3xl p-10 shadow-[8px_8px_0px_var(--color-ink)] text-center h-full flex flex-col items-center justify-center min-h-100">
                <div className="w-16 h-16 bg-[#3DDC97] border-2 border-ink rounded-2xl shadow-[4px_4px_0px_var(--color-ink)] flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-ink" size={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-3">{serverMessage}</h2>
                <p className="font-body font-bold text-ink/70">🏅 Thanks for helping us improve.</p>
                <button
                    onClick={() => {
                        setServerStatus("idle");
                        setMessage(""); // Reset message to allow another entry
                    }}
                    className="mt-8 font-body font-bold text-sm text-ink/50 hover:text-ink underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white border-2 border-ink rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_var(--color-ink)] relative">

            {/* Error Banner */}
            <div aria-live="polite">
                {serverStatus === "error" && (
                    <div className="mb-6 p-4 bg-puzzle-red/10 border-2 border-puzzle-red rounded-xl flex items-start gap-3">
                        <AlertCircle className="text-puzzle-red shrink-0 mt-0.5" size={20} />
                        <p className="font-body font-bold text-sm text-puzzle-red leading-snug">{serverMessage}</p>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Type Selector */}
                <fieldset className="flex flex-col gap-2">
                    <legend className="font-display font-bold text-sm ml-1 mb-2">Category</legend>
                    <div className="flex flex-wrap sm:grid sm:grid-cols-3 gap-3">
                        <button
                            type="button"
                            onClick={() => setType("bug")}
                            aria-pressed={type === "bug"}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${type === "bug"
                                ? "border-quest-gold bg-quest-gold/10 shadow-[inset_0_0_0_2px_var(--color-quest-gold)]"
                                : "border-ink bg-parchment hover:bg-cloud/50"
                                }`}
                        >
                            <Bug size={24} className={type === "bug" ? "text-quest-gold" : "text-ink"} />
                            <span className="font-body font-bold text-sm">Bug Report</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setType("feature_request")}
                            aria-pressed={type === "feature_request"}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${type === "feature_request"
                                ? "border-quest-gold bg-quest-gold/10 shadow-[inset_0_0_0_2px_var(--color-quest-gold)]"
                                : "border-ink bg-parchment hover:bg-cloud/50"
                                }`}
                        >
                            <Lightbulb size={24} className={type === "feature_request" ? "text-quest-gold" : "text-ink"} />
                            <span className="font-body font-bold text-sm">Feature Request</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setType("other")}
                            aria-pressed={type === "other"}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${type === "other"
                                ? "border-quest-gold bg-quest-gold/10 shadow-[inset_0_0_0_2px_var(--color-quest-gold)]"
                                : "border-ink bg-parchment hover:bg-cloud/50"
                                }`}
                        >
                            <MessageSquare size={24} className={type === "other" ? "text-quest-gold" : "text-ink"} />
                            <span className="font-body font-bold text-sm">Something Else</span>
                        </button>
                    </div>
                    {errors.type && <p className="text-xs font-bold text-puzzle-red ml-1 mt-1" role="alert">{errors.type}</p>}
                </fieldset>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-display font-bold text-sm ml-1">Email (for replies)</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={serverStatus === "loading"}
                        className={`w-full bg-parchment border-2 rounded-xl px-4 py-3 font-body font-medium outline-none transition-colors ${errors.email ? "border-puzzle-red bg-puzzle-red/5" : "border-ink focus:border-sync-teal focus:bg-white"
                            }`}
                    />
                    {errors.email && <p className="text-xs font-bold text-puzzle-red ml-1" role="alert">{errors.email}</p>}
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-display font-bold text-sm ml-1">Message</label>
                    <textarea
                        id="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={getPlaceholder()}
                        disabled={serverStatus === "loading"}
                        className={`w-full bg-parchment border-2 rounded-xl px-4 py-3 font-body font-medium outline-none resize-y min-h-30 transition-colors ${errors.message ? "border-puzzle-red bg-puzzle-red/5" : "border-ink focus:border-sync-teal focus:bg-white"
                            }`}
                    />

                    {/* Character Counter & Validation Layout */}
                    <div className="flex justify-between items-start mt-1 px-1">
                        {errors.message ? (
                            <p className="text-xs font-bold text-puzzle-red" role="alert">{errors.message}</p>
                        ) : <span />}

                        <div aria-live="polite" className="flex items-center gap-1.5 shrink-0">
                            {isMessageValid && <CheckCircle2 size={14} className="text-[#3DDC97]" />}
                            <span className={`text-xs font-bold ${isMessageValid ? "text-[#3DDC97]" : "text-ink/50"}`}>
                                {message.length} characters (10 minimum)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="mt-2 w-full flex items-center justify-center px-6 py-4 bg-cloud border-2 border-ink rounded-2xl font-body font-bold text-lg shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--color-ink)] active:translate-y-1 active:shadow-[0px_0px_0px_var(--color-ink)] disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                    {serverStatus === "loading" ? "Sending..." : "Send Feedback"}
                </button>
            </form>
        </div>
    );
}