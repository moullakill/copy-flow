import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { CopyButton } from "@/components/CopyButton";
import { 
  Send, 
  FileText, 
  Calendar,
  Trash2,
  Eye,
  Link as LinkIcon,
  Key,
  AlertCircle,
  Crown
} from "lucide-react";
import { getSubmissions, deleteSubmission, Submission } from "@/lib/submissions";
import { toast } from "sonner";

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette copie ?")) {
      deleteSubmission(id);
      setSubmissions(getSubmissions());
      toast.success("Copie supprimée");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysRemaining = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <Layout>
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Mes copies
                </h1>
                <p className="text-muted-foreground">
                  {submissions.length} copie{submissions.length !== 1 ? "s" : ""} active{submissions.length !== 1 ? "s" : ""}
                </p>
              </div>
              <Button variant="hero" asChild>
                <Link to="/submit">
                  <Send className="w-4 h-4" />
                  Nouvelle copie
                </Link>
              </Button>
            </div>

            {/* Free tier warning */}
            <Card variant="glass" className="mb-6 border-status-pending/30 bg-status-pending-bg">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-status-pending flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Version gratuite</p>
                  <p className="text-sm text-muted-foreground">
                    Vos copies expirent après 30 jours. Maximum 5 copies actives.
                  </p>
                </div>
                <Button variant="premium" size="sm" asChild>
                  <Link to="/premium">
                    <Crown className="w-4 h-4" />
                    Premium
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {submissions.length === 0 ? (
              <Card variant="elevated" className="text-center py-16">
                <CardContent>
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                    Aucune copie
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Vous n'avez pas encore déposé de copie.
                  </p>
                  <Button variant="hero" asChild>
                    <Link to="/submit">
                      <Send className="w-4 h-4" />
                      Déposer ma première copie
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission, index) => (
                  <Card 
                    key={submission.id} 
                    variant="elevated"
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-display font-semibold text-lg text-foreground truncate">
                              {submission.title}
                            </h3>
                            <StatusBadge status={submission.status} />
                          </div>
                          
                          <p className="text-muted-foreground mb-3">
                            {submission.studentName}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(submission.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Badge variant="outline">
                                {submission.contentType === "text" ? "Texte" : submission.fileType?.toUpperCase()}
                              </Badge>
                            </span>
                            <span className="text-status-pending">
                              Expire dans {getDaysRemaining(submission.expiresAt)} jours
                            </span>
                          </div>

                          {submission.status === "corrected" && submission.correction && (
                            <div className="mt-4 p-3 bg-status-corrected-bg rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-status-corrected">
                                  Note : {submission.correction.grade}
                                </span>
                              </div>
                              {submission.correction.appreciation && (
                                <p className="text-sm text-foreground">
                                  {submission.correction.appreciation}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex sm:flex-col gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/view/${submission.id}`}>
                              <Eye className="w-4 h-4" />
                              Voir
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(submission.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Sharing info */}
                      <div className="mt-4 pt-4 border-t border-border grid sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-muted-foreground" />
                          <code className="text-xs bg-secondary px-2 py-1 rounded flex-1 truncate">
                            {submission.consultationUrl}
                          </code>
                          <CopyButton text={submission.consultationUrl} label="" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Key className="w-4 h-4 text-muted-foreground" />
                          <code className="text-sm bg-secondary px-2 py-1 rounded font-mono tracking-wider">
                            {submission.editCode}
                          </code>
                          <CopyButton text={submission.editCode} label="" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
