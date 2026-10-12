import { Hero } from "@/components/home/Hero";
import { SpaceNav } from "@/components/home/SpaceNav";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductCatalog } from "@/components/home/ProductCatalog";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Philosophy } from "@/components/home/Philosophy";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Contact } from "@/components/home/Contact";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SpaceNav />
      <ProductCatalog />
      <FeaturedCollections />
      <Philosophy />
      <InstagramGallery />
      <Contact />
      <Newsletter />
    </>
  );
}
