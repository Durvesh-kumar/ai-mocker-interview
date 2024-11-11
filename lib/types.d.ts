
type InterviewUser = {
    id: number,
    mockResponse: string ,
    jobPosition: string,
    jobDes: string,
    jobExprience: number,
    mockId: string,
    createdBy: string,
    createdAt:string

}

type Feedback = {
    id: number,
    mockIdRef: string,
    question: string,
    userAnswer: string,
    currectAnswer: string,
    rating: number,
    userEmail: string,
    feedback: string,
    createdAt: string,
}

type Order = {
    clerkId: string,
    userEmail: string,
    purchaseDate:string,
    stripeSubId:string
    subEnd:string,
}