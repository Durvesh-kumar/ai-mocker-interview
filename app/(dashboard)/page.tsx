import AddNewInterview from "@/components/AddNewInterview/AddNewInterview";
import InterviewList from "@/components/interviewList/InterviewList";
import React from "react";

function Home() {
  return (
    <div className="max-md:px-3">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="text-gray-500">Create and start your AI Mockup Interview</p>

      <div className="flex flex-col gap-10">
        <AddNewInterview />
        <InterviewList/>
      </div>
    </div>
  );
}

export default Home;
export const dynamic = 'force-dynamic'