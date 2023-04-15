export function generateAuthError(message) {
  switch (message) {
    case 'EMAIL_NOT_FOUND':
      return 'Некорректный Email'
    case 'INVALID_PASSWORD':
      return 'Некорректный пароль'
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким Email уже существует'
    default:
      return 'Слишком много попыток входа. Повторите позднее.'
  }
}
