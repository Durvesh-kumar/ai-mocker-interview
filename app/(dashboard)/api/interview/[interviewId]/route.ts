import { db } from "@/lib/db/drizzle";
import { MockerInterview } from "@/lib/models/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params:{ interviewId: string } }) => {

    const mockId = decodeURIComponent((await params).interviewId);

    try {
        const userData = await db.select().from(MockerInterview).where(eq(MockerInterview.mockId, mockId));
        
        if (!userData) {
            return NextResponse.json({ message: "Data not found", error: true, success: false }, { status: 400 });
        }
        
        return NextResponse.json({ message: "successfully", userData, error: false, success: true }, { status: 200 });

    } catch (error) {
        console.log('[interview_interviewId_GET]', error);
        return NextResponse.json({ message: "Internal Sever Error", error: true, success: false }, { status: 500 });
    }
};