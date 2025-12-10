import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Send, 
  FileText, 
  CheckCircle, 
  Clock, 
  Shield, 
  Zap, 
  Crown,
  ArrowRight,
  Link as LinkIcon,
  LogIn
} from "lucide-react";

export default function Index() {
  const { user } = useAuth();
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 animate-fade-up">
              <Zap className="w-3 h-3 mr-1" />
              Nouveau • Transfert de copies simplifié
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Transférez vos copies{" "}
              <span className="text-primary">en un instant</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Une plateforme simple et sécurisée pour déposer vos travaux et recevoir vos corrections. 
              Sans inscription pour les professeurs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {user ? (
                <>
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/submit">
                      <Send className="w-5 h-5" />
                      Déposer une copie
                    </Link>
                  </Button>
                  <Button variant="outline" size="xl" asChild>
                    <Link to="/dashboard">
                      <FileText className="w-5 h-5" />
                      Mes copies
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/auth">
                      <LogIn className="w-5 h-5" />
                      Commencer gratuitement
                    </Link>
                  </Button>
                  <Button variant="outline" size="xl" asChild>
                    <Link to="/premium">
                      <Crown className="w-5 h-5" />
                      Voir les offres
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trois étapes simples pour transférer vos copies et recevoir vos corrections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Send className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">1. Déposez</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Collez votre texte ou téléversez un fichier PDF/DOCX. Entrez votre nom et le titre du travail.
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <LinkIcon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">2. Partagez</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Recevez une URL de consultation et un code d'édition unique à partager avec votre professeur.
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">3. Consultez</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Retrouvez votre note et l'appréciation de votre professeur directement sur la plateforme.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <Badge variant="secondary" className="mb-4">Pour les élèves</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Simple et efficace
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-status-corrected flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Dépôt en quelques secondes</p>
                    <p className="text-muted-foreground">Collez votre texte ou glissez-déposez un fichier.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="w-6 h-6 text-status-pending flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Suivi en temps réel</p>
                    <p className="text-muted-foreground">Suivez le statut de vos copies : en attente ou corrigé.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Sécurisé et confidentiel</p>
                    <p className="text-muted-foreground">Seul vous et votre professeur avez accès à vos travaux.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <Badge variant="secondary" className="mb-4">Pour les professeurs</Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Sans inscription
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-status-corrected flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Accès direct</p>
                    <p className="text-muted-foreground">Ouvrez le lien et entrez le code d'édition fourni par l'élève.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Visualisation intégrée</p>
                    <p className="text-muted-foreground">Lisez les textes et documents directement dans votre navigateur.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Send className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Correction simple</p>
                    <p className="text-muted-foreground">Entrez la note et votre appréciation en quelques clics.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <Card variant="elevated" className="max-w-4xl mx-auto overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <Badge variant="premium" className="mb-4">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  Allez plus loin
                </h2>
                <p className="text-muted-foreground mb-6">
                  Conservez vos copies indéfiniment, supprimez les limites et accédez au dashboard professeur avancé.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-corrected" />
                    Archivage illimité
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-corrected" />
                    Copies actives illimitées
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-corrected" />
                    Export CSV des notes
                  </li>
                </ul>
                <Button variant="premium" asChild>
                  <Link to="/premium">
                    Découvrir Premium
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="gradient-premium p-8 md:p-12 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-premium-foreground/80 text-sm mb-2">À partir de</p>
                  <p className="text-5xl font-display font-bold text-premium-foreground">4,99€</p>
                  <p className="text-premium-foreground/80 text-sm">/mois</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
