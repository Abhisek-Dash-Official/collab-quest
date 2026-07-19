import { Zap, Eye } from "lucide-react";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    badgeText: string;
    BadgeIcon: React.ElementType;
    photoUrl: string;
    rotationClass: string;
}

const TEAM_MEMBERS: TeamMember[] = [
    {
        id: "founder",
        name: "Abhisek Dash",
        role: "Solo Creator & Full-Stack Dev",
        bio: "Built this entire quest from scratch—from database schemas to deployment. Because building a gamified app is the ultimate game.",
        badgeText: "Solo Carry",
        BadgeIcon: Zap,
        photoUrl: "/members/abhisek.png",
        rotationClass: "rotate-3",
    },
    {
        id: "friend",
        name: "Jishan Panigrahi",
        role: "Honorary Beta Tester",
        bio: "The very first person to see the app. Provides the feedback before anything goes live.",
        badgeText: "Beta Tester",
        BadgeIcon: Eye,
        photoUrl: "/members/jishanpanigrahi.avif",
        rotationClass: "-rotate-2",
    }
];

export default TEAM_MEMBERS;