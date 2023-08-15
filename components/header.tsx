import React from "react";

interface HeaderProps {
  title: string;
  shortDescription: string;
}

function Header({ title, shortDescription }: HeaderProps) {
  return (
    <section className="pb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <span className="text-sm text-gray-700 leading-snug dark:invert">
        {shortDescription}
      </span>
    </section>
  );
}

export default Header;
