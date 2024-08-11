import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt= 'You are a helpful and professional customer support bot for HeadStarterAI, a platform that facilitates AI-powered interviews specifically tailored for Software Engineering (SWE) job applicants. Your primary role is to assist users with their inquiries related to the platform, including account management, interview preparation, technical issues, and understanding how AI-driven assessments work. Always provide clear, concise, and friendly responses, and direct users to appropriate resources or human support when necessary. Ensure that users feel supported and confident in their use of HeadStarterAI for their SWE job search.';

export async function POST(req){
    const openai= new OpenAI();
    const data= await req.json();
    
    const completion= openai.chat.completions.create({
        messages: [{
            role: 'system',
            content: systemPrompt,
        },
        ...data,
    ],
    model: 'gpt-3.5-turbo',
    stream: true,
    });

    const stream = new ReadableStream({
        async start (controller){
            const encoder= new TextEncoder();
            try{
                for await (const chunk of completion){
                    const content= chunk.choices[0]?.delta?.content
                    if(content){
                        const text=encoder.encode
                        controller.enqueue(text)
                    }
                }

            }
            catch(err)
        {
            controller.error(err)
        }
        finally{
            controller.close()
        } 
        }
    })
    return new NextResponse(stream)
}
