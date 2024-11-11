import { db } from "@/lib/db/drizzle";
import { UserAnswer } from "@/lib/models/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest,{params}:{params: Promise<{interviewId: string}>})=>{
    try {
        const mockId = (await params).interviewId;

        const questionsAndAnswers = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, mockId)).orderBy(UserAnswer.id);

        if(!questionsAndAnswers){
            return NextResponse.json({message: "Interview Answer and Questions not found", error:true, success:false}, {status: 402})
        }

        return NextResponse.json({message: "", questionsAndAnswers, error:false, success:true}, {status: 200})
        
    } catch (error) {
        console.log("[interview_interviewId_feedback_GET]", error);
        return NextResponse.json({message: "Internal Server Error",  error:true, success:false}, {status: 500})
    }
}