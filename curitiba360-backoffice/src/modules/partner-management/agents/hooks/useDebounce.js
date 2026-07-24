import {
  useEffect,
  useState,
} from 'react';

/**
 * Aguarda um intervalo antes de atualizar o valor.
 *
 * Útil para buscas, filtros e requisições que não devem
 * ser executadas a cada tecla digitada.
 */
export function useDebounce(
  value,
  delay = 400,
) {
  const [
    debouncedValue,
    setDebouncedValue,
  ] = useState(value);

  useEffect(() => {
    const timeoutId =
      window.setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

    return () => {
      window.clearTimeout(
        timeoutId,
      );
    };
  }, [
    value,
    delay,
  ]);

  return debouncedValue;
}

export default useDebounce;
