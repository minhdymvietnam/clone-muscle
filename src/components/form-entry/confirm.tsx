import {ChevronRight} from "lucide-react";
import {Button} from "../../components/ui/button";
import {Card, CardContent} from "../../components/ui/card";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate fetch API call with 1 second timeout
      await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Add 1 second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onConfirm();
    } catch (error) {
      console.error('Submission failed:', error);
      onConfirm(); // Still proceed to next step for demo purposes
    } finally {
      setIsSubmitting(false);
      window.location.href = "#entry";
    }
  };

  return (
    <>
      <Card className="flex flex-col w-full max-w-[1200px] items-start gap-2.5 p-4 lg:px-[50px] lg:py-[35px] relative flex-[0_0_auto] bg-[#00000080] border border-solid border-[#ffffff] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] rounded-none">
        <CardContent className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] p-0">
          {displayData.map((item, index) => (
            <div
              key={`form-item-${index}`}
              className={`lg:flex items-${item.isLongText ? "start" : "center"} gap-[195px] px-0 py-5 relative self-stretch w-full flex-[0_0_auto] ${index < displayData.length - 1 ? "border-b [border-bottom-style:solid] border-[#a2a09d]" : "border-0 border-none"}`}
            >
              <div className="w-full max-w-[193px] font-bold leading-[normal] relative [font-family:'Noto_Sans_JP',Helvetica] text-[#ffffff] lg:text-xl tracking-[0]">
                {item.label}
              </div>
              <div
                className={`${item.isLongText ? "whitespace-pre-line w-full max-w-[712px] leading-[35px]" : "w-fit whitespace-nowrap"} ${!item.isLongText ? "mt-[-1.00px]" : ""} font-normal relative [font-family:'Noto_Sans_JP',Helvetica] text-white lg:text-xl tracking-[0]`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col items-center lg:flex-row gap-2.5 w-full mx-auto mt-[50px] lg:mt-[60px] max-w-[742px]">
        <Button
          onClick={onEdit}
          variant="outline"
          disabled={isSubmitting}
          className="flex w-full shine max-w-[356px] h-[55px] lg:h-[70px] items-center justify-between px-5 rounded-[5px] border border-solid border-[#ffffff] bg-transparent hover:bg-[#ffffff20] disabled:bg-sublight-gray disabled:text-black disabled:border-none disabled:cursor-not-allowed"
        >
                <span className="text-white  w-[292px] mt-[-3.50px] mb-[-1.50px] [font-family:'Noto_Sans_JP',Helvetica] font-bold text-2xl lg:text-3xl text-center tracking-[0] leading-[35px]">
                  編集する
                </span>
          <ChevronRight className={cn("!size-6 text-black bg-white rounded-full", {"text-white bg-black": isSubmitting})}/>
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex w-full shine max-w-[356px] h-[55px] lg:h-[70px] items-center justify-between p-5 rounded-[5px] bg-[linear-gradient(270deg,rgba(252,255,0,1)_0%,rgba(254,255,135,1)_50%,rgba(252,255,0,1)_100%)] hover:bg-[linear-gradient(270deg,rgba(252,255,0,0.9)_0%,rgba(254,255,135,0.9)_50%,rgba(252,255,0,0.9)_100%)] disabled:bg-none disabled:bg-sublight-gray disabled:text-black disabled:cursor-not-allowed disabled:justify-center"
        >

          {isSubmitting ? (
            <svg className="!size-[38px] animate-spin" width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="18.3535" width="3.16667" height="9.5" rx="1.58333" fill="#D9D9D9"/>
              <rect x="18.3535" y="28.5" width="3.16667" height="9.5" rx="1.58333" fill="#D9D9D9"/>
              <rect x="0.9375" y="20.583" width="3.16667" height="9.5" rx="1.58333" transform="rotate(-90 0.9375 20.583)" fill="#2D2D2D"/>
              <rect x="29.4375" y="20.583" width="3.16667" height="9.5" rx="1.58333" transform="rotate(-90 29.4375 20.583)" fill="#D9D9D9"/>
              <rect x="5.38281" y="6.68457" width="3.16667" height="9.5" rx="1.58333" transform="rotate(-45 5.38281 6.68457)" fill="#D9D9D9"/>
              <rect x="25.5352" y="26.8369" width="3.16667" height="9.5" rx="1.58333" transform="rotate(-45 25.5352 26.8369)" fill="#D9D9D9"/>
              <rect x="7.62109" y="33.5547" width="3.16667" height="9.5" rx="1.58333" transform="rotate(-135 7.62109 33.5547)" fill="#D9D9D9"/>
              <rect x="27.7734" y="13.4023" width="3.16667" height="9.5" rx="1.58333" transform="rotate(-135 27.7734 13.4023)" fill="#D9D9D9"/>
            </svg>
          ) : (<><span className="text-black w-[292px] mt-[-3.50px] mb-[-1.50px] [font-family:'Noto_Sans_JP',Helvetica] font-bold text-2xl lg:text-3xl text-center tracking-[0] leading-[35px]">
                  応募する
                </span>
              <ChevronRight className="!size-6 text-white bg-black rounded-full"/></>
          )}
        </Button>
      </div>
    </>
  );
};