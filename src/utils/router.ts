import { lazy } from "react";

export const ROUTE_WITHOUT_AUTH = ["/login", "/signup", "/forget-password"];
export const ROUTE_WITHOUT_LEFTNAV = [""];
export const ROUTE_WITHOUT_RIGHTNAV = ["/message"];

export const ROUTES_CONFIG = [
  {
    path: "/",
    element: lazy(() => import("../pages/login")),
  },
  {
    path: "/signup",
    element: lazy(() => import("../pages/signup")),
  },
  {
    path: "/dashboard",
    element: lazy(() => import("../pages/dashboard")),
  },
];
