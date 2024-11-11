"use client"
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useState } from 'react';
import FromInterview from './FromInterview';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const AddNewInterview = () => {

    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const { user } = useUser();
    const router = useRouter();

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
            <div>

                <div
                    className='p-10 border rounded-lg hover:shadow-md shadow-sm shadow-blue-700 bg-secondary hover:scale-105 cursor-pointer transition-all'
                    onClick={() =>  user ? setIsOpenDialog(!isOpenDialog) : router.push('/sign-in') }>
                    <h1 className='font-bold text-lg flex items-center gap-2 justify-center'><Plus /> Add New</h1>
                </div>
                <Dialog open={isOpenDialog}>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle>Tell us more about your job interviwing</DialogTitle>
                            <DialogDescription className='text-gray-600'>
                                Add Details about your job position/role, job description and years of exprience.
                            </DialogDescription>
                            <FromInterview setIsOpenDialog={setIsOpenDialog} isOpenDialog={isOpenDialog} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}

export default AddNewInterview;