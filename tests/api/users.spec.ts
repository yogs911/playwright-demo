import { test, expect } from '../../src/fixtures';
import { UserFactory } from '../../src/data/factories';
import * as allure from 'allure-js-commons'

test.describe('ReqRes User API', () => {

  test.describe('GET /api/users', () => {
    test('should return a list of users with correct pagination', async ({ userAPI }) => {
      await allure.owner('QA Team');
      await allure.severity('critical');
      await allure.tags('api', 'users', 'smoke');

      const response = await allure.step('Fetch users list', async () => {
        return userAPI.getUsers(1);
      });

      await allure.step('Verify pagination fields', async () => {
        expect(response.page).toBe(1);
        expect(response.per_page).toBeGreaterThan(0);
        expect(response.total).toBeGreaterThan(0);
        expect(response.data).toBeInstanceOf(Array);
        expect(response.data.length).toBeGreaterThan(0);
      });
    });

    test('should return users with correct shape', async ({ userAPI }) => {
      await allure.severity('normal');
      await allure.tags('api', 'users', 'regression');

      const response = await allure.step('Fetch users list', async () => {
        return userAPI.getUsers(1);
      });

      await allure.step('Verify user object shape', async () => {
        const user = response.data[0];
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('first_name');
        expect(user).toHaveProperty('last_name');
        expect(user).toHaveProperty('avatar');
      });
    });
  });

  test.describe('GET /api/users/:id', () => {
    test('should return a single user by id', async ({ userAPI }) => {
      await allure.severity('critical');
      await allure.tags('api', 'users', 'smoke');

      const response = await allure.step('Fetch user by id', async () => {
        return userAPI.getUserById(1);
      });

      await allure.step('Verify user data', async () => {
        expect(response.data.id).toBe(1);
        expect(response.data.email).toBeTruthy();
      });
    });

    test('should return 404 for non-existent user', async ({ userAPI }) => {
      await allure.severity('normal');
      await allure.tags('api', 'users', 'regression');

      const statusCode = await allure.step('Fetch non-existent user', async () => {
        return userAPI.getUserStatus(9999);
      });

      await allure.step('Verify 404 status', async () => {
        expect(statusCode).toBe(404);
      });
    });
  });

  test.describe('POST /api/users', () => {
    test('should create a new user with random data', async ({ userAPI }) => {
      await allure.severity('critical');
      await allure.tags('api', 'users', 'regression');

      const payload = await allure.step('Generate user payload', async () => {
        return UserFactory.create();
      });

      const response = await allure.step('Create user via API', async () => {
        return userAPI.createUser(payload);
      });

      await allure.step('Verify created user', async () => {
        expect(response.id).toBeTruthy();
        expect(response.email).toBe(payload.email);
      });
    });
  });

  test.describe('PUT /api/users/:id', () => {
    test('should update a user with random data', async ({ userAPI }) => {
      await allure.severity('normal');
      await allure.tags('api', 'users', 'regression');

      const payload = await allure.step('Generate update payload', async () => {
        return UserFactory.partial({ firstName: 'Fixed' });
      });

      const response = await allure.step('Update user via PUT', async () => {
        return userAPI.updateUser(1, payload);
      });

      await allure.step('Verify updated fields', async () => {
        expect(response.firstName).toBe(payload.firstName);
      });
    });
  });

  test.describe('DELETE /api/users/:id', () => {
    test('should delete a user and return 204', async ({ userAPI }) => {
      await allure.severity('critical');
      await allure.tags('api', 'users', 'regression');

      const statusCode = await allure.step('Delete user', async () => {
        return userAPI.deleteUser(1);
      });

      await allure.step('Verify deletion status', async () => {
        expect(statusCode).toBe(204);
      });
    });
  });

  test.describe('PATCH /api/users/:id', () => {
    test('should partially update a user with only firstName', async ({ userAPI }) => {
      await allure.severity('critical');
      await allure.tags('api', 'users', 'regression');
      const payload =  UserFactory.createForPatch({ firstName: 'Patched' });

      const response = await allure.step('Get patch user response', async () => {
         return userAPI.patchUser(1, payload)});

      await allure.step('Verify user after patch', async () => expect(response.firstName).toBe('Patched'));
    });

  });
});