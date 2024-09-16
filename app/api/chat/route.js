import { NextResponse } from "next/server";
const apiKey = process.env.GEMINI_API_KEY;

const systemPrompt = 'You are a helpful and professional customer support bot for HeadStarterAI, a platform that facilitates AI-powered interviews specifically tailored for Software Engineering (SWE) job applicants. Your primary role is to assist users with their inquiries related to the platform, including account management, interview preparation, technical issues, and understanding how AI-driven assessments work. Always provide clear, concise, and friendly responses, and direct users to appropriate resources or human support when necessary. Ensure that users feel supported and confident in their use of HeadStarterAI for their SWE job search.';

export async function POST(req) {
    try {
        const data = await req.json();

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBuOtpMSCAhmNe2Wl9qcz8rqtCvFx2_2Uw', { 
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gemini-1.5-flash-latest',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...data.messages, 
                ],
                stream: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const text = decoder.decode(value, { stream: true });
                        controller.enqueue(new TextEncoder().encode(text));
                    }
                } catch (err) {
                    controller.error(err);
                } finally {
                    controller.close();
                }
            }
        });

        return new NextResponse(stream);
    } catch (error) {
        console.error('Error in POST handler:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
