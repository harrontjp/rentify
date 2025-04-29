import { Vehicle } from "@/components/ProductListing";
import { getProduct } from "../actions";
import Image from "next/image";
import { VehicleType } from "@/components/FilterBox";
import PackageDetails from "@/components/PackageDetails";
import PaymentDetails from "@/components/PaymentDetails";
// import { verifySession } from "../lib/dal";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getProduct(id);
  if (res.error != null) return <></>;
  const vehicle: Vehicle = res;
  // const session = await verifySession();
  // const userId: number | null =
  //   session.userId != null ? (session.userId as number) : null;
  // if (userId) {
  //   await createRecoView(userId, id);
  // }

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
          width: "1024px",
          height: "419px",
          flexDirection: "column",
          borderRadius: "16px",
        }}
      >
        <Image
          src={`/car/car${vehicle.id}.jpg`}
          alt="banner"
          width={100}
          height={100}
          objectFit="cover"
          style={{ borderRadius: "16px", width: "100%", height: "auto" }}
        />
      </div>
      <div
        className="flex flex-col gap-4"
        style={{
          display: "flex",
          justifySelf: "center",
          maxWidth: "1024px",
          width: "100%",
          padding: "20px",
          paddingTop: 0,
        }}
      >
        <CarInfo vehicle={vehicle} />
        <div className="flex gap-5">
          <PackageInfo vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
}

function PackageInfo({ vehicle }: { vehicle: Vehicle }) {
  return (
    <>
      <div
        className="p-8 flex flex-col gap-8 min-w-[600] w-full "
        style={{ border: "1px solid #C8C8C8", borderRadius: "24px" }}
      >
        <div className="flex gap-4 text-2xl font-bold">
          <Image alt="marker" src="/marker.svg" width={6} height={24} />
          Package selection
        </div>
        <PackageSelectionDetails pricePerDay={vehicle.pricePerDay} />
        <PackageDetails />
      </div>
      <PaymentDetails vehicle={vehicle} />
    </>
  );
}

function PackageSelectionDetails({ pricePerDay }: { pricePerDay: number }) {
  return (
    <div className="flex flex-col bg-[#F2F3FA] border border-[#004F8A] rounded-[16px] p-5 gap-5">
      <div className=" flex w-full justify-between items-center">
        <div className="flex gap-2 text-[#004F8A] font-bold text-base">
          Basic{" "}
          <Image
            src="/protection-grade.svg"
            alt="Protection Grade"
            height={24}
            width={76}
          />
        </div>
        <div className="flex gap-2 text-xl font-bold items-center">
          ${pricePerDay}{" "}
          <span className="text-[#863E3E] text-base font-bold">/day</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex w-full justify-between ">
          <div className="flex gap-1.5 text-sm">
            <Image
              src="/shield.svg"
              alt="sheild"
              width={20}
              height={20}
              style={{ height: "20px" }}
            />
            <div>
              Collision Damage Waiver
              <div className="text-xs text-[#757575]">
                Excess: S$ 3,000.00; inclusive of tax;
              </div>
            </div>
          </div>
          <div className="flex gap-1.5 text-sm">
            <Image
              src="/shield.svg"
              alt="sheild"
              width={20}
              height={20}
              style={{ height: "20px" }}
            />
            <div>
              Theft Protection
              <div className="text-xs text-[#757575]">
                Excess: S$ 3,000.00; inclusive of tax;
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between ">
          <div className="flex gap-1.5 text-sm">
            <Image
              src="/shield.svg"
              alt="sheild"
              width={20}
              height={20}
              style={{ height: "20px" }}
            />
            <div>Third-Party Liability</div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end text-sm text-[#2073F9]">
        See details
        <Image alt="left arrow" src="/left-arrow.svg" width={16} height={16} />
      </div>
    </div>
  );
}

function CarInfo({ vehicle }: { vehicle: Vehicle }) {
  const desc = `${vehicle.vehicleType} • ${vehicle.transmissionType} • ${vehicle.fuelType}`;

  return (
    <div className="flex gap-2 text-3xl font-bold flex-col">
      {vehicle.vehicleModel}
      <div className="text-2xl font-bold" style={{ color: "#004F8A" }}>
        {desc}
      </div>
      <div
        className="flex gap-2 pt-1.5 pb-1.5 text-sm"
        style={{ color: "#333333" }}
      >
        <Image alt="icon" src={"/seat.svg"} width={16} height={16} />
        {getSeats(vehicle.vehicleType)}
        <Image alt="icon" src={"/suitcase.svg"} width={16} height={16} />
        {getSuitcase(vehicle.vehicleType)}
        <Image alt="icon" src={"/snow.svg"} width={16} height={16} />
        A/C
      </div>
    </div>
  );
}

function getSeats(type: VehicleType) {
  switch (type) {
    case "MPV":
      return "7 Seats";
    case "Saloon":
    case "SUV":
      return "5 Seats";
  }
}
function getSuitcase(type: VehicleType) {
  switch (type) {
    case "MPV":
      return "4 suitcase(s)";
    case "Saloon":
    case "SUV":
      return "2 suitcase(s)";
  }
}
