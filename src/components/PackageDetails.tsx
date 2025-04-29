"use client";
import { useState } from "react";
import { useSharedState } from "../app/StateProvider";
import Image from "next/image";

export default function PackageDetails() {
  const { sharedState } = useSharedState();
  const { bookingDates } = sharedState.filter;
  const [paymentOption, setPaymentOption] = useState("online");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-8">
        <div className="flex gap-2 text-sm justify-center items-center font-bold">
          Fuel description
          <Image alt="info-icon" src="/info-icon.svg" width={16} height={16} />
        </div>
        <div className="px-3 py-2 border-1 border-[#004F8A] rounded-lg text-[#004F8A]">
          Full to full
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex gap-2 text-sm justify-center items-center font-bold">
          Mileage policy
          <Image alt="info-icon" src="/info-icon.svg" width={16} height={16} />
        </div>
        <div className="px-3 py-2 border-1 border-[#004F8A] rounded-lg text-[#004F8A]">
          Unlimited mileage
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex gap-2 text-sm justify-center items-center font-bold">
          Payment option
          <Image alt="info-icon" src="/info-icon.svg" width={16} height={16} />
        </div>
        <div className="flex gap-3">
          <div
            className={
              "px-3 py-2 border-1 rounded-lg " + paymentOption === "online"
                ? "border-[#004F8A]"
                : "border-[#E6E6E6]"
            }
            onClick={() => setPaymentOption("online")}
          >
            Pay online
          </div>
          <div
            className={
              "px-3 py-2 border-1 rounded-lg " + paymentOption === "pickup"
                ? "border-[#004F8A]"
                : "border-[#E6E6E6]"
            }
            onClick={() => setPaymentOption("pickup")}
          >
            Pay at pick-up
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex gap-2 text-sm justify-center items-center font-bold">
          Duration
          <Image alt="info-icon" src="/info-icon.svg" width={16} height={16} />
        </div>
        <div className="flex gap-3">
          <div
            className={
              "px-3 py-2 border-1 border-[#E6E6E6] rounded-lg" +
              " text-[#004F8A]"
            }
          >
            {bookingDates.from.toLocaleDateString()}
          </div>
          <div className="px-3 py-2 border-1 border-[#E6E6E6] rounded-lg ">
            {bookingDates.to?.toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
