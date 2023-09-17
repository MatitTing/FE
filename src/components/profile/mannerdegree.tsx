import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface MannerDegreeProps {
  degree: number;
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}°C`}</Typography>
      </Box>
    </Box>
  );
}

export default function MannerDegree({ degree }: MannerDegreeProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={degree} />
    </Box>
  );
}
