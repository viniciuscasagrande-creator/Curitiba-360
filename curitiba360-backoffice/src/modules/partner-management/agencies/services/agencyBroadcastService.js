const CHANNEL_NAME =
  'curitiba360-agencies';

const MESSAGE_TYPES = {
  CREATED: 'agency-created',
  UPDATED: 'agency-updated',
  REMOVED: 'agency-removed',
  STATUS_CHANGED:
    'agency-status-changed',
  INVALIDATE: 'agency-invalidate',
  REALTIME_CONNECTED:
    'agency-realtime-connected',
};

function generateTabId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2),
  ].join('-');
}

const TAB_ID = generateTabId();

let channel = null;
const subscribers = new Set();

function isBroadcastSupported() {
  return (
    typeof window !== 'undefined' &&
    'BroadcastChannel' in window
  );
}

function getChannel() {
  if (!isBroadcastSupported()) {
    return null;
  }

  if (!channel) {
    channel =
      new BroadcastChannel(
        CHANNEL_NAME,
      );

    channel.addEventListener(
      'message',
      (event) => {
        const message =
          event.data;

        if (
          !message ||
          message.sourceTabId ===
            TAB_ID
        ) {
          return;
        }

        subscribers.forEach(
          (subscriber) => {
            try {
              subscriber(
                message,
              );
            } catch (error) {
              console.error(
                'Erro no subscriber do BroadcastChannel:',
                error,
              );
            }
          },
        );
      },
    );

    channel.addEventListener(
      'messageerror',
      (event) => {
        console.error(
          'Mensagem inválida recebida pelo BroadcastChannel.',
          event,
        );
      },
    );
  }

  return channel;
}

function publish(
  type,
  payload = {},
) {
  const activeChannel =
    getChannel();

  if (!activeChannel) {
    return false;
  }

  activeChannel.postMessage({
    type,
    payload,

    sourceTabId: TAB_ID,

    timestamp:
      new Date().toISOString(),
  });

  return true;
}

function subscribe(callback) {
  if (
    typeof callback !==
    'function'
  ) {
    throw new Error(
      'O callback da assinatura é inválido.',
    );
  }

  getChannel();

  subscribers.add(
    callback,
  );

  return () => {
    subscribers.delete(
      callback,
    );
  };
}

function close() {
  if (channel) {
    channel.close();
    channel = null;
  }

  subscribers.clear();
}

export const agencyBroadcastService = {
  MESSAGE_TYPES,

  isSupported:
    isBroadcastSupported,

  publish,

  subscribe,

  close,

  publishCreated(agency) {
    return publish(
      MESSAGE_TYPES.CREATED,
      {
        agency,
      },
    );
  },

  publishUpdated(agency) {
    return publish(
      MESSAGE_TYPES.UPDATED,
      {
        agency,
      },
    );
  },

  publishRemoved(agencyId) {
    return publish(
      MESSAGE_TYPES.REMOVED,
      {
        agencyId,
      },
    );
  },

  publishStatusChanged(
    agencyId,
    status,
  ) {
    return publish(
      MESSAGE_TYPES.STATUS_CHANGED,
      {
        agencyId,
        status,
      },
    );
  },

  publishInvalidate(
    reason = 'manual',
  ) {
    return publish(
      MESSAGE_TYPES.INVALIDATE,
      {
        reason,
      },
    );
  },
};

export default agencyBroadcastService;
