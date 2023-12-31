"use client";

import React from "react";
import { useFilePicker } from "use-file-picker";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import MaterialSymbolsDeleteOutline from "@/components/icons/MaterialSymbolsDeleteOutline";
import { imageKitLoader } from "@/lib/imagekit";

interface PhotoUploadProps<TFieldVallues extends FieldValues>
  extends React.HTMLAttributes<HTMLButtonElement> {
  name: Path<TFieldVallues>;
  setValue: UseFormSetValue<TFieldVallues>;
  isLoading: boolean;
  images?: string[] | null;
  setImages?: React.Dispatch<React.SetStateAction<string[] | null>>;
}

function PhotoUpload<T extends FieldValues>({
  name,
  setValue,
  isLoading,
  images,
  setImages,
}: PhotoUploadProps<T>) {
  const [openFileSelector, { filesContent, loading, errors, clear }] =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      limitFilesConfig: { max: 3 },
      multiple: true,
      maxFileSize: 3,
      onFilesSuccessfulySelected: ({ plainFiles, filesContent }) => {
        setValue(name, plainFiles as PathValue<T, Path<T>>, {
          shouldValidate: true,
        });
      },
    });

  return (
    <>
      <div className="flex space-x-1 items-center">
        {filesContent.length
          ? filesContent.map((file, index) => (
              <Image
                key={index}
                src={file.content}
                alt={file.name}
                loading="eager"
                width={100}
                height={100}
                className="object-cover w-[100px] h-[100px] rounded-sm"
                unoptimized
              />
            ))
          : images?.map((image, index) => (
              <Image
                key={index}
                loader={imageKitLoader}
                src={image}
                alt={`gambar ke-${index}`}
                width={100}
                height={100}
                className="object-cover w-[100px] h-[100px] rounded-sm"
              />
            ))}

        {filesContent.length ? (
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="ml-5"
            onClick={() => {
              setValue(name, images as PathValue<T, Path<T>>);
              clear();
            }}
          >
            <MaterialSymbolsDeleteOutline />
          </Button>
        ) : null}
      </div>

      <Button
        type="button"
        onClick={() => openFileSelector()}
        className="block w-full"
        variant="outline"
        disabled={isLoading}
      >
        {filesContent.length
          ? `${filesContent.length} file dipilih`
          : images?.length
          ? `${images.length} file sudah dipilih`
          : "Pilih File"}
      </Button>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <ul className="list-disc list-inside">
          <li>maksimal 3 file</li>
          <li>file tidak lebih dari 3mb</li>
        </ul>
      </div>
    </>
  );
}

export default PhotoUpload;
