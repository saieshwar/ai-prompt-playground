import { Container, Stack } from "@mui/material";
import "./App.css";
import Header from "./Components/Header";
import AiPromptContainer from "./Components/AiPromptContainer";

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Stack spacing={3}>
        <Header />
        <AiPromptContainer />
      </Stack>
    </Container>
  );
}

export default App;
