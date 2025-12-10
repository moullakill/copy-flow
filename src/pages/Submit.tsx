import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/CopyButton";
import { 
  Send, 
  FileText, 
  Type, 
  Upload,
  CheckCircle,
  Link as LinkIcon,
  Key
} from "lucide-react";
import { 
  Submission, 
  generateEditCode, 
  generateId, 
  saveSubmission 
} from "@/lib/submissions";
import { toast } from "sonner";

type ContentType = "text" | "file";

export default function SubmitPage() {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState<ContentType>("text");
  const [title, setTitle] = useState("");
  const [studentName, setStudentName] = useState("");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    consultationUrl: string;
    editCode: string;
    id: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Type de fichier non supporté. Utilisez PDF ou DOCX.");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("Le fichier est trop volumineux (max 10 Mo).");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !studentName.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (contentType === "text" && !textContent.trim()) {
      toast.error("Veuillez entrer le contenu de votre copie.");
      return;
    }

    if (contentType === "file" && !file) {
      toast.error("Veuillez sélectionner un fichier.");
      return;
    }

    setIsSubmitting(true);

    try {
      const id = generateId();
      const editCode = generateEditCode();
      const consultationUrl = `${window.location.origin}/view/${id}`;
      
      // For file content, we'll store a placeholder (in a real app, this would upload to storage)
      let content = textContent;
      let fileType: "pdf" | "docx" | undefined;
      
      if (contentType === "file" && file) {
        content = `[Fichier: ${file.name}]`;
        fileType = file.name.endsWith(".pdf") ? "pdf" : "docx";
      }

      const submission: Submission = {
        id,
        title: title.trim(),
        studentName: studentName.trim(),
        contentType,
        content,
        fileType,
        status: "pending",
        consultationUrl,
        editCode,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      };

      saveSubmission(submission);
      
      setSubmittedData({ consultationUrl, editCode, id });
      toast.success("Copie déposée avec succès !");
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container mx-auto px-4">
            <Card variant="elevated" className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-status-corrected-bg mx-auto mb-4 flex items-center justify-center animate-scale-in">
                  <CheckCircle className="w-8 h-8 text-status-corrected" />
                </div>
                <CardTitle className="text-2xl">Copie déposée avec succès !</CardTitle>
                <CardDescription className="text-base">
                  Partagez ces informations avec votre professeur pour qu'il puisse corriger votre travail.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-secondary rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <LinkIcon className="w-4 h-4" />
                    URL de consultation
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background p-3 rounded-md text-sm font-mono overflow-x-auto">
                      {submittedData.consultationUrl}
                    </code>
                    <CopyButton text={submittedData.consultationUrl} />
                  </div>
                </div>

                <div className="p-4 bg-secondary rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Key className="w-4 h-4" />
                    Code d'édition (pour le professeur)
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background p-3 rounded-md text-2xl font-mono tracking-widest text-center">
                      {submittedData.editCode}
                    </code>
                    <CopyButton text={submittedData.editCode} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => navigate("/dashboard")}>
                    <FileText className="w-4 h-4" />
                    Voir mes copies
                  </Button>
                  <Button variant="default" className="flex-1" onClick={() => {
                    setSubmittedData(null);
                    setTitle("");
                    setStudentName("");
                    setTextContent("");
                    setFile(null);
                  }}>
                    <Send className="w-4 h-4" />
                    Déposer une autre copie
                  </Button>
                </div>
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
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Déposer une copie
              </h1>
              <p className="text-muted-foreground">
                Remplissez le formulaire ci-dessous pour soumettre votre travail.
              </p>
            </div>

            <Card variant="elevated">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Nom / Prénom *</Label>
                      <Input
                        id="studentName"
                        placeholder="Jean Dupont"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre du travail *</Label>
                      <Input
                        id="title"
                        placeholder="Dissertation de philosophie"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Type de contenu</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setContentType("text")}
                        className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                          contentType === "text"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Type className={`w-5 h-5 ${contentType === "text" ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="text-left">
                          <p className={`font-medium ${contentType === "text" ? "text-primary" : "text-foreground"}`}>
                            Texte
                          </p>
                          <p className="text-xs text-muted-foreground">Coller du texte</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setContentType("file")}
                        className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                          contentType === "file"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Upload className={`w-5 h-5 ${contentType === "file" ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="text-left">
                          <p className={`font-medium ${contentType === "file" ? "text-primary" : "text-foreground"}`}>
                            Fichier
                          </p>
                          <p className="text-xs text-muted-foreground">PDF ou DOCX</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {contentType === "text" ? (
                    <div className="space-y-2">
                      <Label htmlFor="content">Contenu de la copie *</Label>
                      <Textarea
                        id="content"
                        placeholder="Collez ou tapez votre texte ici..."
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        className="min-h-[200px] font-mono text-sm"
                        required
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="file">Fichier *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          id="file"
                          accept=".pdf,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="file" className="cursor-pointer">
                          {file ? (
                            <div className="flex items-center justify-center gap-3">
                              <FileText className="w-8 h-8 text-primary" />
                              <div className="text-left">
                                <p className="font-medium text-foreground">{file.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} Mo
                                </p>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                              <p className="text-foreground font-medium">Cliquez pour sélectionner un fichier</p>
                              <p className="text-sm text-muted-foreground mt-1">PDF ou DOCX (max 10 Mo)</p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  )}

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Déposer ma copie
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
