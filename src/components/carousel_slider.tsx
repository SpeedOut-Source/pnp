import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import dynamic from "next/dynamic";

interface CarouselSliderProp {
  images: string[];
}

export default function CarouselSlider({ images }: CarouselSliderProp) {
  const ImageLegacy = dynamic(() => import("next/legacy/image"));

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const btnStyle =
    "bg-base-300/60 disabled:invisible hover:bg-base-300 hover:text-base-content active:scale-95 transition duration-150 ease-in-out";

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="relative rounded-box bg-base-300/40 p-4"
      >
        <CarouselContent>
          {images.map((x, i) => (
            <CarouselItem
              key={x}
              className="xs:h-72 relative m-1 h-72 w-[98%] sm:h-80 md:h-[30rem]"
            >
              <ImageLegacy
                alt={i.toString()}
                layout="fill"
                objectFit="scale-down"
                src={x}
                className="rounded-box"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant="ghost"
          className={clsx("translate-x-16", btnStyle)}
        />
        <CarouselNext
          variant="ghost"
          className={clsx("-translate-x-16", btnStyle)}
        />
      </Carousel>
      {count > 1 && (
        <div className="text-muted-foreground py-2 text-center text-sm">
          {current} of {count}
        </div>
      )}
    </div>
  );
}
