"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function NotificationToast() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName={(context) =>
                context?.type === 'success'
                    ? "bg-parchment border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] text-ink font-body font-bold rounded-none mb-4 relative flex p-3 min-h-10 cursor-pointer"
                    : context?.type === 'error'
                        ? "bg-puzzle-red text-white border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] font-body font-bold rounded-none mb-4 relative flex p-3 min-h-10 cursor-pointer"
                        : "bg-parchment border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] text-ink font-body font-bold rounded-none mb-4 relative flex p-3 min-h-10 cursor-pointer"
            }
            className="text-sm font-bold flex items-center"
            progressClassName="bg-ink h-1"
        />
    );
}