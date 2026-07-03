const fs = require('fs');
const pagesDir = 'C:\Users\94953\Desktop\codex项目\爱的养育\src\\pages';

const files = {};

files['ByAgePage.tsx'] = "import { useState } from \"react\";\n" +
  "import { useNavigate } from \"react-router-dom\";\n" +
  "import NavBar from \"../components/NavBar\";\n" +
  "import { AGE_GROUPS, AgeGroup } from \"../types/card\";\n" +
  "import { getCardsByAge } from \"../data/cards\";\n" +
  "\nexport default function ByAgePage() {\n" +
  "  const navigate = useNavigate();\n" +
  "  const [age, setAge] = useState<AgeGroup>(\"12-18月\");\n" +
  "  const filtered = getCardsByAge(age);\n" +
  "  return (\n" +
  "    <div className=\"app-container\">\n" +
  "      <NavBar />\n" +
  "      <div className=\"page-content\">\n" +
  '        <h2 className="page-title">按年龄浏览</h2>\n' +
  '        <p className="page-subtitle">根据宝宝月龄查看适合的知识卡片</p>\n' +
  "        <div className=\"tag-scroll\">\n" +
  "          {AGE_GROUPS.map((g) => (\n" +
  '            <button key={g} className={"tag-chip " + (age === g ? "active" : "")} onClick={() => setAge(g)}>{g}</button>\n' +
  "          ))}\n" +
  "        </div>\n" +
  "        {filtered.length === 0 ? (\n" +
  '          <div className="my-empty">该年龄段暂无内容</div>\n' +
  "        ) : (\n" +
  "          filtered.map((card) => (\n" +
  '            <div key={card.id} className="card-item fade-in" onClick={() => navigate("/card/" + card.id)}>\n' +
  "              <div className=\"card-item-header\">\n" +
  '                <span className={"card-type-badge type-" + card.type}>{card.type}</span>\n' +
  "                <span className=\"card-item-source\">{card.source.bookName}</span>\n" +
  "              </div>\n" +
  "              <div className=\"card-item-title\">{card.title}</div>\n" +
  "              <div className=\"card-item-preview\">{card.coreConcept}</div>\n" +
  "            </div>\n" +
  "          ))\n" +
  "        )}\n" +
  "      </div>\n" +
  "    </div>\n" +
  "  );\n" +
  "}\n";

Object.entries(files).forEach(([name, content]) => {
  fs.writeFileSync(pagesDir + '/' + name, content, 'utf-8');
  console.log('Created ' + name);
});
