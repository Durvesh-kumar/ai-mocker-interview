"use client";
import Loader from "@/app/layouts/Loader";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import QuestionsSection from "./components/QuestionsSection";
import RecordAnswerSection from "./components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }: { params: Promise<{ interviewId: string }> }) {
  const [loading, setLoading] = useState(true);

  const [mockId, setmockId] = useState("");

  const [interviewrDatas, setInterviewrData] = useState([]);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const getUserInterviewDetails = async () => {
    try {
      const mockId = (await params).interviewId;

      setmockId(mockId);

      const res = await fetch(`/api/interview/${mockId}`, {
        method: "GET",
      });

      const data = await res.json();
      if (data.success) {
        setLoading(false);

        const interviewrData = JSON.parse(data?.userData[0]?.mockResponse);

        if(!interviewrData){
          window.location.href = '/'
        }
        
        setInterviewrData(interviewrData);
      }
      if (data.error) {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("[interview_interviewId_start_GET]", error);
      toast.error("Somthing went wrong! Please try agian");
    }
  };

  useEffect(() => {
    getUserInterviewDetails();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex max-md:flex-col gap-10 w-full">
        <div className="flex w-1/2 max-md:w-full border rounded-lg shadow-sm p-5 shadow-orange-600">
          <QuestionsSection
            interviewrDatas={interviewrDatas}
            setActiveQuestionIndex={setActiveQuestionIndex}
            activeQuestionIndex={activeQuestionIndex}
          />
        </div>
        <div className="w-1/2 max-md:w-full border rounded-lg shadow-sm p-5 shadow-orange-600 my-4">
          <RecordAnswerSection
            interviewrDatas={interviewrDatas}
            setActiveQuestionIndex={setActiveQuestionIndex}
            activeQuestionIndex={activeQuestionIndex}
            mockId={mockId}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-5 mx-9">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Prev Question
          </Button>
        )}
        {activeQuestionIndex != interviewrDatas.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == interviewrDatas.length - 1 && (
          <Link href={`/interview/${mockId}/feedback`}><Button className="bg-green-600">End Interview</Button></Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
export const dynamic = 'force-dynamic'
