import { Heart, Lightbulb, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Card } from "../types"

interface CardViewProps {
  card: Card
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  showSource?: boolean
}

const categoryLabels: Record<string, string> = {
  development: "发育里程碑", feeding: "饮食喂养", sleep: "睡眠",
  emotion: "情绪与行为", language: "语言发展", play: "游戏与学习", health: "安全与健康"
}

export default function CardView({ card, isFavorite, onToggleFavorite, showSource = true }: CardViewProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
    <div className="card-view" data-category={card.category}>
      <div className="card-header">
        <span className="card-category-tag">{categoryLabels[card.category] || card.category}</span>
        <button className="favorite-btn" onClick={(e) => { e.stopPropagation(); onToggleFavorite(card.id) }}>
          <Heart size={20} fill={isFavorite ? "#EC4899" : "none"} color={isFavorite ? "#EC4899" : "#D1D5DB"} />
        </button>
      </div>
      <h2 className="card-title">{card.title}</h2>
      <p className="card-summary">{card.summary}</p>
      <div className="card-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({children}) => {
              const t = typeof children === 'string' ? children : '';
              if (t.endsWith('\uff1a') && t.length < 25) return <div className="body-header">{t}</div>;
              return <p className="body-text">{children}</p>;
            },
            li: ({children}) => <div className="body-bullet"><span className="bullet-dot" />{children}</div>,
            ul: ({children}) => <div>{children}</div>,
          }}
        >
          {card.content.replace(/[•\u2022]/g, '-')}
        </ReactMarkdown>
      </div>
      {card.tip && (
        <div className="card-tip">
          <Lightbulb size={16} className="tip-icon" />
          <p>{card.tip}</p>
        </div>
      )}
      {showSource && card.source && (
        <div className="card-source-line">
          <BookOpen size={13} />
          <span>{card.source}</span>
        </div>
      )}
    </div>
    </motion.div>
  )
}
