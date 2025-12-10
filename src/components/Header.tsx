import { Link } from "react-router-dom";
import { FileText, Send, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-xl text-foreground">CopyFlow</span>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/submit">
              <Send className="w-4 h-4" />
              Déposer
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <FileText className="w-4 h-4" />
              Mes copies
            </Link>
          </Button>
          <Button variant="premium" size="sm" asChild>
            <Link to="/premium">
              <Crown className="w-4 h-4" />
              Premium
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
