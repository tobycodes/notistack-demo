import { Button, Grid } from "@mui/material";

import { useToast } from "./lib/toast";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const toast = useToast();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Grid marginTop={3} display="flex" columnGap={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => toast.success("Success toast")}
          >
            Toast success
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => toast.error("Error toast")}
          >
            Toast error
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => toast.warning("Warning toast")}
          >
            Toast warning
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => toast.info("Info toast")}
          >
            Toast info
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => toast.default("Default toast")}
          >
            Toast default
          </Button>
        </Grid>
      </header>
    </div>
  );
}

export default App;
