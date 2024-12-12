import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

require('dotenv').config();
module.exports = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  }
};

export default nextConfig;