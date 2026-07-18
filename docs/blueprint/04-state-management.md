# State Management Architecture

This document outlines the client-side state management strategy using Zustand. The application divides global state into dedicated, modular stores to separate offline personal data from server-synced group data.

## 1. Store Structure

The application utilizes four primary Zustand stores:

- **`useUserStore`:** Manages global authentication state, user profile data, and session tokens.
- **`usePersonalTaskStore`:** Handles all isolated, individual tasks.
- **`useGroupStore`:** Manages shared workspaces, group member lists, roles, and collaborative tasks.
- **`useAdminStore`:** (Restricted) Handles platform-wide analytics, user moderation, and global platform toggles.

## 2. Local Storage Strategy (Offline Mode)

- The `usePersonalTaskStore` utilizes Zustand's `persist` middleware.
- All personal tasks are stored directly in the browser's `localStorage`, allowing for immediate offline access and zero server latency for individual to-do items.

## 3. Server Sync Strategy

- Unlike personal tasks, `useGroupStore` and `useUserStore` rely on live database synchronization.
- Actions triggered within group workspaces instantly send API requests to the Next.js backend to update the MongoDB database, ensuring all group members see real-time updates.

## 4. Optimistic UI Updates

- To enhance user experience, task status toggles (e.g., marking a task as "Complete") will update the Zustand store immediately.
- The API request is sent in the background. If the request fails, the UI will revert to its previous state and notify the user via a toast alert.
