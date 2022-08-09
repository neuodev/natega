import {
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { SERVER } from "../constants";
import { labels, Result } from "./Search";

const AllResults = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  let [results, setResults] = useState<{
    results: Result[];
    pages: number;
  } | null>(null);
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<null | string>(null);

  const fetchData = async () => {
    if (pageNumber < 1) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${SERVER}/results?page=${pageNumber}`);
      setResults(data);
      setError(null);
    } catch (error) {
      const err = error as any;
      setError(
        err.response?.data?.message ? err.response.data.message : err.message
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table
          size="small"
          sx={{ minWidth: 500 }}
          aria-label="custom pagination table"
          stickyHeader
        >
          {loading === false && (
            <TableHead>
              <TableRow>
                {labels.map((l, idx) => (
                  <TableCell
                    align="center"
                    sx={{ minWidth: l.width }}
                    key={idx}
                  >
                    <Tooltip
                      placement="top"
                      arrow
                      title={<Typography>{l.title}</Typography>}
                    >
                      <Typography>{l.title}</Typography>
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {loading === true
              ? new Array(9).fill(1).map((_, idx1) => (
                  <TableRow key={idx1} sx={{ display: "flex" }}>
                    {new Array(labels.length).fill(0).map((_, idx) => (
                      <TableCell
                        align="center"
                        sx={{ minWidth: labels[idx].width }}
                        key={`${idx1}-${idx}`}
                      >
                        <Skeleton
                          width={labels[idx].width + "px"}
                          height="60px"
                          variant="text"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : results?.results.map((res, idx) => (
                  <TableRow
                    sx={{ minWidth: labels[idx].width }}
                    key={`${res.seat_no}-${idx}`}
                  >
                    {Object.values(res).map((val) => (
                      <TableCell align="center" key={val}>
                        <Tooltip
                          arrow
                          placement="top"
                          title={<Typography>{val}</Typography>}
                        >
                          <Typography>{val}</Typography>
                        </Tooltip>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter>
        <TableRow>
          <IconButton
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(1)}
          >
            <SkipPreviousIcon />
          </IconButton>
          <IconButton
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            disabled={!results || pageNumber >= results.pages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <NavigateNextIcon />
          </IconButton>
          <IconButton
            disabled={!results || pageNumber >= results.pages}
            onClick={() => results && setPageNumber(results?.pages)}
          >
            <SkipNextIcon />
          </IconButton>

          <Typography variant="caption">
            {pageNumber} out of {results?.pages ?? "Many"}
          </Typography>
        </TableRow>
      </TableFooter>
    </Box>
  );
};

export default AllResults;
