const DEFAULT_OPTIONS = {
  initialDelay: 1000,
  maximumDelay: 30000,
  multiplier: 2,
  jitter: 0.25,
  maximumAttempts: 8,
};

function normalizeNumber(
  value,
  fallback,
) {
  const number =
    Number(value);

  return Number.isFinite(number) &&
    number >= 0
    ? number
    : fallback;
}

export function createRealtimeBackoff(
  options = {},
) {
  const configuration = {
    initialDelay:
      normalizeNumber(
        options.initialDelay,
        DEFAULT_OPTIONS.initialDelay,
      ),

    maximumDelay:
      normalizeNumber(
        options.maximumDelay,
        DEFAULT_OPTIONS.maximumDelay,
      ),

    multiplier:
      normalizeNumber(
        options.multiplier,
        DEFAULT_OPTIONS.multiplier,
      ),

    jitter:
      normalizeNumber(
        options.jitter,
        DEFAULT_OPTIONS.jitter,
      ),

    maximumAttempts:
      normalizeNumber(
        options.maximumAttempts,
        DEFAULT_OPTIONS.maximumAttempts,
      ),
  };

  let attempt = 0;
  let timeoutId = null;

  function calculateDelay() {
    const exponentialDelay =
      configuration.initialDelay *
      configuration.multiplier **
        attempt;

    const cappedDelay =
      Math.min(
        exponentialDelay,
        configuration.maximumDelay,
      );

    const variation =
      cappedDelay *
      configuration.jitter;

    const minimum =
      cappedDelay - variation;

    const maximum =
      cappedDelay + variation;

    return Math.round(
      minimum +
        Math.random() *
          (maximum - minimum),
    );
  }

  function canRetry() {
    return (
      attempt <
      configuration.maximumAttempts
    );
  }

  function schedule(callback) {
    if (
      typeof callback !==
      'function'
    ) {
      throw new Error(
        'O callback da reconexão é inválido.',
      );
    }

    if (!canRetry()) {
      return {
        scheduled: false,
        attempt,
        delay: null,
      };
    }

    cancel();

    const delay =
      calculateDelay();

    attempt += 1;

    timeoutId =
      window.setTimeout(
        () => {
          timeoutId = null;
          callback({
            attempt,
            delay,
          });
        },
        delay,
      );

    return {
      scheduled: true,
      attempt,
      delay,
    };
  }

  function reset() {
    cancel();
    attempt = 0;
  }

  function cancel() {
    if (timeoutId !== null) {
      window.clearTimeout(
        timeoutId,
      );

      timeoutId = null;
    }
  }

  function getState() {
    return {
      attempt,
      canRetry:
        canRetry(),

      maximumAttempts:
        configuration.maximumAttempts,

      isScheduled:
        timeoutId !== null,
    };
  }

  return {
    schedule,
    reset,
    cancel,
    canRetry,
    getState,
  };
}

export default createRealtimeBackoff;
