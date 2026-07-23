import { useState } from "react";
import { emergencyService } from "../services/emergencyService";

export function useEmergency() {
  const [triggering, setTriggering] = useState(false);

  const triggerSOS = async (emergencyType, lat, lng, description) => {
    setTriggering(true);
    const res = await emergencyService.triggerSOS(emergencyType, lat, lng, description);
    setTriggering(false);
    return res;
  };

  return { triggerSOS, triggering };
}
