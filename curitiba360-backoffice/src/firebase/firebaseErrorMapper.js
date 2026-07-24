const FIREBASE_ERROR_MESSAGES = {
  'auth/invalid-credential':
    'E-mail ou senha inválidos.',

  'auth/user-not-found':
    'Usuário não encontrado.',

  'auth/wrong-password':
    'E-mail ou senha inválidos.',

  'auth/email-already-in-use':
    'Este e-mail já está cadastrado.',

  'auth/weak-password':
    'A senha informada é muito fraca.',

  'auth/invalid-email':
    'Informe um e-mail válido.',

  'auth/too-many-requests':
    'Muitas tentativas foram realizadas. Tente novamente em alguns minutos.',

  'auth/network-request-failed':
    'Não foi possível conectar ao servidor. Verifique sua internet.',

  'auth/requires-recent-login':
    'Por segurança, entre novamente antes de realizar esta operação.',

  'permission-denied':
    'Você não possui permissão para realizar esta operação.',

  'firestore/permission-denied':
    'Você não possui permissão para acessar esses dados.',

  'firestore/unavailable':
    'O banco de dados está temporariamente indisponível.',

  'firestore/not-found':
    'O registro solicitado não foi encontrado.',

  'firestore/already-exists':
    'Este registro já existe.',

  'firestore/failed-precondition':
    'A operação não pôde ser realizada no estado atual.',

  'storage/unauthorized':
    'Você não possui permissão para acessar este arquivo.',

  'storage/object-not-found':
    'O arquivo solicitado não foi encontrado.',

  'storage/canceled':
    'O envio do arquivo foi cancelado.',

  'storage/retry-limit-exceeded':
    'O tempo limite do envio foi excedido.',

  'storage/invalid-checksum':
    'O arquivo enviado está corrompido.',

  'storage/quota-exceeded':
    'O limite de armazenamento foi atingido.',

  'storage/invalid-format':
    'O formato do arquivo não é permitido.',

  'storage/unknown':
    'Ocorreu um erro inesperado ao processar o arquivo.',
};

export function mapFirebaseError(
  error,
  fallbackMessage = 'Ocorreu um erro inesperado.',
) {
  if (!error) {
    return new Error(fallbackMessage);
  }

  const code = String(
    error.code || '',
  ).replace(/^FirebaseError:\s*/, '');

  const message =
    FIREBASE_ERROR_MESSAGES[code] ||
    FIREBASE_ERROR_MESSAGES[
      code.replace(/^firebase\//, '')
    ] ||
    fallbackMessage;

  const mappedError =
    new Error(message);

  mappedError.code =
    error.code || 'unknown';

  mappedError.originalError =
    error;

  return mappedError;
}

export function getFirebaseErrorMessage(
  error,
  fallbackMessage,
) {
  return mapFirebaseError(
    error,
    fallbackMessage,
  ).message;
}
