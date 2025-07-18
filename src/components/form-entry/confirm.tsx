import {ArrowRightIcon} from "lucide-react";
import {Button} from "../../components/ui/button";
import {Card, CardContent} from "../../components/ui/card";

type FormData = {
  name: string;
  furigana: string;
  email: string;
  phone: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  prefecture: string;
  muscleFeelings?: string;
  privacyPolicy: boolean;
};

interface FormEntryConfirmProps {
  formData: FormData;
  onConfirm: () => void;
  onEdit: () => void;
}

export const FormEntryConfirm = ({ formData, onConfirm, onEdit }: FormEntryConfirmProps): JSX.Element => {
  // Format display data
  const displayData = [
    {label: "氏名", value: formData.name},
    {label: "ふりがな", value: formData.furigana},
    {label: "メールアドレス", value: formData.email},
    {label: "電話番号", value: formData.phone},
    {label: "生年月日", value: `${formData.birthYear}/${formData.birthMonth}/${formData.birthDay}`},
    {label: "お住まいの都道府県", value: formData.prefecture},
    {
      label: "筋肉への想い",
      value: formData.muscleFeelings || "未入力",
      isLongText: true,
    },
  ];

  return (
    <>
      <Card className="flex flex-col w-full max-w-[1200px] items-start gap-2.5 p-4 lg:px-[50px] lg:py-[35px] relative flex-[0_0_auto] bg-[#00000080] border border-solid border-[#ffffff] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] rounded-none">
        <CardContent className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] p-0">
          {displayData.map((item, index) => (
            <div
              key={`form-item-${index}`}
              className={`lg:flex items-${item.isLongText ? "start" : "center"} gap-[195px] px-0 py-5 relative self-stretch w-full flex-[0_0_auto] ${index < displayData.length - 1 ? "border-b [border-bottom-style:solid] border-[#a2a09d]" : "border-0 border-none"}`}
            >
              <div className="w-full max-w-[193px] font-bold leading-[normal] relative [font-family:'Noto_Sans_JP',Helvetica] text-[#ffffff] text-xl tracking-[0]">
                {item.label}
              </div>
              <div
                className={`${item.isLongText ? "w-full max-w-[712px] leading-[35px]" : "w-fit whitespace-nowrap"} ${!item.isLongText ? "mt-[-1.00px]" : ""} font-normal relative [font-family:'Noto_Sans_JP',Helvetica] text-[#ffffff] text-xl tracking-[0]`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col items-center lg:flex-row gap-2.5 w-full mx-auto mt-5 max-w-[742px]">
        <Button 
          onClick={onConfirm}
          className="flex w-full max-w-[356px] h-[70px] items-center justify-between p-5 rounded-[5px] bg-[linear-gradient(270deg,rgba(252,255,0,1)_0%,rgba(254,255,135,1)_50%,rgba(252,255,0,1)_100%)] hover:bg-[linear-gradient(270deg,rgba(252,255,0,0.9)_0%,rgba(254,255,135,0.9)_50%,rgba(252,255,0,0.9)_100%)]">
                <span className="text-black w-[292px] mt-[-3.50px] mb-[-1.50px] [font-family:'Noto_Sans_JP',Helvetica] font-bold text-3xl text-center tracking-[0] leading-[35px]">
                  応募する
                </span>
          <ArrowRightIcon className="w-6 h-6"/>
        </Button>

        <Button
          onClick={onEdit}
          variant="outline"
          className="flex w-full max-w-[356px] h-[70px] items-center justify-between p-5 rounded-[5px] border border-solid border-[#ffffff] bg-transparent hover:bg-[#ffffff20]"
        >
                <span className="text-white  w-[292px] mt-[-3.50px] mb-[-1.50px] [font-family:'Noto_Sans_JP',Helvetica] font-bold text-3xl text-center tracking-[0] leading-[35px]">
                  編集する
                </span>
          <ArrowRightIcon className=" w-6 h-6 text-white"/>
        </Button>
      </div>
    </>
  );
};
