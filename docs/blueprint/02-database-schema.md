# Collab Quest: Database Schema Documentation

This document provides a comprehensive overview of the MongoDB collections, fields, relationships, and constraints for the **Collab Quest** application.

---

## Table of Contents

1. [Users Collection](#1-users-collection)
2. [Groups Collection](#2-groups-collection)
3. [Tasks Collection](#3-tasks-collection)
4. [App Config Collection](#4-app_config-collection)
5. [User Bans Collection](#5-user_bans-collection)
6. [Feedbacks Collection](#6-feedbacks-collection)

---

## 1. `users` Collection

Stores all user profile data, authentication details, and personal gamification stats.

| Field               | Type            | Constraints / Default      | Description                               |
| :------------------ | :-------------- | :------------------------- | :---------------------------------------- |
| `_id`               | `MONGO OBJ ID`  | **PK**                     | Unique MongoDB document ID.               |
| `uid`               | `STRING`        | **PK**                     | Custom User ID.                           |
| `username`          | `STRING`        | NOT NULL                   | Display name of the user.                 |
| `avatar_id`         | `STRING`        | DEFAULT `"0"`              | Reference to the selected avatar.         |
| `email`             | `STRING`        | UNIQUE                     | User's email address.                     |
| `hashed_password`   | `STRING`        | NOT NULL                   | Encrypted password.                       |
| `joined_groups`     | `ARRAY[STRING]` | NULL, FK                   | Array of `group._id` the user belongs to. |
| `friends`           | `ARRAY[STRING]` | NULL, FK                   | Array of user `uid`s.                     |
| `xp`                | `INT`           | DEFAULT `0`                | Total experience points earned.           |
| `respect_likes`     | `INT`           | DEFAULT `0`                | Respect points received from peers.       |
| `role`              | `STRING`        | ENUM (`'admin'`, `'user'`) | Platform role.                            |
| `last_active_at`    | `DATE TIME`     |                            | Timestamp of last login/activity.         |
| `daily_nudge_count` | `INT`           | DEFAULT `0`                | Count of nudges sent today.               |
| `last_nudge_date`   | `DATE TIME`     | NULL                       | Timestamp of the last sent nudge.         |
| `created_at`        | `DATE TIME`     |                            | Account creation timestamp.               |
| `push_subscription` | `OBJECT / JSON` | NULL                       | Web push endpoint and security keys.      |

---

## 2. `groups` Collection

Manages team workspaces, members, and group-specific configurations.

| Field               | Type            | Constraints / Default | Description                               |
| :------------------ | :-------------- | :-------------------- | :---------------------------------------- |
| `_id`               | `MONGO OBJ ID`  | **PK**                | Unique MongoDB document ID.               |
| `group_name`        | `STRING`        | NOT NULL              | Name of the group/team.                   |
| `created_by`        | `STRING`        | FK                    | `uid` of the group creator.               |
| `group_icon_id`     | `STRING`        | DEFAULT `"0"`         | Reference to the selected group icon.     |
| `purpose`           | `STRING`        |                       | Description or goal of the group.         |
| `members`           | `ARRAY[OBJ]`    | NOT NULL              | Array of Member Sub-Schemas (see below).  |
| `invite_code`       | `STRING`        | UNIQUE                | Code used to join the group.              |
| `joinRequests`      | `ARRAY[STRING]` | DEFAULT `[]`          | Array of `uid`s requesting to join.       |
| `is_private`        | `BOOL`          | DEFAULT `FALSE`       | Visibility status of the group.           |
| `bannedUsers`       | `ARRAY[STRING]` |                       | Array of `uid`s banned from the group.    |
| `created_at`        | `DATE TIME`     |                       | Group creation timestamp.                 |
| `total_tasks`       | `INT`           | DEFAULT `0`           | Total tasks created in the group.         |
| `total_nudges_sent` | `INT`           | DEFAULT `0`           | Analytics: nudges sent within this group. |
| `totalXPAwarded`    | `INT`           | DEFAULT `0`           | Analytics: XP distributed in this group.  |

### ↳ `members` (Sub-Schema)

Embedded inside the `groups` collection. Tracks individual member performance within a specific group.

| Field                        | Type     | Constraints / Default | Description                                                                                              |
| :--------------------------- | :------- | :-------------------- | :------------------------------------------------------------------------------------------------------- |
| `uid`                        | `STRING` | FK                    | User ID of the member.                                                                                   |
| `xp_gained`                  | `INT`    | DEFAULT `0`           | XP earned _specifically_ in this group.                                                                  |
| `group_rank`                 | `INT`    | DEFAULT `0`           | Leaderboard rank in the group.                                                                           |
| `fire_streak`                | `INT`    | DEFAULT `0`           | Current active streak in the group.                                                                      |
| `assigned_tasks_count`       | `INT`    | DEFAULT `0`           | Total tasks assigned to this member in the group.                                                        |
| `task_completion_count`      | `INT`    | DEFAULT `0`           | Tasks completed by this member.                                                                          |
| `first_finishes_count`       | `INT`    | DEFAULT `0`           | Used for "speedster" badge calculation.                                                                  |
| `last_minute_finishes_count` | `INT`    | DEFAULT `0`           | Used for "Deadline-Surfer" badge. Tracks tasks completed in the final 10% of their allotted time window. |
| `total_nudges_sent`          | `INT`    | DEFAULT `0`           | Nudges sent by this member in the group.                                                                 |
| `total_nudges_received`      | `INT`    | DEFAULT `0`           | Nudges received by this member in the group.                                                             |

---

## 3. `tasks` Collection

Core collection for task management, deadlines, and tracking completions.

| Field            | Type            | Constraints / Default                                | Description                                 |
| :--------------- | :-------------- | :--------------------------------------------------- | :------------------------------------------ |
| `_id`            | `MONGO OBJ ID`  | **PK**                                               | Unique MongoDB document ID.                 |
| `group_id`       | `MONGO OBJ ID`  | FK                                                   | Links task to a specific group.             |
| `title`          | `STRING`        | NOT NULL                                             | Name of the task.                           |
| `desc`           | `STRING`        |                                                      | Detailed description of the task.           |
| `weightage`      | `INT`           |                                                      | Used to calculate XP rewards.               |
| `status`         | `STRING`        | ENUM (`'active'`, `'completed'`), DEFAULT `'active'` | Current state of the task.                  |
| `start_time`     | `DATE TIME`     |                                                      | When the task begins.                       |
| `deadline`       | `DATE TIME`     |                                                      | When the task is due.                       |
| `task_type`      | `STRING`        | ENUM (`"ALL"`, `"ANY"`, `"ASSIGNED"`)                | Determines who needs to complete it.        |
| `assigned_users` | `ARRAY[STRING]` |                                                      | Array of `uid`s if type is "ASSIGNED".      |
| `subtasks`       | `ARRAY[OBJ]`    | NULL                                                 | Sub-Schema for nested checklists.           |
| `completions`    | `ARRAY[OBJ]`    |                                                      | Sub-Schema tracking who completed the task. |
| `nudged_users`   | `ARRAY[OBJ]`    |                                                      | Sub-Schema tracking nudges on this task.    |
| `created_at`     | `DATE TIME`     |                                                      | Task creation timestamp.                    |
| `updated_at`     | `DATE TIME`     |                                                      | Last modified timestamp.                    |

### ↳ `subtasks` (Sub-Schema)

| Field        | Type     | Constraints / Default | Description                        |
| :----------- | :------- | :-------------------- | :--------------------------------- |
| `sub_id`     | `STRING` | NOT NULL, UNIQUE      | Unique identifier for the subtask. |
| `title`      | `STRING` | NOT NULL              | Title of the subtask.              |
| `short_desc` | `STRING` |                       | Short description.                 |
| `order`      | `INT`    |                       | Ordering/position of the subtask.  |

### ↳ `completions` (Sub-Schema)

| Field           | Type            | Constraints / Default | Description                                     |
| :-------------- | :-------------- | :-------------------- | :---------------------------------------------- |
| `uid`           | `STRING`        | FK                    | User who completed the task.                    |
| `completed_at`  | `DATE TIME`     |                       | Timestamp of completion.                        |
| `order`         | `INT`           |                       | Order of completion (1st, 2nd, etc.).           |
| `xp_earned`     | `INT`           |                       | Calculated based on weightage, time, and order. |
| `respect_likes` | `ARRAY[STRING]` |                       | Array of `uid`s who liked this completion.      |

### ↳ `nudged_users` (Sub-Schema)

| Field         | Type        | Constraints / Default | Description                                     |
| :------------ | :---------- | :-------------------- | :---------------------------------------------- |
| `uid`         | `STRING`    | FK                    | User who was nudged.                            |
| `nudge_count` | `INT`       |                       | Total times this user was nudged for this task. |
| `nudged_at`   | `DATE TIME` |                       | Timestamp when nudged                           |

---

## 4. `app_config` Collection

Global configuration settings for the platform (typically accessed by Admin).

| Field                 | Type           | Constraints / Default | Description                                 |
| :-------------------- | :------------- | :-------------------- | :------------------------------------------ |
| `_id`                 | `MONGO OBJ ID` | **PK**                | Unique identifier.                          |
| `maintenance_mode`    | `BOOL`         | DEFAULT `FALSE`       | Toggle for site-wide maintenance.           |
| `maintenance_msg`     | `STRING`       |                       | Message to display during downtime.         |
| `allow_new_signups`   | `BOOL`         | DEFAULT `TRUE`        | Toggle to enable/disable new registrations. |
| `max_users_per_group` | `INT`          | DEFAULT `5`           | Platform limit for group size.              |
| `max_groups_per_user` | `INT`          | DEFAULT `5`           | Limit on groups a single user can join.     |
| `max_daily_nudge`     | `INT`          | DEFAULT `10`          | Daily limit on sending nudges per user.     |
| `max_tasks_per_week`  | `INT`          | DEFAULT `100`         | Anti-spam limit for task creation.          |

---

## 5. `user_bans` Collection

Maintains a ledger of users who have been banned from the platform.

| Field        | Type        | Constraints / Default | Description                            |
| :----------- | :---------- | :-------------------- | :------------------------------------- |
| `uid`        | `STRING`    | FK                    | User ID of the banned user.            |
| `ban_reason` | `STRING`    |                       | Explanation for the ban.               |
| `banned_by`  | `STRING`    |                       | `uid` of the admin who issued the ban. |
| `banned_at`  | `DATE TIME` |                       | Timestamp of the ban event.            |

---

## 6. `feedbacks` Collection

Collects user bug reports, feature requests, and general feedback.

| Field        | Type           | Constraints / Default                                            | Description                         |
| :----------- | :------------- | :--------------------------------------------------------------- | :---------------------------------- |
| `_id`        | `Mongo OBJ id` | **PK**                                                           | Unique identifier for the feedback. |
| `uid`        | `STRING`       | FK                                                               | User ID of the submitter.           |
| `email`      | `STRING`       | NOT NULL                                                         | Contact email of the submitter.     |
| `type`       | `STRING`       | ENUM (`'bug'`, `'feature_request'`, `'other'`)                   | Category of the feedback.           |
| `message`    | `STRING`       | NOT NULL                                                         | The actual feedback text.           |
| `status`     | `STRING`       | ENUM (`'open'`, `'in_progress'`, `'resolved'`), DEFAULT `'open'` | Current status of the ticket.       |
| `created_at` | `DATE TIME`    |                                                                  | Submission timestamp.               |
| `updated_at` | `DATE TIME`    |                                                                  | Last update timestamp.              |
