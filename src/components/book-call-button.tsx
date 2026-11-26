"use client";

import { getCalApi } from "@calcom/embed-react";
import { CalendarDays } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ds";

/** The site's one primary action: opens the Cal.com booking embed. */
export function BookCallButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "quick-chat" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <Button
      variant="primary"
      aria-label="Book a call"
      icon={<CalendarDays className="size-4" />}
      dataAttributes={{
        "data-cal-namespace": "quick-chat",
        "data-cal-link": "ankit-yadav-edanet/quick-chat",
        "data-cal-config": '{"layout":"month_view"}',
      }}
    >
      {/* Icon-only below sm so the navbar fits a phone */}
      <span className="hidden sm:inline">Book a call</span>
    </Button>
  );
}
