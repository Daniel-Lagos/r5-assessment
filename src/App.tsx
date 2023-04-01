import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import CreateNumber from "./components/CreateNumber";
import List from "./components/List";
import "./App.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);
  const [list, setList] = useState<
    { firstName: string; lastName: string; number: string }[]
  >([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("list") ||
        `[{
           "firstName": "John",
           "lastName": "Doe",
           "number": "315787830"
           },
          {
           "firstName": "Johana",
           "lastName": "Hernandez",
           "number": "3132826723"
        }]`
    );
    if (data.length > 0) {
      setList(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ color: "white", width: "697px" }}
        >
          <Tab
            label="Phone book"
            style={{ color: "white" }}
            {...a11yProps(0)}
          />
          <Tab
            label="add new number"
            style={{ color: "white" }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <List list={list} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateNumber setList={setList} />
      </TabPanel>
    </div>
  );
}

export default App;
