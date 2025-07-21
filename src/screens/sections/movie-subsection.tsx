import {Card, CardContent} from "@/components/ui/card.tsx";

const MovieSubsection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start py-[70px] px-4 lg:px-0 lg:py-[120px] relative w-full">
      <div className="flex flex-col items-center gap-[42px] md:gap-[60px] relative w-full">
        <div className="flex flex-col items-center gap-5 relative w-full">
          <div className="inline-flex items-center">
            <div className="custom-clip-path-both-side font-bold px-5 py-[3px] bg-mainyellow-neon text-black text-[17px] lg:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
              Youtuberとのコラボ動画
            </div>
          </div>

          <h2 className="[font-family:'Teko',Helvetica] font-semibold text-textwhite text-[67px] lg:text-[150px] text-center lg:leading-[150px] whitespace-nowrap">
            MOVIE
          </h2>
        </div>

        <Card className="border-none bg-transparent w-full max-w-[1081px]">
          <CardContent className="p-0">
            <iframe
              className="w-full aspect-[3/2]"
              src="https://www.youtube.com/embed/wGCb9P0bU-A"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MovieSubsection;
