"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import {
  locationSchema,
  TLocation,
} from "@/lib/validations/location.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import PhotoUpload from "@/components/dashboard/photo-upload";
import { addLocation } from "@/_actions/location.action";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Category } from ".prisma/client";
import SvgSpinners8DotsRotate from "@/components/icons/SvgSpinners8DotsRotate";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import L, { LatLng, LatLngExpression } from "leaflet";

const Coordinate = dynamic(() => import("@/components/coordinates"), {
  ssr: false,
  loading: () => <Skeleton className="w-full block h-10 rounded-md" />,
});

interface AddLocationFormProps {
  categories: Category[] | null;
}

function AddLocationForm({ categories }: AddLocationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [position, setPosition] = useState<LatLng | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<TLocation>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      street: "",
      // category: categories?.at(0)?.name,
      category: "",
      coordinate: "",
      photos: undefined,
    },
  });

  const onSubmit = async (values: TLocation) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("street", values.street);
    formData.append("address", values.address);
    formData.append("category", values.category);
    formData.append("coordinate", JSON.stringify(values.coordinate));

    for (let value of values.photos as File[]) {
      formData.append("images[]", value);
    }

    startTransition(() => {
      addLocation(formData)
        .then((response) => {
          toast({
            title: "Add new location",
            description: "Successfully added new location",
          });
          router.push("/explore");
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Error while adding new location",
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

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jalan</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Ketik jalan disini..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm italic">
                Contoh: jl. imam bonjol no.1 pancor
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
              name="coordinate"
              // @ts-ignore
              setValue={form.setValue}
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
                    key={index}
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
            />
          </FormControl>
          <span className="text-sm text-rose-500">
            {form.formState.errors.photos?.message as string}
          </span>
        </FormItem>

        <Button
          type="submit"
          className="max-w-[187px] w-full"
          disabled={isPending}
        >
          {isPending ? (
            <span>
              <SvgSpinners8DotsRotate className="w-4 h-4 inline mr-2" /> Adding
              location...
            </span>
          ) : (
            "Add Location"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default AddLocationForm;
