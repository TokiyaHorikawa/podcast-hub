/*
  Warnings:

  - Added the required column `userId` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- First, create a default user if not exists
INSERT INTO "User" ("uid", "name", "email")
SELECT 'default-user', 'Default User', 'default@example.com'
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE "uid" = 'default-user');

-- Get the default user's ID
DO $$
DECLARE
    default_user_id INTEGER;
BEGIN
    SELECT id INTO default_user_id FROM "User" WHERE "uid" = 'default-user' LIMIT 1;

    -- Add the userId column with a default value
    ALTER TABLE "Content" ADD COLUMN "userId" INTEGER;

    -- Update existing records to use the default user
    UPDATE "Content" SET "userId" = default_user_id WHERE "userId" IS NULL;

    -- Make the column required
    ALTER TABLE "Content" ALTER COLUMN "userId" SET NOT NULL;

    -- Add the foreign key constraint
    ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
END $$;
