import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Container fluid>
        <MainView />
      </Container>
    </BrowserRouter>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
