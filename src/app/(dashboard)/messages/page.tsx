"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import users from "@/mock/users.json";
import type { PlatformUser } from "@/types/user";
import { cn } from "@/lib/cn";

const seed = [
  { role: "user" as const, name: "Amara J.", text: "Hi Dr. Osei, I've been feeling anxious ahead of my presentation.", time: "10:32 AM" },
  { role: "coach" as const, name: "You", text: "I hear you. Let's work through some grounding techniques.", time: "10:34 AM" },
  { role: "user" as const, name: "Amara J.", text: "That would be really helpful, thank you.", time: "10:35 AM" },
];

export default function CoachMessagesPage() {
  const list = users as PlatformUser[];
  const [msgs, setMsgs] = useState(seed);
  const [input, setInput] = useState("");

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "coach", name: "You", text: t, time: "Now" }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          role: "user",
          name: "Amara J.",
          text: "Thank you, that's really helpful. I'll try that before our next session.",
          time: "Now",
        },
      ]);
    }, 1000);
  };

  return (
    <DashboardLayout title="Messages">
      <div className="grid animate-fadeIn grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr] lg:items-start">
        <Card className="overflow-hidden p-0">
          {list.slice(0, 4).map((u, i) => (
            <div
              key={u.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 border-b border-[rgba(60,50,40,0.08)] px-4 py-3.5",
                i === 0 && "bg-sage-soft"
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-sage-tint text-base">
                🌿
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold">{u.name}</div>
                <div className="text-xs text-dim">
                  {i === 0 ? "Thank you so much, that really helps..." : "Last message 2d ago"}
                </div>
              </div>
              {i < 2 ? <div className="h-2 w-2 shrink-0 rounded-full bg-terra" /> : null}
            </div>
          ))}
        </Card>
        <div className="flex h-[460px] flex-col overflow-hidden rounded-card border border-line">
          <div className="flex items-center gap-3 bg-sidebar px-[18px] py-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#F5DDD4] text-lg">
              🌿
            </div>
            <div>
              <div className="text-sm font-semibold text-[#FDFAF5]">Amara Johnson</div>
              <div className="text-xs text-[#FDFAF5]/40">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-[#2E7D4F]" />
                Active 2 min ago
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-canvas p-[18px]">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn("max-w-[72%]", m.role === "coach" ? "self-end" : "self-start")}
              >
                <div
                  className={cn(
                    "rounded-[14px] px-[15px] py-2.5 text-[13.5px] leading-relaxed",
                    m.role === "coach"
                      ? "rounded-br bg-sage text-white"
                      : "rounded-bl border border-line bg-card text-ink shadow-sm"
                  )}
                >
                  {m.text}
                </div>
                <div className={cn("mt-0.5 text-[10px] text-dim", m.role === "coach" && "text-right")}>
                  {m.time}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-line bg-card px-3.5 py-3">
            <input
              className="flex-1 rounded-[22px] border-[1.5px] border-[rgba(60,50,40,0.12)] bg-canvas px-4 py-2 text-[13.5px] outline-none focus:border-sage"
              placeholder="Message Amara J..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button size="sm" type="button" onClick={send}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
