import React from "react";
import {GSAPCardStack} from "../../components/ui/gsap-card-stack.tsx";
import {useMediaQuery} from "react-responsive";
import {cn} from "@/lib/utils.ts";

const ambassadors = [
  {
    id: 1,
    title: "山岸 秀匡",
    description: "日本人初のミスター・オリンピア出場者で、2016年アーノルドクラシック212ポンド級優勝、2023年IFBBマスターズオリンピア212ポンド級優勝など数々の世界タイトルを受賞。アメリカと日本に自身の名を冠した『Iris Kyle, Hide Yamagishi, POWERHOUSE GYM』を展開し、ボディビル界の発展に尽力。YouTube登録者は36万人を超える。",
    image: "images/muscle-crew-1.png",
    spImage: "images/muscle-crew-1-sp.png",
  },
  {
    id: 2,
    title: "嶋田 慶太",
    description: "ボディビル界屈指のイケメン選手・嶋田慶太。2024年IFBB世界フィットネス選手権および男子ワールドカップにて75kg以下級、さらに無差別級でも優勝し、世界チャンピオンの座を獲得。日本選手権でも数々の上位入賞を果たす実力派。鍛錬の美学を体現する存在として、YouTubeなどSNSを通じて多くの支持を集め、筋トレの魅力を発信し続けている。",
    image: "images/muscle-crew-2.png",
    spImage: "images/muscle-crew-2-sp.png",
  },
  {
    id: 3,
    title: "JIN",
    description: "IFBBプロフィジーカーのパイオニア的存在。2019年に日本開催の大会で初となるIFBBプロカードを取得。国内トップクラスのフィジーク選手として活躍し、SNS総フォロワー数は70万超。アパレルブランド「XENO」創設者としても知られ、筋トレカルチャーの発信を牽引する存在。",
    image: "images/muscle-crew-3.png",
    spImage: "images/muscle-crew-3-sp.png",
  },
  {
    id: 4,
    title: "持田 教利",
    description: "フィジーク・ボディビル・クラシックフィジークの全カテゴリで実績を持つ、稀有なトップ選手。数々のコンテストで優勝を重ね、“日本一予約が取れない”人気パーソナルトレーナーとしても知られる。的確な指導と「効かせる技術」に定評があり、著書『キカトレ』やYouTube「おかずもちの筋肉生活」も話題。",
    image: "images/muscle-crew-4.png",
    spImage: "images/muscle-crew-4-sp.png",
  },
  {
    id: 5,
    title: "本気の夢中は、\n" +
      "夢を引き寄せる。",
    description: "山岸秀匡さんによる筋肉セミナー(不定期)への参加機会や、JINさんと共に現場で働くチャンス、持田トレーナーによる特別トレーニング指導など、他では体験できない貴重な機会が待っています。 働きながら、筋肉を高め、発信する。そんな唯一無二のキャリアが、ここにはあります。",
    secDescription: "※内容・実施時期は変更・中止となる場合がございます。",
    image: "images/muscle-crew-5.png",
    spImage: "images/muscle-crew-5-sp.png",
  }
]

const MuscleCrewSubsection = React.memo((): JSX.Element => {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  });
  // Transform ambassador data for card stack
  const cardData = ambassadors.map((ambassador) => ({
    id: ambassador.id,
    content: (
      <div className={cn("w-full h-full bg-black border border-[#fcff00] rounded-t-[20px] overflow-hidden", {"bg-[#1E181A]": ambassador.id === 2})}>
        <div className="relative w-full h-full max-md:!bg-cover max-md:!bg-[top_center] max-xl:lg:!bg-center" style={{backgroundImage: `url(${isMobile ? ambassador.spImage : ambassador.image})`, backgroundSize: ambassador.id === 5 ? "cover" : ambassador.id === 2 ? "auto 95%" : "auto 100%", backgroundPosition: isMobile ? "center" : ambassador.id === 2 ? "85% center" : "right center", backgroundRepeat: "no-repeat"}}/>

        <div className="absolute w-full lg:w-1/2 max-w-[517px] bottom-[23px] lg:bottom-[50px] px-4 xl:left-[62px]">
          <div className="flex flex-col w-full items-start gap-[13px] md:gap-[30px] mb-[3em] md:mb-0">
            <h3 className="self-stretch [font-family:'Noto_Sans_JP',Helvetica] font-medium text-[#ffffff] text-[32px] lg:text-[55px] tracking-[0] leading-[normal] whitespace-pre-wrap" style={{textShadow: "3px 3px 5px rgba(14, 51, 29, 0.5)"}}>
              {ambassador.title}
            </h3>
            <p className="self-stretch font-medium text-[#ffffff] text-sm xl:text-xl text-justify !leading-[1.75] [font-family:'Noto_Sans_JP',Helvetica] tracking-[0] whitespace-pre-line" style={{textShadow: "3px 3px 5px rgba(14, 51, 29, 0.5)"}}>
              {ambassador.description}
              {ambassador?.secDescription && <span className="text-xs md:text-sm block">{ambassador.secDescription}</span>}
            </p>
          </div>
        </div>
      </div>
    )
  }));

  return (
    <GSAPCardStack
      cards={cardData}
      className="bg-neon-yellow px-4"
      backgroundImage="images/yellow-bg-bottom.png"
    >
      {/* Header Section */}
      <div className="flex flex-col items-center gap-5 md:gap-[30px] w-full">
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="inline-flex items-center">
            <div className="custom-clip-path-both-side font-bold px-10 py-[3px] bg-black text-white text-[17px] lg:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
              アンバサダー
            </div>
          </div>

          <h2 className="relative font-semibold text-subblack text-[67px] lg:text-[150px] text-center tracking-[0] leading-[0.9] lg:leading-[150px] whitespace-nowrap [font-family:'Teko',Helvetica]">
            MUSCLE CREW
          </h2>
        </div>

        <p className="relative text-center text-base md:text-xl font-body-text text-black leading-[1.75] md:leading-[var(--body-text-line-height)]">
          MUSCLE CREWとは、<br className="lg:hidden" />当社の理念に共感し、共にマッスルの
          <br />
          可能性とセキュリティの魅力を発信する<br className="lg:hidden" />筋肉アンバサダーです。
        </p>
      </div>
    </GSAPCardStack>
  );
});

MuscleCrewSubsection.displayName = 'MuscleCrewSubsection';

export default MuscleCrewSubsection;
