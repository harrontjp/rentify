"use client";
import { CreateBooking } from "@/app/actions";
import { useSharedState } from "../app/StateProvider";
import { Vehicle } from "./ProductListing";
import Image from "next/image";
import { startTransition, useActionState, useEffect } from "react";
import { formatDateToYYYYMMDD } from "@/app/lib/utils";

export default function PaymentDetails({ vehicle }: { vehicle: Vehicle }) {
  const { sharedState, setSharedState } = useSharedState();
  const [state, createBooking] = useActionState(CreateBooking, null);
  useEffect(() => {
    console.log(state);

    if (state == null || state._t === "error" || sharedState.bookingId != null)
      return;
    setSharedState({
      ...sharedState,
      isPaymentPageOpen: true,
      bookingId: state.response.bookingId,
    });
  }, [state, sharedState, setSharedState]);
  const { bookingDates } = sharedState.filter;
  if (bookingDates.to == null) return <></>;
  const numOfDays = getDaysBetweenDates(bookingDates.from, bookingDates.to);

  return (
    <>
      <div className="min-w-[324] flex flex-col gap-3 p-8 border-1 border-[#C8C8C8] rounded-3xl h-fit">
        <div className="font-bold text-lg">Payment details</div>
        <div className="flex justify-between w-full">
          Subtotal
          <div>${(vehicle.pricePerDay * numOfDays).toFixed(2)}</div>
        </div>
        <div className="flex justify-between w-full">
          {"GST(9%)"}
          <div>${(vehicle.pricePerDay * numOfDays * 0.09).toFixed(2)}</div>
        </div>
        <div className="flex justify-between w-full text-lg font-bold">
          {"Total"}
          <div>${(vehicle.pricePerDay * numOfDays * 1.09).toFixed(2)}</div>
        </div>
        <Image
          alt="payment-methods"
          src="/payment-methods.svg"
          width={100}
          height={100}
          style={{ width: "100%" }}
        />
        <div
          className="bg-[#004F8A] text-white text-lg w-full flex justify-center items-center rounded-xl"
          style={{ height: "44px", cursor: "pointer" }}
          onClick={() => {
            startTransition(() => {
              console.log(sharedState.userId);
              if (
                sharedState.userId == null ||
                sharedState.filter.bookingDates.to == null
              )
                return;

              createBooking({
                userId: sharedState.userId,
                productId: vehicle.id,
                bookingStartDate: formatDateToYYYYMMDD(
                  sharedState.filter.bookingDates.from
                ),
                bookingEndDate: formatDateToYYYYMMDD(
                  sharedState.filter.bookingDates.to
                ),
              });
            });
          }}
        >
          Next Step
        </div>
      </div>
    </>
  );
}

function getDaysBetweenDates(date1: Date, date2: Date): number {
  // Convert both dates to UTC to avoid timezone issues
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  // Calculate the difference in milliseconds
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.abs(utc2 - utc1);

  // Return the difference in days
  return Math.floor(diff / msPerDay);
}
