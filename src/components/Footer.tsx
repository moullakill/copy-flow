import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg text-foreground leading-tight">Submity</span>
              <span className="text-[10px] text-muted-foreground leading-none">by AIOCT</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/submit" className="hover:text-foreground transition-colors">Déposer une copie</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/premium" className="hover:text-foreground transition-colors">Premium</Link>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © 2024 AIOCT. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
