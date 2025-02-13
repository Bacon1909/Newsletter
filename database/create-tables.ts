import { getClient } from "../src/db/db";

const runner = async () => {
  const db = getClient();
  await db.connect();

  await db.query(`
DROP TABLE IF EXISTS subscriber_newsletter;
DROP TABLE IF EXISTS subscriber;
DROP TABLE IF EXISTS newsletter;
DROP TABLE IF EXISTS testTable;


CREATE TABLE "subscriber" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "phone" VARCHAR(20)
);

CREATE TABLE "newsletter" (
  "id" SERIAL PRIMARY KEY,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "author" VARCHAR(255),
  "category" VARCHAR(255) NOT NULL,
  "content" TEXT NOT NULL
);

CREATE TABLE "subscriber_newsletter" (
  "id" SERIAL PRIMARY KEY,
  "newsletter" INTEGER NOT NULL,
  "subscriber" INTEGER NOT NULL,
  FOREIGN KEY ("newsletter") REFERENCES "newsletter" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("subscriber") REFERENCES "subscriber" ("id") ON DELETE CASCADE
);`);
  await db.end();
};

runner();
