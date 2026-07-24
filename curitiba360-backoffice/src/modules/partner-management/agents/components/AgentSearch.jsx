import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  LoaderCircle,
  Search,
  X,
} from 'lucide-react';

import {
  useDebounce,
} from '../hooks';

export function AgentSearch({
  value = '',
  onChange,
  onSearch,
  placeholder =
    'Buscar por nome, e-mail, CPF ou agência...',
  debounceDelay = 400,
  isLoading = false,
  disabled = false,
  autoFocus = false,
  className = '',
}) {
  const inputRef =
    useRef(null);

  const [
    internalValue,
    setInternalValue,
  ] = useState(value || '');

  const debouncedValue =
    useDebounce(
      internalValue,
      debounceDelay,
    );

  /*
   * Sincroniza o valor interno quando o filtro
   * for alterado externamente.
   *
   * Isso acontece, por exemplo, ao limpar todos
   * os filtros da página.
   */
  useEffect(() => {
    setInternalValue(
      value || '',
    );
  }, [value]);

  /*
   * Dispara a busca somente após o debounce.
   */
  useEffect(() => {
    const normalizedValue =
      debouncedValue.trim();

    onSearch?.(
      normalizedValue,
    );
  }, [
    debouncedValue,
    onSearch,
  ]);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  function handleChange(event) {
    const nextValue =
      event.target.value;

    setInternalValue(
      nextValue,
    );

    /*
     * onChange representa a alteração imediata,
     * antes do debounce.
     */
    onChange?.(
      nextValue,
    );
  }

  function handleClear() {
    setInternalValue('');

    onChange?.('');

    window.requestAnimationFrame(
      () => {
        inputRef.current?.focus();
      },
    );
  }

  function handleKeyDown(event) {
    if (
      event.key === 'Escape' &&
      internalValue
    ) {
      event.preventDefault();
      handleClear();
    }

    /*
     * Permite executar imediatamente ao pressionar Enter.
     */
    if (event.key === 'Enter') {
      event.preventDefault();

      onSearch?.(
        internalValue.trim(),
      );
    }
  }

  const hasValue =
    Boolean(
      internalValue.trim(),
    );

  return (
    <div
      className={[
        'relative w-full text-left',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'pointer-events-none',
          'absolute inset-y-0 left-0',
          'flex items-center',
          'pl-3.5',
        ].join(' ')}
      >
        {isLoading ? (
          <LoaderCircle
            size={17}
            className="animate-spin text-slate-400"
          />
        ) : (
          <Search
            size={17}
            className="text-slate-400"
          />
        )}
      </div>

      <input
        ref={inputRef}
        type="search"
        value={internalValue}
        disabled={disabled}
        placeholder={placeholder}
        aria-label="Buscar agentes"
        onChange={handleChange}
        onKeyDown={
          handleKeyDown
        }
        className={[
          'h-11 w-full',
          'rounded-xl border',
          'border-slate-200',
          'bg-white',
          'pl-10',
          hasValue
            ? 'pr-11'
            : 'pr-4',
          'text-sm',
          'text-slate-900',
          'outline-none',
          'transition-all',
          'placeholder:text-slate-400',
          'hover:border-slate-300',
          'focus:border-slate-400',
          'focus:ring-4',
          'focus:ring-slate-100',
          'disabled:cursor-not-allowed',
          'disabled:bg-slate-50',
          'disabled:text-slate-400',

          /*
           * Remove o botão padrão do input search.
           */
          '[&::-webkit-search-cancel-button]:hidden',
          '[&::-webkit-search-decoration]:hidden',
        ].join(' ')}
      />

      {hasValue && (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          aria-label="Limpar busca"
          title="Limpar busca"
          className={[
            'absolute inset-y-0',
            'right-1.5',
            'my-auto flex',
            'h-8 w-8',
            'items-center',
            'justify-center',
            'rounded-lg',
            'text-slate-400',
            'transition-colors',
            'hover:bg-slate-100',
            'hover:text-slate-700',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-slate-300',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50',
          ].join(' ')}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default AgentSearch;
