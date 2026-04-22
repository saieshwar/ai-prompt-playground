import { useState, useEffect } from "react";
import { Stack, Box, CircularProgress } from "@mui/material";
import PromptInput from "./PromptInput";
import ResultCard from "./ResultCard";
import ErrorAlert from "./ErrorAlert";
import EmptyState from "./EmptyState";
import type { ChatHistoryItem } from "../types/chat";
import ChatHistory from "./ChatHistory";
import { CHAT_HISTORY_KEY } from "../constants";

const getInitialHistory = (): ChatHistoryItem[] => {
  try {
    const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);

    // Return empty array if nothing is stored
    if (!savedHistory) {
      return [];
    }

    const parsedHistory = JSON.parse(savedHistory) as ChatHistoryItem[];

    // Ensure parsed value is an array
    return Array.isArray(parsedHistory) ? parsedHistory : [];
  } catch (error) {
    console.error("Failed to read chat history from localStorage:", error);
    return [];
  }
};

function AiPromptContainer() {
  // State for user input from the tesxtfield
  const [prompt, setPrompt] = useState("");

  // Stores AI response
  const [result, setResult] = useState("");

  // loading state while API request is running
  const [loading, setLoading] = useState(false);

  // Stores error message if API call fails
  const [error, setError] = useState("");

  // Stores past prompt/response history
  const [history, setHistory] = useState<ChatHistoryItem[]>(getInitialHistory);

  //Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const handleClear = () => {
    setPrompt("");
    setResult("");
    setError("");
  };

  // Calls backend API with the entered prompt
  const handleSubmit = async () => {
    // Edge case: Do not proceed if prompt is empty
    if (!prompt.trim()) return;

    // Reset states before new API call
    setLoading(true);
    setError("");
    setResult("");

    try {
      // Sending POST call to backend with prompt in request body
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      console.log("API response:", response);
      // Convert response into JSON
      const data = await response.json();
      console.log("API response data:", data);
      // Throw error if backend returned failure
      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }
      if (!data?.result) {
        throw new Error("No result returned from server");
      }

      // Save backend result
      setResult(data.result);

      const newHistoryItem: ChatHistoryItem = {
        id: crypto.randomUUID(),
        prompt,
        response: data.result,
        createdAt: new Date().toISOString(),
      };

      // Add latest item at top
      setHistory((prevHistory) => [newHistoryItem, ...prevHistory]);
    } catch (err) {
      console.log("Error during API call:", err);
      // Save readable error message
      setError(err instanceof Error ? err.message : "Error occurred");
    } finally {
      // Stop loading in both success and failure cases
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      {/* Prompt input section */}
      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        onClear={handleClear}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {/* Conditionally rendering if any error occurs  */}
      {error && <ErrorAlert message={error} />}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && !result && !error && <EmptyState />}
      {/* Result section */}
      {result && <ResultCard result={result} />}
      <ChatHistory history={history} setHistory={setHistory} />
    </Stack>
  );
}

export default AiPromptContainer;
