import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/StatusBadge";
import { CopyButton } from "@/components/CopyButton";
import { 
  FileText, 
  Calendar,
  User,
  Key,
  CheckCircle,
  Edit3,
  Send,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { getSubmissionById, updateSubmission, verifyEditCode, Submission } from "@/lib/submissions";
import { toast } from "sonner";

export default function ViewPage() {
  const { id } = useParams<{ id: string }>();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editCode, setEditCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [grade, setGrade] = useState("");
  const [appreciation, setAppreciation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const sub = getSubmissionById(id);
      setSubmission(sub || null);
      if (sub?.correction) {
        setGrade(sub.correction.grade);
        setAppreciation(sub.correction.appreciation);
      }
    }
    setLoading(false);
  }, [id]);

  const handleVerifyCode = () => {
    if (!id || !editCode.trim()) {
      toast.error("Veuillez entrer le code d'édition");
      return;
    }

    if (verifyEditCode(id, editCode.trim().toUpperCase())) {
      setCodeVerified(true);
      setEditMode(true);
      toast.success("Code vérifié ! Vous pouvez maintenant corriger.");
    } else {
      toast.error("Code d'édition incorrect");
    }
  };

  const handleSubmitCorrection = () => {
    if (!id || !grade.trim()) {
      toast.error("Veuillez entrer une note");
      return;
    }

    setSubmitting(true);

    try {
      updateSubmission(id, {
        status: "corrected",
        correction: {
          grade: grade.trim(),
          appreciation: appreciation.trim(),
          correctedAt: new Date().toISOString(),
        },
      });

      const updated = getSubmissionById(id);
      setSubmission(updated || null);
      setEditMode(false);
      toast.success("Correction enregistrée !");
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!submission) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container mx-auto px-4">
            <Card variant="elevated" className="max-w-lg mx-auto text-center py-16">
              <CardContent>
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
                <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                  Copie non trouvée
                </h2>
                <p className="text-muted-foreground mb-6">
                  Cette copie n'existe pas ou a expiré.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4" />
                    Retour à l'accueil
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Link>
              </Button>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {submission.title}
                    </h1>
                    <StatusBadge status={submission.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {submission.studentName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(submission.createdAt)}
                    </span>
                  </div>
                </div>

                {!editMode && !codeVerified && (
                  <Button variant="default" onClick={() => setEditMode(true)}>
                    <Edit3 className="w-4 h-4" />
                    Corriger
                  </Button>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Content */}
              <div className="lg:col-span-2">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Contenu de la copie
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {submission.contentType === "text" ? (
                      <div className="prose prose-sm max-w-none">
                        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                          {submission.content}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-secondary/50 rounded-lg p-8 text-center">
                        <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="font-medium text-foreground">{submission.content}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Fichier {submission.fileType?.toUpperCase()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Correction display */}
                {submission.status === "corrected" && submission.correction && !editMode && (
                  <Card variant="elevated" className="mt-6 border-status-corrected/30">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-status-corrected">
                        <CheckCircle className="w-5 h-5" />
                        Correction
                      </CardTitle>
                      <CardDescription>
                        Corrigé le {formatDate(submission.correction.correctedAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Note</Label>
                        <p className="text-3xl font-display font-bold text-foreground">
                          {submission.correction.grade}
                        </p>
                      </div>
                      {submission.correction.appreciation && (
                        <div>
                          <Label className="text-muted-foreground">Appréciation</Label>
                          <p className="text-foreground mt-1">
                            {submission.correction.appreciation}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Edit code verification */}
                {editMode && !codeVerified && (
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Key className="w-5 h-5" />
                        Code d'édition
                      </CardTitle>
                      <CardDescription>
                        Entrez le code fourni par l'élève pour pouvoir corriger.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          placeholder="XXXXXX"
                          value={editCode}
                          onChange={(e) => setEditCode(e.target.value.toUpperCase())}
                          className="text-center text-xl font-mono tracking-widest"
                          maxLength={6}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => setEditMode(false)}>
                          Annuler
                        </Button>
                        <Button variant="default" className="flex-1" onClick={handleVerifyCode}>
                          Vérifier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Correction form */}
                {editMode && codeVerified && (
                  <Card variant="elevated" className="border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Edit3 className="w-5 h-5" />
                        Formulaire de correction
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="grade">Note *</Label>
                        <Input
                          id="grade"
                          placeholder="15/20"
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appreciation">Appréciation</Label>
                        <Textarea
                          id="appreciation"
                          placeholder="Travail soigné, bonne analyse..."
                          value={appreciation}
                          onChange={(e) => setAppreciation(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1" 
                          onClick={() => {
                            setEditMode(false);
                            setCodeVerified(false);
                          }}
                        >
                          Annuler
                        </Button>
                        <Button 
                          variant="success" 
                          className="flex-1" 
                          onClick={handleSubmitCorrection}
                          disabled={submitting}
                        >
                          {submitting ? (
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Enregistrer
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Info card */}
                {!editMode && (
                  <Card variant="glass">
                    <CardHeader>
                      <CardTitle className="text-lg">Informations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium">
                          {submission.contentType === "text" ? "Texte" : submission.fileType?.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Statut</span>
                        <StatusBadge status={submission.status} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expire le</span>
                        <span className="font-medium">
                          {new Date(submission.expiresAt).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Sharing */}
                {!editMode && (
                  <Card variant="glass">
                    <CardHeader>
                      <CardTitle className="text-lg">Partage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">URL</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs bg-secondary px-2 py-1 rounded flex-1 truncate">
                            {submission.consultationUrl}
                          </code>
                          <CopyButton text={submission.consultationUrl} label="" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Code d'édition</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-lg bg-secondary px-3 py-1 rounded font-mono tracking-widest">
                            {submission.editCode}
                          </code>
                          <CopyButton text={submission.editCode} label="" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
