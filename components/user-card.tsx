import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MaterialSymbolsCalendarMonth from "@/components/icons/MaterialSymbolsCalendarMonth";

interface UserCardProps {
  author: string;
  authorImage: string;
  email: string;
}

function UserCard({ author, authorImage, email }: UserCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <p className="hover:underline hover:cursor-pointer inline">{author}</p>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={authorImage} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{author}</h4>
            <p className="text-sm">{email}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default UserCard;
