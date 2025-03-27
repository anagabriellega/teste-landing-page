const { isValidEmail } = require('../emailValidator');

describe('Validação de e-mail', () => {
  test('deve aceitar um e-mail válido', () => {
    expect(isValidEmail('teste@email.com')).toBe(true);
  });

  test('deve rejeitar e-mails sem @', () => {
    expect(isValidEmail('testeemail.com')).toBe(false);
  });

  test('deve rejeitar e-mails sem domínio', () => {
    expect(isValidEmail('teste@')).toBe(false);
  });

  test('deve rejeitar e-mails com espaços', () => {
    expect(isValidEmail('teste @email.com')).toBe(false);
  });
});
