const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const basePath = path.join(__dirname, 'src', 'content', 'mind-map');
const files = fs.readdirSync(basePath).filter(file => file.endsWith('.mdx'));

// Concepts that are standard words, metaphors or statistical terms rather than true "thinking models"
const deniedTags = new Set([
  "假设", "代理", "先验", "峰值", "势能", "重心", "红线", "核选项", "零容忍政策", "摊牌", 
  "游击战", "挑战重量级", "样本量", "假阳性", "假阴性", "原假设", "统计显著性", "P值", 
  "通货膨胀", "秘密", "为什么是现在", "退出策略", "孤注一掷", "破釜沉舟", "转型", 
  "待办任务", "你在搜寻哪种类型的客户？", "粗略计算", "亮点", "滩头堡", "创意迷宫", 
  "热源追踪导弹", "人身攻击", "未知的未知数", "情景分析", "黑匣子", "自动化", 
  "均值", "中位数", "众数", "方差", "标准差", "正态分布", "置信区间", "误差条", 
  "内向型", "外向型", "先天与后天", "智商", "情商", "通才", "专家", "突击队员", 
  "步兵", "警察", "狐狸与刺猬", "以人为本的管理", "以人为本", "轶事证据", "直接原因",
  "根本原因", "事后分析", "活化能", "催化剂", "胡萝卜加大棒", "止血", "隔离", "绥靖",
  "黑暗模式", "特洛伊木马", "诱购", "高语境", "低语境", "赢得人心", "效忠者与雇佣兵",
  "管理者日程与匠人日程", "脚踏实地", "现时偏好", "延迟满足", "即时满足", "折现率", 
  "消耗战", "内部化", "输入无用信息，输出无用信息", "护城河", "进入壁垒", "退出壁垒",
  "每周一对一", "秘密", "同步发明", "预先安排的事件", "数据捕捞", "系统综述", "荟萃分析",
  "分配正义", "程序正义", "诉诸情感", "惧、惑、疑", "附带损害", "反弹", "众包",
  "商业案例", "温水煮青蛙", "保留可能性", "并行处理", "规模经济", "重新定义问题"
]);

let totalProcessed = 0;

files.forEach(filename => {
  const filePath = path.join(basePath, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  let { data, content } = matter(fileContent);

  // Filter existing tags or allUniqueTags matching
  let models = (data.tags || []).filter(tag => !deniedTags.has(tag));

  data.tags = models;

  // Strip all existing <Term> tags entirely from the content body
  content = content.replace(/<Term[^>]*>(.*?)<\/Term>/g, '$1');

  // Wrap the first occurrence of each valid model in the text
  models.forEach(model => {
      // Escape model string
      const escapedModel = model.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Create regex for first occurrence. Avoid matching inside URLs or existing HTML if any exist.
      // A simple regex might match partially inside other words (less issue in Chinese).
      const regex = new RegExp(`(${escapedModel})`, 'i');
      
      let replaced = false;
      content = content.replace(regex, (match) => {
          if (!replaced) {
              replaced = true;
              return `<Term term="${model}">${match}</Term>`;
          }
          return match;
      });
  });

  const newFileContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, newFileContent, 'utf-8');
  totalProcessed++;
});

console.log(`Successfully processed ${totalProcessed} files and removed non-mental-model tags.`);
