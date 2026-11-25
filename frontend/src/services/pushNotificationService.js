export async function requestPushPermission() {
  if (!('Notification' in window)) {
    return false;
  }
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function sendLocalPushNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/icons/icon-192.png'
    });
  }
}
