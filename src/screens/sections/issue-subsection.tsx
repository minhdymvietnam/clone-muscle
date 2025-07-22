import {SectionCode} from "@/lib/enums.ts";
import {HorizontalScroller} from "../../components/ui/horizontal-scroller.tsx";
import { useMediaQuery } from "react-responsive";

const imageUrls = {
  background: "/images/issue-bg.png",
  left_side: "/images/issue-left.png",
  right_side: "/images/issue-right.png",
  left_side_mobile: "/images/issue-left-sp.png",
  right_side_mobile: "/images/issue-right-sp.png",
}

const IssueSubsection = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <section className="w-full flex flex-col justify-center overflow-hidden">
      <div className="w-full h-full flex flex-col justify-center px-4 lg:px-0 relative overflow-hidden">
        {/* Top heading section */}
        <div className="pt-11 lg:pt-24 flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-center justify-center mx-auto w-full max-w-screen-xl">
              <div className="flex items-baseline justify-center gap-1.5 lg:gap-4">
                <div className="h-4 lg:h-10 flex items-center">
                  <img
                    className="h-full w-auto"
                    alt="Mask group"
                    src="/images/issue-line.png"
                  />
                </div>

                <div className="font-black text-center text-xl lg:text-5xl [font-family:'Noto_Sans_JP',Helvetica] bg-contain bg-center bg-clip-text text-transparent bg-white" style={{backgroundImage: "url('/images/text-bg.png')"}}>
                  <span className="pr-1">こんな</span>
                  <span className="font-black text-[40px] lg:text-8xl leading-[50px] lg:leading-[123px] whitespace-nowrap tracking-[0] bg-cover bg-center bg-clip-text text-transparent bg-mainyellow-neon" style={{backgroundImage: "url('/images/text-bg.png')"}}>
                    お悩み
                  </span>
                  は
                  <br className="lg:hidden"/>
                  <span className="pl-0 md:pl-2">ありませんか？</span>
                </div>

                <div className="h-4 lg:h-10 flex items-center">
                  <img
                    className="h-full w-auto"
                    alt="Mask group"
                    src="/images/issue-line.png"
                  />
                </div>
              </div>
          </div>

            <div className="mx-auto w-fu ll max-w-screen-xl mt-9">
          <div className="relative w-full">
            <div className="relative mx-auto max-w-[628px] w-full">
              <img src="/images/issue-center-dizzy.png" className="w-full" alt=""/>
            </div>
            <div className="max-lg:max-w-[312px] max-lg:-mt-40 max-lg:flex max-lg:flex-col-reverse max-lg:items-center max-lg:gap-10 max-lg:mx-auto lg:absolute w-full lg:h-full lg:top-0 lg:bottom-0 lg:left-0 lg:right-0">
              <div className="lg:absolute lg:top-[30px] left-0 order-2">
                <div className="w-[250px] aspect-square relative mb-[5px]">
                  <div className="w-full h-full relative rounded-full overflow-hidden"><img src="/images/issue-side-1.png" alt="もっと自分を高める" className="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover"/></div>
                  <div className="absolute bottom-0 left-0 w-max custom-clip-path-right bg-neon-yellow [font-family:'Noto_Sans_JP',Helvetica] font-bold text-3xl py-1 px-2.5 pr-5">もっと自分を高める</div>
                </div>
                <div className="rectangle-outline">
                  <div className="inner [font-family:'Noto_Sans_JP',Helvetica] font-bold text-xl text-neon-yellow">環境に行きたい・・・</div>
                </div>
              </div>
              <div className="lg:absolute lg:bottom-[30px] left-[180px] order-1">
                <div className="w-[250px] aspect-square relative mb-[5px]">
                  <div className="w-full h-full relative rounded-full overflow-hidden"><img src="/images/issue-side-2.png" alt="『筋トレが趣味』を" className="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover"/></div>
                  <div className="absolute bottom-0 left-0 right-9 rectangle-outline">
                    <div className="inner [font-family:'Noto_Sans_JP',Helvetica] font-bold text-xl text-neon-yellow">『筋トレが趣味』を</div>
                  </div>
                </div>
                <div className="custom-clip-path-right bg-neon-yellow [font-family:'Noto_Sans_JP',Helvetica] font-bold text-3xl py-1 px-2.5">”強み”にしたい</div>
              </div>
              <div className="lg:absolute lg:top-1/2 lg:transform lg:translate-y-[-50%] right-0 order-3">
                <div className="w-[250px] aspect-square relative mb-[5px]">
                  <div className="w-full h-full relative rounded-full overflow-hidden"><img src="/images/issue-side-3.png" alt="もっと筋トレしたいのに" className="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover"/></div>
                  <div className="absolute bottom-0 left-0 -right-1 rectangle-outline">
                    <div className="inner [font-family:'Noto_Sans_JP',Helvetica] font-bold text-xl text-neon-yellow">もっと筋トレしたいのに</div>
                  </div>
                </div>
                <div className="custom-clip-path-right bg-neon-yellow [font-family:'Noto_Sans_JP',Helvetica] font-bold text-3xl py-1 px-2.5">時間がない・・・</div>
              </div>
            </div>
          </div>
              <img
                className="w-[847px] h-[72px] md:h-[136px] mx-auto object-cover"
                alt="Polygon"
                src="/icons/polygon-1.svg"
              />
            </div>
        </div>

        {/* Message section */}
        <div className="relative w-full bg-[100%_100%] pt-10 md:pt-[84px]" id={SectionCode.MESSAGE}>
          <div className="flex flex-col lg:justify-between">
            <div className="flex flex-col w-full max-w-[680px] mx-auto items-center gap-[30px]">
              <div className="flex flex-col items-center gap-5">
                <div className="inline-flex items-center">
                  <div className="custom-clip-path-both-side font-bold px-10 py-[3px] bg-mainyellow-neon text-black text-[17px] lg:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
                    メッセージ
                  </div>
                </div>

                <div className="font-semibold text-textwhite text-[67px] lg:text-[150px] text-center tracking-[0] lg:leading-[150px] whitespace-nowrap [font-family:'Teko',Helvetica]">
                  MESSAGE
                </div>
              </div>

              <div className="lg:hidden font-medium text-white text-md text-center tracking-[0] space-y-5 leading-[30px] [font-family:'Noto_Sans_JP',Helvetica]">
                <p>私たちの職場には、仲間と切磋琢磨しながら <br className="block md:hidden" />
                  自らを高め、
                  成長できる環境があります。</p>

                <p>日々のトレーニングで鍛えてきたのは <br className="block md:hidden" />
                  カラダだけではないはず。</p>

                <p>培った精神力と強い意志は、<br className="block md:hidden" />
                  きっとあなたの大きな強み。</p>

                <p>街と人の安全を守るという誇りある使命に、<br className="block md:hidden" />
                  本気で挑戦できます。</p>

                <p>一人では届かない高みも、<br className="block md:hidden" />
                  仲間と支え合えば乗り越えられる。</p>

                <p> そんな熱い想いを持つあなたと出会える日を、<br className="block md:hidden" />
                  心から楽しみにしています。</p>
              </div>
            </div>

            <div className="hidden lg:block font-medium text-white text-xl text-center tracking-[0] leading-[50px] [font-family:'Noto_Sans_JP',Helvetica]">
              私たちの職場には、仲間と切磋琢磨しながら自らを高め、
              <br/>
              成長できる環境があります。
              <br/>
              日々のトレーニングで鍛えてきたのはカラダだけではないはず。
              <br/>
              培った精神力と強い意志は、きっとあなたの大きな強み。
              <br/>
              街と人の安全を守るという誇りある使命に、本気で挑戦できます。
              <br/>
              一人では届かない高みも、仲間と支え合えば乗り越えられる。
              <br/>
              そんな熱い想いを持つあなたと出会える日を、心から楽しみにしています。
            </div>

            <div className="relative pt-10 lg:pt-60 w-full">
              <div className="lg:absolute w-full lg:bottom-0 lg:left-0 grid grid-cols-2 lg:flex items-center gap-5 justify-between">
                <img className="w-full h-auto lg:w-auto lg:h-[811px] object-cover" src={isMobile ? imageUrls.left_side_mobile : imageUrls.left_side} alt="Message"/>
                <img className="w-full h-auto lg:w-auto lg:h-[811px] object-cover" src={isMobile ? imageUrls.right_side_mobile : imageUrls.right_side} alt="Message"/>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 flex items-center h-[60px] md:h-fit">
          <HorizontalScroller speed={0.5}>
            <div className="animate-marquee [-webkit-text-stroke:2px_#fcff00] text-transparent text-[104px] lg:text-[285px] tracking-[0] leading-none lg:leading-[180px] whitespace-nowrap [font-family:'Geo',Helvetica]">
              SECURITY IS COOLSECURITY IS COOL
            </div>
          </HorizontalScroller>
        </div>
        <div className="absolute bottom-[200px] md:bottom-[90px] right-3 z-10 flex items-center h-fit text-white text-[7px] md:text-xs font-normal">
          Mits OKABE ©  <br />
          岡部 みつる ©
        </div>
      </div>
    </section>
  );
};

export default IssueSubsection;
