import { TriangleAlert } from "lucide-react";
import React from "react"

interface WebCamAlertPropes {
    setWebCamAlert: (value: boolean)=> void;
    setIsOpenWebcam: (value: boolean)=> void
}

const WebCamAlert:React.FC<WebCamAlertPropes> = ({setWebCamAlert, setIsOpenWebcam}) => {
    return (
        <div className="flex items-center gap-4 border shadow-sm shadow-red-900 px-6 py-2 rounded-lg bg-slate-50 w-fit">
            <TriangleAlert className="text-red-600 w-10 h-10" />
            <div>
                <div className="flex items-center justify-between">
                    <strong>Heads up!</strong>
                    <p onClick={()=> setWebCamAlert(false)} className="border-2 px-2 py-0 hover:border-black rounded-lg bg-gray-100 cursor-pointer">x</p>
                </div>
                <div className="flex gap-x-5 items-center">
                <p className="mt-3 w-fit">Please allow camera !</p>
                <p onClick={()=> setIsOpenWebcam(true)} className="bg-blue-500 hover:bg-primary px-2 text-white text-sm w-fit rounded-sm mt-3 cursor-pointer">Allow</p>
                </div>
            </div>
        </div>
        
    )
}

export default WebCamAlert