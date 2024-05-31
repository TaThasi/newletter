import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {

        const data = req.json();
        const apiKey = data.apiKey;

        const decoded = jwt.verify(apiKey, process.env.API_KEY_SECRET);


        const isSubscribeExist = await prisma.subscriber.findUnique({
            where: {
                email_newsLetterOwnerId: {
                    email: data.email,
                    newsLetterOwnerId: decoded.user.id
                }
            }
        });
        
        if(isSubscribeExist) {
            return new NextResponse.json({error: "Email already subscribed!"});
        }

        const validateResponse = await validateEmail({ email });
        if (validateResponse.status === "invalid") {
            return new NextResponse.json({error: "Email not valid!"});
        }

        const subscriber = await prisma.subscriber.create({
            data: {
                email: data.email,
                newsLetterOwnerId: decoded.user.id,
                source: "By newsLetter website",
                status: "subscribed"
            }
        }); 
        
        return new NextResponse.json({decoded, subscriber});

    } catch (err) {
        console.log(err);
    }
}