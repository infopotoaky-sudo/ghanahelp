/** Tiny classname combiner */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Promise-based delay used by services to simulate network latency */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** ISO date string n days in the past */
export function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

/** ISO date string n days in the future */
export function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.max(1, Math.round(diff / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.round(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatGHS(amount: number): string {
  return `GH₵${amount.toLocaleString("en-GH")}`;
}

/** Simple whitespace tokeniser, lowercased */
export function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9₵]+/)
    .filter((t) => t.length > 0);
}

/** True when every query token appears somewhere in the haystack fields */
export function matchesQuery(fields: Array<string | undefined>, query: string): boolean {
  const tokens = tokenize(query);
  if (tokens.length === 0) return true;
  const haystack = fields.filter(Boolean).join(" • ").toLowerCase();
  return tokens.every((t) => haystack.includes(t));
}

/** Weighted relevance score — higher means closer match */
export function relevanceScore(
  weighted: Array<{ value: string | undefined; weight: number }>,
  query: string
): number {
  const tokens = tokenize(query);
  if (tokens.length === 0) return 1;
  let score = 0;
  let matchedAll = true;
  const combined = weighted
    .map((w) => (w.value ?? "").toLowerCase())
    .join(" ");
  for (const t of tokens) {
    let tokenScore = 0;
    for (const { value, weight } of weighted) {
      if ((value ?? "").toLowerCase().includes(t)) tokenScore += weight;
    }
    if (tokenScore === 0) matchedAll = false;
    score += tokenScore;
  }
  if (!matchedAll) return 0;
  return score / Math.max(1, combined.length / 200);
}

/** Generates a mock request id like GHH-4F7K */
export function generateRequestId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 4; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `GHH-${out}`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function waLink(phone: string, message?: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

/** Parse the lowest figure out of a salary/budget string like "GH₵6,000 – 9,000" */
export function parseBudgetMin(text: string | undefined): number | null {
  if (!text) return null;
  const digits = text.replace(/,/g, "").match(/\d+/);
  return digits ? parseInt(digits[0], 10) : null;
}
