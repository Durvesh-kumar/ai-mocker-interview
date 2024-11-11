import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"

export const MockerInterview = pgTable('mockerInterview', {
    id: serial('id').primaryKey(),
    mockResponse: text('mockResponse').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDes: varchar('jobDes').notNull().notNull(),
    jobExprience: varchar('jobExprience').notNull(),
    clerkId: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull().unique(),
});


export const UserAnswer = pgTable('UserAnswer',{
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    userAnswer: text('userAnswer'),
    currectAnswer: text('currectAnswer'),
    rating: varchar('rating'),
    clerkId: varchar('clerkId').unique(),
    feedback: text('feedback'),
    createdAt: varchar('createdAt')
});

export const Subscription = pgTable('Subscription', {
    id: serial('id').primaryKey(),
    userEmail: varchar('userEmail').unique(),
    clerkId: varchar('clerkId').unique(),
    purchaseDate: varchar('currentStart'),
    subEnd: varchar('subEnd'),
    stripeSubId: varchar('stripeSubId').notNull()
})