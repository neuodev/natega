import {
  AppBar,
  Button,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Box } from "@mui/system";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import Search from "./components/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllResults from "./components/AllResults";
import { useState } from "react";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
    },
    error: {
      main: "#ef4444",
    },
  },
});

const pages = [
  { label: "All results", url: "/results" },
  { label: "search", url: "/" },
];

function App() {
  const [activeTab, setActiveTab] = useState("search");
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{ height: "100vh" }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(_, val: string) => {
                  setActiveTab(val);
                }}
                aria-label="lab API tabs example"
              >
                <Tab label="Search" value="search" />
                <Tab label="View all" value="results" />
              </TabList>
            </Box>
            <TabPanel value="search">
              <Search />
            </TabPanel>
            <TabPanel value="results">
              <AllResults />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
