import Link from "next/link";
import ProjectCard, { Project } from "./project_card";

export default function ResentProjects() {
  const resentProjects: Project[] = [
    {
      imgUrl: "/images/test/1.jpeg",
      app: { name: "Test", logoUrl: "/images/logos/github.png" },
      company: { name: "Test company", logoUrl: "/images/logos/gmail.png" },
      whatText: "Quick Quick Quick Quick Quick vQuick",
      result: "Now NowNowNowNowNowNow  NowNow NowNow Now",
      url: "/1",
    },
    {
      imgUrl: "/images/test/2.webp",
      app: { name: "Test", logoUrl: "/images/logos/github.png" },
      company: { name: "Test company", logoUrl: "/images/logos/gmail.png" },
      whatText:
        "Quick Quick Quick Quick Quick vQuick Quick Quick Quick Quick Quick vQuick Quick Quick Quick Quick Quick vQuick Quick Quick Quick Quick Quick vQuick",
      result:
        "Now NowNowNowNowNowNow  NowNow NowNow Now Now NowNowNowNowNowNow  Now NowNowNowNowNowNow  NowNow NowNow Now Now NowNowNowNowNowNow  NowNow NowNow Now NowNow NowNow Now Now NowNowNowNowNowNow  NowNow NowNow Now Now NowNowNowNowNowNow  NowNow NowNow Now",
      url: "/2",
    },
    {
      imgUrl: "/images/test/3.webp",
      app: { name: "Test", logoUrl: "/images/logos/github.png" },
      company: { name: "Test company", logoUrl: "/images/logos/gmail.png" },
      whatText: "Quick Quick Quick Quick Quick vQuick",
      result: "Now NowNowNowNowNowNow  NowNow NowNow Now",
      url: "/3",
    },
  ];
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="text-2xl normal-case text-slate-400">Resent Projects</p>
      <div className="xs:grid-cols-2 mx-auto grid w-full justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
        {resentProjects.map((x) => (
          <ProjectCard key={x.imgUrl} {...x} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          href="#"
          className="p-card cursor-pointer font-semibold uppercase"
        >
          view more
        </Link>
      </div>
    </div>
  );
}
