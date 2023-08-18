import React from "react";
import { Separator } from "@/components/ui/separator";
import CommentForm from "@/components/comment-form";
import { getLocationComments } from "@/_actions/location.action";
import moment from "moment";
import UserCard from "@/components/user-card";

interface CommentProps {
  slug: string;
  id: string;
}

async function Comment({ slug, id }: CommentProps) {
  const comments = await getLocationComments(id);

  return (
    <div>
      <h3 className="text-2xl font-semibold my-3">Comments</h3>
      <Separator className="mb-6 mt-3" />
      <CommentForm slug={slug} />
      <Separator className="my-7" />
      <section className="space-y-3">
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <div className="border rounded-md p-2.5 flex justify-between items-start space-x-4 text-sm">
              <p className="flex-1">
                <span className="font-bold">
                  <UserCard
                    author={comment.reviewer?.name as string}
                    authorImage={comment.reviewer?.image as string}
                    email={comment.reviewer?.email as string}
                  />
                </span>{" "}
                - {comment.comment}
              </p>
              <p className="flex-none w-32  text-end font-extralight">
                {moment(comment.createdAt).locale("id").fromNow()}
              </p>
            </div>
          </React.Fragment>
        ))}
      </section>
    </div>
  );
}

export default Comment;
