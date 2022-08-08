import {
  Alert,
  AlertTitle,
  AppBar,
  Button,
  CircularProgress,
  Container,
  createTheme,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
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

const labels = [
  "الاسم",
  "المدرسه",
  "الجهه/ اليئهه",
  "الحاله",
  "نوعية التعليم",
  "الفرع",
  "اللغه العربيه",
  "اللغه الاول",
  "اللغه الثانيه",
  "الرياضه اليحته",
  "الرياضه التطبيقيه",
  "التاريخ",
  "الجغرفيا",
  "الفلسفه",
  "النفسيه",
  "الكيمياء",
  "الأحياء",
  "الجيولوجيا وعلوم البيئة",
  "الفيزياء",
  "مجموع الدرجات",
  "التربية الدينية",
  "التربية الوطنية",
  "الاقتصاد والإحصاء",
  "رقم الجلوس",
  "النسبه",
];

function Search() {
  const [seatNo, setSeatNo] = useState<number | null>(null);
  let [result, setResult] = useState<{
    res: Result;
    rank: { resultRank: number; total: number };
  } | null>(null);
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<null | string>(null);

  const search = async () => {
    if (!seatNo) return;
    setLoading(true);
    try {
      const [{ data }, { data: rankData }] = await Promise.all([
        axios.get(`${SERVER}/search?seatNo=${seatNo}`),
        axios.get(`${SERVER}/rank?seatNo=${seatNo}`),
      ]);
      setResult({ res: data, rank: rankData.rank[0] });
      setError(null);
    } catch (error) {
      const err = error as any;
      setError(
        err.response?.data?.message ? err.response.data.message : err.message
      );
    }
    setLoading(false);
  };
  console.log({ result });
  return (
    <Box sx={{ mt: "100px" }}>
      <Container
        maxWidth="sm"
        sx={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TextField
            value={seatNo || ""}
            onChange={(e) => {
              let val = Number(e.target.value);
              if (isNaN(val) === true) return;
              setSeatNo(val);
            }}
            sx={{ width: "100%", mr: "15px" }}
            label="Seat Number"
            error={error !== null}
            helperText={error === null ? "Ex: 612198" : error}
          />
          <Button
            onClick={search}
            disabled={!seatNo}
            sx={{ height: "55px", width: "120px" }}
            variant="outlined"
          >
            Search
          </Button>
        </Box>

        <Stack direction="row" sx={{ width: "100%" }}>
          <Button
            disabled={!seatNo}
            onClick={() => {
              if (!seatNo) return;
              setSeatNo(seatNo - 1);
              search();
            }}
            fullWidth
            startIcon={<NavigateBeforeIcon />}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (!seatNo) return;
              setSeatNo(seatNo + 1);
              search();
            }}
            disabled={!seatNo}
            fullWidth
            endIcon={<NavigateNextIcon />}
          >
            Next
          </Button>
        </Stack>
      </Container>
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
      ) : (
        error === null &&
        result !== null && (
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: "100%", mb: "24px" }}
            >
              <Box sx={{ justifySelf: "flex-start" }}>
                <Typography variant="h1">
                  {result.rank ? result.rank.resultRank : "-"}
                  <Typography variant="subtitle1" component="span">
                    th
                  </Typography>
                </Typography>
                <Typography>الترتيب ع مستوي الجمهوريه</Typography>
              </Box>
              <Box sx={{ justifySelf: "flex-end" }}>
                <Typography variant="h1">
                  {result.res.total}
                  <Typography variant="subtitle1" component="span">
                    th
                  </Typography>
                </Typography>
                <Typography sx={{ textAlign: "right" }}>المجموع</Typography>
              </Box>
            </Stack>
            <TableContainer sx={{ maxWidth: "sm" }} component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">النتيجه</TableCell>
                    <TableCell>العنوان</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(result.res).map((val, idx) => (
                    <TableRow>
                      <TableCell scope="row" align="right">
                        {val}
                      </TableCell>
                      <TableCell>{labels[idx]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        )
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
