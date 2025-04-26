"use server";

import { Filter } from "@/components/FilterBox";
import { createSession } from "./lib/sessions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function FilterProducts(prevState: any, filtering: Filter) {
  // console.log(filtering);
  const params = new URLSearchParams();
  if (filtering.vehicleType)
    params.append("vehicleType", filtering.vehicleType.join(","));
  if (filtering.transmission)
    params.append("transmissionType", filtering.transmission.join(","));
  if (filtering.priceRange.min != null)
    params.append("priceRangeLow", filtering.priceRange.min.toString());
  if (filtering.priceRange.max != null)
    params.append("priceRangeHigh", filtering.priceRange.max.toString());
  if (filtering.bookingDates.to != null) {
    params.append("dateStart", filtering.bookingDates.from.toISOString());
    params.append("dateEnd", filtering.bookingDates.to.toISOString());
    console.log("here");
  }
  const res = await fetch(
    `http://localhost:3000/products?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return {
      error: `Response error: ${res.status}`,
    };
  }

  const json = await res.json();
  return json;
}

export async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return {
      error: `Response error: ${res.status}`,
    };
  }
  const json = await res.json();
  return json;
}

export async function CreateSession() {
  await createSession(1);
  return {
    result: "Ok",
  };
}

type BookingData = {
  userId: number;
  productId: number;
  bookingStartDate: string;
  bookingEndDate: string;
};

export type BookingResponse = {
  bookingId: string;
  status: string;
  totalAmount: number;
};

export async function CreateBooking(
  prevState: unknown,
  bookingData: BookingData
) {
  const url = `http://${process.env.BOOKING_URL}:${process.env.BOOKING_PORT}/bookings`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) {
    return {
      _t: "error",
      error: `Response error: ${res.status}`,
    };
  }
  const result = await res.json();
  return {
    _t: "success",
    response: result,
  };
}

export type PaymentForm = {
  name: string;
  expiry: string;
  cardNo: string;
  ccv: number;
  bookingId: string;
};

export type PaymentPayload = {
  result: string;
};

export async function CreatePayment(
  prevState: PaymentPayload,
  formData: PaymentForm
) {
  const params = {
    bookingId: formData.bookingId,

    paymentMethod: "CARD_VISA",

    paymentStatus: "PENDING",
  };

  const res = await fetch(
    `http://${process.env.PAYMENT_URL}:${process.env.PAYMENT_PORT}/api/payments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );

  console.log(await res.json());
  return {
    result: "Ok",
  };
}
