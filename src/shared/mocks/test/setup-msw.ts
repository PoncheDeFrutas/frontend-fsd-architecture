import { server } from "@/shared/mocks/server";

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers after each test (so tests don't leak state)
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
