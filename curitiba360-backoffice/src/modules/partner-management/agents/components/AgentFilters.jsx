import {
  Building2,
  Check,
  ChevronDown,
  CircleDot,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';

/**
 * Valores padrão utilizados quando o projeto ainda não possui
 * listas carregadas diretamente do Firebase.
 *
 * Você poderá substituir essas opções por dados vindos do banco
 * na Parte 4.1.2-B3.
 */
const DEFAULT_STATUS_OPTIONS = [
  {
    value: 'active',
    label: 'Ativo',
  },
  {
    value: 'inactive',
    label: 'Inativo',
  },
  {
    value: 'pending',
    label: 'Pendente',
  },
  {
    value: 'blocked',
    label: 'Bloqueado',
  },
];

const DEFAULT_AVAILABILITY_OPTIONS = [
  {
    value: 'available',
    label: 'Disponível',
  },
  {
    value: 'busy',
    label: 'Ocupado',
  },
  {
    value: 'unavailable',
    label: 'Indisponível',
  },
  {
    value: 'vacation',
    label: 'Férias',
  },
];

const DEFAULT_TYPE_OPTIONS = [
  {
    value: 'internal',
    label: 'Agente interno',
  },
  {
    value: 'external',
    label: 'Agente externo',
  },
  {
    value: 'partner',
    label: 'Parceiro',
  },
  {
    value: 'freelancer',
    label: 'Freelancer',
  },
  {
    value: 'coordinator',
    label: 'Coordenador',
  },
];

const DEFAULT_SPECIALTY_OPTIONS = [
  {
    value: 'events',
    label: 'Eventos',
  },
  {
    value: 'tourism',
    label: 'Turismo',
  },
  {
    value: 'hospitality',
    label: 'Hotelaria',
  },
  {
    value: 'commercial',
    label: 'Comercial',
  },
  {
    value: 'support',
    label: 'Atendimento',
  },
  {
    value: 'operations',
    label: 'Operações',
  },
  {
    value: 'corporate',
    label: 'Corporativo',
  },
];

const DEFAULT_STATE_OPTIONS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  {
    value: 'DF',
    label: 'Distrito Federal',
  },
  {
    value: 'ES',
    label: 'Espírito Santo',
  },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  {
    value: 'MT',
    label: 'Mato Grosso',
  },
  {
    value: 'MS',
    label: 'Mato Grosso do Sul',
  },
  {
    value: 'MG',
    label: 'Minas Gerais',
  },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  {
    value: 'RJ',
    label: 'Rio de Janeiro',
  },
  {
    value: 'RN',
    label: 'Rio Grande do Norte',
  },
  {
    value: 'RS',
    label: 'Rio Grande do Sul',
  },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  {
    value: 'SC',
    label: 'Santa Catarina',
  },
  {
    value: 'SP',
    label: 'São Paulo',
  },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

function normalizeOptions(options = []) {
  return options
    .map((option) => {
      if (
        typeof option === 'string'
      ) {
        return {
          value: option,
          label: option,
        };
      }

      return {
        value:
          option.value ??
          option.id ??
          option.code ??
          '',
        label:
          option.label ??
          option.name ??
          option.title ??
          option.value ??
          '',
      };
    })
    .filter(
      (option) =>
        option.value !== '' &&
        option.label !== '',
    );
}

function isFilled(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (
    value === null ||
    value === undefined
  ) {
    return false;
  }

  return String(value).trim() !== '';
}

function FieldLabel({
  icon: Icon,
  label,
  optional = false,
}) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-600">
        {Icon && (
          <Icon
            size={14}
            className="text-slate-400"
          />
        )}

        {label}
      </label>

      {optional && (
        <span className="text-[11px] text-slate-400">
          Opcional
        </span>
      )}
    </div>
  );
}

