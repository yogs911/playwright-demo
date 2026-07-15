import { faker } from '@faker-js/faker';
import { CreateUserPayload, UpdateUserPayload, UserCredentials } from '../../types';

export class UserFactory {
    // Create a full user payload with random data
    static create(overrides?: Partial<CreateUserPayload>): CreateUserPayload {
        return {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12 }),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            ...overrides,
        };
    }

    // Create multiple users at once
    static createMany(count: number, overrides?: Partial<CreateUserPayload>): CreateUserPayload[] {
        return Array.from({ length: count }, () => UserFactory.create(overrides));
    }

    // Create just credentials for login tests
    static credentials(overrides?: Partial<UserCredentials>): UserCredentials {
        return {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12 }),
            ...overrides,
        };
    }

    // Create a partial payload for PATCH tests
    static partial(overrides?: Partial<UpdateUserPayload>): UpdateUserPayload {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12 }),
            ...overrides,  // overrides win — can replace or remove any field
        };
    }

    static createForPatch(overrides: Partial<UpdateUserPayload>): UpdateUserPayload {
        return { ...overrides };
    }
}