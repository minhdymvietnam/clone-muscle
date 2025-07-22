import {Fragment, useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {FormEntryConfirm} from "./confirm";
import {FormEntryResult} from "./result";
import {cn} from "@/lib/utils.ts";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "氏名を入力してください"),
  furigana: z.string().min(1, "ふりがなを入力してください").max(50, "ふりがなは50文字以内で入力してください"),
  email: z.string().min(1, "メールアドレスを入力してください").email("メールアドレスの形式が正しくありません。"),
  phone: z.string().min(1, "電話番号を入力してください").regex(/^[0-9-]+$/, "電話番号は数字とハイフンのみで入力してください").min(10, "電話番号は10桁以上で入力してください"),
  birthYear: z.string().nonempty("生年月日の年を選択してください"),
  birthMonth: z.string().nonempty("生年月日の月を選択してください"),
  birthDay: z.string().nonempty( "生年月日の日を選択してください"),
  prefecture: z.string().min(1, "お住まいの都道府県を選択してください。"),
  muscleFeelings: z.string().optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, "「個人情報保護方針に同意する」にチェックを入れてください。")
});

type FormData = z.infer<typeof formSchema>;

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "群馬県",
  "栃木県",
  "茨城県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
]

export default function FormEntry() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);

  const form = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      furigana: "",
      email: "",
      phone: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      prefecture: "",
      muscleFeelings: "",
      privacyPolicy: false
    }
  });

  form.watch();

  const {isValid, isDirty} = form.formState;

  // useEffect(() => {
  //   console.log(!form.getValues("birthMonth"))
  // }, [form])

  const formFields = [
    {label: "氏名", placeholder: "山田太郎", required: true, name: "name"},
    {label: "ふりがな", placeholder: "やまだたろう", required: true, name: "furigana"},
    {label: "メールアドレス", placeholder: "test@gmail.com", required: true, name: "email"},
    {label: "電話番号", placeholder: "080-1111-2222", required: true, name: "phone"},
    {label: "生年月日", type: "date", required: true, name: "birth"},
    {
      label: "お住まいの都道府県",
      type: "select",
      placeholder: "選択してください",
      required: true,
      name: "prefecture"
    },
    {
      label: "筋肉への想い",
      type: "textarea",
      placeholder: "筋肉に対する熱い思いを聞かせてください。",
      required: false,
      name: "muscleFeelings"
    },
  ];

  // Progress steps
  const steps = [
    {number: 1, label: "エントリー", active: currentStep >= 1},
    {number: 2, label: "確認画面", active: currentStep >= 2},
    {number: 3, label: "応募完了", active: currentStep >= 3},
  ];

  const onSubmit = (data: FormData) => {
    console.log(data)
    setFormData(data);
    setCurrentStep(2);
  };

  const handleConfirm = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100));
      setSubmitResult('success');
      setCurrentStep(3);
    } catch (error) {
      setSubmitResult('error');
      setCurrentStep(3);
    }
  };

  const handleEdit = () => {
    setCurrentStep(1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData(null);
    setSubmitResult(null);
    form.reset();
  };


  // Render input form
  return (
    <div className="relative w-full max-w-[1200px] placeholder-[#BDBDBD]">
      {/* Progress Steps */}
      <div className="flex justify-center mb-[36px]">
        <div className="relative w-fit max-w-[522px] h-[85px]">
          <div className="relative w-fit h-[85px] flex justify-between">
            {steps.map((step, index) => (
              <Fragment key={`step-${index}`}>
                {index > 0 && (
                  <img
                    className="w-[52px] lg:w-[119px] h-px object-cover mt-5"
                    alt="Line"
                    src="/icons/line-10.svg"
                  />
                )}
                <div className="flex w-max flex-col items-center gap-4">
                  <div className="relative w-9 aspect-square">
                    <div
                      className={`absolute w-9 aspect-square ${
                        step.active ? "bg-[#fcff00]" : "bg-[#b5b5b5]"
                      } rotate-45`}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [font-family:'Noto_Sans_JP',Helvetica] font-medium text-[#000000] text-xl whitespace-nowrap">
                      {step.number}
                    </div>
                  </div>
                  <div className="relative [font-family:'Noto_Sans_JP',Helvetica] font-medium text-white lg:text-xl w-max">
                    {step.label}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {currentStep === 1 && (<Card className="w-full bg-[#00000080] border border-solid border-[#ffffff] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] rounded-none">
        <CardContent className="px-[11.44px] py-[2.8] lg:p-[50px] w-full">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[50px] w-full">
            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-[219px_1fr] gap-5 lg:gap-x-[113px] lg:gap-y-10">
              {formFields.map((field, index) => (
                <Fragment key={`field-${index}`}>
                  <div className="flex items-center gap-[15px]">
                    <div className="[font-family:'Noto_Sans_JP',Helvetica] font-medium text-white lg:text-xl whitespace-nowrap">
                      {field.label}
                    </div>
                    {field.required ? (
                      <Badge className="px-[15px] py-[5px] bg-[#d70000] rounded-none hover:bg-[#d70000]">
                        <span className="[font-family:'Noto_Sans_JP',Helvetica] font-medium text-white text-[15px] lg:text-[17px] whitespace-nowrap">
                          必須
                        </span>
                      </Badge>
                    ) : (
                      <Badge className="px-[15px] py-[5px] bg-[#818181] rounded-none hover:bg-[#818181]">
                        <span className="[font-family:'Noto_Sans_JP',Helvetica] font-medium text-white text-[15px] lg:text-[17px] whitespace-nowrap">
                          任意
                        </span>
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2 text-white">
                    {field.type === "date" ? (
                      <div className="w-full flex items-end gap-5">
                        <div className="max-md:flex-1 inline-flex items-end gap-1.5">
                          <Controller
                            name="birthYear"
                            control={form.control}
                            render={({field: controllerField}) => (
                              <Select onValueChange={controllerField.onChange} value={controllerField.value}>
                                <SelectTrigger className={cn("w-full max-w-[114px] lg:min-w-[114px] h-[50px] bg-[#ffffff1a] border border-solid border-[#ffffff] rounded-none text-[17px]", {"bg-[#FF4B4B] bg-opacity-20 border-[#FF4B4B] !text-[#FF4B4B]": form.formState.errors["birthYear" as keyof FormData], "text-[#bdbdbd80]": !form.getValues("birthYear")})}>
                                  <SelectValue
                                    placeholder="1990"
                                    className="[font-family:'Noto_Sans_JP',Helvetica] font-normal text-md lg:text-[17px]"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from(
                                    {length: 100},
                                    (_, i) => 2024 - i,
                                  ).map((year) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                    >
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <span className={cn("[font-family:'Noto_Sans_JP',Helvetica] font-medium text-white lg:text-[17px]", {"!text-[#FF4B4B]": form.formState.errors["birthYear"]})}>
                            年
                          </span>
                        </div>

                        <div className="max-md:flex-1 inline-flex items-end gap-1.5">
                          <Controller
                            name="birthMonth"
                            control={form.control}
                            render={({field: controllerField}) => (
                              <Select onValueChange={controllerField.onChange} value={controllerField.value}>
                                <SelectTrigger className={cn("w-full max-w-[114px] lg:min-w-[114px] h-[50px] bg-[#ffffff1a] border border-solid border-[#ffffff] rounded-none  text-[17px]", {"bg-[#FF4B4B] bg-opacity-20 border-[#FF4B4B] !text-[#FF4B4B]": form.formState.errors["birthMonth" as keyof FormData], "text-[#bdbdbd80]": !form.getValues("birthMonth")})}>
                                  <SelectValue
                                    placeholder="1"
                                    className="[font-family:'Noto_Sans_JP',Helvetica] font-normal text-md lg:text-[17px]"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from(
                                    {length: 12},
                                    (_, i) => i + 1,
                                  ).map((month) => (
                                    <SelectItem
                                      key={month}
                                      value={month.toString()}
                                    >
                                      {month}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <span className={cn("[font-family:'Noto_Sans_JP',Helvetica] font-medium text-white lg:text-[17px]", {"!text-[#FF4B4B]": form.formState.errors["birthMonth"]})}>
                            月
                          </span>
                        </div>

                        <div className="max-md:flex-1 inline-flex items-end gap-1.5">
                          <Controller
                            name="birthDay"
                            control={form.control}
                            render={({field: controllerField}) => (
                              <Select onValueChange={controllerField.onChange} value={controllerField.value}>
                                <SelectTrigger className={cn("w-full max-w-[114px] lg:min-w-[114px] h-[50px] bg-[#ffffff1a] border border-solid border-[#ffffff] rounded-none  text-[17px]", {"bg-[#FF4B4B] bg-opacity-20 border-[#FF4B4B] !text-[#FF4B4B]": form.formState.errors["birthDay" as keyof FormData], "text-[#bdbdbd80]": !form.getValues("birthDay")})}>
                                  <SelectValue
                                    placeholder="1"
                                    className="[font-family:'Noto_Sans_JP',Helvetica] font-normal text-md lg:text-[17px]"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from(
                                    {length: 31},
                                    (_, i) => i + 1,
                                  ).map((day) => (
                                    <SelectItem key={day} value={day.toString()}>
                                      {day}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <span className={cn("[font-family:'Noto_Sans_JP',Helvetica] font-medium text-white lg:text-[17px]", {"text-[#FF4B4B]": form.formState.errors["birthDay"]})}>
                            日
                          </span>
                        </div>
                      </div>
                    ) : field.type === "select" ? (
                      <Controller
                        name={field.name as keyof FormData}
                        control={form.control}
                        render={({field: controllerField}) => (
                          <Select onValueChange={controllerField.onChange} value={controllerField.value as string}>
                            <SelectTrigger className={cn("w-full max-w-[250px] h-[50px] bg-[#ffffff1a] border border-solid border-[#ffffff] rounded-none text-md lg:text-[17px]", {"bg-[#FF4B4B] bg-opacity-20 border-[#FF4B4B] !text-[#FF4B4B]": form.formState.errors[field.name as keyof FormData], "text-[#bdbdbd80]": !form.getValues(field.name as keyof FormData)})}>
                              <SelectValue
                                placeholder={field.placeholder}
                                className="[font-family:'Noto_Sans_JP',Helvetica] font-normal"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {prefectures.map((prefecture) => (
                                <SelectItem key={prefecture} value={prefecture}>
                                  {prefecture}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    ) : field.type === "textarea" ? (
                      <Textarea
                        {...form.register(field.name as keyof FormData)}
                        className="w-full max-w-[768px] h-[123px] bg-[#ffffff1a] border border-solid border-[#ffffff] rounded-none p-[15px] [font-family:'Noto_Sans_JP',Helvetica] font-normal !text-md lg:!text-[17px]"
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <Input
                        {...form.register(field.name as keyof FormData)}
                        className={cn("w-full max-w-[768px] h-[50px] bg-[#ffffff1a] border border-solid border-[#ffffff] rounded-none p-[15px] [font-family:'Noto_Sans_JP',Helvetica] font-normal !text-md lg:!text-[17px]", {"bg-[#FF4B4B] bg-opacity-20 border-[#FF4B4B] placeholder:text-[#FF4B4B]": form.formState.errors[field.name as keyof FormData]})}
                        placeholder={field.placeholder}
                      />
                    )}
                    {field.name !== 'birth' && form.formState.errors[field.name as keyof FormData] && (
                      <p className="text-[#FF4B4B] text-xs lg:text-sm inline-flex gap-2.5 items-center mt-1">
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59553 0.621296C8.80119 0.738813 8.97162 0.909251 9.08914 1.11491L14.7625 11.0433C15.126 11.6794 14.905 12.4897 14.2689 12.8532C14.0684 12.9677 13.8416 13.028 13.6107 13.028H2.26403C1.53141 13.028 0.9375 12.434 0.9375 11.7014C0.9375 11.4706 0.997745 11.2437 1.11228 11.0433L6.78563 1.11491C7.14912 0.478809 7.95944 0.257812 8.59553 0.621296ZM7.90181 8.90295C7.42805 8.90295 7.07272 9.25315 7.07272 9.72009C7.07272 10.2083 7.41728 10.5585 7.90181 10.5585C8.37557 10.5585 8.73089 10.2083 8.73089 9.73071C8.73089 9.25315 8.37557 8.90295 7.90181 8.90295ZM8.56508 3.76263H7.23854V7.74223H8.56508V3.76263Z" fill="#FF4B4B"/>
                        </svg>
                        {form.formState.errors[field.name as keyof FormData]?.message}
                      </p>
                    )}
                    {field.name === 'birth' && ['birthYear', 'birthMonth', 'birthDay'].some(name => form.formState.errors[name as keyof FormData]) && (
                      <p className="text-[#FF4B4B] text-xs lg:text-sm inline-flex gap-2.5 items-center mt-1">
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59553 0.621296C8.80119 0.738813 8.97162 0.909251 9.08914 1.11491L14.7625 11.0433C15.126 11.6794 14.905 12.4897 14.2689 12.8532C14.0684 12.9677 13.8416 13.028 13.6107 13.028H2.26403C1.53141 13.028 0.9375 12.434 0.9375 11.7014C0.9375 11.4706 0.997745 11.2437 1.11228 11.0433L6.78563 1.11491C7.14912 0.478809 7.95944 0.257812 8.59553 0.621296ZM7.90181 8.90295C7.42805 8.90295 7.07272 9.25315 7.07272 9.72009C7.07272 10.2083 7.41728 10.5585 7.90181 10.5585C8.37557 10.5585 8.73089 10.2083 8.73089 9.73071C8.73089 9.25315 8.37557 8.90295 7.90181 8.90295ZM8.56508 3.76263H7.23854V7.74223H8.56508V3.76263Z" fill="#FF4B4B"/>
                        </svg>
                        生年月日を選択してください。
                      </p>
                    )}
                  </div>
                </Fragment>
              ))}
            </div>

            {/* Privacy Policy */}
            <div className="flex flex-col items-center gap-5">
              <div className="relative w-full max-w-[967px] h-[94px] border border-solid border-[#b5b5b5]">
                <div className="h-full flex flex-col gap-2 overflow-y-auto p-[15px] pr-10">
                  <p className="text-xs leading-[1.75] text-white">
                    株式会社エグゼクティブプロテクション（以下「当社」）は、個人情報のみならず、法人その他の団体のお客様に関する情報についても、等しく厳格に保護いたします。 当社は、個人情報の収集に当たり、情報に対し収集目的をできる限り特定し適切に収集し、収集した個人情報は、あらかじめ特定した目的にのみ限定して取り扱います。 当社は、個人情報の取り扱いにおいて個人情報の保護に関する法令およびその他の規範を遵守いたします。 当社は、個人情報への不正アクセス、個人情報の紛失、破壊、改ざんおよび、漏えいなどのトラブルを予防ならびに是正するための必要かつ適切な安全対策を実施いたします。 当社の個人情報の取り扱いや開示等に関するお問い合わせ、苦情については、右上「お問い合わせ」フォームにてご連絡ください。なお、直接ご来社いただいてのお申し出はお受けいたしかねますので、ご了承ください。
                  </p>
                  <p className="text-xs leading-[1.75] text-white">
                    平成21年4月13日 <br/>
                    株式会社エグゼクティブプロテクション
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2.5">
                  <Controller
                    name="privacyPolicy"
                    control={form.control}
                    render={({field: controllerField}) => (
                      <Checkbox
                        id="privacy-policy"
                        checked={controllerField.value}
                        onCheckedChange={controllerField.onChange}
                        className={cn("w-4 h-4 lg:w-[19px] lg:h-[19px] rounded-sm border-white data-[state=checked]:bg-white data-[state=checked]:text-black dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white", {"border-[#FF4B4B]": form.formState.errors.privacyPolicy})}
                      />
                    )}
                  />
                  <label
                    htmlFor="privacy-policy"
                    className="[font-family:'Noto_Sans_JP',Helvetica] font-normal text-white lg:text-xl leading-[35px]"
                  >
                    個人情報保護方針に同意する
                  </label>
                </div>
                {form.formState.errors.privacyPolicy && (
                  <p className="text-[#FF4B4B] text-xs lg:text-sm inline-flex gap-2.5 items-center mt-1">
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59553 0.621296C8.80119 0.738813 8.97162 0.909251 9.08914 1.11491L14.7625 11.0433C15.126 11.6794 14.905 12.4897 14.2689 12.8532C14.0684 12.9677 13.8416 13.028 13.6107 13.028H2.26403C1.53141 13.028 0.9375 12.434 0.9375 11.7014C0.9375 11.4706 0.997745 11.2437 1.11228 11.0433L6.78563 1.11491C7.14912 0.478809 7.95944 0.257812 8.59553 0.621296ZM7.90181 8.90295C7.42805 8.90295 7.07272 9.25315 7.07272 9.72009C7.07272 10.2083 7.41728 10.5585 7.90181 10.5585C8.37557 10.5585 8.73089 10.2083 8.73089 9.73071C8.73089 9.25315 8.37557 8.90295 7.90181 8.90295ZM8.56508 3.76263H7.23854V7.74223H8.56508V3.76263Z" fill="#FF4B4B"/>
                    </svg>
                    {form.formState.errors.privacyPolicy.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={cn("w-full py-5 rounded-[3px] shine hover:bg-sublight-gray/90 disabled:opacity-50 disabled:cursor-not-allowed", {
                "bg-[linear-gradient(270deg,rgba(252,255,0,1)_0%,rgba(254,255,135,1)_50%,rgba(252,255,0,1)_100%)] hover:bg-[linear-gradient(270deg,rgba(252,255,0,0.9)_0%,rgba(254,255,135,0.9)_50%,rgba(252,255,0,0.9)_100%)]": isDirty && isValid,
                "bg-sublight-gray": !isDirty || !isValid,
              })}
              disabled={form.formState.isSubmitting}
            >
  <span className="[font-family:'Noto_Sans_JP',Helvetica] font-bold text-subblack text-2xl lg:text-3xl leading-[35px]">
    {form.formState.isSubmitting ? "送信中..." : "内容を確認する"}
  </span>
            </button>

          </form>
        </CardContent>
      </Card>)}

      {currentStep === 2 && formData && (
        <FormEntryConfirm
          formData={formData}
          onConfirm={handleConfirm}
          onEdit={handleEdit}
        />)}

      {currentStep === 3 && (<FormEntryResult
        success={submitResult === 'success'}
        onReset={handleReset}
      />)}

    </div>
  );
}