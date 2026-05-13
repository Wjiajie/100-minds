# 100-minds 模型内容补全进度

更新时间：2026-05-13

## 执行规则

- 每批默认处理 5 个模型。
- 优先处理状态为 `todo` 的短文模型，按正文长度从短到长。
- `todo` 全部完成后，再处理 `needs-reference-audit`。
- `done-candidate` 首轮不重写，等 `todo` 与 `needs-reference-audit` 完成后再统一做引用核验和风格校准。
- 每个模型正文必须包含 5 个模块：核心定义、历史渊源与生动故事、模型深度解析、典型应用场景、权威引用与延伸阅读。
- URL 必须来自真实检索；无法稳定访问的来源改写为论文名、书名、DOI 或搜索关键词。

## 当前盘点

| 指标 | 数量 |
|---|---:|
| 模型总数 | 269 |
| done | 230 |
| todo | 28 |
| needs-reference-audit | 0 |
| done-candidate | 11 |
| blocked-needs-source | 0 |

## 本批记录

| 模型名称 | 文件路径 | 状态 | 正文长度 | 引用状态 | 最后更新时间 | 备注 |
|---|---|---|---:|---|---|---|
| 预期值 | `src/content/models/预期值.mdx` | done | 1654 | verified | 2026-05-13 | 本批补全；Britannica、Wikipedia URL HTTP 200；Huygens 与概率史以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 飞轮 | `src/content/models/飞轮.mdx` | done | 1525 | verified | 2026-05-13 | 本批补全；Jim Collins、Wikipedia URL HTTP 200；Good to Great 与 Turning the Flywheel 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 自然选择 | `src/content/models/自然选择.mdx` | done | 1634 | verified | 2026-05-13 | 本批补全；Britannica、Linnean Society URL HTTP 200；Darwin-Wallace 1858 论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 认知失调 | `src/content/models/认知失调.mdx` | done | 1591 | verified | 2026-05-13 | 本批补全；Britannica URL HTTP 200，De Gruyter URL HTTP 202；Festinger 经典著作以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 马斯洛需求层次 | `src/content/models/马斯洛需求层次.mdx` | done | 1696 | verified | 2026-05-13 | 本批补全；Britannica、Wikipedia URL HTTP 200；Maslow 与 Kenrick 论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |

## 下一批候选

| 模型名称 | 文件路径 | 状态 | 正文长度 | 引用状态 | 最后更新时间 | 备注 |
|---|---|---|---:|---|---|---|
| 魔鬼辩护人 | `src/content/models/魔鬼辩护人.mdx` | todo | 247 | missing | 2026-05-13 | 短文优先，待补全 |
| 蒙特卡洛模拟 | `src/content/models/蒙特卡洛模拟.mdx` | todo | 248 | missing | 2026-05-13 | 短文优先，待补全 |
| 邓宁-克鲁格效应 | `src/content/models/邓宁-克鲁格效应.mdx` | todo | 249 | missing | 2026-05-13 | 短文优先，待补全 |
| 预测市场 | `src/content/models/预测市场.mdx` | todo | 249 | missing | 2026-05-13 | 短文优先，待补全 |
| 过拟合 | `src/content/models/过拟合.mdx` | todo | 250 | missing | 2026-05-13 | 短文优先，待补全 |

## 进度表

