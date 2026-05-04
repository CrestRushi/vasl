"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CoachCard } from "@/components/cards/CoachCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { coachService } from "@/services/coach.service";
import type { Coach } from "@/types/coach";
export default function OrgCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  useEffect(() => {
    coachService.list().then(setCoaches);
  }, []);

  return (
    <DashboardLayout title="Our Coaches">
      <div className="animate-fadeIn">
        <h3 className="mb-4 font-serif text-lg font-semibold">Assigned Coaches (4)</h3>
        {coaches.slice(0, 4).map((c) => (
          <CoachCard key={c.id} coach={c} />
        ))}
        <Card className="mt-4 border-0 bg-sage-soft">
          <div className="mb-2 font-semibold">Need additional coaches?</div>
          <p className="mb-3 text-sm text-mid">
            Contact your account manager to add or change coach assignments for your organization.
          </p>
          <Button size="sm" type="button">
            Contact Account Manager
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
