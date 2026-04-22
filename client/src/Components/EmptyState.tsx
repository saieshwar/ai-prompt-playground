import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Card, CardContent, Stack, Typography } from "@mui/material";

function EmptyState() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1} alignItems="center" textAlign="center" py={2}>
          <AutoAwesomeIcon color="primary" />

          <Typography variant="h6">No response yet</Typography>

          <Typography variant="body2" color="text.secondary">
            Enter a prompt and click Generate to see the AI response here.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default EmptyState;
