import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { user } from "./user.model";
import { task } from "./task.model";

export const communication = pgTable("communication", {
    id: serial().primaryKey(),
    message: text().notNull(),
    userId: integer("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    taskId: integer("task_id").notNull().references(() => task.id, { onDelete: "cascade" })
})