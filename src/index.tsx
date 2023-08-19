/* @refresh reload */
import { lazy } from "solid-js";
import { render } from 'solid-js/web';
import { Route, Router, Routes } from "@solidjs/router";

import './styles/index.css';
const App = lazy(() => import("./App"));
const HomePage = lazy(() => import("./pages/Home"));
const RoomPage = lazy(() => import("./pages/Room"));

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <Router>
    <App />
    <Routes>
      <Route path="/" component={HomePage} />
      <Route path="/:user_id/:room_id" component={RoomPage} />
    </Routes>
  </Router>
), root!);
