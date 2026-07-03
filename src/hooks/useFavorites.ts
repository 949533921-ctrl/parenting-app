import { useState, useCallback } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("love-parenting-favorites")
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      localStorage.setItem("love-parenting-favorites", JSON.stringify(next))
      return next
    })
  }, [])
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])
  return { favorites, toggleFavorite, isFavorite }
}
