import Header from "./header.tsx";
import Footer from "./footer.tsx";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return <>
    <div id="smooth-wrapper" className="bg-white w-full min-h-screen overflow-hidden">
      <div id="smooth-content" className="bg-white overflow-hidden w-full relative">
        <Header />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
    <img
      className="fixed bottom-10 right-0 w-[50px] md:w-[83px] aspect-square z-50"
      alt="back to top"
      src="/images/back-to-top.png"
      onClick={handleBackToTop}
    />
  </>
}