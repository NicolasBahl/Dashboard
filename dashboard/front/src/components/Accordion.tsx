import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Widgets from "../components/Widgets";

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <DashboardIcon  />
          <Typography>Dashboards</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Widgets/>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