function SelectField({
  label,
  icon,
  value = '',
  options = [],
  placeholder = 'Todos',
  disabled = false,
  onChange,
}) {
  const Icon = icon;

  return (
    <div>
      <FieldLabel
        icon={Icon}
        label={label}
      />

      <div className="relative">
        <select
          value={value ?? ''}
          disabled={disabled}
          onChange={(event) =>
            onChange?.(
              event.target.value,
            )
          }
          className={[
            'h-11 w-full',
            'appearance-none',
            'rounded-xl',
            'border border-slate-200',
            'bg-white',
            'pl-10 pr-9',
            'text-sm',
            'font-medium',
            'text-slate-700',
            'outline-none',
            'transition-all',
            'hover:border-slate-300',
            'focus:border-slate-400',
            'focus:ring-4',
            'focus:ring-slate-100',
            'disabled:cursor-not-allowed',
            'disabled:bg-slate-50',
            'disabled:text-slate-400',
          ].join(' ')}
        >
          <option value="">
            {placeholder}
          </option>

          {normalizeOptions(
            options,
          ).map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {Icon && (
          <Icon
            size={16}
            className={[
              'pointer-events-none',
              'absolute left-3.5',
              'top-1/2',
              '-translate-y-1/2',
              'text-slate-400',
            ].join(' ')}
          />
        )}

        <ChevronDown
          size={15}
          className={[
            'pointer-events-none',
            'absolute right-3',
            'top-1/2',
            '-translate-y-1/2',
            'text-slate-400',
          ].join(' ')}
        />
      </div>
    </div>
  );
}

function TextField({
  label,
  icon,
  value = '',
  placeholder,
  disabled = false,
  onChange,
}) {
  const Icon = icon;
  const hasValue = isFilled(value);

  return (
    <div>
      <FieldLabel
        icon={Icon}
        label={label}
      />

      <div className="relative">
        <input
          type="text"
          value={value ?? ''}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) =>
            onChange?.(
              event.target.value,
            )
          }
          className={[
            'h-11 w-full',
            'rounded-xl',
            'border border-slate-200',
            'bg-white',
            'pl-10',
            hasValue
              ? 'pr-10'
              : 'pr-4',
            'text-sm',
            'font-medium',
            'text-slate-700',
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
          ].join(' ')}
        />

        {Icon && (
          <Icon
            size={16}
            className={[
              'pointer-events-none',
              'absolute left-3.5',
              'top-1/2',
              '-translate-y-1/2',
              'text-slate-400',
            ].join(' ')}
          />
        )}

        {hasValue && (
          <button
            type="button"
            disabled={disabled}
            aria-label={`Limpar ${label}`}
            onClick={() =>
              onChange?.('')
            }
            className={[
              'absolute right-1.5',
              'top-1/2',
              'flex h-8 w-8',
              '-translate-y-1/2',
              'items-center',
              'justify-center',
              'rounded-lg',
              'text-slate-400',
              'transition-colors',
              'hover:bg-slate-100',
              'hover:text-slate-700',
              'disabled:cursor-not-allowed',
              'disabled:opacity-50',
            ].join(' ')}
          >
            <X size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

function MultiSelectField({
  label,
  icon,
  values = [],
  options = [],
  disabled = false,
  onChange,
}) {
  const normalizedValues =
    Array.isArray(values)
      ? values
      : [];

  const normalizedOptions =
    normalizeOptions(options);

  function toggleValue(value) {
    if (disabled) {
      return;
    }

    const alreadySelected =
      normalizedValues.includes(
        value,
      );

    const nextValues =
      alreadySelected
        ? normalizedValues.filter(
            (item) =>
              item !== value,
          )
        : [
            ...normalizedValues,
            value,
          ];

    onChange?.(nextValues);
  }

  return (
    <div>
      <FieldLabel
        icon={icon}
        label={label}
      />

      <div className="flex flex-wrap gap-2">
        {normalizedOptions.map(
          (option) => {
            const active =
              normalizedValues.includes(
                option.value,
              );

            return (
              <button
                key={option.value}
                type="button"
                disabled={disabled}
                onClick={() =>
                  toggleValue(
                    option.value,
                  )
                }
                className={[
                  'inline-flex',
                  'min-h-9',
                  'items-center',
                  'gap-1.5',
                  'rounded-xl',
                  'border',
                  'px-3 py-2',
                  'text-xs',
                  'font-semibold',
                  'transition-all',
                  'focus:outline-none',
                  'focus:ring-4',
                  'focus:ring-slate-100',
                  'disabled:cursor-not-allowed',
                  'disabled:opacity-50',

                  active
                    ? [
                        'border-slate-900',
                        'bg-slate-900',
                        'text-white',
                      ].join(' ')
                    : [
                        'border-slate-200',
                        'bg-white',
                        'text-slate-600',
                        'hover:border-slate-300',
                        'hover:bg-slate-50',
                      ].join(' '),
                ].join(' ')}
              >
                {active && (
                  <Check
                    size={13}
                  />
                )}

                {option.label}
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}

function FilterSection({
  title,
  description,
  children,
}) {
  return (
    <section
      className={[
        'rounded-2xl text-left',
        'border border-slate-200',
        'bg-white',
        'p-4',
      ].join(' ')}
    >
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

export function AgentFilters({
  filters = {},

  agencies = [],
  cities = [],

  statusOptions =
    DEFAULT_STATUS_OPTIONS,
  availabilityOptions =
    DEFAULT_AVAILABILITY_OPTIONS,
  typeOptions =
    DEFAULT_TYPE_OPTIONS,
  specialtyOptions =
    DEFAULT_SPECIALTY_OPTIONS,
  stateOptions =
    DEFAULT_STATE_OPTIONS,

  disabled = false,
  showHeader = true,
  showFooter = true,

  onChange,
  onApply,
  onReset,
  onClose,
}) {
  const normalizedFilters = {
    search:
      filters.search ?? '',
    status:
      filters.status ?? '',
    statuses:
      filters.statuses ?? [],
    availability:
      filters.availability ??
      '',
    type:
      filters.type ?? '',
    agencyId:
      filters.agencyId ?? '',
    specialty:
      filters.specialty ?? '',
    specialties:
      filters.specialties ??
      [],
    state:
      filters.state ?? '',
    city:
      filters.city ?? '',
    region:
      filters.region ?? '',
    minimumPerformance:
      filters.minimumPerformance ??
      '',
  };

  function updateFilter(
    field,
    value,
  ) {
    onChange?.({
      ...normalizedFilters,
      [field]: value,
    });
  }

  function handleReset() {
    onReset?.();
  }

  const activeCount =
    Object.entries(
      normalizedFilters,
    ).reduce(
      (
        total,
        [key, value],
      ) => {
        if (key === 'search') {
          return total;
        }

        return (
          total +
          (isFilled(value)
            ? 1
            : 0)
        );
      },
      0,
    );

  return (
    <div className="flex h-full flex-col bg-slate-50 text-left">
      {showHeader && (
        <header
          className={[
            'sticky top-0 z-10',
            'flex items-center',
            'justify-between',
            'gap-4',
            'border-b',
            'border-slate-200',
            'bg-white/95',
            'px-5 py-4',
            'backdrop-blur',
          ].join(' ')}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={[
                'flex h-10 w-10',
                'shrink-0',
                'items-center',
                'justify-center',
                'rounded-xl',
                'bg-slate-900',
                'text-white',
              ].join(' ')}
            >
              <SlidersHorizontal
                size={18}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-base font-bold text-slate-900">
                  Filtros de agentes
                </h2>

                {activeCount >
                  0 && (
                  <span
                    className={[
                      'inline-flex',
                      'min-w-5',
                      'items-center',
                      'justify-center',
                      'rounded-full',
                      'bg-slate-900',
                      'px-1.5',
                      'py-0.5',
                      'text-[10px]',
                      'font-bold',
                      'text-white',
                    ].join(' ')}
                  >
                    {activeCount}
                  </span>
                )}
              </div>

              <p className="mt-0.5 truncate text-xs text-slate-500">
                Refine os resultados da listagem
              </p>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar filtros"
              className={[
                'flex h-9 w-9',
                'shrink-0',
                'items-center',
                'justify-center',
                'rounded-xl',
                'text-slate-400',
                'transition-colors',
                'hover:bg-slate-100',
                'hover:text-slate-700',
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-slate-300',
              ].join(' ')}
            >
              <X size={18} />
            </button>
          )}
        </header>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <FilterSection
          title="Situação do agente"
          description="Filtre pela situação cadastral e pela disponibilidade operacional."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Status"
              icon={CircleDot}
              value={
                normalizedFilters.status
              }
              options={
                statusOptions
              }
              disabled={disabled}
              placeholder="Todos os status"
              onChange={(value) =>
                updateFilter(
                  'status',
                  value,
                )
              }
            />

            <SelectField
              label="Disponibilidade"
              icon={Sparkles}
              value={
                normalizedFilters.availability
              }
              options={
                availabilityOptions
              }
              disabled={disabled}
              placeholder="Todas"
              onChange={(value) =>
                updateFilter(
                  'availability',
                  value,
                )
              }
            />
          </div>
        </FilterSection>

        <FilterSection
          title="Vínculo profissional"
          description="Selecione o perfil, a agência e as especialidades do agente."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Tipo do agente"
              icon={UserRound}
              value={
                normalizedFilters.type
              }
              options={
                typeOptions
              }
              disabled={disabled}
              placeholder="Todos os tipos"
              onChange={(value) =>
                updateFilter(
                  'type',
                  value,
                )
              }
            />

            <SelectField
              label="Agência"
              icon={Building2}
              value={
                normalizedFilters.agencyId
              }
              options={
                agencies
              }
              disabled={disabled}
              placeholder="Todas as agências"
              onChange={(value) =>
                updateFilter(
                  'agencyId',
                  value,
                )
              }
            />
          </div>

          <div className="mt-4">
            <MultiSelectField
              label="Especialidades"
              icon={Sparkles}
              values={
                normalizedFilters.specialties
              }
              options={
                specialtyOptions
              }
              disabled={disabled}
              onChange={(values) =>
                updateFilter(
                  'specialties',
                  values,
                )
              }
            />
          </div>
        </FilterSection>

        <FilterSection
          title="Localização"
          description="Encontre agentes por estado, cidade ou região de atendimento."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Estado"
              icon={MapPin}
              value={
                normalizedFilters.state
              }
              options={
                stateOptions
              }
              disabled={disabled}
              placeholder="Todos os estados"
              onChange={(value) => {
                onChange?.({
                  ...normalizedFilters,
                  state: value,
                  city: '',
                });
              }}
            />

            {cities.length >
            0 ? (
              <SelectField
                label="Cidade"
                icon={MapPin}
                value={
                  normalizedFilters.city
                }
                options={cities}
                disabled={
                  disabled ||
                  !normalizedFilters.state
                }
                placeholder={
                  normalizedFilters.state
                    ? 'Todas as cidades'
                    : 'Selecione o estado'
                }
                onChange={(
                  value,
                ) =>
                  updateFilter(
                    'city',
                    value,
                  )
                }
              />
            ) : (
              <TextField
                label="Cidade"
                icon={MapPin}
                value={
                  normalizedFilters.city
                }
                disabled={disabled}
                placeholder="Digite a cidade"
                onChange={(
                  value,
                ) =>
                  updateFilter(
                    'city',
                    value,
                  )
                }
              />
            )}
          </div>

          <div className="mt-4">
            <TextField
              label="Região de atendimento"
              icon={Search}
              value={
                normalizedFilters.region
              }
              disabled={disabled}
              placeholder="Ex.: Centro, Região Metropolitana..."
              onChange={(value) =>
                updateFilter(
                  'region',
                  value,
                )
              }
            />
          </div>
        </FilterSection>

        <FilterSection
          title="Performance"
          description="Mostre apenas agentes que atingiram uma pontuação mínima."
        >
          <div>
            <FieldLabel
              icon={Sparkles}
              label="Performance mínima"
              optional
            />

            <div className="grid grid-cols-4 gap-2">
              {[
                {
                  value: '',
                  label: 'Todas',
                },
                {
                  value: '50',
                  label: '50+',
                },
                {
                  value: '70',
                  label: '70+',
                },
                {
                  value: '90',
                  label: '90+',
                },
              ].map(
                (option) => {
                  const active =
                    String(
                      normalizedFilters.minimumPerformance,
                    ) ===
                    option.value;

                  return (
                    <button
                      key={
                        option.value ||
                        'all'
                      }
                      type="button"
                      disabled={
                        disabled
                      }
                      onClick={() =>
                        updateFilter(
                          'minimumPerformance',
                          option.value,
                        )
                      }
                      className={[
                        'h-10',
                        'rounded-xl',
                        'border',
                        'text-xs',
                        'font-bold',
                        'transition-all',
                        'focus:outline-none',
                        'focus:ring-4',
                        'focus:ring-slate-100',
                        'disabled:cursor-not-allowed',
                        'disabled:opacity-50',

                        active
                          ? [
                              'border-slate-900',
                              'bg-slate-900',
                              'text-white',
                            ].join(
                              ' ',
                            )
                          : [
                              'border-slate-200',
                              'bg-white',
                              'text-slate-600',
                              'hover:border-slate-300',
                              'hover:bg-slate-50',
                            ].join(
                              ' ',
                            ),
                      ].join(' ')}
                    >
                      {option.label}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </FilterSection>
      </div>

      {showFooter && (
        <footer
          className={[
            'sticky bottom-0',
            'border-t',
            'border-slate-200',
            'bg-white/95',
            'p-4',
            'backdrop-blur',
          ].join(' ')}
        >
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={
                disabled ||
                activeCount === 0
              }
              onClick={
                handleReset
              }
              className={[
                'inline-flex h-11',
                'items-center',
                'justify-center',
                'gap-2',
                'rounded-xl',
                'border',
                'border-slate-200',
                'bg-white',
                'px-4',
                'text-sm',
                'font-semibold',
                'text-slate-700',
                'transition-colors',
                'hover:bg-slate-50',
                'disabled:cursor-not-allowed',
                'disabled:opacity-50',
              ].join(' ')}
            >
              <RotateCcw
                size={16}
              />

              Limpar filtros
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={() =>
                onApply?.(
                  normalizedFilters,
                )
              }
              className={[
                'inline-flex h-11',
                'items-center',
                'justify-center',
                'gap-2',
                'rounded-xl',
                'bg-slate-950',
                'px-5',
                'text-sm',
                'font-semibold',
                'text-white',
                'transition-colors',
                'hover:bg-slate-800',
                'disabled:cursor-not-allowed',
                'disabled:opacity-50',
              ].join(' ')}
            >
              <Check size={16} />

              Aplicar filtros
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}

export default AgentFilters;
