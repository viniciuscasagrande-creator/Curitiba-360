import { getSuperAppData, saveSuperAppData } from "../repositories/superAppRepository";

export const loyaltyService = {
  async getLoyaltySummary() {
    const data = await getSuperAppData();
    return {
      success: true,
      data: {
        points: data.wallet.loyaltyPoints,
        level: data.user.loyaltyLevel,
        nextLevelAt: 5000,
        pointsToNextLevel: 5000 - data.wallet.loyaltyPoints
      }
    };
  },

  async addPoints(pointsEarned) {
    const data = await getSuperAppData();
    data.wallet.loyaltyPoints += pointsEarned;
    data.summary.loyaltyPoints = data.wallet.loyaltyPoints;
    if (data.wallet.loyaltyPoints >= 5000) {
      data.user.loyaltyLevel = "Curitiba Premium";
    }
    await saveSuperAppData(data);
    return { success: true, points: data.wallet.loyaltyPoints, level: data.user.loyaltyLevel };
  }
};
