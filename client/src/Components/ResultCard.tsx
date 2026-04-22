import { Card, CardContent, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// props expected by ResultCard
interface ResultCardProps {
  result: string;
}

// Component to display AI response in a styled card
function ResultCard({ result }: ResultCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">AI Response</Typography>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}

export default ResultCard;
