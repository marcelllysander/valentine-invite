export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: "not_configured" });
  }

  const body = req.body || {};
  const to = String(body.to || "Unknown");
  const from = String(body.from || "Unknown");
  const url = String(body.url || "");
  const acceptedAt = String(body.acceptedAt || new Date().toISOString());

  const text = `💘 Valentine Accepted!
Untuk: ${to}
Dari: ${from}
Waktu: ${acceptedAt}
Link: ${url}`;

  const tgUrl = `https://api.telegram.org/bot8491358278:AAERMHz91wpOUKFjH0ByVCecUe5gPyjvh08/sendMessage`;

  try {
    const r = await fetch(tgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const data = await r.json();
    if (!r.ok || !data.ok) {
      return res.status(500).json({ ok: false, telegram: data });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "request_failed" });
  }
}
