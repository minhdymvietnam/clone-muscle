const imageUrls = {
  banner: "images/top-banner.png",
  bannerSP: "images/top-banner-sp.png",
}

export const Banner = () => {
  return <div className="lg:self-stretch w-full lg:h-[100lvh]">
    <img src={imageUrls.banner} className="hidden lg:block w-full h-full object-cover" alt="Artboard" />
    <img src={imageUrls.bannerSP} className="lg:hidden w-full h-full object-contain" alt="Artboard" />
  </div>
}