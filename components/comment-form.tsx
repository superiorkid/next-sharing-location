"use client";

import React, { useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { commentSchema, TComment } from "@/lib/validations/comment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addNewComment } from "@/_actions/comment.action";
import { useToast } from "@/components/ui/use-toast";
import addCategoryForm from "@/components/dashboard/add-category-form";

interface CommentFormProps {
  slug: string;
}

function CommentForm({ slug }: CommentFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<TComment>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (values: TComment) => {
    startTransition(() => {
      addNewComment(values, slug)
        .then((response) => {
          toast({
            title: "Tambah komentar",
            description: "Berhasil menambahkan komentar",
          });
          form.reset();
        })
        .catch((error) => {
          toast({
            title: "Tambah komentar",
            description: "Gagal menambah komentar",
            variant: "destructive",
          });
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Tulis komentar disini..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="w-[120px]"
          disabled={isPending}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default CommentForm;
