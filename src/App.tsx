import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Snackbar from "./components/Common/Snackbar";
import { useAppSelector } from "./hooks/reduxHooks";
import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { routes } from "./routes/routes";

function App() {
  const { snackbar } = useAppSelector((state) => state.main);
  return (
    <div>
      <BrowserRouter>
        <Snackbar
          message={snackbar.message}
          open={snackbar.open}
          status={snackbar.status as "success" | "error"}
        />
        <Routes>
          <Route path="/login" element={<Login />} />

          {localStorage.getItem("siymoToken") ? (
            <Route
              path="/"
              key="navigate"
              element={<Navigate to="/statistics" />}
            />
          ) : (
            <Route path="/" key="navigate" element={<Navigate to="/login" />} />
          )}

          {routes.map(({ path, component }) =>
            localStorage.getItem("siymoToken") ? (
              <Route path={path} key={path} element={component} />
            ) : (
              <Route
                path="/*"
                key="navigate"
                element={<Navigate to="/login" />}
              />
            )
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
