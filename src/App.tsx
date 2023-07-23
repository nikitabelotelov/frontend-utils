import { MantineProvider } from "@mantine/core";
import { Main } from "./pages/Main";

function App() {
  return (
    <MantineProvider withCSSVariables withNormalizeCSS>
      <Main />
    </MantineProvider>
  );
}

export default App;
