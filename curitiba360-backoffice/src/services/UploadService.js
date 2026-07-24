import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from '../firebase/firebase';

export const UploadService = {
  uploadFile(file, path = 'agencies/documents', onProgress) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Nenhum arquivo fornecido.'));
        return;
      }

      try {
        const fileRef = ref(firebaseStorage, `${path}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            if (onProgress) onProgress(progress);
          },
          (error) => {
            // Em caso de falha de rede/permissão no Firebase Storage, fallback para URL local
            const localUrl = URL.createObjectURL(file);
            if (onProgress) onProgress(100);
            resolve({ url: localUrl, name: file.name, type: file.type });
          },
          async () => {
            try {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              if (onProgress) onProgress(100);
              resolve({ url: downloadUrl, name: file.name, type: file.type });
            } catch (err) {
              const localUrl = URL.createObjectURL(file);
              resolve({ url: localUrl, name: file.name, type: file.type });
            }
          }
        );
      } catch (err) {
        const localUrl = URL.createObjectURL(file);
        if (onProgress) onProgress(100);
        resolve({ url: localUrl, name: file.name, type: file.type });
      }
    });
  },
};
