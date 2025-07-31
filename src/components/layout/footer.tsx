const logoUrl = "images/logo.png"

export default function Footer() {
  return <footer className="flex max-md:flex-col max-md:gap-[26px] items-center justify-between bg-subblack px-[30px] py-[15px]">
    <a href="https://ex-pr.com/" target="_blank" rel="noopener noreferrer cursor-pointer" className="flex items-center gap-[14px]">
      <div className="w-fit">
        <img
          src={logoUrl}
          className="w-auto h-[35px] object-contain"
          alt="Img fv logo"
        />
      </div>
      <div className="[font-family:'Inter',Helvetica] font-bold text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
        企業サイト
      </div>
    </a>

    <div className="w-fit max-md:text-center [font-family:'Noto_Sans_JP',Helvetica] font-bold text-white text-[11px] md:text-[17px] tracking-[0] leading-[1.75] md:leading-[29.8px] whitespace-nowrap">
      COPYRIGHT © EXECUTIVE PROTECTION INC. <br className="block md:hidden" />
      ALL RIGHTS RESERVED.
    </div>
  </footer>
}