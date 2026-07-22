import React from "react";
import {
  Camera,
  UserRound,
} from "lucide-react";
import { useRef, useState } from "react";

function getInitials(name = "") {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "";
  }

  if (words.length === 1) {
    return words[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${words[0][0]}${
    words[words.length - 1][0]
  }`.toUpperCase();
}

export default function ProfileAvatar({
  name,
  photoURL,
  editable = false,
  loading = false,
  onPhotoChange,
}) {
  const fileInputRef = useRef(null);

  const [imageError, setImageError] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const initials =
    getInitials(name);

  async function handleFileChange(
    event
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(file.type)
    ) {
      window.alert(
        "Selecione uma imagem JPG, PNG ou WEBP."
      );

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      window.alert(
        "A imagem deve ter no máximo 5 MB."
      );

      return;
    }

    setProcessing(true);

    try {
      const imageDataURL =
        await new Promise(
          (resolve, reject) => {
            const reader =
              new FileReader();

            reader.onload = () =>
              resolve(reader.result);

            reader.onerror = reject;

            reader.readAsDataURL(
              file
            );
          }
        );

      await onPhotoChange?.(
        imageDataURL
      );

      setImageError(false);
    } catch (error) {
      console.error(error);

      window.alert(
        "Não foi possível processar a imagem."
      );
    } finally {
      setProcessing(false);

      event.target.value = "";
    }
  }

  if (loading) {
    return (
      <div className="h-28 w-28 animate-pulse rounded-full bg-slate-200" />
    );
  }

  const showImage =
    photoURL && !imageError;

  return (
    <div className="relative shrink-0">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-emerald-100 text-2xl font-bold text-emerald-800 shadow-lg">
        {showImage ? (
          <img
            src={photoURL}
            alt={`Foto de ${name}`}
            className="h-full w-full object-cover"
            onError={() =>
              setImageError(true)
            }
          />
        ) : initials ? (
          initials
        ) : (
          <UserRound size={38} />
        )}
      </div>

      {editable && (
        <>
          <button
            type="button"
            disabled={processing}
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-emerald-700 text-white shadow-md transition hover:bg-emerald-800 disabled:opacity-60 border-none cursor-pointer"
            aria-label="Alterar foto do perfil"
          >
            <Camera size={17} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}
