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
import { useState } from "react";
import { SERVER } from "../constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
        result && (
          <Centered sx={{ flexDirection: "row", alignItems: "flex-start" }}>
            <TableContainer component={Paper} sx={{ maxWidth: "400px" }}>
              <Table aria-label="table">
                <TableBody>
                  {Object.entries(result)
                    .slice(0, 5)
                    .concat(Object.entries(result).slice(-3))
                    .map((entery) => (
                      <TableRow
                        key={entery[0]}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {entery[0]}
                        </TableCell>
                        <TableCell align="right">{entery[1]}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ maxWidth: "400px" }}>
              <Table aria-label="table">
                <TableBody>
                  {Object.entries(result)
                    .slice(5)
                    .map((entery) => (
                      <TableRow
                        key={entery[0]}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {entery[0]}
                        </TableCell>
                        <TableCell align="right">{entery[1]}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Centered>
        )
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
