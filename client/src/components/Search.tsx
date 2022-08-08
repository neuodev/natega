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
import { SERVER } from "../constants";

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

function Search() {
  let [seatNmber, setSeatNumber] = useState<number | null>(null);
  let [result, setResult] = useState<Result | null>();
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<null | string>(null);

  const search = async () => {
    if (!seatNmber) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${SERVER}/search?seatNo=${seatNmber}`);
      setResult(data);
      setError(null);
    } catch (error) {
      let err = error as any;
      setError(
        err.response?.data?.message ? err.response.data.message : err.message
      );
    }
    setLoading(false);
  };
  return (
    <Box sx={{ mt: "68px", height: "calc(100vh - 68px)" }}>
      <Box
        sx={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            value={seatNmber || ""}
            onChange={(e) => {
              let val = Number(e.target.value);
              if (isNaN(val)) return;
              setSeatNumber(val);
            }}
            sx={{ minWidth: "400px", mr: "12px" }}
            label="Seat Number"
            helperText="Ex: 612198"
          />

          <Button
            onClick={search}
            sx={{ height: "56px" }}
            variant="contained"
            disabled={!seatNmber}
          >
            Search
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Centered>
          <CircularProgress />

          <Typography variant="h6" mt="8px">
            Please wait
          </Typography>
          <Typography variant="body2" mt="8px">
            In progress...
          </Typography>
        </Centered>
      ) : error !== null ? (
        <Centered>
          <Alert sx={{ minWidth: "500px" }} severity="error">
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export default Search;
