# System Flow & User Journey

This document outlines the core routing logic, workspace separation, and access control mechanisms for Collab Quest.

## Authentication & Routing Flow: Landing Page -> Login/Signup -> Dashboard

- **Unauthenticated Users:** Any visit to the root URL or protected routes redirects to the Landing Page. From there, users are funneled to the Login/Signup flow.
- **Authenticated Users:** Upon successful JWT validation, users are automatically routed to their central Dashboard. The Dashboard acts as the primary hub, offering navigation to either the Personal Workspace or Group Workspaces.

---

## Workspace Separation: Personal (Offline) vs. Group (Online) routing logic

- **Personal Workspace (Offline-First):** Designed for individual task management. All CRUD operations here interact directly with the browser's `localStorage` via Zustand's persist middleware. No network requests are made, ensuring instant updates.
- **Group Workspace (Online-Synced):** Designed for collaboration. All interactions here (fetching tasks, updating status, sending nudges) require active API calls to the Next.js backend to keep the MongoDB database and all group members synchronized.

---

## Group Permissions Logic: Creator capabilities (Full CRUD) vs. Member capabilities (Read/Update Status)

Role-Based Access Control (RBAC) is strictly enforced at both the client (UI hiding) and server (API validation) levels.

- **Group Creator (Admin):** Possesses absolute control. Can Create new tasks, Edit task details (deadline, title, XP), Delete tasks, and manage group settings (remove members).
- **Group Member:** Possesses restricted access. Can Read task details, Update the completion status (mark as done/undone), and utilize the Nudge system. They cannot alter the core details of a task or the group itself.

---

## Invitation Lifecycle (Join Request Flow): Link -> Request -> Approval -> Update DB

- **Share Link:** A Group Creator generates a unique invitation link/code from the group dashboard and shares it externally.
- **Join Request:** A user enters the code and clicks "Request to Join". This sends a pending request to the group's admin.
- **Admin Notification & Action:** The Group Creator receives a notification (in-app and via Web Push) about the new join request. They visit the pending requests tab to either Accept or Reject the user.
- **Update DB:** If accepted, the server pushes the user's ID into the group's `members` array in MongoDB, officially granting them access. If rejected, the request is permanently dismissed.
