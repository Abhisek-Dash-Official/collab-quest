import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Metadata } from "next";
import { UPDATED_DATE, PRIVACY_SECTIONS } from "@/config/privacy"

export const metadata: Metadata = {
    title: "Privacy Policy | Collab Quest",
    description: "How Collab Quest collects and uses your data.",
};

export default function PrivacyPage() {
    return (
        <LegalPageLayout
            title="Privacy Policy"
            lastUpdated={UPDATED_DATE}
            sections={PRIVACY_SECTIONS}
        />
    );
}