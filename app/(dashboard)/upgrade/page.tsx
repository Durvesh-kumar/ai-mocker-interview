'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { Check, IndianRupee, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function Upgrade() {

  const {user} = useUser();
  const router = useRouter();

  const amount = Number(process.env.NEXT_PUBLIC_SUBSCRIPTION_AMOUNT)

  const customer = {
    clerkId: user?.id,
    userEmail: user?.primaryEmailAddress?.emailAddress,
  }
  const services = {
    amount: amount,
    serviceName: 'Subscription',
    service: 'Monthly'
  }

  const handleCheckout = async()=>{
    try {

      if(!user){
         router.push('/sign-in')
      }
      const res = await fetch('/api/checkout', {
        method: "POST",
        body:JSON.stringify({ customer, services })
      })

      const data = await res.json();

      router.push( data.url );

      if(data.error){
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      
    }

  }
  return (
    <div>
      <h1 className=' text-center text-4xl text-gray-950 font-bold'>Upgrade</h1>
      <h3 className='text-center my-1 text-gray-600'>Upgrade to monthly plan access unlimated mock interview</h3>

      <div className='flex items-center justify-center gap-7 mt-10 flex-wrap'>
      <div className=' w-fit px-8 py-12 border shadow-sm hover:shadow-blue-700 rounded-2xl'>
          <h3 className='text-center font-bold text-xl my-2'>Free</h3>

          <h3 className='flex items-center justify-center my-5 text-lg font-semibold'>
            <strong className='flex text-4xl items-center font-bold'>0 <IndianRupee className='w-10 h-10 font-extrabold' /></strong>
            <span>/month</span>
          </h3>

          <div className='flex flex-col gap-1 items-start'>
            <p className='flex items-center gap-1'><Check className='font-bold'/> <span>Create 3 Free Mock Interview</span></p>
            <p className='flex items-center gap-1'><Check className='font-bold'/> <span>Unlimited Retake Interview</span></p>
            <p className='flex items-center gap-1'><X className='font-bold'/> <span>Practice Question</span></p>
            <p className='flex items-center gap-1'><X className='font-bold'/> <span>Email Support</span></p>
          </div>

          <Button variant='outline' className='w-full rounded-3xl border-2 border-blue-700 font-bold mt-5 text-blue-700'>Get Started</Button>
        </div>

        <div className=' w-fit px-8 py-12 border shadow-sm hover:shadow-blue-700 rounded-2xl'>
          <h3 className='text-center font-bold text-xl my-2'>Monthly</h3>

          <h3 className='flex items-center justify-center my-5 text-lg font-semibold'>
            <strong className='flex text-4xl items-center font-bold'>{amount}<IndianRupee className='w-10 h-10 font-extrabold' /></strong>
            <span>/month</span>
          </h3>

          <div className='flex flex-col gap-1 items-start'>
            <p className='flex items-center gap-1'><Check className='font-bold'/> <span>Create 3 Free Mock Interview</span></p>
            <p className='flex items-center gap-1'><Check className='font-bold'/> <span>Unlimited Retake Interview</span></p>
            <p className='flex items-center gap-1'><Check className='font-bold'/> <span>Practice Question</span></p>
            <p className='flex items-center gap-1'><Check className='font-bold'/> <span>Email Support</span></p>
          </div>

          <Button onClick={handleCheckout} variant='outline' className='w-full rounded-3xl border-2 border-blue-700 font-bold mt-5 text-blue-700'>Get Started</Button>
        </div>
      </div>
    </div>
  )
}

export default Upgrade