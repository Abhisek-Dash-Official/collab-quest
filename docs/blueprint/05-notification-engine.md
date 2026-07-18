# Notification Engine Blueprint

This document defines the architecture for the real-time notification system, leveraging `web-push` to deliver out-of-app alerts and maintain user engagement.

## 1. Subscription Flow

- Upon login, the application prompts the user for browser notification permissions.
- Once granted, the client generates a push subscription object (containing endpoint and keys) and securely stores it in the user's MongoDB document.

## 2. Automated Lifecycle Triggers

- The system generates automated push notifications based on task metadata.
- **Triggers:** Notifications are scheduled for task start times and approaching deadlines to ensure timely completion.

## 3. The "Nudge" System (Peer-to-Peer)

- A custom gamified feature allowing group members to manually ping teammates who are lagging on their assigned tasks.
- Triggers an immediate push notification to the target user's device.

## 4. Anti-Spam & Rate Limiting

To prevent abuse and maintain a positive collaborative environment, the Nudge system enforces strict limits:

- **Per-Task Limit:** A user can only be nudged a specific number of times per individual task.
- **Cooldown Period:** A mandatory time gap (e.g., 30 minutes) is required between consecutive nudges sent to the same user.
