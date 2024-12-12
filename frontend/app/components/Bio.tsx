import { GoogleGenerativeAI } from "@google/generative-ai";
import TextArea from "./TextArea";
import { useState } from "react";

const Bio = () => {
    const [bio, setBio] = useState("");0
    const [suggestions, setSuggestions] = useState([]);
    const [rewrite, setRewrite] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSuggestions = async () => {
        setLoading(true);
        setRewrite("");
        setSuggestions([]);
        try {
        const API_KEY = process.env.GEMINI_API_KEY;
        if (!API_KEY) throw new Error("API key not found");

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = `Generate this JSON (DO NOT INCLUDE the notation just the plain JSON, so no backticks json preceding and no ending backticks): {suggestions: [suggestion, suggestion, suggestion], rewrite} with each suggestion being a suggestion about the resume About Me field and a final rewrite in roughly the same length as the input About Me. Do not answer back any other text just the plain JSON. Answer in input language. This is the About Me: ${bio}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const results = JSON.parse(response.text());
        setLoading(false);
        setRewrite(results.rewrite || "");
        setSuggestions(results.suggestions || []);
        } catch (error) {
        console.log("Error generating suggestions: ", error);
        }
    }
    
    return <> 
        <label className="pl-2" htmlFor="bio">About me</label>
        <div className="relative group">
        <TextArea
            name="bio"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            animateThinking={loading}
        />
        <button
            onClick={handleSuggestions}
            className="absolute opacity-0 -top-3 -left-6 group-hover:opacity-100 opacity drop-shadow-none scale-1 hover:brightness-105 hover:drop-shadow-[0_1px_1px_rgba(226,220,245,1)] hover:scale-110"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="#B9A9EB" viewBox="0 0 24 24" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
        </button>
        </div>
        {loading &&
            <div className="px-2">
                <div className="w-full h-14 mb-2 bg-black bg-opacity-5 rounded-md animate-pulse"></div>
                <div className="w-full h-14 mb-2 bg-black bg-opacity-5 rounded-md animate-pulse"></div>
                <div className="w-full h-24 bg-black bg-opacity-5 rounded-md animate-pulse"></div>
            </div>
        }
        
        <div className="px-2">
        {suggestions.length > 0 && (
            <ul>
            {suggestions.map((suggestion, index) => (
                <li key={index} className="flex justify-between items-center bg-black bg-opacity-5 rounded-lg px-4 py-2 mb-2">
                    <div className="flex gap-2 items-center">
                        <div className="bg-indigo-500 w-9 h-9 aspect-square flex items-center justify-center rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                            </svg>
                        </div>
                        <span>
                            {suggestion}
                        </span>
                    </div>
                    <button onClick={() => setSuggestions(prev => 
                        prev.filter((_, i) => i !== index)
                    )}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#00000066" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </li>
            ))}
            </ul>
        )}
        {rewrite && (
        <div className="bg-black bg-opacity-5 rounded-lg px-4 py-2 mb-2">
            <div className="w-full flex justify-between mt-1">
                <div />
                <span className="text-center text-xs font-bold opacity-50">Rewrite</span>
                <button onClick={() => setRewrite("")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#00000066" className="size-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <p>{rewrite}</p>
            <div className="flex gap-2 mb-1 mt-3">
            <button className="bg-black bg-opacity-5 p-1 w-full rounded-md hover:bg-opacity-10 active:bg-opacity-15">
                Copy
            </button>
            <button className="bg-black bg-opacity-5 p-1 w-full rounded-md hover:bg-opacity-10 active:bg-opacity-15">
                Replace
            </button>
            </div>
        </div>
        )}
        </div>
    </>
}

export default Bio;