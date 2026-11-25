import { useState, useEffect } from "react";

export function useBenefits() {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated load
    setBenefits([
      { id: "ben-001", title: "Meia Entrada Cultural", desc: "Desconto de 50% em teatros municipais.", partner: "Secretaria de Cultura" },
      { id: "ben-002", title: "10% Cashback Gastronomia", desc: "Nas principais cantinas de Santa Felicidade.", partner: "Assoc. Restaurantes" },
      { id: "ben-003", title: "Integração Grátis Ônibus", desc: "No segundo embarque em até 2 horas.", partner: "URBS" }
    ]);
    setLoading(false);
  }, []);

  return { benefits, loading };
}
