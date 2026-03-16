import { Outlet } from "react-router-dom";
import DevSessionBanner from "./DevSessionBanner.jsx";

export default function AppLayout() {
  return (
    <>
      <DevSessionBanner />
      <Outlet />
    </>
  );
}