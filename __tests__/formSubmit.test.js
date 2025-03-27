const fetchMock = require('jest-fetch-mock');

beforeEach(() => {
  fetchMock.resetMocks();
  global.fetch = fetchMock; // 🔥 linha essencial!
});

test('deve enviar os dados do formulário com sucesso', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ id: 1 }));

  const nome = 'Gabi';
  const email = 'gabi@email.com';

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  });

  expect(fetchMock).toHaveBeenCalledWith(
    'https://jsonplaceholder.typicode.com/posts',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    })
  );

  const data = await response.json();
  expect(data.id).toBe(1);
});
