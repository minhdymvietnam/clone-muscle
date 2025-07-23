import { Fragment } from "react";
import { cn } from "@/lib/utils.ts";
import { useMediaQuery } from "react-responsive";

const GoodPointSubsection = (): JSX.Element => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  })
  // Data for the good points to enable mapping
  const goodPoints = [
    {
      id: "01",
      title: "トレーニング時間の確保◎",
      description:
        `勤務時間は７時間と短く、始業時間は午後からが多いため、午前中は筋トレや自分時間にたっぷり使うことが可能です！`,
      alignment: "left",
    },
    {
      id: "02",
      title: "魅せるセキュリティ",
      description:
        `FBIやCIAも採用しているアメリカ発のブランドの制服をご用意。既存の警備スタイルにとらわれない、真のセキュリティの追求する。こだわりの一つに、一際目立つこだわりの制服をご用意しています。次に袖を通すのはあなたです。`,
      alignment: "right",
    },
    {
      id: "03",
      title: "ウェアラブルカメラを導入",
      description:
        `スタッフの安全性を確保するために、米国警察でも使用されている高性能ボディカメラを導入！常に複数人でのチームで警備を行うため、安心して業務できる環境です。`,
      alignment: "left",
    },
    {
      id: "04",
      title: "筋肉広報部始動！",
      description:
        `筋肉広報メンバーとしてPR活動に参加いただける方には下記の特典を贈呈しております！
        ※入部規約有　※継続査定有`,
      alignment: "right",
    },
  ];

  // Benefits data for the bottom section
  const benefits = [
    {
      title: "GOLD'S GYM\n会費無料",
    },
    {
      title: "プロテイン手当\n5000円支給/月",
    },
    {
      title: "大会出場時、\nマッスル手当10000円支給",
      spTitle: "大会出場時、マッスル\n手当10000円支給",
    },
    {
      title: "大会成績に応じて\n報奨金支給1位10万",
    },
  ];

  return (
    <section className="relative w-full md:max-xl:px-10" >
      <div className="flex flex-col items-center w-full py-[70px] lg:py-[120px] px-4 lg:px-0">
        <div className="relative z-10 flex flex-col w-full items-center md:gap-[50px]">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="inline-flex items-center">
              <div className="custom-clip-path-both-side font-bold px-10 py-[3px] bg-mainyellow-neon text-black text-[17px] lg:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
                魅力ポイント
              </div>
            </div>

            <h2 className="[font-family:'Teko',Helvetica] font-semibold text-textwhite text-[67px] lg:text-[150px] text-center leading-[0.9] lg:leading-[150px] whitespace-nowrap mb-[22px]">
              GOOD POINT
            </h2>
          </div>

          {/* Good Points Content */}

          {goodPoints.map((point, index) => (
            <div key={index} className={cn("w-full max-w-[1560px] mb-[41px]", point.alignment === "right" ? "mr-auto" : "ml-auto")}>
              <div
                key={point.id}
                className={`flex flex-col w-full justify-between gap-7 ${point.alignment === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
              >
                {/* Point Content */}
                <div className="flex flex-col w-full max-w-[597px] items-start gap-6 lg:gap-10">
                  {/* Point Number */}
                  <div className="flex items-center gap-3.5 relative">
                    <div className="relative pl-20 lg:pl-[120px]">
                      <div className="[-webkit-text-stroke:2px_#ffffff] din-font leading-[115px] lg:leading-[155px] font-bold text-transparent text-[130px] lg:text-[200px] md:leading-[normal]">
                        {point.id}
                      </div>
                      <div className="inline-flex gap-2.5 lg:gap-5 items-center justify-center pl-0 pr-[5px] py-0.5 absolute top-1/2 transform -translate-y-1/2 left-2.5 lg:left-0">
                        <div
                          className="w-2 lg:w-3 transform -skew-x-[20deg] h-8 lg:h-[42px] bg-mainyellow-neon "
                        />
                        <div className="mt-[-1px] [font-family:'Inter',Helvetica] font-semibold text-white text-[26px] lg:text-[40px] leading-[normal] whitespace-nowrap bg-subblack">
                          POINT
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Point Title */}
                  <div className="[font-family:'Noto_Sans_JP',Helvetica] font-bold text-black text-[25px] lg:text-[40px] leading-[normal] whitespace-nowrap px-3 pr-8 lg:px-5 lg:pr-20 py-1.5 lg:py-[15px] custom-clip-path-right bg-neon-yellow">
                    {point.title}
                  </div>

                  {/* Point Description */}
                  <div className="text-base md:text-xl !leading-[1.75] text-white text-justify max-w-[550px]">
                    {point.description.split("\n").map((line, i) => (
                      <Fragment key={i}>
                        {line}
                        {i < point.description.split("\n").length - 1 && <br />}
                      </Fragment>
                    ))}
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative w-full">
                  {
                    isMobile ? (
                      <div
                        className={cn("aspect-[933.92/574.7] w-full bg-[100%_100%]")}
                        style={{
                          clipPath: "polygon(0px 0px, 71% 0%, 96% 100%, 0% 100%)",
                          backgroundImage: `url(/images/good-point-${point.id}.png)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    ) : (
                      <div
                        className={cn("aspect-[933.92/574.7] w-full bg-[100%_100%]")}
                        style={{
                          clipPath:
                            point.alignment === "right"
                              ? "polygon(0px 0px, 71% 0%, 96% 100%, 0% 100%)"
                              : "polygon(29% 0px, 100% 0px, 100% 100%, 4% 100%)",
                          backgroundImage: `url(/images/good-point-${point.id}.png)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    )
                  }

                  <div className={cn("absolute aspect-[933.92/574.7] top-0 left-0 bottom-0 right-0")} style={isMobile ? { transform: "rotateY(180deg)" } : point.alignment === "right" ? {
                    transform: "rotateY(180deg)",
                  } : {}}>
                    <img
                      className="absolute w-[13.33%] right-0 bottom-0"
                      alt="Vector"
                      src="/icons/vector-45.svg"
                    />

                    <img
                      className="absolute w-[17%] top-0 left-[12.06%]"
                      alt="Rectangle"
                      src="/images/rectangle-73-2.png"
                    />
                    <img
                      className="absolute w-[26%] bottom-0 left-0"
                      alt="Rectangle"
                      src="/images/rectangle-73-1.png"
                    />
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* Benefits Cards - Only shown after the 4th point */}
          <div className="flex justify-center md:max-xl:grid md:max-xl:grid-cols-2 md:max-xl:px-10 flex-wrap gap-2 lg:gap-4 w-full max-w-[1250px] mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="w-[calc(50%+0.5rem)] max-md:h-[63px] max-w-[307px] md:max-xl:w-full md:max-xl:max-w-full custom-clip-path-both-side-large bg-neon-yellow -mr-6 transform -translate-x-3"
              >
                <div className="flex items-center justify-center h-full p-0">
                  <div className="din-font leading-7 font-bold text-black text-[13px] lg:text-xl text-center py-4 lg:py-[31px]">
                    {isMobile && benefit.spTitle ? benefit.spTitle.split("\n").map((line, i) => (
                      <Fragment key={i}>
                        {line}
                        {i < benefit.title.split("\n").length - 1 && <br />}
                      </Fragment>
                    )) :
                      benefit.title.split("\n").map((line, i) => (
                        <Fragment key={i}>
                          {line}
                          {i < benefit.title.split("\n").length - 1 && <br />}
                        </Fragment>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoodPointSubsection;
