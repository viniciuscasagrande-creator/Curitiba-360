import { UserRound } from 'lucide-react';

import { getAgentInitials } from '../utils';

const SIZE_CLASSES = {
  small: {
    container: 'h-8 w-8 rounded-lg',
    text: 'text-[11px]',
    icon: 15,
  },

  default: {
    container: 'h-10 w-10 rounded-xl',
    text: 'text-xs',
    icon: 18,
  },

  large: {
    container: 'h-12 w-12 rounded-2xl',
    text: 'text-sm',
    icon: 21,
  },

  extraLarge: {
    container: 'h-16 w-16 rounded-2xl',
    text: 'text-lg',
    icon: 26,
  },
};

export function AgentAvatar({
  name,
  avatarUrl,
  size = 'default',
  className = '',
}) {
  const configuration =
    SIZE_CLASSES[size] ||
    SIZE_CLASSES.default;

  const initials =
    getAgentInitials(name);

  return (
    <div
      className={[
        'relative flex shrink-0',
        'items-center justify-center',
        'overflow-hidden',
        'border border-slate-200',
        'bg-gradient-to-br',
        'from-slate-100 to-slate-200',
        'font-bold text-slate-700',
        configuration.container,
        configuration.text,
        className,
      ].join(' ')}
      aria-label={
        name
          ? `Avatar de ${name}`
          : 'Avatar do agente'
      }
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={
            name
              ? `Foto de ${name}`
              : 'Foto do agente'
          }
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display =
              'none';

            const fallback =
              event.currentTarget
                .nextElementSibling;

            if (fallback) {
              fallback.classList.remove(
                'hidden',
              );
            }
          }}
        />
      ) : null}

      <span
        className={[
          'select-none',
          avatarUrl ? 'hidden' : '',
        ].join(' ')}
      >
        {name ? (
          initials
        ) : (
          <UserRound
            size={
              configuration.icon
            }
          />
        )}
      </span>
    </div>
  );
}

export default AgentAvatar;
