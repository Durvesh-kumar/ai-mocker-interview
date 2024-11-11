import nodemailer from "nodemailer";

export const sendEmail = async({ email, emailType, subscriptionId }: { email?: string | null, emailType: string, subscriptionId?: string |undefined })=>{
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            logger: true,
            debug: true,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SEND_EMAIL,
                pass: process.env.APP_PASSWORD_SEND_EMAIL
            },
            tls: {
                rejectUnauthorized: true
            }
        });

        const mailOptions:any = {
            from: process.env.SEND_EMAL,
            to: email,
            subject: emailType === "CREATE_INTERVIEW" ? "Thank you for create Interview" : "Thank you for get Subscription",
            html: `<div>
            <center>
              <h1>${emailType === "CREATE_INTERVIEW" ? "Create First Interview" : "Get Subscription"}</h1>
            </center>
            <div> ${emailType === "CREATE_INTERVIEW" ? 
                `<> 
                <p>
                   Experience the best we have to offer by subscribing to our premium plan. With a subscription, 
                   you'll gain access to exclusive features, enhanced support, and a seamless, ad-free experience.
                    Whether you're looking to boost productivity, 
                   enjoy premium content, or get the most out of our services, our subscription plan is designed to meet your needs.
                </p>
                <h2>Benefits of Subscribing:</h2>

                <p>
                   <strong>Benefits of Subscribing: </strong>
                   Enjoy an uninterrupted experience without any ads.
                </p>

                <p>
                   <strong>Early Access: </strong>
                   Be the first to try out new features and updates before they are released to the public.
                </p>

                <p>
                   <strong>Special Discounts: </strong>
                   Receive exclusive discounts on products and services.
                </p>

                <h2>How to Subscribe: </h2>

                <p>
                   <strong>Interview: </strong>
                   Create an interview or log in to your existing interview.
                </p>

                <p>
                   <strong>Choose a Plan: </strong>
                   Select the subscription plan that best suits your needs.
                </p>
                <p>
                   <strong>Payment: </strong>
                   Enter your payment details and complete the purchase.
                </p>

                <p>
                   <strong>Enjoy: </strong>
                   Start enjoying all the premium features and benefits immediately.
                </p>


                </> ` 
                :
                 `<>

                 <p>
                         With a subscription, you'll gain access to exclusive features, enhanced support, and a seamless, ad-free experience. 
                         Whether you're looking to boost productivity, enjoy premium content, or get the most out of our services, 
                         our subscription plan is designed . This Subscription only one months.
                </p>
                 <h2>Benefits of Subscribing</h2>

                   <p><strong>Ad-Free Experience:</strong> Enjoy an uninterrupted experience without any ads.</p>
                   <p><strong>Early Access:</strong> Be the first to try out new features and updates before they are released to the public.</p>
                   <h2>subscription Id: </h2>
                   <center>
                     <strong>${subscriptionId}</strong>
                    </center>

                </>
                `}
            
            </div>`
        };
        
        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;

    } catch (error) {
        console.log(error)
    }
}