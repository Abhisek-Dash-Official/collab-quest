/**
 * Collab Quest: Gamification & Math Engine Core
 */

// LEVEL & PROGRESSION SCALING
export function calculateLevel(xp: number): number {
  if (!xp || xp < 0) return 0;
  // Level = (XP / 30) ^ (2/3)
  return Math.floor(Math.pow(xp / 30, 2 / 3));
}

export function calculateXpForNextLevel(currentLevel: number): number {
  if (currentLevel < 0) return 0;
  // RequiredXP = 30 * (Level ^ 1.5)
  return Math.floor(30 * Math.pow(currentLevel + 1, 1.5));
}

// TASK XP CALCULATOR
export function calculateTaskXP(
  weightage: number,
  totalAssignedUsers: number,
  completionOrder: number, // 1-based index (1 for 1st place, 2 for 2nd, etc.)
  isTimeTraveler: boolean = false,
  isEarlyBird: boolean = false
): number {
  const baseXP = weightage * 10;
  let orderBonusPercent = 0;

  // Completion Order Bonus Logic (The "Speedster" mechanic)
  if (totalAssignedUsers === 2) {
    if (completionOrder === 1) orderBonusPercent = 0.08;
  } else if (totalAssignedUsers === 3) {
    if (completionOrder === 1) orderBonusPercent = 0.20;
    else if (completionOrder === 2) orderBonusPercent = 0.10;
  } else if (totalAssignedUsers === 4) {
    if (completionOrder === 1) orderBonusPercent = 0.20;
    else if (completionOrder === 2) orderBonusPercent = 0.15;
    else if (completionOrder === 3) orderBonusPercent = 0.05;
  } else if (totalAssignedUsers >= 5) {
    if (completionOrder === 1) orderBonusPercent = 0.25;
    else if (completionOrder === 2) orderBonusPercent = 0.15;
    else if (completionOrder === 3) orderBonusPercent = 0.10;
  }
  // Note: The last finisher always gets 0% bonus (fallback).

  const bonusOrderXP = Math.floor(baseXP * orderBonusPercent);
  const bonusEarlyBirdXP = isEarlyBird ? Math.floor(baseXP * 0.15) : 0;
  const bonusTimeTravelerXP = isTimeTraveler ? Math.floor(baseXP * 0.30) : 0;

  return baseXP + bonusOrderXP + bonusEarlyBirdXP + bonusTimeTravelerXP;
}

// ACCOUNT AGE CALCULATOR
export function getAccountAge(createdAt: Date): string {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays >= 365) {
    const years = Math.floor(diffDays / 365);
    return `Member for ${years} year${years > 1 ? 's' : ''}`;
  } else if (diffDays >= 30) {
    const months = Math.floor(diffDays / 30);
    return `Member for ${months} month${months > 1 ? 's' : ''}`;
  } else if (diffDays > 0) {
    return `Member for ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  }
  return "Joined today";
}

// TASK TIMING MODIFIERS
export function getTaskTimingModifiers(
  startTime?: Date,
  deadline?: Date,
  completedAt: Date = new Date()
): { isEarlyBird: boolean; isTimeTraveler: boolean; isLastMinute: boolean } {
  if (!startTime || !deadline) {
    return { isEarlyBird: false, isTimeTraveler: false, isLastMinute: false };
  }

  const start = new Date(startTime).getTime();
  const end = new Date(deadline).getTime();
  const completed = new Date(completedAt).getTime();
  
  const totalAllottedTime = end - start;
  const timeTaken = completed - start;

  // Time Traveler: Completed before start_time
  const isTimeTraveler = completed < start;

  // Early Bird: Completed in less than 50% of allotted time
  const isEarlyBird = !isTimeTraveler && timeTaken > 0 && timeTaken < (totalAllottedTime * 0.5);

  // Deadline Surfer / Last Minute: Completed in the final 10% of total duration
  const isLastMinute = !isTimeTraveler && (end - completed) <= (totalAllottedTime * 0.10) && completed <= end;

  return { isEarlyBird, isTimeTraveler, isLastMinute };
}

// GROUP BADGES EVALUATION
export function evaluateGroupBadges(
  memberStats: any,
  allGroupMembers: any[],
  assignedTasksCount: number = 0
): string[] {
  const badges: string[] = [];
  if (!memberStats || !allGroupMembers || allGroupMembers.length === 0) return badges;

  // 🔥 Unstoppable: 7 days streak
  if (memberStats.fire_streak >= 7) {
    badges.push("🔥 Unstoppable");
  }

  // 🥷 Nudge-Ninja: Highest nudges sent in group (Min 5)
  const maxSent = Math.max(...allGroupMembers.map((m: any) => m.total_nudges_sent || 0), 0);
  if (memberStats.total_nudges_sent >= 5 && memberStats.total_nudges_sent === maxSent) {
    badges.push("🥷 Nudge-Ninja");
  }

  // 🎯 Most-Wanted: Highest nudges received in group (Min 5)
  const maxReceived = Math.max(...allGroupMembers.map((m: any) => m.total_nudges_received || 0), 0);
  if (memberStats.total_nudges_received >= 5 && memberStats.total_nudges_received === maxReceived) {
    badges.push("🎯 Most-Wanted");
  }

  // 🏆 MVP: Highest XP & Highest Tasks completed in the group
  const maxXP = Math.max(...allGroupMembers.map((m: any) => m.xp_gained || 0), 0);
  const maxCompletions = Math.max(...allGroupMembers.map((m: any) => m.task_completion_count || 0), 0);
  if (
    memberStats.xp_gained > 0 &&
    memberStats.xp_gained === maxXP &&
    memberStats.task_completion_count === maxCompletions
  ) {
    badges.push("🏆 MVP");
  }
  
  if (assignedTasksCount >= 4) {
    // 🗿 The NPC (Badge of Shame): Failed 75% or more tasks
    const failureRate = (assignedTasksCount - (memberStats.task_completion_count || 0)) / assignedTasksCount;
    if (failureRate >= 0.75) badges.push("🗿 The NPC");
  }

  if (assignedTasksCount >= 5) {
    // ⚡ Speedster: Over 20% tasks are first-finishes
    if ((memberStats.first_finishes_count / assignedTasksCount) >= 0.20) {
      badges.push("⚡ Speedster");
    }

    // 🏄‍♂️ Deadline-Surfer: Over 25% tasks completed at the last minute
    if ((memberStats.last_minute_finishes_count / assignedTasksCount) >= 0.25) {
      badges.push("🏄‍♂️ Deadline-Surfer");
    }
  }

  return badges;
}