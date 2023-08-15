"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categorySchema, {
  type TCategory,
} from "@/lib/validations/category.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createNewCategory } from "@/_actions/category.action";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function AddCategoryForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<TCategory>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: TCategory) => {
    startTransition(() => {
      createNewCategory(values)
        .then((response) => {
          toast({
            title: "Add new category",
            description: "Success add new category",
          });
          form.reset();
          router.push("/dashboard/admin/categories");
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Add new category",
            description: "Error add new category",
          });
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:w-2/3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kategori</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Isi nama kategori disini...."
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
              <FormLabel>
                Deskripsi{" "}
                <span className="font-light italic text-gray-700">
                  (Optional)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Isi deskripsi disini...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Tambah Kategori
        </Button>
      </form>
    </Form>
  );
}

export default AddCategoryForm;
