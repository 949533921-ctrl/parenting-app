import { Home, Bookmark, User } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function BottomNav() {
  const links = [
    { to: "/", icon: Home, label: "首页" },
    { to: "/favorites", icon: Bookmark, label: "收藏" },
    { to: "/profile", icon: User, label: "我的" },
  ]
  return (
    <nav className="bottom-nav">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
          <link.icon size={22} />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
