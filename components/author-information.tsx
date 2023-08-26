import React from "react";
import UserCard from "@/components/user-card";
import moment from "moment";
import Link from "next/link";

interface AuthorInformationProps {
  author: string;
  category: string;
  createdAt: Date;
  authorImage: string;
  email: string;
  slug: string;
}

function AuthorInformation({
  author,
  authorImage,
  category,
  email,
  createdAt,
  slug,
}: AuthorInformationProps) {
  return (
    <div className="flex justify-between items-center p-1.5">
      <p>
        Oleh:{" "}
        <UserCard author={author} authorImage={authorImage} email={email} />
      </p>
      <div className="flex items-center space-x-3">
        <p>
          kategori:{" "}
          <Link
            href={`/explore?category=${category}`}
            className="border rounded-md dark:bg-primary-foreground py-1.5 px-2.5 hover:cursor-pointer bg-gray-100 hover:bg-gray-200 font-thin"
          >
            {category}
          </Link>
        </p>
        <p>
          dibuat:{" "}
          <span>{moment(createdAt).locale("id").format("DD MMMM YYYY")}</span>
        </p>
      </div>
    </div>
  );
}

export default AuthorInformation;
