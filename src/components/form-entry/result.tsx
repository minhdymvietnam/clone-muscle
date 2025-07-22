import {Button} from "../../components/ui/button";
import {Card, CardContent} from "../../components/ui/card";
import {Separator} from "../../components/ui/separator";
import {AlertCircle, ChevronLeft} from "lucide-react";

interface FormEntryResultProps {
  success: boolean;
  onReset: () => void;
}

export const FormEntryResult = ({ success, onReset }: FormEntryResultProps): JSX.Element => {
  return (
    <Card className="mx-auto max-w-[1200px] bg-[#00000080] border border-solid border-white backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] rounded-none">
      <CardContent className="flex flex-col items-center justify-center gap-[50px] py-[35px] px-5 lg:px-[50px]">
        <div className="space-y-5 lg:space-y-10 w-full max-w-[546px] mr-[-4.00px]">
          {success ? (
            <>
              <div className="font-bold text-2xl lg:text-3xl text-center leading-[52.5px] whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica] text-white tracking-[0]">
                応募が完了しました。
              </div>

              <Separator className="h-[3px] w-[43px] mx-auto bg-[#fcff00]"/>

              <div className="font-medium text-white lg:text-[17px] text-center leading-[29.8px] [font-family:'Noto_Sans_JP',Helvetica] tracking-[0]">
                ご応募ありがとうございます。<br/>
                担当者より３営業日以内にメールまたはお電話にてご連絡いたします。<br/>
                何卒よろしくお願いいたします。
              </div>

              <div className="font-medium text-white lg:text-[17px] text-center leading-[29.8px] [font-family:'Noto_Sans_JP',Helvetica] tracking-[0]">
                <span className="font-bold">【下記よりご連絡いたします】</span>
                <br/>
                TEL：03-6721-1674（採用専用ダイアル）
                <br/>
                ドメイン：@ex-pr.hrmos.co
              </div>
            </>
          ) : (
            <>
              <div className="absolute top-0 left-[50px] font-bold text-2xl lg:text-3xl text-center leading-[52.5px] whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica] text-white tracking-[0] flex items-center gap-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
                送信に失敗しました。
              </div>

              <Separator className="absolute w-[43px] h-[3px] top-[72px] left-[252px] bg-[#d70000]"/>

              <div className="absolute top-[117px] left-0 font-normal text-white lg:text-[17px] text-center leading-[29.8px] [font-family:'Noto_Sans_JP',Helvetica] tracking-[0]">
                <span className="font-medium">
                  申し訳ございません。システムエラーが発生しました。 <br />
                  時間をおいて再度お試しください。
                  <br/>
                  <br/>
                </span>

                <span className="font-bold">
                  【お問い合わせ】
                  <br/>
                </span>

                <span className="font-medium">
                  TEL：03-6721-1674（採用専用ダイアル）
                  <br/>
                  ドメイン：@ex-pr.hrmos.co
                </span>
              </div>
            </>
          )}
        </div>

        <Button 
          onClick={onReset}
          className="w-full relative shine text-center gap-10 max-w-[356px] h-[55px] lg:h-[70px] px-5 rounded-[5px] bg-[linear-gradient(270deg,rgba(252,255,0,1)_0%,rgba(254,255,135,1)_50%,rgba(252,255,0,1)_100%)] hover:bg-[linear-gradient(270deg,rgba(252,255,0,1)_0%,rgba(254,255,135,1)_50%,rgba(252,255,0,1)_100%)]">
          <ChevronLeft className="!size-6 text-white bg-black rounded-full absolute top-1/2 transform -translate-y-1/2 left-5"/>
          <span className="[font-family:'Noto_Sans_JP',Helvetica] font-bold text-black text-2xl lg:text-3xl tracking-[0] leading-[35px] pl-10">
            {success ? "採用TOPに戻る" : "再度応募する"}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};
