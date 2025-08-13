import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const pw = await bcrypt.hash('password123', 10);
  const user1 = await prisma.user.create({
    data: {
      name: 'Paras Kori',
      email: 'paras@example.com',
      password: pw,
      todos: {
        create: [
          {
            title: 'Finish project proposal',
            description:
              'Complete the draft for the new product launch proposal.',
            priority: 'high',
            dueDate: new Date('2025-08-15T17:00:00Z'),
          },
          {
            title: 'Grocery shopping',
            description: 'Buy milk, eggs, bread, and vegetables.',
            status: 'completed',
            priority: 'medium',
            dueDate: new Date('2025-08-10T10:00:00Z'),
          },
          {
            title: 'Team code review',
            description: 'Review PRs from frontend and backend teams.',
            priority: 'medium',
            dueDate: new Date('2025-08-13T15:00:00Z'),
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Alice Doe',
      email: 'alice@example.com',
      password: pw,
      todos: {
        create: [
          {
            title: 'Schedule dentist appointment',
            description: 'Book an appointment for next week.',
            priority: 'low',
          },
          {
            title: 'Clean workspace',
            description: 'Organize desk and remove unnecessary items.',
            status: 'completed',
            priority: 'low',
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: pw,
      todos: {
        create: [
          {
            title: 'Prepare presentation slides',
            priority: 'high',
            dueDate: new Date('2025-08-12T14:00:00Z'),
          },
          { title: 'Update resume', priority: 'medium' },
          { title: 'Backup laptop files', priority: 'medium' },
        ],
      },
    },
  });

  console.log('Seeded:', {
    user1: user1.email,
    user2: user2.email,
    user3: user3.email,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