| 模型名称 | 文件路径 | 状态 | 正文长度 | 引用状态 | 最后更新时间 | 备注 |
|---|---|---|---:|---|---|---|
| 稻草人 | `src/content/models/稻草人.mdx` | done | 1145 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 深度工作 | `src/content/models/深度工作.mdx` | done | 1311 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 路径依赖 | `src/content/models/路径依赖.mdx` | done | 1362 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 群体免疫效应 | `src/content/models/群体免疫效应.mdx` | done | 1362 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 选择的悖论 | `src/content/models/选择的悖论.mdx` | done | 1422 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 系统思考 | `src/content/models/系统思考.mdx` | done | 1506 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 塞尔定律 | `src/content/models/塞尔定律.mdx` | done | 1538 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 帕金森定律 | `src/content/models/帕金森定律.mdx` | done | 1543 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 汉隆剃刀 | `src/content/models/汉隆剃刀.mdx` | done | 1549 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 黑天鹅 | `src/content/models/黑天鹅.mdx` | done | 1633 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 锚定 | `src/content/models/锚定.mdx` | done | 1640 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 反馈循环 | `src/content/models/反馈循环.mdx` | done | 1652 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 塞麦尔维斯反射 | `src/content/models/塞麦尔维斯反射.mdx` | done | 1662 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 聚集性幻觉 | `src/content/models/聚集性幻觉.mdx` | done | 1665 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 时间框 | `src/content/models/时间框.mdx` | done | 1675 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 均值回归 | `src/content/models/均值回归.mdx` | done | 1684 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 发散思维 | `src/content/models/发散思维.mdx` | done | 1692 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 幸运表面积 | `src/content/models/幸运表面积.mdx` | done | 1696 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 收益矩阵 | `src/content/models/收益矩阵.mdx` | done | 1697 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| A-B测试 | `src/content/models/A-B测试.mdx` | done | 1721 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 搭便车现象 | `src/content/models/搭便车现象.mdx` | done | 1734 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 委托代理问题 | `src/content/models/委托代理问题.mdx` | done | 1734 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 喜好 | `src/content/models/喜好.mdx` | done | 1742 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 强制函数 | `src/content/models/强制函数.mdx` | done | 1743 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 折现率 | `src/content/models/折现率.mdx` | done | 1751 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 用户角色模型 | `src/content/models/用户角色模型.mdx` | done | 1752 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 引爆点 | `src/content/models/引爆点.mdx` | done | 1753 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 短视主义 | `src/content/models/短视主义.mdx` | done | 1755 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 温水煮青蛙 | `src/content/models/温水煮青蛙.mdx` | done | 1757 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 逆向思维 | `src/content/models/逆向思维.mdx` | done | 1771 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 活化能 | `src/content/models/活化能.mdx` | done | 1774 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 飞轮效应 | `src/content/models/飞轮效应.mdx` | done | 1780 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 双曲折现 | `src/content/models/双曲折现.mdx` | done | 1781 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 范式转换 | `src/content/models/范式转换.mdx` | done | 1807 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 间隔效应 | `src/content/models/间隔效应.mdx` | done | 1824 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| S形曲线 | `src/content/models/S形曲线.mdx` | done | 1834 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 五问法 | `src/content/models/五问法.mdx` | done | 1839 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 锚定效应 | `src/content/models/锚定效应.mdx` | done | 1846 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 正外部性 | `src/content/models/正外部性.mdx` | done | 1848 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 溢出效应 | `src/content/models/溢出效应.mdx` | done | 1872 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 粘蝇纸理论 | `src/content/models/粘蝇纸理论.mdx` | done | 1872 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 穷举搜索 | `src/content/models/穷举搜索.mdx` | done | 1877 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 合取谬误 | `src/content/models/合取谬误.mdx` | done | 1878 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 去风险化 | `src/content/models/去风险化.mdx` | done | 1893 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 时间价值 | `src/content/models/时间价值.mdx` | done | 1902 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 催化剂 | `src/content/models/催化剂.mdx` | done | 1906 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 极性 | `src/content/models/极性.mdx` | done | 1926 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 先发优势 | `src/content/models/先发优势.mdx` | done | 1928 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 峰值 | `src/content/models/峰值.mdx` | done | 1935 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 事后分析 | `src/content/models/事后分析.mdx` | done | 1936 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 重心 | `src/content/models/重心.mdx` | done | 1950 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 内部化 | `src/content/models/内部化.mdx` | done | 1957 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 反脆弱 | `src/content/models/反脆弱.mdx` | done | 1961 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 管制俘获 | `src/content/models/管制俘获.mdx` | done | 1961 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 沉没成本谬误 | `src/content/models/沉没成本谬误.mdx` | done | 1965 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 自动化 | `src/content/models/自动化.mdx` | done | 1968 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 根本原因 | `src/content/models/根本原因.mdx` | done | 1972 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 能力圈 | `src/content/models/能力圈.mdx` | done | 1979 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 早期大多数 | `src/content/models/早期大多数.mdx` | done | 1983 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 附带损害 | `src/content/models/附带损害.mdx` | done | 1996 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 代表性启发式 | `src/content/models/代表性启发式.mdx` | done | 2009 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 即时满足 | `src/content/models/即时满足.mdx` | done | 2014 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 后期大多数 | `src/content/models/后期大多数.mdx` | done | 2019 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 现金流折现法 | `src/content/models/现金流折现法.mdx` | done | 2026 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 确认偏误 | `src/content/models/确认偏误.mdx` | done | 2053 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 延迟满足 | `src/content/models/延迟满足.mdx` | done | 2062 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 负外部性 | `src/content/models/负外部性.mdx` | done | 2066 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 默认效应 | `src/content/models/默认效应.mdx` | done | 2095 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 二阶思维 | `src/content/models/二阶思维.mdx` | done | 2102 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 重新定义问题 | `src/content/models/重新定义问题.mdx` | done | 2112 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 早期采纳者 | `src/content/models/早期采纳者.mdx` | done | 2114 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 规模经济 | `src/content/models/规模经济.mdx` | done | 2237 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 技术采纳生命周期 | `src/content/models/技术采纳生命周期.mdx` | done | 2256 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 承诺机制 | `src/content/models/承诺机制.mdx` | done | 2278 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 拐点 | `src/content/models/拐点.mdx` | done | 2420 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 指数级增长 | `src/content/models/指数级增长.mdx` | done | 2450 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 黑匣子 | `src/content/models/黑匣子.mdx` | done | 2469 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 落后者 | `src/content/models/落后者.mdx` | done | 2489 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 直接原因 | `src/content/models/直接原因.mdx` | done | 2510 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 有名无实的胜利 | `src/content/models/有名无实的胜利.mdx` | done | 2524 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 反弹 | `src/content/models/反弹.mdx` | done | 2593 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 势能 | `src/content/models/势能.mdx` | done | 2645 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 现时偏好 | `src/content/models/现时偏好.mdx` | done | 2778 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 乐观偏差概率 | `src/content/models/乐观偏差概率.mdx` | done | 2824 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 证实偏差 | `src/content/models/证实偏差.mdx` | done | 2967 | verified | 2026-05-13 | 已具备 5 模块与引用 |
| 黑白谬误 | `src/content/models/黑白谬误.mdx` | done | 1863 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；未纳入 Reddit（未找到可靠单篇来源） |
| 群外偏见 | `src/content/models/群外偏见.mdx` | done | 1777 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；Wiley DOI 改为非链接引用；未纳入 Reddit |
| 转换成本 | `src/content/models/转换成本.mdx` | done | 1734 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；403 出版商链接改为 EconPapers/CEPR 与非链接 DOI |
| 连锁故障 | `src/content/models/连锁故障.mdx` | done | 1788 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；未纳入 Reddit（优先事故报告与论文） |
| 将军总在打上一场仗 | `src/content/models/将军总在打上一场仗.mdx` | done | 1646 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；注明出处不宜硬归因丘吉尔 |
| 帕金森琐碎定律 | `src/content/models/帕金森琐碎定律.mdx` | done | 1589 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；未纳入 Reddit（未找到可靠单篇来源） |
| 互惠 | `src/content/models/互惠.mdx` | done | 1776 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；SAGE DOI 改为非链接引用；未纳入 Reddit |
| 先发劣势 | `src/content/models/先发劣势.mdx` | done | 1688 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；EconPapers 链接替换为 IDEAS/RePEc |
| 2×2矩阵 | `src/content/models/2×2矩阵.mdx` | done | 1646 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；403 参考页改为非链接关键词 |
| 博弈论 | `src/content/models/博弈论.mdx` | done | 1691 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；出版社购物车链接替换为 Google Play Books |
| 席克定律 | `src/content/models/席克定律.mdx` | done | 2109 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；SAGE 403 链接改为非链接 DOI；未纳入 Reddit |
| 邓巴数 | `src/content/models/邓巴数.mdx` | done | 1918 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；ScienceDirect 403 链接改为 CiNii 条目；未纳入 Reddit |
| 战略税 | `src/content/models/战略税.mdx` | done | 2038 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；标注该词偏业界策略语境；未纳入 Reddit |
| 从众效应 | `src/content/models/从众效应.mdx` | done | 1956 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；OUP 403 链接改为 IDEAS/RePEc；未纳入 Reddit |
| 以牙还牙 | `src/content/models/以牙还牙.mdx` | done | 1759 | verified | 2026-05-13 | 本批补全；Markdown URL 全部 HTTP 200；SAGE 403 链接改为 IDEAS/RePEc；未纳入 Reddit |
| 第三方故事 | `src/content/models/第三方故事.mdx` | done | 2029 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit |
| 灰度思考 | `src/content/models/灰度思考.mdx` | done | 1979 | verified | 2026-05-13 | 本批补全；Wiley/DAU 直连不稳定，改用书名章节与 Open Library；未纳入 Reddit |
| 终局 | `src/content/models/终局.mdx` | done | 1548 | verified | 2026-05-13 | 本批补全；Cambridge 直连不稳定，改用 Merriam-Webster；未纳入 Reddit |
| 自行车棚效应 | `src/content/models/自行车棚效应.mdx` | done | 1685 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit |
| 九头蛇效应 | `src/content/models/九头蛇效应.mdx` | done | 1821 | verified | 2026-05-13 | 本批补全；PubMed 触发 reCAPTCHA，改用 Springer DOI 页面；未纳入 Reddit |
| 临界量 | `src/content/models/临界量.mdx` | done | 1687 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 魔像效应 | `src/content/models/魔像效应.mdx` | done | 1601 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 群内偏爱 | `src/content/models/群内偏爱.mdx` | done | 1429 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 效用值 | `src/content/models/效用值.mdx` | done | 1456 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 自利性偏差 | `src/content/models/自利性偏差.mdx` | done | 1489 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 产品-市场匹配 | `src/content/models/产品-市场匹配.mdx` | done | 1810 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 回音室效应 | `src/content/models/回音室效应.mdx` | done | 1791 | verified | 2026-05-13 | 本批补全；PNAS 直链用 DOI 与 NASA ADS 摘要页替代；未纳入 Reddit |
| 基础比率谬误 | `src/content/models/基础比率谬误.mdx` | done | 1664 | verified | 2026-05-13 | 本批补全；经典论文以 DOI 非链接形式记录；未纳入 Reddit |
| 亏本销售策略 | `src/content/models/亏本销售策略.mdx` | done | 1375 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 跨越鸿沟 | `src/content/models/跨越鸿沟.mdx` | done | 1577 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过浏览器打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 助推 | `src/content/models/助推.mdx` | done | 1873 | verified | 2026-05-13 | 本批补全；Harvard 与 NobelPrize URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 最善意的解释 | `src/content/models/最善意的解释.mdx` | done | 1756 | verified | 2026-05-13 | 本批补全；说明 MRI 非严格学术术语，并辅以慈善原则来源；不稳定页面改为搜索关键词 |
| 双赢 | `src/content/models/双赢.mdx` | done | 1634 | verified | 2026-05-13 | 本批补全；PON / Getting to Yes 来源已通过检索结果验证；未纳入 Reddit（未找到可靠单篇来源） |
| 公地悲剧 | `src/content/models/公地悲剧.mdx` | done | 1589 | verified | 2026-05-13 | 本批补全；Hardin 与 Ostrom 来源已通过网页打开验证；403 再版页已移除 |
| 古德哈特定律 | `src/content/models/古德哈特定律.mdx` | done | 1574 | verified | 2026-05-13 | 本批补全；原始论文用非链接题名记录；Markdown URL 已通过网页打开验证 |
| 启发式 | `src/content/models/启发式.mdx` | done | 1731 | verified | 2026-05-13 | 本批补全；Britannica 与 PhilPapers URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 全局最优 | `src/content/models/全局最优.mdx` | done | 1631 | verified | 2026-05-13 | 本批补全；NIST、Britannica 与 MathWorld URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 完美乃优秀之敌 | `src/content/models/完美乃优秀之敌.mdx` | done | 1464 | verified | 2026-05-13 | 本批补全；Wikiquote 与 Wikipedia URL 已通过网页打开验证；Voltaire/Watson-Watt 书目信息以非链接记录 |
| 入门毒品理论 | `src/content/models/入门毒品理论.mdx` | done | 1875 | verified | 2026-05-13 | 本批补全；NIDA、CDC 与 JAMA URL 已通过网页打开验证；强调顺序不等于因果 |
| 直接负责人 | `src/content/models/直接负责人.mdx` | done | 1625 | verified | 2026-05-13 | 本批补全；Fortune、Stanford eCorner 与 Apple Books URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 聚合思维 | `src/content/models/聚合思维.mdx` | done | 1510 | verified | 2026-05-13 | 本批补全；Britannica 与 Encyclopedia.com URL 已通过网页打开验证；Guilford 书目信息以非链接记录 |
| 设计模式 | `src/content/models/设计模式.mdx` | done | 1693 | verified | 2026-05-13 | 本批补全；Hillside URL 已通过网页打开验证；Alexander 与 GoF 书目信息以非链接记录 |
| 协和谬误 | `src/content/models/协和谬误.mdx` | done | 1436 | verified | 2026-05-13 | 本批补全；Britannica 与 Nature URL 已通过网页打开验证；Arkes/Ayton DOI 以非链接记录 |
| 冒名顶替综合征 | `src/content/models/冒名顶替综合征.mdx` | done | 1678 | verified | 2026-05-13 | 本批补全；Frontiers、Springer 与 CiNii URL 已通过网页打开验证；PubMed 门禁链接未写入 |
| 动量 | `src/content/models/动量.mdx` | done | 1459 | verified | 2026-05-13 | 本批补全；Britannica、OpenStax 与 Jim Collins URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 固定型思维vs.成长型思维 | `src/content/models/固定型思维vs.成长型思维.mdx` | done | 1951 | verified | 2026-05-13 | 本批补全；SAGE、Nature 与 Stanford URL 已通过网页打开验证；未纳入 Reddit |
| 可逆决策 | `src/content/models/可逆决策.mdx` | done | 1663 | verified | 2026-05-13 | 本批补全；Amazon PDF、Amazon 2016 信与 Farnam Street URL 已通过网页打开验证；未纳入 Reddit |
| 可重复性危机 | `src/content/models/可重复性危机.mdx` | done | 2011 | verified | 2026-05-13 | 本批补全；Edinburgh、Nature 与 SAGE URL 已通过网页打开验证；Science 直链改为 DOI/条目说明 |
| 刻意练习 | `src/content/models/刻意练习.mdx` | done | 1913 | verified | 2026-05-13 | 本批补全；CiNii 与 PhilPapers URL 已通过网页打开验证；PMC 触发 reCAPTCHA，改为非链接 DOI |
| 乐观偏差 | `src/content/models/乐观偏差.mdx` | done | 1749 | verified | 2026-05-13 | 本批补全；CiNii 与 Nature URL 已通过网页打开验证；PubMed 触发 reCAPTCHA，改用 Nature 页面 |
| 只有偏执狂才能生存 | `src/content/models/只有偏执狂才能生存.mdx` | done | 2141 | verified | 2026-05-13 | 本批补全；Google Books、MIT Press Bookstore 与 Wired URL 已通过网页打开验证；未纳入 Reddit |
| 净现值 | `src/content/models/净现值.mdx` | done | 1925 | verified | 2026-05-13 | 本批补全；Investopedia 与 CFI URL 已通过网页打开验证；OpenStax 不稳定，改为非链接章节说明 |
| 二八定律 | `src/content/models/二八定律.mdx` | done | 1822 | verified | 2026-05-13 | 本批补全；Investopedia、Britannica 与 Juran URL 已通过网页打开验证；未纳入 Reddit |
| 安慰剂效应 | `src/content/models/安慰剂效应.mdx` | done | 1840 | verified | 2026-05-13 | 本批补全；NIH NCCIH、Harvard Health 与 Britannica URL 已通过网页打开验证；Beecher 论文改为题名引用 |
| 复利 | `src/content/models/复利.mdx` | done | 1886 | verified | 2026-05-13 | 本批补全；Investor.gov 与 Investopedia URL 已通过网页打开验证；教材来源改为非链接书名章节 |
| 分析瘫痪 | `src/content/models/分析瘫痪.mdx` | done | 1756 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；DOI 以非链接记录；未纳入 Reddit（未找到可靠单篇来源） |
| 决策疲劳 | `src/content/models/决策疲劳.mdx` | done | 1764 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；PNAS 与 JPSP DOI 以非链接记录；未纳入 Reddit（未找到可靠单篇来源） |
| 功利主义 | `src/content/models/功利主义.mdx` | done | 1672 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 习得性无助 | `src/content/models/习得性无助.mdx` | done | 1602 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；APA 条目与核心论文 DOI 以非链接记录；未纳入 Reddit（未找到可靠单篇来源） |
| 小决定泛滥 | `src/content/models/小决定泛滥.mdx` | done | 1543 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；Kahn/Odum 论文 DOI 以非链接记录；未纳入 Reddit（未找到可靠单篇来源） |
| 发表偏倚 | `src/content/models/发表偏倚.mdx` | done | 2056 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；BMJ 与 Dickersin/Min 论文以非链接 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 人月神话 | `src/content/models/人月神话.mdx` | done | 1752 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 相关性不代表因果性 | `src/content/models/相关性不代表因果性.mdx` | done | 1974 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 动态平衡 | `src/content/models/动态平衡.mdx` | done | 1775 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 后见之明偏差 | `src/content/models/后见之明偏差.mdx` | done | 1598 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；PubMed 触发 reCAPTCHA，未写入；未纳入 Reddit（未找到可靠单篇来源） |
| 可得性偏差 | `src/content/models/可得性偏差.mdx` | done | 1966 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；Science 论文以非链接 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 超级预测家 | `src/content/models/超级预测家.mdx` | done | 2127 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；核心论文以非链接 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 市场失灵 | `src/content/models/市场失灵.mdx` | done | 1752 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；Pigou 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 公共物品 | `src/content/models/公共物品.mdx` | done | 1761 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；Samuelson 论文以题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 后果-信心矩阵 | `src/content/models/后果-信心矩阵.mdx` | done | 1822 | verified | 2026-05-13 | 本批补全；Markdown URL 已通过网页打开验证；Grove 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 包以德循环 | `src/content/models/包以德循环.mdx` | done | 1771 | verified | 2026-05-13 | 本批补全；Air University、Air University Press 与 Farnam Street URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 寒蝉效应 | `src/content/models/寒蝉效应.mdx` | done | 1608 | verified | 2026-05-13 | 本批补全；First Amendment Encyclopedia、Merriam-Webster Legal 与 Cornell Scholarship URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 混淆因素 | `src/content/models/混淆因素.mdx` | done | 1735 | verified | 2026-05-13 | 本批补全；CDC 与 NCBI URL 已通过网页打开验证；PubMed 触发浏览器检查，核心论文改为非链接 DOI；未纳入 Reddit（未找到可靠单篇来源） |
| 舍基原则 | `src/content/models/舍基原则.mdx` | done | 1790 | verified | 2026-05-13 | 本批补全；Kevin Kelly、Techdirt 与 Clay Shirky 原文镜像 URL 已通过网页打开验证；SAGE 条目改为非链接 DOI；未纳入 Reddit（未找到可靠单篇来源） |
| 赢家通吃市场 | `src/content/models/赢家通吃市场.mdx` | done | 1732 | verified | 2026-05-13 | 本批补全；Investopedia、Random House 与 Duke Scholars URL 已通过网页打开验证；HBS 条目改为非链接书目信息；未纳入 Reddit（未找到可靠单篇来源） |
| 多米诺骨牌效应 | `src/content/models/多米诺骨牌效应.mdx` | done | 1993 | verified | 2026-05-13 | 本批补全；Merriam-Webster 与 Britannica URL 已通过网页打开验证；Perrow 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 汉隆的剃刀 | `src/content/models/汉隆的剃刀.mdx` | done | 1854 | verified | 2026-05-13 | 本批补全；Britannica 与 Wiktionary URL 已通过网页打开验证；Bloch/Hubbard 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 客户开发 | `src/content/models/客户开发.mdx` | done | 1955 | verified | 2026-05-13 | 本批补全；O'Reilly 与 NSF I-Corps URL 已通过网页打开验证；Startup Owner's Manual 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 共振频率 | `src/content/models/共振频率.mdx` | done | 1825 | verified | 2026-05-13 | 本批补全；Britannica resonance/vibration/natural-frequency/circuits URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 波将金村 | `src/content/models/波将金村.mdx` | done | 1724 | verified | 2026-05-13 | 本批补全；Britannica Potemkin village 与 Grigory Potemkin URL 已通过网页打开验证；Montefiore 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 基本归因错误 | `src/content/models/基本归因错误.mdx` | done | 2317 | verified | 2026-05-13 | 本批补全；SAGE、ScienceDirect 与 Britannica URL 已通过网页打开验证；Gilbert/Malone 以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 威慑 | `src/content/models/威慑.mdx` | done | 1999 | verified | 2026-05-13 | 本批补全；Britannica、Google Books 与 Nobel Prize URL 已通过网页打开验证；Yale 直连不稳定，改用 Google Books；未纳入 Reddit |
| 中心极限定理 | `src/content/models/中心极限定理.mdx` | done | 2069 | verified | 2026-05-13 | 本批补全；Britannica central-limit/probability/normal-distribution URL 已通过网页打开验证；Feller 以书名记录；未纳入 Reddit |
| 反事实思维 | `src/content/models/反事实思维.mdx` | done | 2067 | verified | 2026-05-13 | 本批补全；SAGE URL 已通过网页打开验证；PubMed 触发浏览器检查，改为 PMID/DOI 非链接记录；未纳入 Reddit |
| 墨菲定律 | `src/content/models/墨菲定律.mdx` | done | 2129 | verified | 2026-05-13 | 本批补全；Britannica Dictionary、Smithsonian 与 Improbable Research URL 已通过网页打开验证；Matthews 以论文题名记录；未纳入 Reddit |
| 锁定效应 | `src/content/models/锁定效应.mdx` | done | 1782 | verified | 2026-05-13 | 本批补全；JSTOR 论文页已通过网页打开验证；Katz/Shapiro 与 Shapiro/Varian 以 DOI/书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 公正世界假说 | `src/content/models/公正世界假说.mdx` | done | 1720 | verified | 2026-05-13 | 本批补全；APA Dictionary 与 SAGE 开放论文页已通过网页打开验证；Lerner/Simmons 经典实验以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 社会认同 | `src/content/models/社会认同.mdx` | done | 1792 | verified | 2026-05-13 | 本批补全；Influence at Work、Annual Reviews、Britannica 与 OUP URL 已通过网页打开验证；未纳入 Reddit（未找到可靠单篇来源） |
| 信息不对称 | `src/content/models/信息不对称.mdx` | done | 1556 | verified | 2026-05-13 | 本批补全；JSTOR 与 Nobel Prize URL 已通过网页打开验证；Spence 信号论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 因果循环图 | `src/content/models/因果循环图.mdx` | done | 1629 | verified | 2026-05-13 | 本批补全；System Dynamics Society、The Systems Thinker 与 McGraw Hill URL 已通过网页打开验证；Meadows 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 技术负债 | `src/content/models/技术负债.mdx` | done | 2058 | verified | 2026-05-13 | 本批补全；Agile Alliance、Martin Fowler 与 IBM URL 全部 HTTP 200；OOPSLA 1992 经验报告以题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 熵 | `src/content/models/熵.mdx` | done | 1970 | verified | 2026-05-13 | 本批补全；Britannica 与 CiNii URL 全部 HTTP 200；Clausius 1865 论文以题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 外部性 | `src/content/models/外部性.mdx` | done | 1997 | verified | 2026-05-13 | 本批补全；Britannica 外部性/正外部性/负外部性 URL 全部 HTTP 200；Coase 与 Pigou 以论文/书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 赌徒谬误 | `src/content/models/赌徒谬误.mdx` | done | 1919 | verified | 2026-05-13 | 本批补全；Britannica 与 NBER URL 全部 HTTP 200；Tversky/Kahneman 以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 成本收益分析 | `src/content/models/成本收益分析.mdx` | done | 2065 | verified | 2026-05-13 | 本批补全；Britannica 与 OMB Circular A-4 URL 全部 HTTP 200；Dupuit 1844 以题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 坎贝尔定律 | `src/content/models/坎贝尔定律.mdx` | done | 2114 | verified | 2026-05-13 | 本批补全；Wikipedia、JMDE 与 EconPapers URL 全部 HTTP 200；ScienceDirect 403 直链改为 EconPapers 与非链接 DOI；未纳入 Reddit（未找到可靠单篇来源） |
| 思维实验 | `src/content/models/思维实验.mdx` | done | 1820 | verified | 2026-05-13 | 本批补全；Stanford Encyclopedia of Philosophy 与 Britannica URL 全部 HTTP 200；未纳入 Reddit（未找到可靠单篇来源） |
| 多任务处理 | `src/content/models/多任务处理.mdx` | done | 1769 | verified | 2026-05-13 | 本批补全；APA URL HTTP 200；APA DOI 与 ScienceDirect 403 直链改为非链接 DOI/题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 杠杆作用 | `src/content/models/杠杆作用.mdx` | done | 1867 | verified | 2026-05-13 | 本批补全；Britannica 与 Britannica Money URL 全部 HTTP 200；未纳入 Reddit（未找到可靠单篇来源） |
| 随机对照实验 | `src/content/models/随机对照实验.mdx` | done | 1992 | verified | 2026-05-13 | 本批补全；CONSORT、Britannica 与 Springer URL 全部 HTTP 200；BMJ 403 直链改为非链接 DOI/题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 遏制 | `src/content/models/遏制.mdx` | done | 2053 | verified | 2026-05-13 | 本批补全；Britannica、State Department 与 National Security Archive URL 全部 HTTP 200；Foreign Affairs 以题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 损失规避 | `src/content/models/损失规避.mdx` | done | 1959 | verified | 2026-05-13 | 本批补全；Econometric Society、Nobel Prize 与 Wikipedia URL 全部 HTTP 200；核心论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 大数定律 | `src/content/models/大数定律.mdx` | done | 1799 | verified | 2026-05-13 | 本批补全；Britannica 与 MathWorld URL 全部 HTTP 200；Bernoulli 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 权威 | `src/content/models/权威.mdx` | done | 1747 | verified | 2026-05-13 | 本批补全；Britannica 与 Influence at Work URL 全部 HTTP 200；Cialdini 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 梅特卡夫定律 | `src/content/models/梅特卡夫定律.mdx` | done | 1861 | verified | 2026-05-13 | 本批补全；Discovery、MIT Sloan Management Review 与 IEEE Spectrum URL 全部 HTTP 200；Metcalfe 论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 帕累托法则 | `src/content/models/帕累托法则.mdx` | done | 1538 | verified | 2026-05-13 | 本批补全；Juran Institute 与 Wikipedia URL 全部 HTTP 200；Pareto 原著以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 旁观者效应 | `src/content/models/旁观者效应.mdx` | done | 1596 | verified | 2026-05-13 | 本批补全；Britannica URL HTTP 200；Darley 与 Latane 论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 普朗克原理 | `src/content/models/普朗克原理.mdx` | done | 1569 | verified | 2026-05-13 | 本批补全；Wikipedia URL HTTP 200；Planck 自传、Science 与 AER 论文以书名/DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 机会成本 | `src/content/models/机会成本.mdx` | done | 1387 | verified | 2026-05-13 | 本批补全；Britannica 与 Wikipedia URL 全部 HTTP 200；Wieser 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 幂律分布 | `src/content/models/幂律分布.mdx` | done | 1541 | verified | 2026-05-13 | 本批补全；Wikipedia URL HTTP 200；Clauset-Shalizi-Newman 与 Mitzenmacher 论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 群体思维 | `src/content/models/群体思维.mdx` | done | 1810 | verified | 2026-05-13 | 本批补全；Britannica 与 Open Library URL 全部 HTTP 200；Janis 原书与 Political Psychology 论文以书名/DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 史翠珊效应 | `src/content/models/史翠珊效应.mdx` | done | 1891 | verified | 2026-05-13 | 本批补全；California Coastal Records 与 LA Times URL 全部 HTTP 200；Techdirt 与 The Smoking Gun 403 直链改为题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 无知之幕 | `src/content/models/无知之幕.mdx` | done | 1647 | verified | 2026-05-13 | 本批补全；Stanford Encyclopedia 与 Britannica URL HTTP 200；Harvard University Press 返回 202 但可达；Rawls 原书以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 收益递减 | `src/content/models/收益递减.mdx` | done | 1697 | verified | 2026-05-13 | 本批补全；Britannica 系列 URL 全部 HTTP 200；Ricardo 原著以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 顺势-逆势矩阵 | `src/content/models/顺势-逆势矩阵.mdx` | done | 2003 | verified | 2026-05-13 | 本批补全；TechCrunch 与 Oaktree URL 全部 HTTP 200；Oxford Academic 403 直链改为 Marks 书名章节；未纳入 Reddit（未找到可靠单篇来源） |
| 算法 | `src/content/models/算法.mdx` | done | 1763 | verified | 2026-05-13 | 本批补全；Britannica、Wikipedia URL HTTP 200；Knuth 与 CLRS 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 横向思维 | `src/content/models/横向思维.mdx` | done | 1701 | verified | 2026-05-13 | 本批补全；de Bono 官网、InstructionalDesign、Wikipedia URL HTTP 200；de Bono 原书以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 道德风险 | `src/content/models/道德风险.mdx` | done | 1786 | verified | 2026-05-13 | 本批补全；Britannica、IMF、PubMed URL HTTP 200；Arrow 1963 论文以题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 皮格马利翁效应 | `src/content/models/皮格马利翁效应.mdx` | done | 2000 | verified | 2026-05-13 | 本批补全；Open Library 与 Scientific American URL HTTP 200；ScienceDirect 403 直链改为 DOI/题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 效用递减 | `src/content/models/效用递减.mdx` | done | 1699 | verified | 2026-05-13 | 本批补全；Britannica 系列 URL 全部 HTTP 200；Jevons 与 Menger 经典著作以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 科斯定理 | `src/content/models/科斯定理.mdx` | done | 1667 | verified | 2026-05-13 | 本批补全；Britannica 与 Nobel Prize URL HTTP 200；Coase 原论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 稀缺 | `src/content/models/稀缺.mdx` | done | 1840 | verified | 2026-05-13 | 本批补全；Princeton PDF、Frontiers、Wikipedia URL HTTP 200；Mullainathan 与 Shafir 原书以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 破窗理论 | `src/content/models/破窗理论.mdx` | done | 1711 | verified | 2026-05-13 | 本批补全；OJP、University of Washington PDF、Wikipedia URL HTTP 200；Wilson 与 Kelling 原文以题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 得州神枪手谬误 | `src/content/models/得州神枪手谬误.mdx` | done | 1719 | verified | 2026-05-13 | 本批补全；Skeptic's Dictionary、Cambridge Core PDF URL HTTP 200；Wikipedia 偶发超时改为搜索关键词；Ioannidis 论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 过滤气泡 | `src/content/models/过滤气泡.mdx` | done | 1678 | verified | 2026-05-13 | 本批补全；TED、Open Library、Wikipedia、arXiv URL HTTP 200；Pariser 原书以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 眼镜蛇效应 | `src/content/models/眼镜蛇效应.mdx` | done | 1630 | verified | 2026-05-13 | 本批补全；Wikipedia、Google Books、Britannica URL HTTP 200；Siebert 原书以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 第一性原理 | `src/content/models/第一性原理.mdx` | done | 1529 | verified | 2026-05-13 | 本批补全；Britannica 与 Wikipedia URL HTTP 200；Aristotle 原典与 Munger 书以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 科学方法 | `src/content/models/科学方法.mdx` | done | 1575 | verified | 2026-05-13 | 本批补全；Stanford Encyclopedia 与 Britannica URL HTTP 200；Popper、Kuhn 经典著作以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 纳什均衡 | `src/content/models/纳什均衡.mdx` | done | 1527 | verified | 2026-05-13 | 本批补全；Britannica 与 Nobel Prize URL HTTP 200；Nash 论文以 DOI/题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 最简可行产品 | `src/content/models/最简可行产品.mdx` | done | 1750 | verified | 2026-05-13 | 本批补全；Lean Startup、HBR、Wikipedia URL HTTP 200；Ries 与 Blank 原书以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 蝴蝶效应 | `src/content/models/蝴蝶效应.mdx` | done | 1627 | verified | 2026-05-13 | 本批补全；Britannica、MDPI URL HTTP 200；Lorenz 1972 演讲以题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 线流图 | `src/content/models/线流图.mdx` | done | 1572 | verified | 2026-05-13 | 本批补全；System Dynamics Society、Wikipedia URL HTTP 200；Meadows PDF 404，改以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 风险预防原则 | `src/content/models/风险预防原则.mdx` | done | 1511 | verified | 2026-05-13 | 本批补全；Britannica URL HTTP 200；Rio Declaration Principle 15 的测试 PDF 404，改以原则名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 滑坡论 | `src/content/models/滑坡论.mdx` | done | 1390 | verified | 2026-05-13 | 本批补全；Britannica 与 Stanford Encyclopedia URL HTTP 200；Walton、Govier 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 零和 | `src/content/models/零和.mdx` | done | 1524 | verified | 2026-05-13 | 本批补全；Britannica 与 Wikipedia URL HTTP 200；von Neumann 与 Morgenstern 原书以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 承诺 | `src/content/models/承诺.mdx` | done | 1676 | verified | 2026-05-13 | 本批补全；O'Reilly、SCIRP URL HTTP 200；Freedman 与 Fraser 论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 组织文化 | `src/content/models/组织文化.mdx` | done | 1718 | verified | 2026-05-13 | 本批补全；MIT Sloan、Wikipedia URL HTTP 200；Schein 原书以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 贝叶斯学派 | `src/content/models/贝叶斯学派.mdx` | done | 1508 | verified | 2026-05-13 | 本批补全；Stanford Encyclopedia、Wikipedia URL HTTP 200；Jaynes 与 McGrayne 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 贝叶斯定理 | `src/content/models/贝叶斯定理.mdx` | done | 1507 | verified | 2026-05-13 | 本批补全；Britannica、Wikipedia URL HTTP 200；Bayes 1763 论文以题名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 相互确保毁灭 | `src/content/models/相互确保毁灭.mdx` | done | 1548 | verified | 2026-05-13 | 本批补全；Britannica、Wikipedia URL HTTP 200；Schelling 与 Kahn 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 预期值 | `src/content/models/预期值.mdx` | done | 1654 | verified | 2026-05-13 | 本批补全；Britannica、Wikipedia URL HTTP 200；Huygens 与概率史以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 飞轮 | `src/content/models/飞轮.mdx` | done | 1525 | verified | 2026-05-13 | 本批补全；Jim Collins、Wikipedia URL HTTP 200；Good to Great 与 Turning the Flywheel 以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 自然选择 | `src/content/models/自然选择.mdx` | done | 1634 | verified | 2026-05-13 | 本批补全；Britannica、Linnean Society URL HTTP 200；Darwin-Wallace 1858 论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 认知失调 | `src/content/models/认知失调.mdx` | done | 1591 | verified | 2026-05-13 | 本批补全；Britannica URL HTTP 200，De Gruyter URL HTTP 202；Festinger 经典著作以书名记录；未纳入 Reddit（未找到可靠单篇来源） |
| 马斯洛需求层次 | `src/content/models/马斯洛需求层次.mdx` | done | 1696 | verified | 2026-05-13 | 本批补全；Britannica、Wikipedia URL HTTP 200；Maslow 与 Kenrick 论文以 DOI 记录；未纳入 Reddit（未找到可靠单篇来源） |
| 魔鬼辩护人 | `src/content/models/魔鬼辩护人.mdx` | todo | 247 | missing | 2026-05-13 | 短文优先，待补全 |
| 蒙特卡洛模拟 | `src/content/models/蒙特卡洛模拟.mdx` | todo | 248 | missing | 2026-05-13 | 短文优先，待补全 |
| 邓宁-克鲁格效应 | `src/content/models/邓宁-克鲁格效应.mdx` | todo | 249 | missing | 2026-05-13 | 短文优先，待补全 |
| 预测市场 | `src/content/models/预测市场.mdx` | todo | 249 | missing | 2026-05-13 | 短文优先，待补全 |
| 过拟合 | `src/content/models/过拟合.mdx` | todo | 250 | missing | 2026-05-13 | 短文优先，待补全 |
| 林迪效应 | `src/content/models/林迪效应.mdx` | todo | 254 | missing | 2026-05-13 | 短文优先，待补全 |
| 颠覆性创新 | `src/content/models/颠覆性创新.mdx` | todo | 256 | missing | 2026-05-13 | 短文优先，待补全 |
| 最后通牒博弈 | `src/content/models/最后通牒博弈.mdx` | todo | 256 | missing | 2026-05-13 | 短文优先，待补全 |
| 肥尾分布 | `src/content/models/肥尾分布.mdx` | todo | 259 | missing | 2026-05-13 | 短文优先，待补全 |
| 逆向选择 | `src/content/models/逆向选择.mdx` | todo | 260 | missing | 2026-05-13 | 短文优先，待补全 |
| 黑天鹅事件 | `src/content/models/黑天鹅事件.mdx` | todo | 263 | missing | 2026-05-13 | 短文优先，待补全 |
| 勒夏特列原理 | `src/content/models/勒夏特列原理.mdx` | todo | 264 | missing | 2026-05-13 | 短文优先，待补全 |
| 决策树 | `src/content/models/决策树.mdx` | todo | 288 | missing | 2026-05-13 | 短文优先，待补全 |
| 条件概率 | `src/content/models/条件概率.mdx` | todo | 295 | missing | 2026-05-13 | 短文优先，待补全 |
| 逆火效应 | `src/content/models/逆火效应.mdx` | todo | 308 | missing | 2026-05-13 | 短文优先，待补全 |
| 侯世达定律 | `src/content/models/侯世达定律.mdx` | todo | 310 | needs-audit | 2026-05-13 | 短文优先，待补全 |
| 观察者效应 | `src/content/models/观察者效应.mdx` | todo | 320 | missing | 2026-05-13 | 短文优先，待补全 |
| 观察者期望偏差 | `src/content/models/观察者期望偏差.mdx` | todo | 345 | missing | 2026-05-13 | 短文优先，待补全 |
| 框架效应 | `src/content/models/框架效应.mdx` | todo | 347 | missing | 2026-05-13 | 短文优先，待补全 |
| 重复博弈 | `src/content/models/重复博弈.mdx` | todo | 368 | missing | 2026-05-13 | 短文优先，待补全 |
| 九九定律 | `src/content/models/九九定律.mdx` | todo | 397 | needs-audit | 2026-05-13 | 短文优先，待补全 |
| 权力真空 | `src/content/models/权力真空.mdx` | todo | 419 | missing | 2026-05-13 | 短文优先，待补全 |
| 网络效应 | `src/content/models/网络效应.mdx` | todo | 421 | missing | 2026-05-13 | 短文优先，待补全 |
| 惯性 | `src/content/models/惯性.mdx` | todo | 435 | missing | 2026-05-13 | 短文优先，待补全 |
| 反应偏差 | `src/content/models/反应偏差.mdx` | todo | 497 | missing | 2026-05-13 | 短文优先，待补全 |
| 敏感性分析 | `src/content/models/敏感性分析.mdx` | todo | 584 | missing | 2026-05-13 | 短文优先，待补全 |
| 反面模式 | `src/content/models/反面模式.mdx` | todo | 620 | needs-audit | 2026-05-13 | 短文优先，待补全 |
| 磁滞现象 | `src/content/models/磁滞现象.mdx` | todo | 686 | missing | 2026-05-13 | 短文优先，待补全 |
| 并行处理 | `src/content/models/并行处理.mdx` | done-candidate | 3003 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 暴力解决方案 | `src/content/models/暴力解决方案.mdx` | done-candidate | 3206 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 策略税 | `src/content/models/策略税.mdx` | done-candidate | 3258 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 彼得原理 | `src/content/models/彼得原理.mdx` | done-candidate | 3522 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 创新者 | `src/content/models/创新者.mdx` | done-candidate | 3571 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 不证实偏差 | `src/content/models/不证实偏差.mdx` | done-candidate | 3585 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 艾森豪威尔决策矩阵 | `src/content/models/艾森豪威尔决策矩阵.mdx` | done-candidate | 3606 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 沉没成本 | `src/content/models/沉没成本.mdx` | done-candidate | 3681 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 不可逆决策 | `src/content/models/不可逆决策.mdx` | done-candidate | 3692 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 奥卡姆剃刀 | `src/content/models/奥卡姆剃刀.mdx` | done-candidate | 4080 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
| 北极星 | `src/content/models/北极星.mdx` | done-candidate | 5492 | needs-audit | 2026-05-13 | 长文候选；首轮不重写，后续统一核验引用与风格 |
