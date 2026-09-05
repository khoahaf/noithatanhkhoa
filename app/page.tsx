import { Hero } from "@/components/home/Hero";
import { SpaceNav } from "@/components/home/SpaceNav";
import { NewArrivals } from "@/components/home/NewArrivals";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Philosophy } from "@/components/home/Philosophy";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Contact } from "@/components/home/Contact";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <SpaceNav />
      <NewArrivals />
      <FeaturedCollections />
      <Philosophy />
      <InstagramGallery />
      <Contact />
      <Newsletter />
    </>
  );
}
