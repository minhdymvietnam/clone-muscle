
import { Card, CardContent } from "@/components/ui/card.tsx";

const RecruitSubsection = (): JSX.Element => {
  // Data for recruitment requirements
  const recruitmentItems = [
    {
      title: "雇用形態",
      content: "契約社員  ※正社員転換の実績多数！",
    },
    {
      title: "募集職種",
      content: "警備員、セキュリティスタッフ、パトロール隊員",
    },
    {
      title: "業務内容",
      content: [
        "・客引きやスカウトへの注意喚起",
        "・路上飲みや路上喫煙者への注意喚起",
        "・警備エリアの徒歩巡回警備",
        "・定点立哨警備",
        "・無線を使用した各チームとの連携",
        "・監督官庁との連携",
      ],
    },
    {
      title: "応募資格",
      content: [
        "18歳以上（警備業法による）",
        "学歴不問・業種・職種未経験OK",
        "転職回数・ブランク不問",
      ],
    },
    {
      title: "給与",
      content: [
        "<span class='font-heading-4 font-[number:var(--heading-4-font-weight)] tracking-[var(--heading-4-letter-spacing)] text-base md:text-[length:var(--heading-4-font-size)] leading-[1.75] md:leading-[var(--heading-4-line-height)] [font-style:var(--heading-4-font-style)]'>〈契約社員〉</span>",
        " <span class='font-heading-4 font-[number:var(--heading-4-font-weight)] tracking-[var(--heading-4-letter-spacing)] text-base md:text-[length:var(--heading-4-font-size)] leading-[1.75] md:leading-[var(--heading-4-line-height)] [font-style:var(--heading-4-font-style)]'>月給：</span>",
        "【東京】23万円＋勤務地手当3万円＋諸手当",
        "【大阪】22万円＋皆勤手当2万円＋諸手当",
        "※経験・スキルを考慮して決定",
        "※別途残業代全額支給",
        "※試用期間：3か月（条件に変更なし）",
        "◆昇給あり",
        "◆賞与あり（正社員登用後に査定対象）",
        "<span class='font-heading-4 font-[number:var(--heading-4-font-weight)] tracking-[var(--heading-4-letter-spacing)] text-base md:text-[length:var(--heading-4-font-size)] leading-[1.75] md:leading-[var(--heading-4-line-height)] [font-style:var(--heading-4-font-style)]'>＜月収例＞</span>",
        "1年目23歳　パトロール隊員：27万1032円",
        "3年目29歳　パトロールリーダー：31万9488円",
      ],
    },
    {
      title: "勤務地",
      content: [
        "東京都港区エリア/西東京エリア等",
        "千葉県船橋エリア等",
        "大阪府大阪市エリア等",
        "※詳細はお問い合わせください。",
      ],
    },
    {
      title: "勤務時間",
      content: [
        "1か月単位の変形労働時間制",
        "実働6時間＋休憩1時間",
        "【シフト例】",
        "①15:00 - 22:00",
        "②16:45-23:45",
        "③22:00-翌5:00",
        "（配属先によって変動します）",
        "※各シフト休憩時間1時間あり",
        "※深夜手当あり",
      ],
    },
    {
      title: "休日",
      content: [
        "<span class='font-heading-4 font-[number:var(--heading-4-font-weight)] tracking-[var(--heading-4-letter-spacing)] text-base md:text-[length:var(--heading-4-font-size)] leading-[1.75] md:leading-[var(--heading-4-line-height)] [font-style:var(--heading-4-font-style)]'>シフト制</span>",
        "・有給休暇",
        "・慶弔休暇",
        "・産休・育休取得実績あり",
        "・介護休暇",
        "・ボランティア休暇"
      ],
    },
    {
      title: "待遇福利厚生",
      content: [
        "・保険完備（雇用・労災・健康・厚生年金）",
        "・正社員登用制度あり",
        "・交通費支給（月5万円まで）",
        "・勤務地特別手当（月3万円）",
        "・入社時の遠方引越し手当　※規定あり",
        "・住宅手当（月3万円）※規定あり",
        "・業務手当（月1万～6.5万円）※規定あり",
        "・時間外勤務手当",
        "・深夜手当",
        "・資格手当（月1,000～7,000円）",
        "　└資格を取って給与UPするスタッフもたくさんいます。",
        "・制服・備品一式貸与",
        "・ゴールドジム会費全額会社負担！※規定あり",
      ],
    },
  ];

  return (
    <section className="relative min-h-[100lvh] w-full py-[70px] lg:py-[120px] px-6 flex justify-center">
      <Card className="relative w-full max-w-[1200px] bg-transparent border-0 shadow-none">
        <CardContent className="flex flex-col items-center gap-10 lg:gap-[60px] p-0">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-5">
            <div className="inline-flex items-center">
              <div className="custom-clip-path-both-side font-bold px-10 py-[3px] bg-mainyellow-neon text-black text-[17px] md:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
                採用情報
              </div>
            </div>

            <h2 className="[font-family:'Teko',Helvetica] font-semibold text-textwhite text-[67px] md:text-[150px] text-center leading-[0.9] md:leading-[150px] whitespace-nowrap md:mb-[-32px]">
              RECRUIT
            </h2>
          </div>

          {/* Recruitment Flow */}
          <div className="w-full flex flex-col items-center gap-10 md:gap-20">
            <div className="relative w-full max-w-[708.45px]">
              <div className="flex flex-col items-center gap-[27px]">
                <h3 className="font-bold text-[#ffffff] text-[28px] md:text-[32px] text-center leading-none md:leading-[normal] whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica] tracking-[0]">
                  選考フロー
                </h3>
                <div className="w-[66px] h-1 bg-mainyellow-neon"></div>
              </div>

              {/* <div className="absolute max-md:scale-50 max-md:left-[170px] w-full md:w-[708px] h-[205px] top-[31px] md:top-[127px] left-0"> */}
              <img src="/images/floe-graphic.png" alt="floe graphic" className="mt-[31px]" />

              <div className="inline-flex items-center justify-center gap-2.5 mt-4 md:mt-7">
                <p className="[font-family:'Noto_Sans_JP',Helvetica] font-bold text-textwhite text-[10px] md:text-base text-center tracking-[0] leading-[1.75] md:leading-4 whitespace-nowrap">
                  ※状況によっては、面接を複数回実施させていただく場合もございます。
                </p>
              </div>
            </div>

            {/* Recruitment Requirements */}
            <div className="w-full flex flex-col items-center gap-[60px]">
              <div className="relative flex flex-col items-center gap-[25px]">
                <h3 className="font-bold text-[#ffffff] text-[32px] text-center leading-[normal] whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica] tracking-[0]">
                  募集要項
                </h3>
                <div className="w-[66px] h-1 bg-mainyellow-neon"></div>
              </div>

              <div className="w-full flex flex-col items-start gap-5">
                {recruitmentItems.map((item, index) => (
                  <div
                    key={`item-${index}`}
                    className="w-full flex flex-col items-start gap-[21px]"
                  >
                    <div className="flex w-full flex-col md:flex-row">
                      <div className="w-[203px] font-heading-4 font-[number:var(--heading-4-font-weight)] text-mainyellow-neon text-base md:text-[length:var(--heading-4-font-size)] tracking-[var(--heading-4-letter-spacing)] leading-[1.75] md:leading-[var(--heading-4-line-height)] [font-style:var(--heading-4-font-style)]">
                        {item.title}
                      </div>
                      <div className="font-body-text font-[number:var(--body-text-font-weight)] text-textwhite text-base md:text-[length:var(--body-text-font-size)] tracking-normal md:tracking-[var(--body-text-letter-spacing)] leading-[1.75] md:leading-[var(--body-text-line-height)] [font-style:var(--body-text-font-style)] md:pl-[74px]">
                        {Array.isArray(item.content) ? (
                          item.content.map((line, lineIndex) => (
                            <div
                              key={`line-${lineIndex}`}
                              dangerouslySetInnerHTML={{ __html: line }}
                              className="leading-[35px]"
                            />
                          ))
                        ) : (
                          <span className="text-[#ffffff]">{item.content}</span>
                        )}
                      </div>
                    </div>

                    {index < recruitmentItems.length - 1 && (
                      <div className="relative w-full h-px bg-white before:absolute before:w-[124px] md:before:w-[202px] before:h-0.5 before:-top-px before:left-0 before:bg-mainyellow-neon" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default RecruitSubsection;
