import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

function calculateSeconds(
  expiresAt
) {
  if (!expiresAt) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(
      (new Date(expiresAt).getTime() -
        Date.now()) /
        1000
    )
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(
    seconds / 60
  );

  const remainingSeconds =
    seconds % 60;

  return `${String(minutes).padStart(
    2,
    "0"
  )}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default function PixExpirationTimer({
  expiresAt,
  onExpire,
}) {
  const [seconds, setSeconds] =
    useState(() =>
      calculateSeconds(expiresAt)
    );

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        const nextSeconds =
          calculateSeconds(expiresAt);

        setSeconds(nextSeconds);

        if (nextSeconds <= 0) {
          window.clearInterval(
            interval
          );

          onExpire?.();
        }
      }, 1000);

    return () =>
      window.clearInterval(interval);
  }, [expiresAt, onExpire]);

  const formatted = useMemo(
    () => formatTime(seconds),
    [seconds]
  );

  return (
    <div className="rounded-2xl bg-amber-50 p-4 text-center select-none">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-700 my-0">
        Tempo restante para pagar
      </p>

      <p className="mt-2 text-3xl font-bold tabular-nums text-amber-900 my-0">
        {formatted}
      </p>
    </div>
  );
}
