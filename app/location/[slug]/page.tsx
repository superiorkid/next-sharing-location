import React from "react";
import Container from "@/components/container";

function Page() {
  return (
    <Container>
      <div className="h-[29dvh] bg-gray-400 mt-1 rounded-md">
        {/*<Image src="" alt="" />*/}
      </div>
      <div className="min-h-full flex">
        <main className="flex-1 min-w-0 overflow-auto bg-emerald-300">
          this is main
        </main>
        <aside className="w-72 flex-none border-l bg-sky-400">
          this is side
        </aside>
      </div>
    </Container>
  );
}

export default Page;
