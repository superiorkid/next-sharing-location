"use client";

import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import PhotoUpload from "@/components/dashboard/photo-upload";
import { Button } from "@/components/ui/button";
import SvgSpinners8DotsRotate from "@/components/icons/SvgSpinners8DotsRotate";
import { Category } from ".prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { LatLng } from "leaflet";
import { useForm } from "react-hook-form";
import {
  editLocationSchema,
  TEditLocation,
} from "@/lib/validations/location.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Prisma } from "@prisma/client";
import { updateLocation } from "@/_actions/location.action";
import { Separator } from "@/components/ui/separator";

interface EditLocationFormProps {
  categories: Category[] | null;
  location: Prisma.LocationGetPayload<{ include: { category: true } }>;
}

const Coordinate = dynamic(() => import("@/components/coordinates"), {
  ssr: false,
  loading: () => <Skeleton className="w-full block h-10 rounded-md" />,
});

function EditLocationForm({ categories, location }: EditLocationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [position, setPosition] = useState<LatLng | null>(
    JSON.parse(location.coordinate)
  );
  const [images, setImages] = useState<string[] | null>(location.photos);
  const [isPending, startTransition] = useTransition();
  const form = useForm<TEditLocation>({
    resolver: zodResolver(editLocationSchema),
    defaultValues: {
      name: location.name,
      description: location.description,
      address: location.address,
      // category: categories?.at(0)?.name,
      category: location.category.name,
      coordinate: JSON.parse(location.coordinate),
      photos: images as string[],
      whatsapp: location.whatsapp as string,
      facebook: location.facebook as string,
      instagram: location.instagram as string,
      website: location.website as string,
    },
  });

  const onSubmit = async (values: TEditLocation) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("address", values.address);
    formData.append("category", values.category);
    formData.append("coordinate", JSON.stringify(values.coordinate));
    formData.append("website", values.website as string);
    formData.append("whatsapp", values.whatsapp as string);
    formData.append("instagram", values.instagram as string);
    formData.append("facebook", values.facebook as string);

    const isFile = (values.photos as File[]).at(0) instanceof File;

    if (isFile) {
      for (let value of values.photos as File[]) {
        formData.append("photos[]", value);
      }
    } else {
      formData.append("photos[]", values.photos as string);
    }

    startTransition(() => {
      updateLocation(location.id, formData)
        .then((response) => {
          toast({
            title: "Berhasil memperbarui lokasi",
          });
          router.back();
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Gagal memperbarui lokasi",
          });
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:w-2/3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ketik nama disini..."
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                {/*<DescriptionEditor />*/}
                <Textarea
                  disabled={isPending}
                  placeholder="Ketik deskripsi disini..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Ketik jalan disini..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm italic">
                Contoh: Lendang Bedurik, Kec. Selong
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel
            className={cn(form.formState.errors.coordinate && "text-rose-500")}
          >
            Pilih koordinat
          </FormLabel>
          <FormControl>
            <Coordinate
                variant="edit"
              name="coordinate"
              // @ts-ignore
              setValue={form.setValue}
              // @ts-ignore
              getValue={form.getValues}
              isLoading={isPending}
              position={position}
              setPosition={setPosition}
            />
          </FormControl>
          <span className="text-sm text-rose-500">
            {form.formState.errors.coordinate?.message as string}
          </span>
        </FormItem>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <select
                onChange={field.onChange}
                defaultValue={field.value}
                className="w-full h-10 rounded-md px-3 bg-background border"
              >
                <FormControl>
                  <option
                    disabled={isPending}
                    selected
                    className="text-gray-600"
                  >
                    Pilih kategori
                  </option>
                </FormControl>

                {categories?.map((category, index) => (
                  <option
                    key={category.id}
                    disabled={isPending}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              <span className="text-sm text-rose-500">
                {form.formState.errors.category?.message as string}
              </span>
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel
            className={cn(form.formState.errors.photos && "text-rose-500")}
          >
            Gambar
          </FormLabel>
          <FormControl>
            <PhotoUpload
              name="photos"
              setValue={form.setValue}
              isLoading={isPending}
              images={images}
              setImages={setImages}
            />
          </FormControl>
          <span className="text-sm text-rose-500">
            {form.formState.errors.photos?.message as string}
          </span>
        </FormItem>

        {/*Daftar Kontak*/}
        <div className="grid grid-cols-2 gap-4 bg-gray-100 dark:bg-primary-foreground p-4 rounded-md">
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Whatsapp{" "}
                  <span className="font-light text-gray-700 dark:text-foreground">
                    (Opsional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Ketik Nomor whatsapp disini..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Website{" "}
                  <span className="font-light text-gray-700 dark:text-foreground">
                    (Opsional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Ketik Website URL disini..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Instagram{" "}
                  <span className="font-light text-gray-700 dark:text-foreground">
                    (Opsional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Ketik useraname instagram disini..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Facebook{" "}
                  <span className="font-light text-gray-700 dark:text-foreground">
                    (Opsional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Ketik useraname facebook disini..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex space-x-2 items-center">
          <Button
            type="submit"
            className="min-w-[187px] w-full"
            disabled={isPending}
          >
            {isPending ? (
              <span>
                <SvgSpinners8DotsRotate className="w-4 h-4 inline mr-2" />{" "}
                Memperbarui lokasi...
              </span>
            ) : (
              "Edit Lokasi"
            )}
          </Button>

          <Button
            variant="destructive"
            type="button"
            className="min-w-[187px] w-full"
            disabled={isPending}
            onClick={() => router.back()}
          >
            Batal
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditLocationForm;
