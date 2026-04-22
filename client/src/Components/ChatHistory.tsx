import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { ChatHistoryItem } from "../types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CHAT_HISTORY_KEY } from "../constants";

interface ChatHistoryProps {
  history: ChatHistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<ChatHistoryItem[]>>;
}

function ChatHistory({ history, setHistory }: ChatHistoryProps) {
  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
  }, [setHistory]);

  if (history.length === 0) {
    return null;
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography variant="h6">Chat History</Typography>
          </Box>

          {history.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={handleClearHistory}
                sx={{ textTransform: "none" }}
              >
                Clear
              </Button>
            </Box>
          )}
        </Box>

        <Stack spacing={2} sx={{ marginTop: "16px" }}>
          {history.map((item, index) => (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              key={item.id}
            >
              {/* Prompt */}
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Prompt:
                </Typography>
                <Typography variant="body1">{item.prompt}</Typography>
              </Box>

              {/* Response */}
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Response:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.7,
                  }}
                >
                  {/* {item.response} */}
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {item.response}
                  </ReactMarkdown>
                </Typography>
              </Box>

              {/* Timestamp */}
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                {/* Clock icon */}
                <AccessTimeIcon
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />

                {/* Time text */}
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.createdAt).toLocaleString()}
                </Typography>
              </Stack>

              {/* Divider between history items */}
              {index !== history.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ChatHistory;
