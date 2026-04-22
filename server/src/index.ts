// Importing required libraries
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// loading env variables from .env file we created in the directory
dotenv.config();

type Error = { status?: number; code?: string; message?: string };
// Initializing express app and defining the port
const app = express();
const port = process.env.PORT || 5000;

//enabling cors for calling from frontend
app.use(cors());

// Enable JSON parsing for incoming requests
app.use(express.json());

// Create OpenAI client

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Testing if route is working or not
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

/**
 * Generate AI response route
 * This route accepts a prompt from the frontend,
 * sends it to OpenAI, and returns the generated result.
 */
app.post("/api/generate", async (req: Request, res: Response) => {
  try {
    // Extract prompt from request body
    const { prompt } = req.body as { prompt?: string };

    // Validate prompt
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        status: "Error",
        message: "Prompt is required",
      });
    }

    // Check whether API key exists in environment
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not configured");

      return res.status(500).json({
        status: "Error",
        message: "OpenAI API key not configured",
      });
    }

    console.log("Calling OpenAI...");
    console.log("Prompt:", prompt);
    // Call OpenAI API
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    console.log("OpenAI response received successfully");

    // Send generated response back to frontend
    return res.status(200).json({
      result: response.output_text,
    });
  } catch (error: Error | any) {
    if (error?.status === 429 || error?.code === "insufficient_quota") {
      return res.status(429).json({
        status: "Error",
        message:
          "OpenAI quota exceeded. Please check billing or use a fallback response for demo purposes.",
      });
    }

    return res.status(500).json({
      status: "Error",
      message: "An error occurred while generating the response",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
