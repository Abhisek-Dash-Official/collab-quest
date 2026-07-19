# Collab Quest: Gamification & Math Engine

This document outlines the core mathematical formulas, progression scaling, and logic conditions used in the Collab Quest gamification engine.

---

## 1. The XP System (Experience Points)

XP is awarded upon successful completion of a task. The total XP earned depends on the task's base weightage, the order of completion, and the time of completion.

### A. Base XP Calculation

Every task has a `weightage` (typically 1 to 5, representing difficulty/effort).
$BaseXP = weightage \times 10$

### B. Completion Order Bonus (The "Speedster" mechanic)

The bonus scales dynamically based on the total number of users assigned to the task (`N`). Since the platform allows a maximum of 5 users per group, the bonus distribution is tiered to ensure the last-place finishers only receive standard XP.

| Assigned Users (`N`) | 1st Place | 2nd Place        | 3rd Place        | 4th / 5th Place  |
| :------------------- | :-------- | :--------------- | :--------------- | :--------------- |
| **2 Users**          | $+08\%$   | $+0\%$ (Base XP) | -                | -                |
| **3 Users**          | $+20\%$   | $+10\%$          | $+0\%$ (Base XP) | -                |
| **4 Users**          | $+20\%$   | $+15\%$          | $+5\%$           | $+0\%$ (Base XP) |
| **5 Users**          | $+25\%$   | $+15\%$          | $+10\%$          | $+0\%$ (Base XP) |

_Logic Rule:_ The last finisher (or the bottom percentile in larger groups) always receives standard Base XP ($+0\%$ bonus) to maintain the competitive value of the speed bonus.

### C. Early Bird Bonus

If a user completes a task using less than 50% of the allotted time.
$TimeTaken = completion\_at - start\_time$
$TotalAllottedTime = deadline - start\_time$
If $TimeTaken < (TotalAllottedTime \times 0.5)$, then award **+15%** of Base XP.

### D. The "Time Traveler" Anomaly

When a user completes a task _before_ it was even officially scheduled to begin (pre-emptive completion).
If $completion\_at < start\_time$, award a massive **+30%** of Base XP (and trigger the Time Traveler badge).

### E. Final XP Formula

$TotalXP = BaseXP + Bonus_{Order} + Bonus_{EarlyBird} + Bonus_{TimeTraveler}$

---

## 2. Level Progression Scaling

To keep users engaged, leveling up follows an exponential curve (RPG style). It's easy to level up initially, but requires more consistent effort for higher tiers.

**Formula for Required XP to reach Next Level:**
$RequiredXP = 30 \times (Level)^{1.5}$

**Level Threshold Examples:**

- **Level 1:** 0 XP (Starting Level)
- **Level 2:** ~85 XP
- **Level 3:** ~155 XP
- **Level 4:** ~240 XP
- **Level 5:** ~335 XP

---

## 3. Badge Unlock Logic (The Achievement System)

Badges are awarded dynamically based on the stats tracked in the `members` sub-schema.

| Badge Name             | Unlock Condition / Trigger Logic                                                                                                                                                                                                                                        |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🏆 MVP**             | Highest `task_completion_count` and `xp_gained` in the group at the end of a month.                                                                                                                                                                                     |
| **⚡ Speedster**       | Over **20%** of assigned tasks are first-finishes. <br>_(Formula: `first_finishes_count / assigned_tasks_count >= 0.20`, Min `assigned_tasks_count = 5`)_                                                                                                               |
| **🦅 Fast-Worker**     | Over **30%** of assigned tasks are completed using less than half the allotted time. <br>_(Formula: `fast_finishes_count / assigned_tasks_count >= 0.30`, Min `assigned_tasks_count = 5`)_                                                                              |
| **🕰️ Time-Traveler**   | Pre-emptively completed at least 5 tasks. <br>_(Formula: `completion_at < start_time` for 3+ tasks)_                                                                                                                                                                    |
| **🏄‍♂️ Deadline-Surfer** | Over 25% of assigned tasks completed in the final 10% of their total duration. <br>_(Task Formula: (deadline - completed_at) <= 0.10 \* (deadline - start_time)) <br>_(Badge Formula: last_finishes_count / assigned_tasks_count >= 0.25, Min assigned_tasks_count = 5) |
| **🔥 Unstoppable**     | Maintaining a `fire_streak >= 7` days.                                                                                                                                                                                                                                  |
| **🥷 Nudge-Ninja**     | Held by the single user with the **highest** `total_nudges_sent` in the group. <br>_(Condition: Must have sent at least 5 nudges to qualify)._                                                                                                                          |
| **🎯 Most-Wanted**     | Held by the single user with the **highest** `total_nudges_received` in the group. <br>_(Condition: Must have received at least 5 nudges to qualify)._                                                                                                                  |
| **🗿 The NPC**         | **Badge of Shame:** Failed to complete **75%** or more of their assigned tasks. <br>_(Formula: `(assigned - completed) / assigned >= 0.75`, Min `assigned_tasks_count = 4`)_                                                                                            |

---

## 4. Streaks & Engagement

### Fire Streak Calculation

- **Increment (+1):** Completing at least one task or interacting with a group (sending a nudge) within a 24-hour window.
- **Reset (0):** No active completions or interactions for 48 consecutive hours.

### Nudge Limits (Anti-Spam)

- Global daily limit per user: `max_daily_nudge = 10` (Defined in `app_config`).

---

## 5. Social Currency (Respect Likes)

Users can "Respect" or "Like" a peer's task completion.

- $1 Respect Like = +2 XP$ (Small flat bonus to encourage positive reinforcement).

## 6. Leaderboard & Ranking Algorithm

A member's `group_rank` (1st, 2nd, 3rd, etc.) is not just a random number. It is calculated dynamically using a multi-tier sorting algorithm to ensure fair competition and resolve ties.

**Sorting Priority (Highest to Lowest):**

1. **Primary Metric (XP):** Highest `xp_gained` in the group gets Rank 1.
2. **Tie-Breaker 1 (Volume):** If XP is equal, the user with the higher `task_completion_count` wins.
3. **Tie-Breaker 2 (Speed):** If still tied, the user with the higher `first_finishes_count` (Speedster metric) wins.
4. **Tie-Breaker 3 (Consistency):** If still tied, the user with the higher `fire_streak` wins.

_Note: Group Ranks and these specific metrics reset on the 1st of every month to keep the leaderboard highly competitive and give new members a fair chance to climb._
