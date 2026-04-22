import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

/**
 * Props for PromptInput component
 */
interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  loading: boolean;
}

// Component for user to input their prompt and submit it
function PromptInput({
  prompt,
  setPrompt,
  onClear,
  onSubmit,
  loading,
}: PromptInputProps) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Ask something</Typography>
          <TextField
            multiline
            minRows={5}
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Explain useState in React with a simple example."
          />
          <Typography
            variant="caption"
            sx={{ textAlign: "left" }}
            color="text.secondary"
          >
            Character count: {prompt.length}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={onSubmit}
              sx={{ textTransform: "none" }}
              disabled={loading || !prompt.trim()} // disable if no input or request in progress
            >
              {loading ? "Generating..." : "Generate"}
            </Button>

            <Button
              variant="outlined"
              onClick={onClear}
              sx={{ textTransform: "none" }}
              disabled={loading && !prompt}
            >
              Clear
            </Button>
          </Stack>{" "}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PromptInput;
