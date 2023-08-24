"use client";

import React, { useTransition } from "react";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import categorySchema, {
  TCategory,
} from "@/lib/validations/category.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewCategory, editCategory } from "@/_actions/category.action";
import { Category } from ".prisma/client";
import SvgSpinners8DotsRotate from "@/components/icons/SvgSpinners8DotsRotate";

interface EditCategoryFormProps {
  category: Category;
}

function EditCategoryForm({ category }: EditCategoryFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<TCategory>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      description: category.description as string,
    },
  });

  const onSubmit = async (values: TCategory) => {
    startTransition(() => {
      editCategory(category.id, values)
        .then((response) => {
          toast({
            title: "Update kategori berhasil",
          });
          router.push("/dashboard/admin/categories");
        })
        .catch((error) => {
          toast({
            title: "Update kategori gagal",
            variant: "destructive",
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
          {isPending ? (
            <span>
              <SvgSpinners8DotsRotate className="w-4 h-4 inline mr-2" /> Edit
              kategori...
            </span>
          ) : (
            "Edit kategori"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default EditCategoryForm;
