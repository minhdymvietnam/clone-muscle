import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Dialog, DialogClose, DialogContent} from "@/components/ui/dialog.tsx";
import {useState} from "react";
import {useMediaQuery} from "react-responsive";

const InterviewSubsection = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const interviewCards = [
    {
      id: 1,
      imagePath: "/images/interview-1.png",
      titleLines: [
        { text: '筋肉で街の"安心"を', width: "315px" },
        { text: "守ってます。", width: "204px" },
      ],
      description: "前職はIT企業で長時間の残業が続き、筋トレの時間を取ることがなかなかできませんでした。しかし当社に転職してからは、セキュリティの仕事にやりがいを感じながら、毎日しっかり筋トレの時間も確保できています。現在はエリアマネージャーとして、複数の現場を管理しながらチームの成長をサポートしています。仕事も筋トレも妥協せず両立できる環境が整っているので、充実した日々を送っています。筋肉もキャリアも、これからもさらに高めていきたいです。",
    },
    {
      id: 2,
      imagePath: "/images/interview-2.png",
      titleLines: [
        { text: "日勤・夜勤・筋トレ、", width: "326px" },
        { text: "全部こなせる体に。", width: "300px" },
      ],
      description: "「JINさんの動画を見ていた自分が、今は筋トレしてから現場に向かう毎日です」\n" +
        "前職は営業。正直、セキュリティの仕事に強い関心があったわけではありません。でも、体を動かす仕事がしたくて転職を決意しました。いざ警備の仕事に挑戦してみると、現場ごとに状況や求められる動きが変わるので、毎回が学びの連続です。臨時警備などで早朝や夜勤もありますが、誰かの安心のために動けていると思うと、やりがいと楽しさを実感します。今では、出勤前のトレーニングが日課。筋トレで気合が入ると、仕事にも自然と前向きになれます。"
    },
  ];

  const [itemShow, setItemShow] = useState<any>(null);

  return (
    <section className="relative w-full py-[70px] lg:py-[120px]">
      <div className="space-y-[60px] px-4 lg:px-0">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="inline-flex items-center">
            <div className="custom-clip-path-both-side font-bold px-10 py-[3px] bg-mainyellow-neon text-black text-[17px] lg:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
              先輩セキュリティの声
            </div>
          </div>

          <h2 className="font-semibold text-white text-[67px] lg:text-[150px] text-center tracking-[0] leading-[0.9] lg:leading-[150px] whitespace-nowrap [font-family:'Teko',Helvetica]">
            INTERVIEW
          </h2>
        </div>

        {/* Interview Cards Section */}
        <div className="flex max-w-[970px] pt-20 flex-col items-center gap-40 lg:flex-row mx-auto w-full justify-between lg:items-baseline">
          {interviewCards.map((card) => (
            <div className="space-y-6" key={card.id}>
              <div className="relative px-4" onClick={() => setItemShow(card)}>
                <img className="w-[319px]" src="/images/interview-card-bg.png" alt="interview card bg" />
                <img src={card.imagePath} alt="" className="absolute w-[320px] h-auto right-0 bottom-0 transition delay-100 grayscale hover:grayscale-0 cursor-pointer" />
                <div className="absolute space-y-2.5 left-0 bottom-5">
                  {card.titleLines.map((line, index) => (<div key={index} className="custom-clip-path-right pl-2.5 pr-5 py-1 bg-mainyellow-neon [font-family:'Noto_Sans_JP',Helvetica] font-bold text-[#000000] text-3xl tracking-[0] leading-[normal] whitespace-nowrap w-fit">{line.text}</div>))}
                </div>
              </div>

              <div className="text-right">
                <Button
                  variant="link"
                  onClick={() => setItemShow(card)}
                  className="[font-family:'Noto_Sans_JP',Helvetica] font-bold text-[#ffffff] text-xl tracking-[0] hover:no-underline leading-[normal] whitespace-nowrap"
                >
                  <svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M29.6738 8.75283L21.369 0.87793L19.2931 2.69735L24.0541 7.19771H0.3125V10.1254H24.0541L19.2931 15.1281L21.369 17.3257L29.6738 8.75283Z" fill="white" />
                  </svg>
                  READ MORE
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {!isMobile && <Dialog open={!!itemShow} onOpenChange={open => {
        if (!open) {
          setItemShow(null);
        }
      }}>
        <DialogContent className="w-full md:max-w-[1200px] p-0 border-none bg-transparent">
          <Card className="relative border-none">
            <div className="flex flex-col w-[1200px] items-end gap-2.5 pt-[60px] pb-16 px-[72px] relative bg-subblack border border-solid border-[#fcff00]">
              <div className="flex flex-col w-[624.59px] items-start gap-[50px] relative flex-[0_0_auto]">
                <div className="flex w-[364px] items-center gap-3.5 relative">
                  <div className="relative w-[348px]">
                    <div className="relative pl-20 lg:pl-[120px]">
                      <div className="[-webkit-text-stroke:2px_#ffffff] din-font leading-[115px] lg:leading-[155px] font-bold text-transparent text-[130px] lg:text-[200px]">
                        0{itemShow?.id}
                      </div>
                      <div className="inline-flex gap-2.5 lg:gap-5 items-center justify-center pl-0 pr-[5px] py-0.5 absolute top-1/2 transform -translate-y-1/2 left-2.5 lg:left-0">
                        <div
                          className="w-2 lg:w-3 transform -skew-x-[20deg] h-8 lg:h-[42px] bg-mainyellow-neon "
                        />
                        <div className="mt-[-1px] [font-family:'Inter',Helvetica] font-semibold text-white text-[26px] lg:text-[40px] leading-[normal] whitespace-nowrap bg-subblack">
                          CASE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="flex items-start gap-[60px] w-full p-0">
                  <div className="flex flex-col w-[624.59px] items-start gap-[15px] relative">
                    <div className="mt-[-1.00px] [font-family:'Noto_Sans_JP',Helvetica] font-normal text-white text-xl text-justify tracking-[0] leading-[35px] whitespace-pre-line">
                      {itemShow?.description}
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>

            <img className="absolute w-80 bottom-[2px] left-[95px]" src={itemShow?.imagePath} alt={itemShow?.titleLines[0].text} />

            <DialogClose className="absolute w-[42px] h-[42px] top-0 left-[1158px] bg-mainyellow-neon p-0 hover:bg-mainyellow-neon/90 focus:bg-mainyellow-neon/90">
              <div className="h-[42px]">
                <div className="relative w-[30px] h-[30px] top-1.5 left-1.5 rotate-45">
                  <div className="relative h-[30px]">
                    <div className="absolute w-[5px] h-[30px] top-0 left-[13px] bg-subblack -rotate-90" />
                    <div className="absolute w-[5px] h-[30px] top-0 left-[13px] bg-subblack" />
                  </div>
                </div>
              </div>
            </DialogClose>
          </Card>
        </DialogContent>
      </Dialog>}

      {
        isMobile && <Dialog open={!!itemShow} onOpenChange={open => {
          if (!open) {
            setItemShow(null);
          }
        }}>
          <DialogContent className="bg-subblack border border-solid border-[#fcff00] px-4 pt-7 pb-0 h-max max-h-dvh overflow-hidden max-w-[calc(100vw-32px)]">
            <div className="flex flex-col items-center justify-between gap-5">
              <div className="flex flex-col gap-5">
                <div className="relative pl-20">
                  <div className="[-webkit-text-stroke:2px_#ffffff] din-font leading-[95px] font-bold text-transparent text-[120px]">
                    0{itemShow?.id}
                  </div>
                  <div className="inline-flex gap-4 items-center justify-center pl-0 pr-[5px] py-0.5 absolute top-1/2 transform -translate-y-1/2 left-2">
                    <div
                      className="w-2 transform -skew-x-[20deg] h-8 bg-mainyellow-neon "
                    />
                    <div className="[font-family:'Inter',Helvetica] font-semibold text-white text-[25px] leading-none bg-subblack">
                      CASE
                    </div>
                  </div>
                </div>

                <div className="[font-family:'Noto_Sans_JP',Helvetica] font-normal text-white text-xs text-justify tracking-normal leading-[1.75] whitespace-pre-line">
                  {itemShow?.description}
                </div>
              </div>
                <div className={`bg-[url(${itemShow?.imagePath})] w-[230px] mx-auto h-[285px] `} style={{
                  backgroundImage: `url(${itemShow?.imagePath})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100%",
                  backgroundPosition: "top"
                }} />
            </div>

            <DialogClose asChild className="absolute w-[42px] aspect-square top-0 right-0 bg-mainyellow-neon p-0 hover:bg-mainyellow-neon/90 focus:bg-mainyellow-neon/90">
              <div className="h-[42px]">
                <div className="relative w-[30px] h-[30px] top-1.5 left-1.5 rotate-45">
                  <div className="relative h-[30px]">
                    <div className="absolute w-[5px] h-[30px] top-0 left-[13px] bg-subblack -rotate-90" />
                    <div className="absolute w-[5px] h-[30px] top-0 left-[13px] bg-subblack" />
                  </div>
                </div>
              </div>
            </DialogClose>
          </DialogContent>
        </Dialog>
      }
    </section>
  );
};

export default InterviewSubsection;
