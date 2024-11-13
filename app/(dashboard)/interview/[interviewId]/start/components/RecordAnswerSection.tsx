"use client";
import useSpeechToText from "react-hook-speech-to-text";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

interface RecordAnswerSectionPropes {
  interviewrDatas?: any;
  setActiveQuestionIndex: (value: number) => void;
  activeQuestionIndex: number;
  mockId: string;
}

const RecordAnswerSection: React.FC<RecordAnswerSectionPropes> = ({
  interviewrDatas,
  activeQuestionIndex,
  mockId,
}) => {

  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    setResults,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const SaveRecoding = async () => {
    if (isRecording) {
      stopSpeechToText();

      console.log("SaveRecoding", userAnswer);

      try {
        setLoading(true);
        const res = await fetch(`/api/interview/${mockId}/start`, {
          method: "POST",
          body: JSON.stringify({
            question: interviewrDatas[activeQuestionIndex]?.question,
            userAnswer,
            clerkId: user?.id,
            answer: interviewrDatas[activeQuestionIndex]?.answer,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setUserAnswer("");
          setLoading(false);
          setResults([])
          toast.success(data.message);
        }

        if (data.error) {
          setLoading(false);
          toast.error(data.message);
        }
      } catch (error) {
        setLoading(false);
        console.log(
          "[interview_interviewId_start_RecodingAnswerSection_POST]",
          error
        );
        toast.error("Somthing went wrong! Please try agian");
      }
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/interview/${mockId}/start`, {
        method: "POST",
        body: JSON.stringify({
          question: interviewrDatas[activeQuestionIndex]?.question,
          userAnswer,
          clerkId: user?.id,
          answer: interviewrDatas[activeQuestionIndex]?.answer,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setUserAnswer("");
        setResults([]);
        toast.success(data.message);
      }

      if (data.error) {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(
        "[interview_interviewId_start_RecodingAnswerSection_POST]",
        error
      );
      toast.error("Somthing went wrong! Please try agian");
    }
  };

  useEffect(() => {
    results.map((result: any) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col items-center justify-center  max-sm:h-64 rounded-lg">
        <Image
          src="/webCam.jpg"
          width={1000}
          height={1000}
          alt="WebCam"
          className=" w-64 h-64 absolute mix-blend-multiply"
        />
        <div className="my-5">
        <Webcam
          mirrored={true}
          style={{
            width: "100%",
            height: 300,
            zIndex: 10,
          }}
          className=" block items-center justify-center"
        />
        </div>
        
      </div>

      <div className="mt-3">
        {error ? (
          <p>Web Speech API is not available in this browser 🤷‍</p>
        ) : (
          <div className="flex flex-wrap gap-5 items-center justify-center">
            <Button
              disabled={loading}
              onClick={SaveRecoding}
              className={`${isRecording && "bg-red-200 text-black animate-pulse"}`}
            >
              {isRecording ? (
                <span className="flex items-center flex-nowrap gap-2 cursor-pointer">
                  <MicOff />
                  Stop Recording
                </span>
              ) : (
                <span className="flex items-center flex-nowrap gap-2 cursor-pointer">
                  <Mic /> Answer Recording
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordAnswerSection;
export const dynamic = 'force-dynamic'
