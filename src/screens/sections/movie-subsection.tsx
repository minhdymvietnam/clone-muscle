import {Card, CardContent} from "@/components/ui/card.tsx";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.tsx";
import {useState} from "react";

const MovieSubsection = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex flex-col items-start py-[70px] px-4 lg:px-0 lg:py-[120px] relative w-full">
      <div className="flex flex-col items-center gap-[42px] md:gap-[60px] relative w-full">
        <div className="flex flex-col items-center gap-5 relative w-full">
          <div className="inline-flex items-center">
            <div className="custom-clip-path-both-side font-bold px-5 py-[3px] bg-mainyellow-neon text-black text-[17px] lg:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
              Youtuberとのコラボ動画
            </div>
          </div>

          <h2 className="[font-family:'Teko',Helvetica] font-semibold text-textwhite text-[67px] lg:text-[150px] text-center leading-[0.9] lg:leading-[150px] whitespace-nowrap">
            MOVIE
          </h2>
        </div>

        <Card className="border-none bg-transparent w-full max-w-[1081px]">
          <CardContent className="p-0 md:max-xl:px-10">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div className="relative cursor-pointer group">
                  <img
                    src="images/movie-thubnail.png"
                    alt="YouTube video thumbnail"
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[80vw] w-full p-0 bg-black border-none">
                <iframe
                  className="w-full aspect-[16/9]"
                  src="https://www.youtube.com/embed/wGCb9P0bU-A?autoplay=1"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MovieSubsection;
