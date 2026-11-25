import {
  LOYALTY_LEVEL_ORDER,
  LOYALTY_LEVELS,
} from "../constants/loyaltyLevels";

export function calculateLoyaltyLevel(
  lifetimePoints
) {
  let currentLevel = "bronze";

  for (const levelId of LOYALTY_LEVEL_ORDER) {
    const level =
      LOYALTY_LEVELS[levelId];

    if (
      lifetimePoints >=
      level.minimumPoints
    ) {
      currentLevel = levelId;
    }
  }

  return currentLevel;
}

export function calculateLevelProgress(
  lifetimePoints
) {
  const currentLevelId =
    calculateLoyaltyLevel(
      lifetimePoints
    );

  const currentLevel =
    LOYALTY_LEVELS[
      currentLevelId
    ];

  if (!currentLevel.nextLevel) {
    return {
      currentValue:
        lifetimePoints,
      nextLevelValue:
        lifetimePoints,
      percentage: 100,
    };
  }

  const nextLevel =
    LOYALTY_LEVELS[
      currentLevel.nextLevel
    ];

  const levelRange =
    nextLevel.minimumPoints -
    currentLevel.minimumPoints;

  const levelProgress =
    lifetimePoints -
    currentLevel.minimumPoints;

  const percentage = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (levelProgress /
          levelRange) *
          100
      )
    )
  );

  return {
    currentValue:
      lifetimePoints,
    nextLevelValue:
      nextLevel.minimumPoints,
    percentage,
  };
}

export function calculatePurchasePoints({
  amount,
  level,
}) {
  const bonusMap = {
    bronze: 0,
    silver: 0.05,
    gold: 0.1,
    diamond: 0.2,
  };

  const basePoints =
    Math.floor(
      Number(amount || 0)
    );

  const bonusPoints =
    Math.floor(
      basePoints *
        (bonusMap[level] || 0)
    );

  return {
    basePoints,
    bonusPoints,
    totalPoints:
      basePoints + bonusPoints,
  };
}
