
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import {SectionCode} from "@/lib/enums.ts";

const QaSubsection = (): JSX.Element => {
  const qaItems = [
    {
      id: "item-1",
      question: "トレーニングを始めたばっかりですが大丈夫でしょうか？",
      answer:
        "もちろんです！当社には入社後に筋トレに興味を持ってトレーニングを始めた先輩も多いです。仲間に刺激をうけてトレーニングを開始し、教えあいながら日々筋トレしています。",
      isOpen: true,
    },
    {
      id: "item-2",
      question: "危険な目にあうことはありますか？",
      answer: "絶対に安全な業務とは言い切れませんが、パトロール時には全員ボディカメラを着用しています。それによって自分たちの身を守り、安全に業務を遂行しています。また、業務時には必ず先輩隊員とバディを組んで行動するため、日々「話し方」や「緊急時の対応方法」を学べる環境となっております。先輩から技を教わりながら、プロのセキュリティを目指せます！",
      isOpen: false,
    },
    {
      id: "item-3",
      question: "配属先の社員構成を教えてください",
      answer: "各地区20代～30前半の方を中心に活躍しております！チームにはベテラン隊員も在籍しており未経験の方でも安心して働ける環境が整っています。",
      isOpen: false,
    },
    {
      id: "item-4",
      question: "性別関係なく活躍できますか？",
      answer: "現在も性別関係なく、元警察官をはじめスポーツをしていた方や接客業経験者など様々なバッググラウンドを持った方が活躍しております。体力に自信のある方も、これから鍛えたい方も性別関係なくお気軽にお問合せください。",
      isOpen: false,
    },
    {
      id: "item-5",
      question: "地方在住ですが、応募は可能でしょうか？",
      answer: "もちろん可能です！まずはオンラインでのWEB面接を実施させていただき詳しいお話ができればと思っております。また入社が決まった際には引越し手当や住宅手当もございます。（※規定あり）",
      isOpen: false,
    },
  ];

  return (
    <section id={SectionCode.QA} className="w-full py-[70px] lg:py-[120px] px-4 md:px-8 lg:px-[360px]">
      <div className="flex flex-col items-center gap-8 lg:gap-[60px] max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center gap-5">
          <div className="inline-flex items-center">
            <div className="custom-clip-path-both-side font-bold px-10 py-[3px] bg-mainyellow-neon text-black text-[17px] lg:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
              採用情報
            </div>
          </div>

          <h2 className="font-semibold text-white text-[67px] lg:text-[150px] text-center tracking-[0] lg:leading-[150px] whitespace-nowrap [font-family:'Teko',Helvetica]">
            Q&amp;A
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full [data-state='open']:"
        >
          {qaItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="mb-5 bg-black border border-solid data-[state=open]:border-[#fcff00] data-[state=open]:shadow-[4px_4px_0px_1px_#fcff00] data-[state=closed]:border-white data-[state=closed]:shadow-[0px_4px_0px_#00000040]"
            >
              <AccordionTrigger className="px-[15px] py-[5px] hover:no-underline [&>svg]:hidden group">
                <div className="flex items-center gap-[13px] w-full">
                  <div className="w-7 h-[47px] [font-family:'Teko',Helvetica] font-medium text-mainyellow-neon text-4xl">
                    Q.
                  </div>
                  <div className="font-heading-4 font-[number:var(--heading-4-font-weight)] text-white text-base md:text-[length:var(--heading-4-font-size)] tracking-[var(--heading-4-letter-spacing)] leading-[var(--heading-4-line-height)] text-left w-full">
                    {item.question}
                  </div>
                  <div className="flex-shrink-0 text-mainyellow-neon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-data-[state=open]:rotate-45">
                      <path d="M12 5v14m-7-7h14" />
                    </svg>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="flex items-center gap-2.5 p-[15px] bg-subyellow-20">
                  <div className="font-body-text font-[number:var(--body-text-font-weight)] text-white text-base md:text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)]">
                    {item.answer}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default QaSubsection;
