import MeSection from "../me_section/me_section";
import Testimonials from "../work_for_t/testimonials";
import WorkFor from "../work_for_t/work_for";

export default function Hero() {
  return (
    <div className="justify-center gap-2 space-y-2 lg:flex xl:flex">
      <MeSection />
      <div className="md:space-y-4 ">
        <WorkFor
          company={[
            {
              name: "Action Tokens",
              logoUrl: "/images/logos/action-tokens.png",
            },
            {
              name: "Action Tokens",
              logoUrl: "/images/logos/action-tokens.png",
            },
          ]}
        />
        <Testimonials
          testis={[
            {
              fullName: "A person",
              imgUrl: "/images/logos/action-tokens.png",
              position: "Director, x",
              text: "Nice Nice nice nice nice Nice Nice nice nice nice Nice Nice nice nice nice Nice Nice nice nice nice",
            },
            {
              fullName: "A person",
              imgUrl: "/images/logos/action-tokens.png",
              position: "Director, x",
              text: "Nice Nice nice nice nice Nice Nice nice nice nice Nice Nice nice nice nice Nice Nice nice nice nice",
            },
            {
              fullName: "A person",
              imgUrl: "/images/logos/action-tokens.png",
              position: "Director, x",
              text: "Nice Nice nice nice nice Nice Nice nice nice nice Nice Nice nice nice nice Nice Nice nice nice nice",
            },
          ]}
        />
      </div>
    </div>
  );
}
