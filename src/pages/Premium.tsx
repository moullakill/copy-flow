import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  CheckCircle, 
  X,
  Archive,
  Infinity,
  FileDown,
  Clock,
  Users,
  Zap
} from "lucide-react";

const features = {
  free: [
    { name: "Dépôt de copies", included: true },
    { name: "5 copies actives maximum", included: true },
    { name: "Rétention 30 jours", included: true },
    { name: "Correction par code", included: true },
    { name: "Archivage illimité", included: false },
    { name: "Export CSV", included: false },
    { name: "Dashboard professeur", included: false },
  ],
  premium: [
    { name: "Dépôt de copies", included: true },
    { name: "Copies actives illimitées", included: true },
    { name: "Archivage permanent", included: true },
    { name: "Correction par code", included: true },
    { name: "Dashboard professeur avancé", included: true },
    { name: "Export CSV des notes", included: true },
    { name: "Mode correction différée", included: true },
  ],
};

export default function PremiumPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="premium" className="mb-6">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Débloquez tout le potentiel de{" "}
              <span className="text-accent">CopyFlow</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Archivage illimité, copies sans limite, et outils avancés pour les professeurs.
              Tout ce dont vous avez besoin pour gérer vos corrections efficacement.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-2xl">Gratuit</CardTitle>
                <CardDescription>Pour commencer</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-display font-bold">0€</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {features.free.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-status-corrected flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/submit">Commencer gratuitement</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card variant="elevated" className="border-accent/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 gradient-premium text-premium-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                Populaire
              </div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Crown className="w-6 h-6 text-accent" />
                  Premium
                </CardTitle>
                <CardDescription>Pour les utilisateurs réguliers</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-display font-bold">4,99€</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {features.premium.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-status-corrected flex-shrink-0" />
                      <span className="text-foreground">{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="premium" className="w-full">
                  <Zap className="w-4 h-4" />
                  Passer à Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features detail */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Fonctionnalités Premium
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tout ce qui est inclus dans votre abonnement Premium.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card variant="elevated">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center mb-4">
                  <Archive className="w-6 h-6 text-premium-foreground" />
                </div>
                <CardTitle className="text-xl">Archivage Permanent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Conservez toutes vos copies indéfiniment. Plus de limite de 30 jours, retrouvez vos travaux à tout moment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center mb-4">
                  <Infinity className="w-6 h-6 text-premium-foreground" />
                </div>
                <CardTitle className="text-xl">Sans Limite</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Déposez autant de copies que vous le souhaitez. Fini la limite de 5 copies actives.
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center mb-4">
                  <FileDown className="w-6 h-6 text-premium-foreground" />
                </div>
                <CardTitle className="text-xl">Export CSV</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Exportez la liste de toutes vos notes au format CSV pour vos rapports et suivis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-premium-foreground" />
                </div>
                <CardTitle className="text-xl">Dashboard Professeur</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Vue centralisée de toutes les copies à corriger. Filtrez par statut ou par élève.
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-premium-foreground" />
                </div>
                <CardTitle className="text-xl">Correction Différée</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Préparez vos corrections sans les publier immédiatement. Publiez toutes les notes en même temps.
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-premium-foreground" />
                </div>
                <CardTitle className="text-xl">Support Prioritaire</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Bénéficiez d'une assistance prioritaire par email pour toutes vos questions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card variant="elevated" className="max-w-3xl mx-auto text-center p-8 md:p-12">
            <Crown className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Prêt à passer à Premium ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Rejoignez des milliers d'utilisateurs qui profitent déjà de toutes les fonctionnalités de CopyFlow.
            </p>
            <Button variant="premium" size="xl">
              <Crown className="w-5 h-5" />
              Commencer l'essai gratuit
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              7 jours d'essai gratuit • Annulation à tout moment
            </p>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
