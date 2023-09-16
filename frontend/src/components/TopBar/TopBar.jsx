import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function TopBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#4a4948" }}>
      <Toolbar sx={{ padding: "15px" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "white",
            marginRight: "10px",
            fontSize: "26px" 
          }}
        >
          FREQUENT-RESEARCH
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
