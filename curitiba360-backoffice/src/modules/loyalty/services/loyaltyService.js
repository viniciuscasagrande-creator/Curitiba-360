import {
  addLoyaltyTransactionRepository,
  getLoyaltyAccountRepository,
  updateLoyaltyAccountRepository,
} from "../repositories/loyaltyRepository";

import {
  calculateLevelProgress,
  calculateLoyaltyLevel,
  calculatePurchasePoints,
} from "../utils/loyaltyCalculator";

export async function getLoyaltyAccount() {
  return getLoyaltyAccountRepository();
}

export async function creditPurchasePoints({
  orderId,
  orderCode,
  amount,
}) {
  const account =
    await getLoyaltyAccount();

  const result =
    calculatePurchasePoints({
      amount,
      level: account.level,
    });

  const nextLifetime =
    account.points.lifetime +
    result.totalPoints;

  const nextLevel =
    calculateLoyaltyLevel(
      nextLifetime
    );

  const nextProgress =
    calculateLevelProgress(
      nextLifetime
    );

  await updateLoyaltyAccountRepository({
    level: nextLevel,

    levelProgress:
      nextProgress,

    points: {
      ...account.points,

      available:
        account.points.available +
        result.totalPoints,

      lifetime:
        nextLifetime,
    },
  });

  return addLoyaltyTransactionRepository({
    type: "purchase_points",
    currency: "points",
    direction: "credit",
    amount:
      result.totalPoints,
    status: "completed",
    description:
      `Pontos da compra ${orderCode}`,
    referenceType: "order",
    referenceId: orderId,
    expiresAt: null,
  });
}

export async function redeemPoints({
  points,
  description,
  referenceId,
}) {
  const account =
    await getLoyaltyAccount();

  const amount =
    Number(points);

  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    throw new Error(
      "Quantidade de pontos inválida."
    );
  }

  if (
    account.points.available <
    amount
  ) {
    throw new Error(
      "Saldo de pontos insuficiente."
    );
  }

  await updateLoyaltyAccountRepository({
    points: {
      ...account.points,

      available:
        account.points.available -
        amount,
    },
  });

  return addLoyaltyTransactionRepository({
    type: "points_redemption",
    currency: "points",
    direction: "debit",
    amount,
    status: "completed",
    description,
    referenceType: "coupon",
    referenceId,
    expiresAt: null,
  });
}

export async function useCashback({
  amount,
  orderId,
}) {
  const account =
    await getLoyaltyAccount();

  const value =
    Number(amount);

  if (
    value <= 0 ||
    value >
      account.cashback.available
  ) {
    throw new Error(
      "Saldo de cashback insuficiente."
    );
  }

  await updateLoyaltyAccountRepository({
    cashback: {
      ...account.cashback,

      available:
        account.cashback.available -
        value,
    },
  });

  return addLoyaltyTransactionRepository({
    type: "cashback_used",
    currency: "cashback",
    direction: "debit",
    amount: value,
    status: "completed",
    description:
      "Cashback utilizado em compra",
    referenceType: "order",
    referenceId: orderId,
    expiresAt: null,
  });
}

export async function claimMissionReward(
  missionId
) {
  const account =
    await getLoyaltyAccount();

  const mission =
    account.missions.find(
      (item) =>
        item.id === missionId
    );

  if (!mission) {
    throw new Error(
      "Missão não encontrada."
    );
  }

  if (
    mission.status !==
    "completed"
  ) {
    throw new Error(
      "A missão ainda não foi concluída."
    );
  }

  const missions =
    account.missions.map(
      (item) =>
        item.id === missionId
          ? {
              ...item,
              status: "claimed",
            }
          : item
    );

  if (
    mission.reward.type ===
    "points"
  ) {
    const rewardAmount =
      Number(
        mission.reward.amount ||
          0
      );

    await updateLoyaltyAccountRepository({
      missions,

      points: {
        ...account.points,

        available:
          account.points.available +
          rewardAmount,

        lifetime:
          account.points.lifetime +
          rewardAmount,
      },
    });

    return addLoyaltyTransactionRepository({
      type: "mission_points",
      currency: "points",
      direction: "credit",
      amount: rewardAmount,
      status: "completed",
      description:
        `Recompensa: ${mission.title}`,
      referenceType: "mission",
      referenceId: mission.id,
      expiresAt: null,
    });
  }

  return updateLoyaltyAccountRepository({
    missions,
  });
}
