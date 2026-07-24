import { useEffect } from 'react';
import { agencyRepository } from '../repositories/agencyRepository';

export function useAgencyRealtime(onUpdate) {
  useEffect(() => {
    const unsubscribe = agencyRepository.subscribeRealtime((agencies) => {
      if (onUpdate) {
        onUpdate(agencies);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [onUpdate]);
}
