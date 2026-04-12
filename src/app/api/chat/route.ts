import OpenAI from "openai";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

function getClient() {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
  });
}

// In-memory rate limiter: max 10 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const SYSTEM_PROMPT = `あなたは谷昊埜（たにこうや）のポートフォリオサイトに埋め込まれたアシスタントです。
訪問者からの質問に、以下のプロフィール情報をもとに簡潔に回答してください。
情報にないことは「その情報は掲載されていません」と正直に答えてください。捏造は絶対にしないでください。
日本語で質問されたら日本語で、英語なら英語で答えてください。回答は3〜4文以内で簡潔に。

---

【プロフィール】
名前: 谷昊埜（たにこうや / Koya Tani）
年齢: 19歳、京都出身
学歴: 同志社高等学校 → 慶應義塾大学SFC 総合政策学部（2025年4月入学）。清水先生の日本政治外交研究（JPD）所属。

【活動】
- ミラコエ（学生団体）: 代表（2024年9月〜）。若者の主体的な政治参加を促す。設立時4名→55名に成長。超党派の国会議員5名を招いた271名規模のイベント「ミライ選挙」を実現（満足度8.45/10、再参加意向97%）。Red Bull協賛の「ぽりふぇす」では子育て世帯200名動員。出前授業「つくろう。未来。」は選挙管理委員会からの依頼。Instagram閲覧数70万+。協賛団体21。
- Bedrock Space: 共同創業・COO（2026年2月〜）。CEOから直接COOを頼まれて参画。
- 能登・輪島塗事業（過去）: 田谷漆器店とパートナー契約、3回現地訪問。法人設立に至らずAI領域へピボット。

【受賞・実績】
- Dan Okimoto Rising Innovators Fellows 最年少採択（2026年1月、Silicon Valley Japan Platform）
- 第5回学生団体サミット優勝（2025年7月、賞金20万円）
- 宮古島観光戦略プログラム最優秀賞（リクルート主催）
- アプリ甲子園1次選考通過 / TSG 1次選考通過 / モノコトイノベーション5位

【所属】
IVSスカラシップ2期生、慶應ビジネスクラブ(KBC)21期、日本若者協議会、起業義塾部、ゴブリンスキークラブ

【メディア】
AbemaTV 2026年衆院選特番出演、TBS京都、YouTube「令和の猫」レギュラー、YouTube「日本未来会議」複数回出演、Yahoo!ニュース・読売新聞・京都新聞掲載、JDiCE登壇、七尾茶谷市長講演会で講演

【スキー】
フリースタイル・アルペン二刀流。ジュニアワールドツアー2位、全日本選手権15位、近畿大会男子団体初優勝、京都府3位(2年連続)、インターハイ出場(同志社34年ぶり)、さっぽろ雪まつりゲストパフォーマー、Instagram動画累計30万回以上再生

【背景】
母親が選択的夫婦別姓訴訟の原告。メキシコ出身の方との同居経験、南アフリカ人の友人家族との交流。海外経験: ケニア(小学生への日本文化授業)、インドネシア(語学研修)、アメリカ(ホームステイ受入家庭)、ベトナム・シンガポール。

【行動原理】
- アイデアの源泉は現場にある
- 長期的リターンを見据えた誠実さ
- 仲間・チームで動くリーダーシップ
- 行動が先、信念が後

【連絡】
取材・登壇・協業の相談はサイトのContactフォームから。
`;

export async function POST(request: Request) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "リクエストが多すぎます。少し待ってから再度お試しください。" }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const messages = body.messages;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "messages is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Keep only last 10 messages to limit context size
  const trimmed = messages.slice(-10).map((m) => ({
    role: m.role as "user" | "assistant",
    content: String(m.content).slice(0, 500),
  }));

  const stream = await getClient().chat.completions.create({
    model: "deepseek-chat",
    max_tokens: 512,
    stream: true,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...trimmed,
    ],
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (text) {
          controller.enqueue(encoder.encode(text));
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
