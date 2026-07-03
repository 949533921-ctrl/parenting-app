import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { id: "home", label: "首页", path: "/" },
  { id: "byAge", label: "按年龄", path: "/by-age" },
  { id: "byTopic", label: "按主题", path: "/by-topic" },
  { id: "mine", label: "我的", path: "/mine" },
];

export default function NavBar({ hideTabs }: { hideTabs?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const current = tabs.find((t) => location.pathname.startsWith(t.path))?.id || "home";

  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        <span className="top-nav-title">爱的养育</span>
      </div>
      {!hideTabs && (
        <div className="top-nav-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={"top-nav-tab " + (current === tab.id ? "active" : "")}
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
