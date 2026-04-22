import { Typography } from "@mui/material";

function Header() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Prompt Playground
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Enter a prompt and get a response from the AI.
      </Typography>
    </>
  );
}

export default Header;
