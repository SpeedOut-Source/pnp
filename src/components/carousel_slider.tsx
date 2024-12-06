import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import { type ImgBlurData } from "~/app_function/utils/interfaces";
import Image from "next/image";

interface CarouselSliderProp {
  images: string[];
  imgsBlurData: ImgBlurData;
}

export default function CarouselSlider({
  images,
  imgsBlurData,
}: CarouselSliderProp) {
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
          {images.map((x, i) => {
            const imgBlurData = imgsBlurData[x];

            return (
              <CarouselItem
                key={x}
                className="xs:h-72 relative m-1 h-72 w-[98%] sm:h-80 md:h-[30rem]"
              >
                <Image
                  alt={i.toString()}
                  layout="fill"
                  objectFit="scale-down"
                  src={x}
                  className="rounded-box"
                  placeholder={imgBlurData ? "blur" : "empty"}
                  blurDataURL={imgBlurData ? imgBlurData.base64 : ""}
                />
              </CarouselItem>
            );
          })}
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
