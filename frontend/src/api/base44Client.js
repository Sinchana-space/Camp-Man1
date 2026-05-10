// Fallback mock database when Base44 backend is not available
const mockDb = {
  auth: {
    isAuthenticated: async () => false,
    me: async () => null
  },
  entities: new Proxy({}, {
    get: () => ({
      filter: async () => [],
      get: async () => null,
      create: async () => ({}),
      update: async () => ({}),
      delete: async () => ({})
    })
  }),
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: '' })
    }
  }
};

// Use global Base44 database if available, otherwise use mock
export const db = typeof globalThis !== 'undefined' && globalThis.__B44_DB__ 
  ? globalThis.__B44_DB__ 
  : mockDb;

export const base44 = db;
export default db;