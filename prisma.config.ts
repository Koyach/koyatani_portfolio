import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// ローカル開発時のみ .env.local を読む（Vercelでは環境変数が自動注入される）
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
