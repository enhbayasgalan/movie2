import Footer from "@/component/footer";
import Header from "@/component/header";
import { Upcoming } from "@/component/upcoming";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <Upcoming />
      <Footer />
    </div>
  );
}
