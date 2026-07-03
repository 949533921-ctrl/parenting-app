import { useState } from "react"
import Header from "../components/Header"
import CardView from "../components/CardView"
import AgeGroupNav from "../components/AgeGroupNav"
import BottomNav from "../components/BottomNav"
import { getCardsByAgeGroup } from "../data/cards"
import { useFavorites } from "../hooks/useFavorites"
import type { AgeGroupId } from "../types"

function getDaySeed(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86400000)
}

function getDateLabel(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const d = now.getDate()
  const weekDays = ["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"]
  return y + "\u5e74" + m + "\u6708" + d + "\u65e5 \u5468" + weekDays[now.getDay()]
}

function pickDailyCards(allCards: any[], count: number) {
  const seed = getDaySeed()
  return [...allCards].sort((a, b) => {
    const ha = (seed * 31 + a.id.charCodeAt(0) * 7 + a.id.charCodeAt(a.id.length - 1) * 13) % 1000
    const hb = (seed * 31 + b.id.charCodeAt(0) * 7 + b.id.charCodeAt(b.id.length - 1) * 13) % 1000
    return ha - hb
  }).slice(0, count)
}

export default function HomePage() {
  const [ageGroup, setAgeGroup] = useState<AgeGroupId>("12-18")
  const { isFavorite, toggleFavorite } = useFavorites()
  const ageCards = getCardsByAgeGroup(ageGroup)
  const dailyCards = pickDailyCards(ageCards, 10)

  return (
    <div className="page home-page">
      <Header />
      <AgeGroupNav selected={ageGroup} onSelect={setAgeGroup} />
      <div className="daily-date">
        {getDateLabel()}
      </div>
      <div className="daily-cards">
        {dailyCards.map((card) => (
          <CardView key={card.id} card={card} isFavorite={isFavorite(card.id)} onToggleFavorite={toggleFavorite} showSource={true} />
        ))}
      </div>
      <div className="page-bottom-spacer"></div>
      <BottomNav />
    </div>
  )
}
