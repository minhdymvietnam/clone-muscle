import {ChevronRightIcon} from "lucide-react";
import {Button} from "../../components/ui/button";
import {Card, CardContent} from "../../components/ui/card";
import {Separator} from "../../components/ui/separator";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu = ({isOpen, onClose}: MenuProps): JSX.Element => {
  // Menu items data for mapping
  const menuItems = [
    {title: "メッセージ", subtitle: "MESSAGE", href: "#message"},
    {title: "魅力ポイント", subtitle: "GOOD POINT", href: "#good-point"},
    {title: "アンバサダー", subtitle: "MUSCLE CREW", href: "#muscle-crew"},
    {title: "スケジュール", subtitle: "SCHEDULE", href: "#schedule"},
    {title: "先輩セキュリティの声", subtitle: "INTERVIEW", href: "#interview"},
    {title: "よくある質問", subtitle: "Q&A", href: "#qa"},
    {title: "採用情報", subtitle: "RECRUIT", href: "#recruit"},
  ];

  if (!isOpen) return <></>;

  return (
    <div className="fixed top-14 px-4 py-9 right-0 w-full sm:max-w-[400px] h-[calc(100vh-56px)] bg-black z-[100] flex flex-row justify-center">
      <div className="">
          {/* Menu items */}
          <Card className="border-none bg-transparent">
            <CardContent className="p-0 space-y-[15px]">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-[15px] border-b border-white"
                >
                  <Button
                    variant="link"
                    className="flex items-center justify-between w-full p-0 h-auto hover:opacity-80"
                    onClick={() => {
                      window.location.href = item.href;
                      onClose();
                    }}
                  >
                    <div className="flex w-[293px] items-end gap-2.5">
                      <span className="mt-[-1.00px] [font-family:'Noto_Sans_JP',Helvetica] text-mainyellow-neon text-xl whitespace-nowrap font-bold tracking-[0] leading-[normal]">
                        {item.title}
                      </span>
                      <span className="[font-family:'Noto_Sans_JP',Helvetica] font-bold text-white text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                        {item.subtitle}
                      </span>
                    </div>
                    <ChevronRightIcon className="w-[8.86px] h-[14.99px] text-white"/>
                  </Button>
                  <Separator className="bg-white/20 h-px w-full"/>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex items-center mt-10">
            <button
              onClick={() => {
                window.location.href = "#movie";
                onClose();
              }}
              className="w-[180px] h-[61px] [font-family:'Teko',Helvetica] font-medium text-white text-[40px] tracking-[0] leading-none shine movie-shape-sp py-4 px-6 bg-[#5D5D5D] relative overflow-hidden">
              MOVIE
            </button>

            <button
              onClick={() => {
                window.location.href = "#entry";
                onClose();
              }}
              className="w-[180px] h-[61px] [font-family:'Teko',Helvetica] font-medium text-[#333333] text-[40px] tracking-[0] leading-none shine entry-shape py-4 px-6 bg-[#FCFF00] relative overflow-hidden">
              ENTRY
            </button>
          </div>
        </div>
    </div>
  );
};