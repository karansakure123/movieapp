import { defineConfig } from "@prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  enableTracing: false,
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
});
