import { db } from "@/lib/db/drizzle";
import { UserAnswer } from "@/lib/models/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, {params}:{params: {questionId: string}})=>{
    try {

        const clerkId = (await params).questionId;

        const userData = await db.select().from(UserAnswer).where(eq(UserAnswer.clerkId, clerkId)).orderBy(desc(UserAnswer.id));

        if(!userData){
            return NextResponse.json({ message: "Questions not found", error: true, success: false }, { status: 400 });
        }

        return NextResponse.json({ message: "", userData, error: false, success: true }, { status: 200 });
        
    } catch (error) {
        console.log('[questions_questionId_GET]', error);
        return NextResponse.json({ message: "Internal Sever Error", error: true, success: false }, { status: 500 });
    }
}