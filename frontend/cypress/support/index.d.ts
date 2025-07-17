declare namespace Cypress {
  interface Chainable {
    resetTestUser(): Chainable<void>;
    seedTestUser(options?: {
      email?: string;
      password?: string;
      name?: string;
    }): Chainable<void>;
  }
}
