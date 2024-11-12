import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react'
interface QuestionsSectionPropes {
    interviewrDatas : any;
    setActiveQuestionIndex: (value: number) => void;
    activeQuestionIndex: number;
}
const QuestionsSection: React.FC<QuestionsSectionPropes> = ({ interviewrDatas, setActiveQuestionIndex, activeQuestionIndex }) => {
    
    const textToSpeech = ()=>{
        if('speechSynthesis' in window){
           const speech = new SpeechSynthesisUtterance(interviewrDatas[activeQuestionIndex]?.question);
           window.speechSynthesis.speak(speech)
        }  else{
            alert ('sorry, your browser does not support text to speech')
        }
    }
    return (
        <div>
            <div className='flex gap-7 flex-wrap items-center'>
                {
                    interviewrDatas?.map((question: string, index: number) => (
                        <div key={index + 1} onClick={() => setActiveQuestionIndex(index)}
                            className={`flex cursor-pointer hover:bg-blue-700 items-center hover:text-white flex-nowrap px-3 py-1 bg-red-200 rounded-3xl font-bold 
                            ${activeQuestionIndex === index && "bg-blue-700 text-white"}`}
                        >
                            Question # {index + 1}
                        </div>
                    ))
                }
            </div >
            <div className='flex items-center justify-end my-2' onClick={()=> textToSpeech()}>
            <Volume2 className=' cursor-pointer' />
            </div>
            <p className='my-5 font-medium'>{interviewrDatas[activeQuestionIndex]?.question}</p>

            <div className='bg-blue-100 border p-4 shadow-blue-500 shadow-sm rounded-lg text-primary mb-4'>
                <strong className='flex flex-nowrap gap-2 mb-3 '><Lightbulb /> Note:</strong>
                <p className='text-sm'>Click on Record Answer when you want to answer the question.
                    At the end of interview we will give you the feedback along with contect answer for
                    each of question and your answer to comapre it.
                </p>
            </div>
        </div>

    )
}

export default QuestionsSection;
export const dynamic = 'force-dynamic'