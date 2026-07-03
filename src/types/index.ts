export interface Card {
  id: string
  title: string
  summary: string
  content: string
  category: CategoryId
  ageGroup: AgeGroupId
  tip?: string
  source?: string
  quote?: string
  isFeatured?: boolean
}

export type CategoryId =
  | "development"
  | "feeding"
  | "sleep"
  | "emotion"
  | "language"
  | "play"
  | "health"

export type AgeGroupId =
  | "0-6"
  | "6-12"
  | "12-18"
  | "1.5-2"
  | "2-3"

export interface AgeGroup {
  id: AgeGroupId
  label: string
  description: string
}

export const ageGroups: AgeGroup[] = [
  { id: "0-6", label: "0-6个月", description: "新生儿到半岁" },
  { id: "6-12", label: "6-12个月", description: "半岁到一岁" },
  { id: "12-18", label: "12-18个月", description: "一岁到一岁半" },
  { id: "1.5-2", label: "1.5-2岁", description: "一岁半到两岁" },
  { id: "2-3", label: "2-3岁", description: "两岁到三岁" },
]
