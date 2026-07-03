export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverColor: string;
  priority: number;
}

export const books: Book[] = [
  { id: "montessori-toddler", title: "蒙台梭利养育1-3岁孩子", author: "Simone Davies", description: "专为1-3岁幼儿设计的蒙台梭利家庭实践指南。从准备环境、日常活动到亲子沟通，帮助父母在家庭中轻松实践蒙氏教育理念。", coverColor: "#F5A97F", priority: 1 },
  { id: "montessori-home", title: "蒙台梭利家庭方案", author: "尹亚楠、吴永和", description: "由中国妈妈撰写的蒙氏家庭实践书，结合中国家庭实际情况，提供了大量可操作的家庭蒙氏活动方案。", coverColor: "#8AB4A8", priority: 1 },
  { id: "positive-discipline", title: "正面管教", author: "Jane Nelsen", description: "倡导和善而坚定的教育方式，既不惩罚也不娇纵。提供了多种实用工具，帮助父母在尊重孩子的同时建立规则和界限。", coverColor: "#B8A9C9", priority: 1 },
  { id: "best-toy", title: "你是孩子最好的玩具", author: "金伯莉·布雷恩", description: "情感引导式育儿经典。强调父母的爱与陪伴是孩子最好的玩具，通过情感引导帮助孩子学会识别和管理情绪。", coverColor: "#F5C8A0", priority: 1 },
  { id: "see-child", title: "看见孩子", author: "贝姬·肯尼迪", description: "帮助父母真正看见孩子行为背后的内心需求，建立深层次的亲子连接，让孩子感受到被理解和被接纳。", coverColor: "#A8C5DA", priority: 1 },
  { id: "parent-language", title: "父母的语言", author: "Dana Suskind", description: "揭示早期语言环境对儿童大脑发育的决定性影响。提出3T原则，帮助父母在日常中丰富孩子的语言环境。", coverColor: "#C9A8D4", priority: 1 },
  { id: "terrible-two", title: "可怕的两岁", author: "约翰·罗斯蒙德", description: "全面解析1-3岁幼儿叛逆行为背后的心理机制，提供应对T2阶段的实用策略。", coverColor: "#E8A0A0", priority: 1 },
  { id: "childhood-secret", title: "童年的秘密", author: "玛丽亚·蒙台梭利", description: "蒙台梭利的经典奠基之作。深入剖析0-6岁儿童的心理发展规律，揭示敏感期、吸收性心智等核心概念。", coverColor: "#A0C4A8", priority: 2 },
  { id: "absorbent-mind", title: "有吸收力的心灵", author: "玛丽亚·蒙台梭利", description: "阐明0-6岁儿童特有的吸收性心智——孩子如海绵般不费力地吸收环境中的一切。", coverColor: "#B0C8E0", priority: 2 },
  { id: "montessori-method", title: "蒙台梭利早期教育法", author: "玛丽亚·蒙台梭利", description: "蒙氏教育法的系统阐述。从感官教育、语言教育到日常生活练习，全面介绍蒙台梭利的教育理念。", coverColor: "#C8D0A0", priority: 2 },
  { id: "sensitive-periods", title: "蒙台梭利儿童敏感期手册", author: "玛丽亚·蒙台梭利", description: "系统梳理儿童0-6岁各敏感期的特征与表现，包括语言敏感期、动作协调敏感期、秩序敏感期等。", coverColor: "#D4B8A8", priority: 2 },
  { id: "montessori-start", title: "从零开始：蒙台梭利早期教育", author: "Paula Polk Lillard", description: "从出生到3岁的完整蒙氏教育指南。详细介绍了如何为不同月龄的婴儿和幼儿准备环境、选择活动。", coverColor: "#A8D0C0", priority: 2 },
  { id: "raise-amazing", title: "如何培养蒙台梭利儿童", author: "Tim Seldin", description: "图文并茂的蒙氏家庭实用指南。涵盖0-12岁各阶段的活动设计、环境布置和家庭教育策略。", coverColor: "#C8B8A0", priority: 2 },
  { id: "wish-parents-read", title: "真希望我父母读过这本书", author: "Philippa Perry", description: "从亲子关系角度探讨育儿，强调父母自我觉察的重要性。帮助父母理解自己的成长经历如何影响育儿方式。", coverColor: "#D0A8B8", priority: 2 },
  { id: "nonviolent-comm", title: "非暴力沟通", author: "Marshall Rosenberg", description: "提出非暴力沟通的四步法——观察、感受、需要、请求。适用于亲子沟通的通用沟通哲学。", coverColor: "#A0B8D0", priority: 2 },
  { id: "psychological-nurture", title: "心理抚养", author: "李玫瑾", description: "中国犯罪心理学家李玫瑾的育儿观点集。强调早期心理抚养比物质抚养更重要，关注儿童心理健康和人格培养。", coverColor: "#C0A8A0", priority: 3 },
  { id: "raising-boys", title: "养育男孩", author: "Steve Biddulph", description: "详解男孩成长的三个阶段及每个阶段的养育要点。帮助父母理解男孩的特殊需求，培养健康自信的男孩。", coverColor: "#A8B8C8", priority: 3 },
  { id: "raising-girls", title: "养育女孩", author: "Steve Biddulph", description: "解析女孩成长的五个关键阶段以及父母在每个阶段应给予的支持。培养自信、独立、内心强大的女孩。", coverColor: "#D0B8C8", priority: 3 },
];

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

export function getPriorityLabel(p: number): string {
  if (p === 1) return "重点推荐";
  if (p === 2) return "经典必读";
  return "专题拓展";
}

export function getPriorityBooks(p: number): Book[] {
  return books.filter((b) => b.priority === p);
}
