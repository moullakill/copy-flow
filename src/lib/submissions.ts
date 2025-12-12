export interface Submission {
  id: string;
  studentId: string;
  title: string;
  studentName: string;
  contentType: "text" | "file";
  content: string; // Text or base64 encoded file
  fileType?: "pdf" | "docx";
  fileName?: string;
  status: "pending" | "corrected";
  consultationUrl: string;
  editCode: string;
  correction?: {
    grade: string;
    appreciation: string;
    correctedAt: string;
  };
  createdAt: string;
  expiresAt: string;
}

// Generate a random 6-character code
export function generateEditCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Local storage helpers
const STORAGE_KEY = "submity_submissions";

function getAllSubmissions(): Submission[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  const submissions: Submission[] = JSON.parse(data);
  
  // Filter out expired submissions (30 days)
  const now = new Date();
  return submissions.filter(s => new Date(s.expiresAt) > now);
}

export function getSubmissions(studentId?: string): Submission[] {
  const submissions = getAllSubmissions();
  if (studentId) {
    return submissions.filter(s => s.studentId === studentId);
  }
  return submissions;
}

export function saveSubmission(submission: Submission): void {
  const submissions = getAllSubmissions();
  submissions.push(submission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export function getSubmissionById(id: string): Submission | undefined {
  const submissions = getAllSubmissions();
  return submissions.find(s => s.id === id);
}

export function updateSubmission(id: string, updates: Partial<Submission>): void {
  const submissions = getAllSubmissions();
  const index = submissions.findIndex(s => s.id === id);
  if (index !== -1) {
    submissions[index] = { ...submissions[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }
}

export function deleteSubmission(id: string): void {
  const submissions = getAllSubmissions();
  const filtered = submissions.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function verifyEditCode(id: string, code: string): boolean {
  const submission = getSubmissionById(id);
  return submission?.editCode === code;
}
