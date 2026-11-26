"use client";

import { Button } from "@/components/ds";
import { ToastContainer } from "@/components/craft/toast-container";
import { useToast } from "@/hooks/use-toast-notification";

/** Controls for the toast showcase. The toasts themselves are the demo component. */
export function ToastDemo() {
  const { toasts, success, warning, danger, info, removeToast, clearAllToasts } = useToast();

  const showAll = () => {
    success("Success!", "First notification");
    setTimeout(() => warning("Warning!", "Second notification"), 200);
    setTimeout(() => danger("Error!", "Third notification"), 400);
    setTimeout(() => info("Info", "Fourth notification"), 600);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={() => success("Success!", "Your action was completed successfully")}>
          Show success
        </Button>
        <Button onClick={() => warning("Warning!", "Please review your settings")}>Show warning</Button>
        <Button onClick={() => danger("Error!", "Something went wrong")}>Show error</Button>
        <Button onClick={() => info("Info", "Here is some information")}>Show info</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={showAll}>Show multiple toasts</Button>
        <Button variant="ghost" onClick={clearAllToasts}>
          Clear all
        </Button>
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
