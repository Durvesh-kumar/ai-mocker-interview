import { db } from "@/lib/db/drizzle";
import { MockerInterview } from "@/lib/models/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
     try {
        const { clerkId } = await req.json();

        const interviews = await db.select().from(MockerInterview).where(eq(MockerInterview.clerkId, clerkId)).orderBy(desc(MockerInterview.id));

        if(!interviews){
            return NextResponse.json({ message: "Interview not found", error: true, success: false }, { status: 400 });
        }

        return NextResponse.json({ message: "", interviews, error: false, success: true }, { status: 200 });

     } catch (error) {
        console.log('[api_interview_POST]', error);
        return NextResponse.json({ message: "Internal Sever Error", error: true, success: false }, { status: 500 });
     }
}