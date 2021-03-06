# Migration `20201129010110-sets-default-values-for-solution`

This migration has been generated by Sufyan Khan at 11/28/2020, 8:01:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Solution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "body" TEXT NOT NULL,
    "graded" BOOLEAN NOT NULL DEFAULT false,
    "grade" INTEGER,
    "endorsed" BOOLEAN NOT NULL DEFAULT false,
    "problemId" INTEGER NOT NULL,
    "userId" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Solution" ("id", "createdAt", "updatedAt", "body", "graded", "grade", "endorsed", "problemId", "userId", "completed") SELECT "id", "createdAt", "updatedAt", "body", "graded", "grade", "endorsed", "problemId", "userId", "completed" FROM "Solution";
DROP TABLE "Solution";
ALTER TABLE "new_Solution" RENAME TO "Solution";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201129005130-adds-completed-bool-to-solution..20201129010110-sets-default-values-for-solution
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -66,13 +66,13 @@
   id        Int      @default(autoincrement()) @id
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   body      String   
-  graded    Boolean  
-  grade     Int      
-  endorsed  Boolean  
+  graded    Boolean  @default(false)
+  grade     Int?      
+  endorsed  Boolean  @default(false)
   problem   Problem  @relation(fields: [problemId], references: [id])
   problemId Int      
-  user      User?     @relation(fields: [userId], references: [id])
+  user      User?    @relation(fields: [userId], references: [id])
   userId    Int?      
-  completed Boolean
+  completed Boolean  @default(false) 
 }
```


