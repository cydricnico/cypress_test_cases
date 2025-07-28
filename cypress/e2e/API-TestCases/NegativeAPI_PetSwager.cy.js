describe('PetStore API - Negative Test Cases', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';

  it('GET - 404 Not Found for non-existent user', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/user/nonexistentuser123`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.message).to.eq('User not found');
    });
  });

  it('POST - 400 Bad Request with malformed JSON', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/user`,
      body: "invalid_payload", // not valid JSON
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('PUT - 200 OK or 404 Not Found when updating a non-existent user', () => {
    const fakeUser = {
      id: 2002,
      username: 'fakeuser123',
      firstName: 'Fake',
      lastName: 'User',
      email: 'fake@example.com',
      password: 'fakepass',
      phone: '1234567890',
      userStatus: 1
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/user/${fakeUser.username}`,
      body: fakeUser,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      expect([200, 404]).to.include(res.status);
    });
  });

  it('DELETE - 200 OK or 404 Not Found when deleting a non-existent user', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/user/ghostuser`,
      failOnStatusCode: false
    }).then((res) => {
      expect([200, 404]).to.include(res.status);
    });
  });

  it('GET - 404 or 405 Method Not Allowed on /user root endpoint', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/user`, // Shouldn't be allowed
      failOnStatusCode: false
    }).then((res) => {
      expect([404, 405]).to.include(res.status);
    });
  });
});
