import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.model";

export const task = pgTable("task", {
    id: serial().primaryKey(),
    title: text().notNull(),
    desc: text(),
    hero: text(),
    complete: boolean(),
    due: timestamp(),
    completeDate: timestamp(),
    //               👇key name(give anything)             👇 refrence table name
    userId: integer("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
    //                                                                            ☝ if I delete user it will automatic delete user task from db
})