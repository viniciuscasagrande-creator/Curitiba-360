export const mobilityService = {
  async getLines() {
    return {
      success: true,
      data: [
        { id: "line-turismo", name: "Linha Turismo", type: "Panorâmica", frequency: "A cada 30 min", price: 50.0 },
        { id: "line-interbairros", name: "Interbairros II", type: "Expressa", frequency: "A cada 10 min", price: 6.0 },
        { id: "line-biarticulado", name: "Santa Cândida / Capão Raso", type: "BRT Biarticulado", frequency: "A cada 4 min", price: 6.0 }
      ]
    };
  },

  async calculateRoute(origin, destination) {
    return {
      success: true,
      data: {
        origin,
        destination,
        durationMinutes: 24,
        distanceKm: 8.5,
        modes: [
          { type: "walk", duration: 4, desc: "Caminhada até Estação Tubo Praça do Japão" },
          { type: "bus", duration: 15, desc: "Biarticulado sentido Capão Raso" },
          { type: "walk", duration: 5, desc: "Caminhada até o destino final" }
        ],
        cost: 6.0
      }
    };
  }
};
