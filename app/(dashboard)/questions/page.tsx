"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Loader from "@/app/layouts/Loader";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Questions() {
  const { user } = useUser();
  const router = useRouter()

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const getQuestions = async () => {
    try {
      const res = await fetch(
        `/api/questions/${user?.id}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setUserData(data.userData);
      }
      if (data.error) {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("[questions_GET]", error);
      toast.error("Somthing went wrong! Please try agian");
    }
  };

  useEffect(() => {
    if(user){
      getQuestions();
    }
  }, [user]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h2 className="font-bold text-orange-400 text-4xl">Congratulation!</h2>
      <h2 className="font-bold text-gray-950 text-2xl">
        Here is your attended questions
      </h2>
      {userData.length > 0 && (
        <>
          <h2 className="text-blue-400 text-lg my-4 font-medium">
            Your overall attended questions:{" "}
            <strong className="text-primary text-xl font-bold">{userData.length}</strong>
          </h2>
          <h2 className="text-sm text-gray-600">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
        </>
      )}

      {userData.length > 0 ? (
        userData.map((feedback: Feedback, index) => (
          <Collapsible key={index} className="flex flex-col">
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
          No Interview attended
        </div>
      )}
        <Button onClick={()=> router.push('/')} className=" block justify-end">Go Home</Button>
    </div>
  );
}

export default Questions;
