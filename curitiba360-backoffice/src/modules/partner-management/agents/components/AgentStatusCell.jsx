import {
  AgentAvailabilityBadge,
} from './AgentAvailabilityBadge';

import {
  AgentStatusBadge,
} from './AgentStatusBadge';

export function AgentStatusCell({
  status,
  availability,
  compact = false,
}) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <AgentStatusBadge
          status={status}
          size="small"
        />

        <AgentAvailabilityBadge
          availability={
            availability
          }
          compact
        />
      </div>
    );
  }

  return (
    <div className="flex min-w-[150px] flex-col items-start gap-1.5">
      <AgentStatusBadge
        status={status}
        size="small"
      />

      <AgentAvailabilityBadge
        availability={
          availability
        }
        compact
      />
    </div>
  );
}

export default AgentStatusCell;
