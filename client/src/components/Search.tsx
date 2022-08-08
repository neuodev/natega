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
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

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

const SERVER = "http://64.227.26.187:8000/api/v1";

function Search() {
  let [results, setResults] = useState<Result[]>([]);
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      // setLoading(true);
      // try {
      //   const res = await Promise.all(
      //     files.map((f) => axios.get(`${SERVER}/static/${f}`))
      //   );
      //   const all: Result[] = [];
      //   res.forEach((resp) => {
      //     all.push(...resp.data);
      //   });
      //   console.log(all);
      // } catch (error) {
      //   const err = error as Error;
      //   setError(err.message);
      // }
      // setLoading(false);
    })();
  }, []);
  return (
    <Box sx={{ mt: "68px", height: "100vh" }}>
      <Box
        sx={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{ minWidth: "400px" }}
          label="Seat Number"
          helperText="Ex: 612198"
        />
      </Box>
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
        <Box></Box>
      )}
    </Box>
  );
}

const Centered = styled(Box)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export default Search;
