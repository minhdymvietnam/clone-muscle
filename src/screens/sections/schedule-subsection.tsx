import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import ScheduleTimelineSp from "@/components/ui/ScheduleTimelineSp";
import {Separator} from "@/components/ui/separator.tsx";

const ScheduleSubsection = (): JSX.Element => {
  // Schedule shift examples
  const shiftExamples = ["15:00-22:00", "16:45-23:45", "22:00-翌05:00"];

  // Timeline points data
  const timelinePoints = [
    { time: "11:00", top: "0" },
    { time: "13:00", top: "189px" },
    { time: "16:00", top: "376px" },
    { time: "22:00", top: "633px" },
    { time: "23:00", top: "884px" },
  ];

  // Schedule events data
  const scheduleEvents = [
    {
      title: "トレーニング開始",
      content: (
        <div className="relative w-52 h-[60px]">
          <img
            src="images/schedule_gym.png"
            className="absolute w-[60px] h-[60px] top-0 left-0 object-cover"
            alt="Img schedule gym"
          />
          <div className="absolute w-[132px] top-0 left-[74px] [font-family:'Noto_Sans_JP',Helvetica] font-bold text-[17px] tracking-[0] leading-[29.8px]">
            <span className="text-[#ffffff]">GOLD&apos;S GYMが </span>
            <span className="text-[#fcff00]">無料で使える！</span>
          </div>
        </div>
      ),
      position: "top-[47px] left-[101px]",
      width: "246px",
    },
    {
      title: "食事",
      content: null,
      position: "top-[281px] left-[526px]",
      width: "228px",
      isSimple: true,
    },
    {
      title: "出勤",
      content: (
        <div className="relative w-[188px] mt-[-1.00px] [font-family:'Noto_Sans_JP',Helvetica] font-bold text-[#ffffff] text-[17px] tracking-[0] leading-[29.8px]">
          ・事務所にて引き継ぎ <br />
          ・パトロール
        </div>
      ),
      position: "top-[423px] left-[526px]",
      width: "228px",
    },
    {
      title: "休憩【1H】",
      content: (
        <div className="relative w-[204.22px] mt-[-1.00px] [font-family:'Noto_Sans_JP',Helvetica] font-bold text-[17px] tracking-[0] leading-[29.8px]">
          <span className="text-[#fcff00]">
            現場待機室にて休憩・軽食
            <br />
          </span>
          <span className="text-[#ffffff]">
            ・事務所にて引き継ぎ <br />
            ・パトロール
          </span>
        </div>
      ),
      position: "top-[664px] left-[101px]",
      width: "246px",
    },
    {
      title: "退勤",
      content: null,
      position: "top-[976px] left-[526px]",
      width: "228px",
      isSimple: true,
    },
  ];

  const scheduleItems = [
    {
      time: "11:00",
      title: "トレーニング開始",
      description: (
        <>
          <div className="relative w-[216.24px] h-[62.4px]">
            <img
              src="images/schedule_gym.png"
              className="absolute w-[62px] h-[62px] top-0 left-0 object-cover"
              alt="Img schedule gym"
            />
            <div className="absolute w-[137px] top-0.5 left-[77px] font-bold text-[17px] leading-[29.8px]">
              <span className="text-[#ffffff]">GOLD&apos;S GYMが </span>
              <span className="text-[#fcff00]">無料で使える！</span>
            </div>
          </div>
        </>
      ),
      bottomImage: "images/schedule_gym-1.png",
    },
    {
      time: "13:00",
      title: "食事",
      titleOnly: true,
    },
    {
      time: "16:00",
      title: "出勤",
      description: (
        <>
          <div className="relative w-[195.52px] mt-[-1.04px] font-bold text-[#ffffff] text-[17px] leading-[29.8px]">
            ・事務所にて引き継ぎ <br />
            ・パトロール
          </div>
        </>
      ),
      bottomImage: "images/schedule_gym-2.png",
    },
    {
      time: "22:00",
      title: "休憩【1H】",
      description: (
        <>
          <div className="relative w-[212.39px] mt-[-1.04px] font-bold text-[17px] leading-[29.8px]">
            <span className="text-[#fcff00]">
              現場待機室にて休憩・軽食
              <br />
            </span>
            <span className="text-[#ffffff]">
              ・事務所にて引き継ぎ <br />
              ・パトロール
            </span>
          </div>
        </>
      ),
      bottomImage: "images/schedule_gym-3.png",
    },
    {
      time: "23:00",
      title: "退勤",
      titleOnly: true,
    },
  ];

  return (
    <div className="relative flex flex-col items-center gap-[47px] px-4 lg:px-0 py-[70px] lg:py-[120px] w-full overflow-hidden">

      <div className="flex flex-col items-center gap-5 lg:gap-[60px] relative z-10 w-full max-w-[1920px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-5">
          <div className="inline-flex items-center">
            <div className="custom-clip-path-both-side font-bold px-10 py-[3px] bg-mainyellow-neon text-black text-[17px] lg:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
              スケジュール
            </div>
          </div>

          <h2 className="font-semibold text-white text-[67px] lg:text-[150px] text-center tracking-[0] leading-[0.9] lg:leading-[150px] whitespace-nowrap [font-family:'Teko',Helvetica]">
            SCHEDULE
          </h2>
        </div>

        {/* Shift examples */}
        <div className="flex w-full max-w-fit justify-center items-center gap-5 flex-wrap">
          <div className="[font-family:'Noto_Sans_JP',Helvetica] font-medium text-textwhite text-[22px] md:text-xl whitespace-nowrap">
            シフト例
          </div>
          <div className="grid grid-cols-3 items-center gap-2.5">
            {shiftExamples.map((shift, index) => (
              <Badge
                key={index}
                className="rounded-none justify-center bg-mainyellow-neon hover:bg-mainyellow-neon p-2.5"
              >
                <span className="[font-family:'Noto_Sans_JP',Helvetica] font-medium text-[#000000] text-[15px] lg:text-xl whitespace-nowrap">
                  {shift}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="hidden md:block relative w-[867.93px] h-[1042.37px]">
          {/* Timeline vertical line */}
          <div className="absolute w-[87px] h-[971px] top-[71px] left-[399px]">
            <Separator
              className="absolute w-[886px] h-[7px] top-[481px] left-[-399px] bg-[#fcff00] rotate-90 opacity-60"
              orientation="vertical"
            />

            {/* Timeline points */}
            {timelinePoints.map((point, index) => (
              <div
                key={index}
                className={`absolute w-[89px] h-[87px] left-0`}
                style={{
                  top: point.top,
                }}
              >
                <div className="relative w-[87px] h-[87px]">
                  <div className="absolute w-[62px] h-[61px] top-[13px] left-[13px] bg-[#fcff00] rotate-45" />
                  <div className="absolute w-[54px] top-6 left-[17px] [font-family:'Teko',Helvetica] font-medium text-[#000000] text-3xl text-center leading-[normal]">
                    {point.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule event cards */}
          {scheduleEvents.map((event, index) => (
            <div
              key={index}
              className={`flex flex-col w-[${event.width}] items-start absolute ${event.position}`}
            >
              {event.isSimple ? (
                <Card
                  className={`flex !w-[228px] h-[45px] items-center justify-center gap-2.5 px-2.5 py-[5px] bg-[#000000] border border-solid border-[#fcff00] rounded-none`}
                >
                  <CardContent className="p-0">
                    <div className="relative w-12 h-[35.33px] mt-[-1.16px] [font-family:'Noto_Sans_JP',Helvetica] font-bold text-[#fcff00] text-2xl tracking-[0] leading-[35px] whitespace-nowrap">
                      {event.title}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2.5 px-2.5 py-[5px] relative self-stretch w-full flex-[0_0_auto] bg-[#fcff00]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_JP',Helvetica] font-bold text-[#000000] text-2xl tracking-[0] leading-[35px] whitespace-nowrap">
                      {event.title}
                    </div>
                  </div>
                  <Card className="flex items-center gap-[9px] p-[15px] relative self-stretch w-full flex-[0_0_auto] bg-[#000000] border border-solid border-[#fcff00] rounded-none">
                    <CardContent className="p-0">{event.content}</CardContent>
                  </Card>
                </>
              )}
            </div>
          ))}

          {/* Empty image placeholders */}
          <img
            src="images/schedule_gym-1.png"
            className="absolute w-[343px] h-[220px] top-0 left-[525px]"
            alt="Mask group"
          />
          <img
            src="images/schedule_gym-3.png"
            className="absolute w-[343px] h-[220px] top-[633px] left-[525px]"
            alt="Mask group"
          />
          <img
            src="images/schedule_gym-2.png"
            className="absolute w-[343px] h-[220px] top-[376px] left-0"
            alt="Mask group"
          />
        </div>

        <div className="relative w-full md:hidden overflow-hidden">
          <div className="relative">
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[7px] h-full bg-[#fcff00] opacity-60" />

            {scheduleItems.map((item, index) => (
              <div key={index} className="relative flex flex-col items-center gap-5">
                <ScheduleTimelineSp time={item.time} title={item.title} description={item.description} titleOnly={item.titleOnly} bottomImage={item.bottomImage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSubsection;
