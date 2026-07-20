import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Metadata } from "next";
import { UPDATED_DATE, TERMS_SECTIONS } from "@/config/terms"

export const metadata: Metadata = {
    title: "Terms of Service | Collab Quest",
    description: "Terms and conditions for using Collab Quest.",
};

export default function TermsPage() {
    return (
        <LegalPageLayout
            title="Terms of Service"
            lastUpdated={UPDATED_DATE}
            sections={TERMS_SECTIONS}
        />
    );
}