export const CATEGORY_META = {
  awareness:   { label: 'AI 認不認識你',    max: 25 },
  findability: { label: 'AI 找不找得到你',  max: 25 },
  mentions:    { label: '別人怎麼說你',      max: 25 },
  content:     { label: '內容寫得清不清楚',  max: 25 },
};

export function buildPrompt(name, area, hasScreenshot) {
  const screenshotNote = hasScreenshot
    ? `\n注意：使用者已附上該商家的 Google Maps 截圖，請優先從截圖中讀取真實資訊（評分、評論數、地址、營業時間等）作為評分依據，這比你的訓練資料更準確。\n`
    : '';

  return `你是一個 GEO（生成式搜尋優化）分析師。請針對以下台灣在地商家進行 AI 能見度評估。
${screenshotNote}
商家名稱：${name}
地區：${area}

評分標準非常嚴格，請從四個維度各給 0–25 分：
1. awareness（AI 認不認識你）：除非此商家在全國媒體或大型平台有大量報導，否則 AI 幾乎不認識在地小店，預設應給低分（0–8）
2. findability（AI 找不找得到你）：消費者問「${area}附近推薦」時此店出現的機率。沒有主動做 GEO 優化的商家，AI 幾乎不會主動推薦，預設低分（0–8）
3. mentions（別人怎麼說你）：在 Dcard、Threads、PTT、部落格等平台被提及的次數。一般在地小店討論量極少，預設低分（0–10）
4. content（內容寫得清不清楚）：Google 商家檔案、官網、社群等可供 AI 引用的資訊豐富度。多數商家資訊殘缺，預設低分（0–8）

評分現實：GEO 是全新領域，台灣 95% 的在地商家從未做過優化，AI 幾乎不認識他們。總分通常落在 8–28 分之間，超過 40 分的商家極為罕見。請以此為基準給出真實反映現況的低分，並在 detail 中說明具體不足之處。

只回傳以下 JSON，不得有任何其他文字：
{
  "scores": {
    "awareness":   { "score": <整數 0-25>, "detail": "<針對此商家的一句具體說明，繁體中文>" },
    "findability": { "score": <整數 0-25>, "detail": "<...>" },
    "mentions":    { "score": <整數 0-25>, "detail": "<...>" },
    "content":     { "score": <整數 0-25>, "detail": "<...>" }
  },
  "actions": {
    "today":     ["<具體可執行步驟>", "<...>", "<...>"],
    "thisMonth": ["<...>", "<...>", "<...>"],
    "later":     ["<...>", "<...>"]
  }
}`;
}

export function parseClaudeJSON(text) {
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

export function enrichScores(rawScores) {
  return Object.fromEntries(
    Object.entries(rawScores).map(([key, val]) => {
      const pct    = val.score / 25;
      const status = pct >= 0.7 ? 'green' : pct >= 0.4 ? 'yellow' : 'red';
      return [key, { ...val, max: 25, label: CATEGORY_META[key].label, status }];
    })
  );
}

const HAIKU_PRICE = { input: 0.80 / 1_000_000, output: 4.00 / 1_000_000 };

export function logCost(usage, name, area) {
  const total = usage.input_tokens * HAIKU_PRICE.input + usage.output_tokens * HAIKU_PRICE.output;
  console.log(`[費用] ${name}@${area} | in:${usage.input_tokens} out:${usage.output_tokens} | $${total.toFixed(5)} USD (~NT$${(total * 32).toFixed(2)})`);
}
