import { db } from "@/lib/db/drizzle";
import { chatSession } from "@/lib/GeminiAIModels";
import { MockerInterview, UserAnswer } from "@/lib/models/schema";
import { eq } from "drizzle-orm";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ interviewId: string }> }
) => {
  try {
    const mockId = (await params).interviewId;

    const { question, userAnswer, clerkId, answer } = await req.json();

    if (!question || !clerkId || !userAnswer || !answer) {
      return NextResponse.json(
        { message: "Please ckeck all fields", error: true, success: false },
        { status: 401 }
      );
    }

    const user = await db
      .select()
      .from(MockerInterview)
      .where(eq(MockerInterview.clerkId, clerkId));

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized persson", error: true, success: false },
        { status: 402 }
      );
    }

    const feedbackPrompt = `Question: ${question}, User Answer: ${userAnswer}, Depends on question and user answer
    for give interview question please give us reating for answer and feedback as area of improvement if any in just 3 to 5 linse to improve it in JSON format without importents with rating  field and feedback`;

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const mockResponseJSON = await JSON.parse(mockResponse);

    const feedback = mockResponseJSON?.feedback;

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: mockId,
      question,
      userAnswer,
      currectAnswer: answer,
      rating: mockResponseJSON?.rating,
      clerkId,
      feedback,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    return NextResponse.json(
      {
        message: "User Answer recorded successfully",
        resp,
        error: false,
        success: true,

      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Interview_InterviewId_start]", error);

    return NextResponse.json(
      {
        message: "Internal Server Error! Please try agian",
        error: true,
        success: false,
      },
      { status: 500 }
    );
  }
};
