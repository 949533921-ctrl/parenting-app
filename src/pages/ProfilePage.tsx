import { Heart, BookOpen, Sparkles } from "lucide-react"
import Header from "../components/Header"
import BottomNav from "../components/BottomNav"
import { cards } from "../data/cards"
import { useFavorites } from "../hooks/useFavorites"

export default function ProfilePage() {
  const { favorites } = useFavorites()
  const featured = cards.filter((c) => c.isFeatured)

  return (
    <div className="page profile-page">
      <Header />
      <div className="page-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <Heart size={32} color="#F43F5E" fill="#F43F5E" />
          </div>
          <h2 className="profile-name">爱的养育</h2>
          <p className="profile-desc">和你一起，用爱养育</p>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <BookOpen size={24} color="#8B5CF6" />
            <span className="stat-number">{cards.length}</span>
            <span className="stat-label">知识卡片</span>
          </div>
          <div className="stat-item">
            <Sparkles size={24} color="#F59E0B" />
            <span className="stat-number">{featured.length}</span>
            <span className="stat-label">精选推荐</span>
          </div>
          <div className="stat-item">
            <Heart size={24} color="#EC4899" />
            <span className="stat-number">{favorites.length}</span>
            <span className="stat-label">已收藏</span>
          </div>
        </div>
        <div className="about-section">
          <h3>关于这个App</h3>
          <p>爱的养育是一款为妈妈们设计的育儿知识卡片App。</p>
          <p>每一张卡片都来自真实的育儿经验和专业书籍的精华提炼，让你在碎片时间里也能学到实用的育儿知识。</p>
          <p className="about-tag">12-18个月版本 · 持续更新中</p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
