import ProductListing, { DateBar } from "@/components/ProductListing";

import Image from "next/image";

export default function Home() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          margin: "20px",
          display: "flex",
          justifySelf: "center",
          justifyContent: "center",
          maxWidth: "1024px",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "93dvw",
            maxWidth: "1024px",
            height: "419px",
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/banner.png"
            alt="banner"
            fill
            objectFit="cover"
            loading="eager"
          />
        </div>

        <DateBar />
        <div className="flex gap-2">
          <ProductListing />
        </div>
      </div>
    </div>
  );
}
