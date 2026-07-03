import { ageGroups, type AgeGroupId } from "../types"

interface AgeGroupNavProps {
  selected: AgeGroupId
  onSelect: (id: AgeGroupId) => void
}

export default function AgeGroupNav({ selected, onSelect }: AgeGroupNavProps) {
  return (
    <div className="age-nav">
      <div className="age-nav-inner">
        {ageGroups.map((g) => (
          <button
            key={g.id}
            className={"age-nav-btn" + (selected === g.id ? " active" : "")}
            onClick={() => onSelect(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>
    </div>
  )
}
