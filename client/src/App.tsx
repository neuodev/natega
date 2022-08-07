import {
  Alert,
  AlertTitle,
  AppBar,
  Button,
  CircularProgress,
  Container,
  createTheme,
  Stack,
  styled,
  ThemeProvider,
  Typography,
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
      setLoading(true);
      try {
        const res = await Promise.all(
          files.map((f) => axios.get(`${SERVER}/static/${f}`))
        );
        const all: Result[] = [];
        res.forEach((resp) => {
          all.push(...resp.data);
        });
        console.log(all);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
      }

      setLoading(false);
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

        <Box sx={{ mt: "68px", height: "100vh" }}>
          {loading ? (
            <Centered>
              <CircularProgress />

              <Typography variant="h6" mt="8px">
                Please wait
              </Typography>
              <Typography variant="body2" mt="8px">
                Fetching data for students...
              </Typography>
            </Centered>
          ) : error !== null ? (
            <Centered>
              <Alert severity="error">
                <AlertTitle>Error!</AlertTitle>
                {error}
              </Alert>
            </Centered>
          ) : (
            <Search />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const Centered = styled(Box)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export default App;
