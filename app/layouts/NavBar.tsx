'use client'
import { UserButton, useUser } from '@clerk/nextjs';
import { CircleUserRound, TableOfContents } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

function Navbar() {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser()
    return (
        <div className='flex items-center justify-between shadow-md w-full h-16 px-5 relative'>
            <Image src="/logo.jpg" width={1000} height={1000} alt='' className=' w-24 h-24 animate-spin mix-blend-multiply object-fill' />
            <div className='flex items-center gap-5 max-md:hidden'>

                <Link href='/' className={`hover:font-bold hover:text-primary transition-all ${pathName === '/' && 'font-bold transition-all text-primary'}`} >Home</Link>

                <Link href={user ? "/questions" : "/sign-in"} className={`hover:font-bold hover:text-primary transition-all ${pathName === '/questions' && 'font-bold transition-all text-primary'}`} >Questions</Link>

                <Link href={user ? "/upgrade" : "/sign-in"} className={`hover:font-bold hover:text-primary transition-all ${pathName === '/upgrade' && 'font-bold transition-all text-primary'}`} >Upgrade</Link>

            </div>

            <div className='flex items-center gap-10'>
                <TableOfContents className=' w-5 h-5 md:hidden cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                {
                    user ? <UserButton /> : <Link href='/sign-in'><CircleUserRound className='w-10 h-10 cursor-pointer' /></Link>
                }
            </div>

            {
                isOpen && (
                    <div className='flex flex-col items-start gap-5 md:hidden absolute top-20 right-5 bg-white px-5 py-2 border shadow-md rounded-lg'>

                        <Link href='/' className={`hover:font-bold hover:text-primary transition-all ${pathName === '/' && 'font-bold transition-all text-primary'}`} >Home</Link>

                        <Link href={user ? "/questions" : "/sign-in"} className={`hover:font-bold hover:text-primary transition-all ${pathName === '/questions' && 'font-bold transition-all text-primary'}`} >Questions</Link>

                        <Link href={user ? "/upgrade" : "/sign-in"} className={`hover:font-bold hover:text-primary transition-all ${pathName === '/upgrade' && 'font-bold transition-all text-primary'}`} >Upgrade</Link>

                    </div>
                )
            }

        </div>
    )
}
export default Navbar;
