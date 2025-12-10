import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "pending" | "corrected";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "corrected") {
    return (
      <Badge variant="corrected" className="gap-1">
        <CheckCircle className="w-3 h-3" />
        Corrigé
      </Badge>
    );
  }

  return (
    <Badge variant="pending" className="gap-1">
      <Clock className="w-3 h-3" />
      En attente
    </Badge>
  );
}
