import { useState } from 'react';
import { UploadService } from '../../../../services/UploadService';

export function useAgencyUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  async function uploadDocument(file, path = 'agencies/documents') {
    setIsUploading(true);
    setProgress(0);
    setUploadError(null);

    try {
      const result = await UploadService.uploadFile(file, path, (currentProgress) => {
        setProgress(currentProgress);
      });
      setIsUploading(false);
      return result;
    } catch (err) {
      setUploadError(err.message || 'Erro no envio do arquivo.');
      setIsUploading(false);
      throw err;
    }
  }

  return {
    isUploading,
    progress,
    uploadError,
    uploadDocument,
  };
}
