import { test, expect } from '../../src/fixtures';
import { UserFactory } from '../../src/data/factories';

test.describe('ReqRes User API', () => {

  test.describe('GET /api/users', () => {
    test('should return a list of users with correct pagination', async ({ userAPI }) => {
      const response = await userAPI.getUsers(1);

      expect(response.page).toBe(1);
      expect(response.per_page).toBeGreaterThan(0);
      expect(response.total).toBeGreaterThan(0);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);
    });

    test('should return users with correct shape', async ({ userAPI }) => {
      const response = await userAPI.getUsers(1);
      const user = response.data[0];

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
      expect(user).toHaveProperty('avatar');
    });
  });

  test.describe('GET /api/users/:id', () => {
    test('should return a single user by id', async ({ userAPI }) => {
      const response = await userAPI.getUserById(1);

      expect(response.data.id).toBe(1);
      expect(response.data.email).toBeTruthy();
    });

    test('should return 404 for non-existent user', async ({ userAPI }) => {
      const statusCode = await userAPI.getUserStatus(9999);
      expect(statusCode).toBe(404);
    });
  });

  test.describe('POST /api/users', () => {
    test('should create a new user with random data', async ({ userAPI }) => {
      const payload = UserFactory.create();
      const response = await userAPI.createUser(payload);

      expect(response.id).toBeTruthy();
      expect(response.email).toBe(payload.email);
    });

    test('should create a user with overridden email', async ({ userAPI }) => {
      const payload = UserFactory.create({ email: 'fixed@reqres.in' });
      const response = await userAPI.createUser(payload);

      expect(response.email).toBe('fixed@reqres.in');
    });

    test('should create multiple users', async ({ userAPI }) => {
      const users = UserFactory.createMany(3);

      expect(users).toHaveLength(3);
      // each user should have a unique email
      const emails = users.map(u => u.email);
      const uniqueEmails = new Set(emails);
      expect(uniqueEmails.size).toBe(3);
    });
  });

  test.describe('PUT /api/users/:id', () => {
    test('should update a user with random data', async ({ userAPI }) => {
      const payload = UserFactory.partial({ firstName: 'Fixed' });
      const response = await userAPI.updateUser(1, payload);

      expect(response.firstName).toBe('Fixed');
      console.log('Updated user:', response);
    });
  });

  test.describe('DELETE /api/users/:id', () => {
    test('should delete a user and return 204', async ({ userAPI }) => {
      const statusCode = await userAPI.deleteUser(1);
      expect(statusCode).toBe(204);
    });
  });

  test.describe('PATCH /api/users/:id', () => {
    test('should partially update a user with only firstName', async ({ userAPI }) => {
      const beforeUser = await userAPI.getUserById(1);
      console.log('Before user:', beforeUser);
      console.log('<------------------------->');
      const payload = UserFactory.createForPatch({ firstName: 'Patched' });
      const response = await userAPI.patchUser(1, payload);

      expect(response.firstName).toBe('Patched');
      const updatedUser = await userAPI.getUserById(1);
      console.log('Patched user:', updatedUser);
    });

  });

});