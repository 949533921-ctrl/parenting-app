import { Heart } from "lucide-react"

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-logo">
          <Heart size={24} className="logo-icon" />
          <span>爱的养育</span>
        </h1>
        <p className="app-subtitle">每日育儿知识卡片</p>
      </div>
    </header>
  )
}
