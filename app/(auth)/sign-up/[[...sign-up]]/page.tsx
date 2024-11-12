import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex items-center justify-center h-max'>
        <SignUp />
    </div>
  )
}
export const dynamic = 'force-dynamic'