"use client";
import Loader from "@/app/layouts/Loader";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Feedback({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) {

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const getFeedback = async () => {
    try {
      const mockId = (await params).interviewId;

      const resp = await fetch(`/api/interview/${mockId}/feedback`, {
        method: "GET",
      });

      const data = await resp.json();

      if (data.success) {
        setLoading(false);
        setUserData(data.questionsAndAnswers);
      }
      if (data.error) {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Somthing went wrong! Please try agian");
      console.log("[interview_interviewId_feedback_GET]", error);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h2 className="font-bold text-orange-400 text-4xl">Congratulation!</h2>
      <h2 className="font-bold text-gray-950 text-2xl">
        Here is your interview feedback
      </h2>
      {userData.length > 0 && (
        <>
          <h2 className="text-blue-400 text-lg my-4 font-medium">
            Your overall interview rating:{" "}
            <strong className="text-primary text-xl font-bold">7/10</strong>
          </h2>
          <h2 className="text-sm text-gray-600">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
        </>
      )}

      {userData.length > 0 ? (
        userData.map((feedback: Feedback, index) => (
          <Collapsible key={feedback.id + index} className="flex flex-col">
            <CollapsibleTrigger className=" my-5 text-left bg-secondary p-2 flex justify-between items-center gap-5 rounded">
              {feedback?.question} <ChevronsUpDown />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className=" border border-red-700 shadow-sm p-3 rounded-lg flex-col flex gap-7 mb-5 bg-slate-100">
                <h2 className="flex items-center gap-2">
                  <strong>Rating:</strong>
                  {feedback.rating}
                </h2>
                <h2>
                  <strong>Your Answer :</strong>
                  <p className="mt-2">{feedback.userAnswer}</p>
                </h2>
                <h2>
                  <strong>Currect Answer :</strong>
                  <p className="mt-2">{feedback.currectAnswer}</p>
                </h2>
                <h2>
                  <strong>Feedback :</strong>
                  <p className="mt-2">{feedback.feedback}</p>
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <div className="my-3 font-medium text-xl text-gray-950">
          No Interview Feedback Record Found
        </div>
      )}
      <Link href="/">
        <Button className=" block justify-end">Go Home</Button>
      </Link>
    </div>
  );
}

export const dynamic = 'force-dynamic'