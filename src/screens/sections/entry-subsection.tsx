import FormEntry from "@/components/form-entry";

const EntrySubsection = (): JSX.Element => {

  return (
    <section className="w-full bg-black relative">
      <div className="bg-[url(/images/entry_bg.png)] bg-[100%_100%] w-full h-full" style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div className="flex flex-col w-full max-w-[1200px] px-4 py-[70px] lg:px-0 lg:py-[120px] mx-auto items-center gap-[60px] relative">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-5 relative">
            <div className="inline-flex items-center">
              <div className="custom-clip-path-both-side font-bold px-10 py-[3px] bg-mainyellow-neon text-black text-[17px] lg:text-xl whitespace-nowrap [font-family:'Noto_Sans_JP',Helvetica]">
                採用エントリー
              </div>
            </div>

            <h2 className="font-semibold text-white text-[67px] lg:text-[150px] text-center tracking-[0] lg:leading-[150px] whitespace-nowrap [font-family:'Teko',Helvetica]">
              ENTRY
            </h2>
          </div>

          {/* Form Section */}
          <FormEntry />
        </div>
      </div>
    </section>
  );
};

export default EntrySubsection;
