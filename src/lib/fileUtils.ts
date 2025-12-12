/**
 * Converts a File to a base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Gets the MIME type from a file
 */
export const getFileMimeType = (file: File): string => {
  return file.type;
};

/**
 * Validates file type and size
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const validTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: "Type de fichier non supporté. Utilisez PDF ou DOCX." };
  }
  
  const maxSize = 10 * 1024 * 1024; // 10 MB
  if (file.size > maxSize) {
    return { valid: false, error: "Le fichier est trop volumineux (max 10 Mo)." };
  }
  
  return { valid: true };
};