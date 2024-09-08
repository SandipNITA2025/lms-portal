const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.$connect();
    await db.category.createMany({
      data: [
        {
          name: "Development",
        },
        {
          name: "Engineering",
        },
        {
          name: "Marketing",
        },
        {
          name: "Fitness",
        },
        {
          name: "Music",
        },
        {
          name: "Photography",
        },
        {
          name: "Videography",
        },
      ],
    });
    console.log("Seeded successfully");
  } catch (error) {
    console.log("Error while seeding: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
