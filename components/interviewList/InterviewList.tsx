"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function InterviewList() {
  const { user } = useUser();

  const [interviews, setInterviews] = useState([]);
  const router = useRouter()

  const getInterviews = async () => {
    try {
      const clerkId = user?.id;
      const res = await fetch('/api/interview', {
        method: "POST",
        body: JSON.stringify({ clerkId }),
      });

      const data = await res.json();

      if (data.success) {
        setInterviews(data.interviews);
      }

      if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("[Interview_InterviewList_POST]", error);
    }
  };

  useEffect(() => {
    if(user){
      getInterviews();
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-lg text-gray-950">
        Previous Mock Interview
      </h2>
      <div className="flex items-center justify-center flex-wrap gap-10">
        {interviews &&
          interviews.map((interview: InterviewUser) => (
            <div key={interview.mockId} className="p-5 border shadow-sm shadow-blue-700 rounded-xl w-80 lg:w-96 flex flex-col gap-2">
              <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
              <h2 className="text-sm  text-gray-700"><strong>{interview?.jobExprience}</strong> Years of Exprence</h2>
              <h2 className="text-xs  text-gray-500"><strong>CreateAt: </strong> {interview?.createdAt}</h2>
              <div className="flex items-center gap-4 justify-between">
                  <Button onClick={()=> router.push(`/interview/${interview?.mockId}/feedback`)} size="sm" variant='outline'>Feedback</Button>

                  <Button onClick={()=> router.push(`/interview/${interview?.mockId}`)} size="sm">Start</Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
