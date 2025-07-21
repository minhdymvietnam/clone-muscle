import { useEffect, useState } from "react";

const CTAButton = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const entrySection = document.getElementById("entry");
    if (!entrySection) return;

    const handleScroll = () => {
      const rect = entrySection.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4">
      <button
        onClick={() => {
          window.location.href = "#entry";
        }}
        className="[font-family:'Teko',Helvetica] font-medium text-black text-4xl leading-none shine bg-[#FCFF00] w-full pb-1 pt-3 rounded-sm flex items-center justify-center"
      >
        ENTRY
      </button>
    </div>
  );
};

export default CTAButton;