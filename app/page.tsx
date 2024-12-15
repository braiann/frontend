"use client"

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import TextField from "./components/TextField";
import TextArea from "./components/TextArea";
import Spacer from "./components/Spacer";
import Bio from "./components/Bio";
import Experience from "./components/Experience";

interface Resume {
  name: string;
}

export default function Home() {
  return (
    <main className="flex flex-col max-w-lg mx-auto py-10">
      <TextField name="name" onChange={() => ""} placeholder="Full name" className="text-4xl ring-transparent outline-none border-none" />
      <Spacer size="20px" />
      <Bio />
      <Experience />
    </main>
  );
  
}
