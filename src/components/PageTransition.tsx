import { useLocation, Outlet } from "react-router";

export default function PageTransition() {
  const location = useLocation();

  return (
    <div
      key={location.key}
      style={{ animation: "pageFadeIn 500ms ease both" }}
    >
      <Outlet />
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
