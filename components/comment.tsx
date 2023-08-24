import React from "react";
import { Separator } from "@/components/ui/separator";
import CommentForm from "@/components/comment-form";
import { getLocationComments } from "@/_actions/location.action";
import moment from "moment";
import UserCard from "@/components/user-card";
import { EditorVoidOptions } from "slate";
import getCurrentUser from "@/_actions/get-current-user";

interface CommentProps {
  slug: string;
}

async function Comment({ slug }: CommentProps) {
  const comments = await getLocationComments(slug);
  const currentUser = await getCurrentUser();

  return (
    <div>
      <h3 className="text-2xl font-semibold my-3">Komentar</h3>
      <Separator className="mb-6 mt-3" />
      {currentUser ? (
        <CommentForm slug={slug} />
      ) : (
        <div className="flex justify-center">
          <p className="text-sm text-gray-600 font-extralight">
            Login dahulu untuk memberikan komentar
          </p>
        </div>
      )}
      <Separator className="my-7" />
      <section className="space-y-3 mb-16">
        {comments.length ? (
          comments.map((comment, index) => (
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
                <p className="flex-none w-32 text-end font-extralight text-xs italic">
                  {moment(comment.createdAt).locale("id").fromNow()}
                </p>
              </div>
            </React.Fragment>
          ))
        ) : (
          <p className="text-gray-600 text-sm italic text-center">
            tidak ada komentar
          </p>
        )}
      </section>
    </div>
  );
}

export default Comment;
