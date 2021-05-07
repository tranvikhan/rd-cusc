import TopNavigation from "../Navigation/top_navigation";
import Footer from "./footer";
import { useRouter } from "next/router";

export default function MainLayout({ children }) {
  const router = useRouter();
  console.log(router.locales);
  return (
    <div>
      <TopNavigation />
      {children}
      <Footer />
    </div>
  );
}
