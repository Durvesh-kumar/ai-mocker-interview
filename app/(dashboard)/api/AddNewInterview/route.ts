import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { db } from "@/lib/db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { chatSession } from "@/lib/GeminiAIModels";
import { eq } from "drizzle-orm";
import { MockerInterview, Subscription } from '@/lib/models/schema';
import { sendEmail } from '@/lib/nodemailer';

export const POST = async (req: NextRequest) => {
    try {

        const { jobPosition, jobDes, jobExprience, clerkId, email } = await req.json();

        if (!jobPosition || !jobDes || !jobExprience || !clerkId || !email) {
            return NextResponse.json({ message: "Please fill all fields", error: true, success: false }, { status: 400 });
        }

        const mockerInterviews = db.select().from(MockerInterview).where(eq(MockerInterview.clerkId, clerkId));

        if((await mockerInterviews).length === 3){
            await sendEmail({ email, emailType:"CREATE_INTERVIEW"})
        };

        const subscription = (await db.select().from(Subscription).where(eq(Subscription.clerkId, clerkId))).map((item:any)=> item.subEnd);

        if((await mockerInterviews).length < 3 || moment(subscription[0]).format('DD-MM-yyyy') > moment().format('DD-MM-yyyy')){
            const InputPromt = `Job position : ${jobPosition} , Job Description: ${jobDes}, Years of Experience: ${jobExprience}, Depends on Job Position, Job Description & Yeaes of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTON_COUNT}
            Interview along with Answer in JSON format and not show Important Notes and not provied imprtant notes: , Give us question and answew field on JSON`
           const result = await chatSession.sendMessage(InputPromt)
   
           
           const mockResponse = result.response.text().replace('```json', '').replace('```', '');

           if (mockResponse) {
            const resp = await db.insert(MockerInterview).values({
                mockId: uuidv4(),
                mockResponse,
                jobPosition,
                jobDes,
                jobExprience,
                clerkId,
                createdAt: moment().format('DD-MM-yyyy')
            }).returning({ mockId: MockerInterview.mockId });

            return NextResponse.json({ message: "Create succesfully", resp,  error: false, success: true }, { status: 200 });
        }
   
        }

        return NextResponse.json({ message: "Your plan is expire", error: true, success: false }, { status: 403 });

    } catch (error) {
        console.log("[Api_AddNewInterview_POST]", error);
        return NextResponse.json({ message: "Somthing went wrong! please try agian", error: true, success: false }, { status: 500 });
    }
}
export const dynamic = 'force-dynamic'