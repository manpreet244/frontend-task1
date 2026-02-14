'use client'
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
    toast.error(error.message || "Something went wrong!", {
      style: {
        background: "#ef4444",
        color: "white",
        border: "none",
      },
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      <h2 className="text-xl font-semibold text-red-600">
        Something went wrong!
      </h2>
      <p className="text-gray-600">
        {error.message || "An unexpected error occurred"}
      </p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  );
}
