import Link from "next/link";
import BlogCard, { type Blog } from "./blogs_card";

export default function ResentBlogs() {
  const resentBlogs: Blog[] = [
    {
      imgUrl: "/images/test/1.jpeg",
      date: 1680510604537,
      readTime: 1,
      text: "The quick brown fox jump over the lazy dog The quick brown fox jump over the lazy dog",
      title: "The tet adsf ddea daf adfe asfde afear adf",
      url: "/1",
    },
    {
      imgUrl: "/images/test/2.webp",
      date: 1680510694032,
      readTime: 2,
      text: "The quick brow brown fox jump over the lazy dog",
      title:
        "v The tet adsf ddea daf adfe asfde afear adf The tet adsf ddea daf adfe asfde afear adf",
      url: "/2",
    },
    {
      imgUrl: "/images/test/3.webp",
      date: 1680510711593,
      readTime: 2,
      text: "quick brow brown fox  The quick brow brown fox jump over the lazy dog",
      title: "v The tet adsf ddea  tet adsf ddea daf adfe asfde afear adf",
      url: "/3",
    },
  ];
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="text-2xl normal-case text-slate-400">Resent Blogs</p>
      <div className="xs:grid-cols-2 mx-auto grid w-full justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
        {resentBlogs.map((x) => (
          <BlogCard key={x.imgUrl} {...x} />
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
