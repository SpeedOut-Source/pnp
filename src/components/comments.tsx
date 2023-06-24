import Giscus from "@giscus/react";
import { getUserNRepo } from "~/app_function/utils/utils";
import { env } from "~/env.mjs";

interface CommentsProps {
  theme: "light" | "dark_dimmed";
}

export default function Comments(props: CommentsProps) {
  const sp = getUserNRepo(env.NEXT_PUBLIC_REPO_PATH);

  return (
    <Giscus
      id="comments"
      repo={`${sp.userName}/${sp.repo}`}
      repoId={env.NEXT_PUBLIC_REPO_ID}
      category={env.NEXT_PUBLIC_CATEGORY}
      categoryId={env.NEXT_PUBLIC_CATEGORY_ID}
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      lang="en"
      loading="lazy"
      {...props}
    />
  );
}
