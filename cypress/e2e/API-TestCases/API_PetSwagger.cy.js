import 'cypress-plugin-api';

describe('PetStore User API Tests using different methods', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';
  const username = 'testuser123';

  const user = {
    id: 1001,
    username: username,
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: 'password123',
    phone: '1234567890',
    userStatus: 1
  };

  it('Create a new user successfully', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/user`,
      body: user,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq(String(user.id));
    });
  });

  it('Update user information successfully', () => {
    const updatedUser = { ...user, firstName: 'Updated', email: 'updated@example.com' };

    cy.api({
      method: 'PUT',
      url: `${baseUrl}/user/${username}`,
      body: updatedUser,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('Fetch user by username successfully', () => {
    cy.api({
      method: 'GET',
      url: `${baseUrl}/user/${username}`,
      failOnStatusCode: false 
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.username).to.eq(username);
      expect(res.body.email).to.eq(user.email);
    });
  });

  it('Login user with query parameters successfully', () => {
    cy.api({
      method: 'GET',
      url: `${baseUrl}/user/login`,
      qs: {
        username: username,
        password: user.password
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.include('logged in user session');
    });
  });

  it('Logout user successfully', () => {
    cy.api(`${baseUrl}/user/logout`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('Remove user successfully', () => {
    cy.api({
      method: 'DELETE',
      url: `${baseUrl}/user/${username}`
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
