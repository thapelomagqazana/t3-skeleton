export const validUsers = {
  TC001: { name: 'John Doe', email: 'john@example.com', password: 'secret123' },
  TC002: { name: 'Jane', email: 'JANE@EXAMPLE.COM', password: 'pass1234' },
};

export const invalidUsers = {
  TC101: { email: 'test@example.com', password: 'secret123' },
  TC102: { name: 'Test User', password: 'secret123' },
  TC103: { name: 'Test User', email: 'test@example.com' },
  TC104: { name: 'Test', email: 'notanemail', password: 'secret123' },
  TC105: { name: 'Test', email: 'short@example.com', password: 'abc' },
  TC106: { name: 'Test', email: 'existing@example.com', password: 'secret123' },
  TC107: { name: 'Test', email: 'test@example.com', password: 'secret123', role: 'admin' },
};

export const edgeUsers = {
  TC201: { name: "A", email: "a@example.com", password: "secret123" },
  TC202: { name: "Edge", email: "edge@example.com", password: "123456" },
  TC203: { name: "Special", email: "spe@cial.com", password: "P@ssw0rd!" },
  TC204: { name: " Trim ", email: " trim@example.com ", password: "pass1234" },
};

export const cornerUsers = {
  TC301: { name: "", email: "", password: "" },
  TC302: { name: null, email: null, password: null },
  TC303: { name: "A".repeat(40), email: "long@example.com", password: "secret123" },
  TC304: { name: "Hacker", email: "' OR 1=1--", password: "hackpass" },
  TC305: { name: "<script>alert(1)</script>", email: "safe@example.com", password: "secure123" },
};
