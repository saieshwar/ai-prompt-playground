import { Alert } from "@mui/material";

// Simple component to display error messages in a consistent way
function ErrorAlert({ message }: { message: string }) {
  return <Alert severity="error">{message}</Alert>;
}

export default ErrorAlert;
