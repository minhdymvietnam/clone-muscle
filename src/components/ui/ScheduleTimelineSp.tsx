import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"

interface ScheduleTimelineSpProps {
  title: string
  time: string
  description?: JSX.Element,
  titleOnly?: boolean,
  bottomImage?: string
}

const ScheduleTimelineSp = ({ title, time, description, titleOnly, bottomImage }: ScheduleTimelineSpProps) => {
  return (
    <>
      <div className="relative w-[90px] aspect-square mt-10">
        <div className="absolute w-16 h-[63px] top-[13px] left-[13px] bg-[#fcff00] rotate-45" />
        <div className="absolute w-14 top-[25px] left-[17px] [font-family:'Teko',Helvetica] font-medium text-[#000000] text-3xl text-center leading-[normal]">
          {time}
        </div>
      </div>

      <Card className="w-full max-w-[256px] border-0 bg-transparent">
        {/* Title */}
        <div className={cn("flex items-center justify-center gap-[10.4px] px-[10.4px] py-[5.2px] w-full bg-[#fcff00]", {
          "bg-black border-[1px] border-solid border-[#fcff00]": titleOnly,
        })}>
          <h4 className={cn("w-fit mt-[-1.04px] [font-family:'Noto_Sans_JP',Helvetica] text-black font-bold text-2xl leading-[36.4px] whitespace-nowrap", {
            "text-[#fcff00]": titleOnly
          })}>
            {title}
          </h4>
        </div>

        {/* Description (if not titleOnly) */}
        {!titleOnly && (
          <CardContent className="flex items-center gap-[9.36px] p-[15.6px] bg-[#000000] border-[1.04px] border-solid border-[#fcff00]">
            {description}
          </CardContent>
        )}
      </Card>

      {bottomImage && (
        <div className="w-full">
          <img src={bottomImage} alt="Schedule Image" className="w-full h-auto object-cover" />
        </div>
      )}
    </>
  )
}

export default ScheduleTimelineSp