import { Heart } from "lucide-react"
import Header from "../components/Header"
import CardView from "../components/CardView"
import BottomNav from "../components/BottomNav"
import { cards } from "../data/cards"
import { useFavorites } from "../hooks/useFavorites"

export default function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const favoriteCards = cards.filter((c) => favorites.includes(c.id))

  return (
    <div className="page favorites-page">
      <Header />
      <div className="page-content">
        <h2 className="section-title">
          <Heart size={20} className="section-icon" color="#EC4899" fill="#EC4899" />
          我的收藏
        </h2>
        {favoriteCards.length === 0 ? (
          <div className="empty-state">
            <Heart size={48} color="#ddd" />
            <p>还没有收藏的知识卡片</p>
            <p className="empty-hint">在首页点击卡片上的爱心即可收藏</p>
          </div>
        ) : (
          <div className="cards-list">
            {favoriteCards.map((card) => (
              <CardView key={card.id} card={card} isFavorite={isFavorite(card.id)} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
