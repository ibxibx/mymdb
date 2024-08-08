import { createRoot } from "react-dom/client";
import "./index.scss";
import { MainView } from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const App = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
