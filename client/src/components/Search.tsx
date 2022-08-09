import {
  Button,
  CircularProgress,
  Container,
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
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import axios from "axios";
import { useState } from "react";
import { SERVER } from "../constants";

export type Result = {
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

export const labels = [
  { title: "الاسم", width: "200px" },
  { title: "المدرسه", width: "180px" },
  { title: "الجهه/ اليئهه", width: "100px" },
  { title: "الحاله", width: "100px" },
  { title: "نوعية التعليم", width: "100px" },
  { title: "الفرع", width: "100px" },
  { title: "اللغه العربيه", width: "80px" },
  { title: "اللغه الاول", width: "80px" },
  { title: "اللغه الثانيه", width: "80px" },
  { title: "الرياضه اليحته", width: "80px" },
  { title: "الرياضه التطبيقيه", width: "80px" },
  { title: "التاريخ", width: "80px" },
  { title: "الجغرفيا", width: "80px" },
  { title: "الفلسفه", width: "80px" },
  { title: "النفسيه", width: "80px" },
  { title: "الكيمياء", width: "80px" },
  { title: "الأحياء", width: "80px" },
  { title: "الجيولوجيا وعلوم البيئة", width: "80px" },
  { title: "الفيزياء", width: "80px" },
  { title: "مجموع الدرجات", width: "80px" },
  { title: "التربية الدينية", width: "80px" },
  { title: "التربية الوطنية", width: "80px" },
  { title: "الاقتصاد والإحصاء", width: "80px" },
  { title: "رقم الجلوس", width: "80px" },
  { title: "النسبه", width: "80px" },
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

  return (
    <Box>
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
            In progress...
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
                      <TableCell>{labels[idx]?.title}</TableCell>
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export default Search;
