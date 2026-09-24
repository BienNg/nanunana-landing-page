import "server-only";
import { Resend } from "resend";
import { serverEnv } from "@/lib/env";
import type { Lead, LeadDestinationFactory } from "./types";

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

function rows(lead: Lead): [string, string][] {
  const a = lead.attribution;
  return [
    ["Họ tên", lead.name],
    ["Điện thoại", lead.phone],
    ["Email", lead.email ?? "—"],
    ["Khoá học", lead.course?.label ?? "—"],
    ["Mục tiêu", lead.goal?.label ?? "—"],
    ["Liên hệ qua", lead.channel.label],
    ["Lời nhắn", lead.message ?? "—"],
    [
      "Nguồn",
      [a.utmSource, a.utmMedium, a.utmCampaign, a.utmContent].filter(Boolean).join(" / ") || "—",
    ],
    ["Trang đến", a.landingPage ?? "—"],
    ["Referrer", a.referrer ?? "—"],
    [
      "Thời gian",
      new Date(lead.createdAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
    ],
    ["Mã", lead.id],
  ];
}

export function renderLeadEmail(lead: Lead) {
  const zalo = `https://zalo.me/${lead.phone.replace(/^\+/, "")}`;
  const subject = `[Lead mới] ${lead.name} · ${lead.course?.label ?? lead.goal?.label ?? "Tư vấn"} · ${lead.channel.label}`;
  const text = [
    `Lead mới từ website NaNu NaNa`,
    ``,
    ...rows(lead).map(([k, v]) => `${k}: ${v}`),
    ``,
    `Gọi: tel:${lead.phone}`,
    `Zalo: ${zalo}`,
  ].join("\n");

  const html = `<!doctype html><html lang="vi"><body style="font-family:Arial,sans-serif;color:#0f172a;margin:0;padding:24px;background:#f8fafc">
<div style="max-width:560px;margin:auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px">
<h1 style="font-size:18px;margin:0 0 4px">Lead mới: ${esc(lead.name)}</h1>
<p style="margin:0 0 16px;color:#475569">Liên hệ qua <b>${esc(lead.channel.label)}</b></p>
<p style="margin:0 0 20px">
<a href="tel:${esc(lead.phone)}" style="display:inline-block;background:#0b7793;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;margin-right:8px">Gọi ${esc(lead.phone)}</a>
<a href="${esc(zalo)}" style="display:inline-block;background:#b85a0c;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px">Mở Zalo</a>
</p>
<table style="width:100%;border-collapse:collapse;font-size:14px">
${rows(lead)
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 8px 6px 0;color:#64748b;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table></div></body></html>`;

  return { subject, text, html };
}

export const emailDestination: LeadDestinationFactory = () => {
  const cfg = serverEnv.resend();
  if (!cfg) return null;
  const resend = new Resend(cfg.apiKey);

  return {
    name: "email",
    async send(lead: Lead) {
      const { subject, text, html } = renderLeadEmail(lead);
      const { error } = await resend.emails.send({
        from: cfg.from,
        to: cfg.to,
        subject,
        text,
        html,
        ...(lead.email ? { replyTo: lead.email } : {}),
      });
      if (error) throw new Error(`Resend: ${error.name} ${error.message}`);
    },
  };
};
