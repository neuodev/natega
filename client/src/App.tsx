import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Search from "./components/Search";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#334155",
    },
    secondary: {
      main: "#4ade80",
    },
  },
});

const pages = ["All results", "search"];
type Result = {
  name: string;
  school: string;
  org: string;
  status: string;
  kind: string;
  branch: string;
  arabic: string;
  first_lang: string;
  second_lang: string;
  pure_math: string;
  applied_math: string;
  history: string;
  geography: string;
  philosophy: string;
  pychology: string;
  chemistry: string;
  biology: string;
  geology: string;
  physics: string;
  total: string;
  religious_edu: string;
  national_edu: string;
  eco_and_stats: string;
  seat_no: string;
  percentage: string;
};

const SERVER = "http://159.223.98.29";
const files = [
  "300000.json",
  "937001.json",
  "500000.json",
  "900000.json",
  "700000.json",
];
function App() {
  let [results, setResults] = useState<Result[]>([]);
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      const res = await Promise.all(
        files.map((f) => axios.get(`${SERVER}/static/${f}`))
      );
      console.log(res);
    })();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar className="App">
          <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Container>
        </AppBar>

        <Box sx={{ mt: "68px" }}>
          <Search />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
