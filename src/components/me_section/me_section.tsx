import Me from "./me";
import RXT from "./r_x_t";

export default function MeSection() {
  const techs = [
    "Next.js",
    "Tailwind",
    "Flutter",
    "flutter_bloc",
    "getx",
    "Selenium",
    "Google Colab",
    "Git",
    "Github",
    "Github Actions",
    "Firebase",
    "Basic Linux command",
    "Visual Studio Code",
    "stellar-sdk",
    "Kivy",
    "KivyMD",
  ];
  return (
    <div className="mx-4 flex flex-col gap-4">
      <Me
        fullName="Biplob Sutradhar"
        hText="I’m a software engineer"
        text=" from Bangladesh. Most of time exploring Internet. Sometime I making App for simplify life. This website presents some of my life simplify projects."
        imgUrl="/images/me/propic.png"
      />
      <RXT techs={techs} />
    </div>
  );
}
