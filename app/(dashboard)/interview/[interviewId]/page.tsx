"use client"
import Loader from '@/app/layouts/Loader';
import { Button } from '@/components/ui/button';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Webcam from "react-webcam";
import WebCamAlert from './components/WebCamAlert';

function Interview({ params }: { params: Promise<{ interviewId: string }> }) {

    const router = useRouter();
 
    const [userInterviewDetails, setUserInterviewDetails] = useState<InterviewUser | null>(null);
    
    const [loading, setLoading] = useState(true);
    const [mockId, setmockId] = useState('');
    const [webCamAlert, setWebCamAlert] = useState(false);

    const [isOpenWebcam, setIsOpenWebcam] = useState(false);

    const getUserDetails = async () => {
        try {
            const mockId = (await params).interviewId;

            setmockId(mockId);

            const res = await fetch(`/api/interview/${mockId}`, {
                method: "GET"
            });
            const data = await res.json()
            if (data.success) {
                setLoading(false)
                setUserInterviewDetails(data?.userData[0])
            }
            if (data.error) {
                setLoading(false);
                toast.error(data.message);
            };
        } catch (error) {
            setLoading(false)
            toast.error("Somthing went wrong! Please try agian")
            console.log("[InterviewId_GET]", error);
        }
    };

    useEffect(() => {
        getUserDetails()
    }, []);

    return loading ? <Loader /> : (
        <div>
            <div className='max-sm:mx-4 flex flex-col items-center px-5'>
                <p className='font-bold text-3xl text-center text-gray-950'>Let&apos;s Get Started</p>

                <div className='flex items-center gap-10 mt-7 justify-around max-lg:flex-col'>
                    <div className='flex flex-col gap-10 items-center lg:w-1/2'>
                        <div className='flex flex-col gap-3 border w-full rounded-lg p-5 shadow-sm shadow-blue-700'>
                            <p className='text-lg'><strong>Job Role/Job Position:</strong> <span className='text-gray-500'>{userInterviewDetails?.jobPosition}</span> </p>
                            <p className='text-lg'><strong>Job Description/Tech Stack:</strong> <span className='text-gray-500'>{userInterviewDetails?.jobDes}</span> </p>
                            <p className='text-lg'><strong>Years of Experience:</strong> <span className='text-gray-500'>{userInterviewDetails?.jobExprience}</span> </p>
                        </div>
                        <div className='p-5 bg-[#D4FF12] border-yellow-700 border  rounded-lg text-[#4D5A17]'>
                            <h2 className='flex items-center gap-3 font-bold text-lg text-[#47550A]'><Lightbulb /> <span>Infomation</span></h2>
                            <p className='text-sm mt-3'>
                                Enable Video Web Cam and Microphone to start your AI Generated Mock Interview, It Has 5 question which
                                you can answer and at the last you will get the report on the base of your answer. NOTE: We never record
                                your video, Web cam access you can disable at any time if you want
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col lg:w-1/2 items-center w-full justify-center'>
                        {
                            isOpenWebcam ? <Webcam
                                onUserMediaError={() => setIsOpenWebcam(false)}
                                onUserMedia={() => setIsOpenWebcam(true)}
                                mirrored={true}
                                style={{ width: 1000, height: 350, margin: 0, border: 1 }} />
                                :
                                <>
                                    <span className=' bg-secondary border rounded-lg h-[300px] max-lg:h-[350px] max-md:h-[300px] w-full mb-3 flex items-center justify-center shadow-blue-600 shadow-sm'><WebcamIcon className='w-48 h-44' /> </span>
                                    <Button variant='ghost' className='border' onClick={() => setIsOpenWebcam(true)}>Enable Web Cam and Microphone</Button>
                                </>
                        }

                    </div>
                </div>

            </div>
            <div className='flex items-center justify-end mt-4 mr-4'>
                <Button onClick={() => isOpenWebcam === true ? router.push(`/interview/${mockId}/start`) : setWebCamAlert(true)}>Start Interview</Button>
            </div>

            <div className=' absolute top-2 max-sm:left-6 max-md:left-20'>
                {
                    isOpenWebcam === false &&(
                            webCamAlert===true && (
                                <WebCamAlert setWebCamAlert={setWebCamAlert} setIsOpenWebcam={setIsOpenWebcam} />
                            )
                    )
                }
            </div>
        </div>

    )
}

export default Interview;