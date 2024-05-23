import { Suspense, useEffect } from "react";
import Loader from "./component/loader";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ROUTES_CONFIG } from "./utils/router";
import { getCookie } from "./utils";

const App = () => {
  const AUTH = getCookie("auth");
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  useEffect(() => {
    if (AUTH) {
      if (path.startsWith("/login") || path.startsWith("/signup")) {
        navigate("/dashboard");
      }
    } else {
      if (path.startsWith("/dashboard")) {
        navigate("/");
      }
    }
  }, [AUTH]);
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          {ROUTES_CONFIG.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.element />}
            ></Route>
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
