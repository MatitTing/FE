import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PartySituation from "./PartySituation";
import styled from "@emotion/styled";
import PartyReview from "./PartyReview";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 99;
`;

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContainer>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="파티현황" {...a11yProps(0)} />
            <Tab label="후기" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </TabContainer>
      <CustomTabPanel value={value} index={0}>
        <PartySituation />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PartyReview />
      </CustomTabPanel>
    </Box>
  );
}
