"use client"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface FromeInterviewPropes {
  isOpenDialog: boolean;
  setIsOpenDialog: (value: boolean) => void
};

const formSchema = z.object({
  jobPosition: z.string().min(2).max(30),
  jobDes: z.string().min(2).max(100),
  jobExprience: z.coerce.number().max(20).min(1),
  clerkId: z.string().min(4),
  email: z.string().email().min(4)
});

const FromInterview: React.FC<FromeInterviewPropes> = ({ isOpenDialog, setIsOpenDialog }) => {

  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobPosition: "",
      jobDes: "",
      jobExprience: 1,
      clerkId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    if(!user){
      router.push('/sign-in')
    }
    
    try {
      setLoading(true);
      const res = await fetch("/api/AddNewInterview", {
        method: "POST",
        body: JSON.stringify(values)
      });

      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setIsOpenDialog(!isOpenDialog);
        const mockId = data.resp[0].mockId;
        router.push(`/interview/${mockId}`);
      }

      if (data.error) {
        setLoading(false);
        toast.error(data.message);
      }

    } catch (error) {
      setLoading(false)
      console.log('[FormInterview_POST]', error);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-15">
        <FormField
          control={form.control}
          name="jobPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Role/Job Position</FormLabel>
              <FormControl>
                <Input placeholder="EX. Full Stack Developer" {...field} />
              </FormControl>
              <FormMessage className="text-orange-600"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobDes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description / Tech stack (In Short)</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex. React, Angular, NodeJs, MySqul etc" {...field} />
              </FormControl>
              <FormMessage className="text-orange-600"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobExprience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of exprience</FormLabel>
              <FormControl>
                <Input type="number" placeholder="EX.5" {...field} min={1} />
              </FormControl>
              <FormMessage className="text-orange-600" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-5">
          <Button type="button" variant='outline' onClick={()=> setIsOpenDialog(!isOpenDialog)}>Cancle</Button>
          <Button
            type="submit"
            disabled={loading}
            className=" hover:bg-white hover:text-black border-2 hover:border-black"
          >{loading ? <span className="flex gap-2"><RefreshCw className=" animate-spin" /> <>Generating from AI</></span> : "Satart Interview"}</Button>
        </div>

      </form>
    </Form>
  )
}

export default FromInterview;