import prisma from '../../src/db';
import bcrypt from 'bcryptjs';

const TEST_USER_EMAILS = [
  'john@example.com',
  'jane@example.com', // normalized lowercase
  'test@example.com',
  'short@example.com',
  'notanemail',
  'existing@example.com',
  'a@example.com',
  'edge@example.com',
  'spe@cial.com',
  'trim@example.com',
  'long@example.com',
  "' OR 1=1--",
  'safe@example.com',
];

export const clearTestUsers = async () => {
  await prisma.user.deleteMany({
    where: {
      email: {
        in: TEST_USER_EMAILS.map(email => email.toLowerCase()),
      },
    },
  });
};

export const seedUser = async (email = 'existing@example.com', password = 'secret123') => {
  const hashedPassword =
    process.env.SKIP_HASH === 'true' ? password : await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Existing User',
      email,
      password: hashedPassword,
    },
  });
};