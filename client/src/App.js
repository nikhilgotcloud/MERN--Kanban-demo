import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import RequireAuth from "./routes/RequireAuth";

const Home = lazy(() => import("./pages/Home"));
const BoardPage = lazy(() => import("./pages/BoardPage"));


function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      

        <Route
          path="/u/:username"
          element={
            <RequireAuth redirectTo="/notfound">
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/b/:id/:boardTitle"
          element={
            <RequireAuth redirectTo="/notfound">
              <BoardPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
