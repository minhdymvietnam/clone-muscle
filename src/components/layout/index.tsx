import Header from "./header.tsx";
import Footer from "./footer.tsx";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <>
    <div id="smooth-wrapper" className="w-full min-h-screen overflow-hidden">
      <div id="smooth-content" className="overflow-hidden w-full relative">
        <Header />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  </>
}