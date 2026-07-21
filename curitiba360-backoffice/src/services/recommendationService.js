export function calculateRecommendationScore({
  interestScore = 0.8,
  distanceScore = 0.9,
  priceScore = 0.7,
  popularityScore = 0.85,
  historyScore = 0.75
} = {}) {
  const score = (
    interestScore * 0.30 +
    distanceScore * 0.15 +
    priceScore * 0.15 +
    popularityScore * 0.15 +
    historyScore * 0.25
  );

  return Math.round(score * 100);
}

export function rankRecommendations(items, userProfile = {}) {
  return items.map(item => ({
    ...item,
    matchScore: calculateRecommendationScore({
      interestScore: Math.random() * 0.3 + 0.7,
      distanceScore: Math.random() * 0.3 + 0.7,
      priceScore: Math.random() * 0.2 + 0.8,
      popularityScore: 0.9,
      historyScore: 0.85
    })
  })).sort((a, b) => b.matchScore - a.matchScore);
}
