"use server";

import { Filter } from "@/components/FilterBox";
import { createSession } from "./lib/sessions";

export async function FilterProducts(prevState: unknown, filtering: Filter) {
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
  }
  try {
    const res = await fetch(
      `http://${process.env.PRODUCT_URL}:${
        process.env.PRODUCT_PORT
      }/products?${params.toString()}`,
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
    return {
      _t: "success",
      res: json,
    };
  } catch (error) {
    console.error(`Response error: ${error}`);
    return {
      _t: "error",
      error: `Response error: ${error}`,
    };
  }
}

export async function getProduct(id: string) {
  const res = await fetch(
    `http://${process.env.PRODUCT_URL}:${process.env.PRODUCT_PORT}/products/${id}`,
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
  totalAmount: number;
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
  const url = `http://${process.env.BOOKING_URL}:${process.env.BOOKING_PORT}/api/bookings`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
      console.error(`Response error: ${res.status}`);
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
  } catch (error) {
    console.log(`Response error: ${error}`);
    return {
      _t: "error",
      error: `Response error: ${error}`,
    };
  }
}

export async function getBooking(userId: number) {
  const url = `http://${process.env.BOOKING_URL}:${process.env.BOOKING_PORT}/api/bookings/user/${userId}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error(`Response error: ${res.status}`);
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
  } catch (error) {
    console.error(`Response error: ${error}`);
    return {
      _t: "error",
      error: `Response error: ${error}`,
    };
  }
}

export type PaymentForm = {
  name: string;
  expiry: string;
  cardNo: string;
  ccv: number;
  bookingId: string;
};

export type PaymentPayload = {
  _t: string;
  res?: string;
  error?: string;
};

export async function CreatePayment(
  prevState: PaymentPayload,
  formData: PaymentForm
) {
  const params = {
    bookingId: formData.bookingId,

    paymentMethod: "CARD_VISA",

    paymentStatus: "SUCCESS",
  };

  try {
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

    if (!res.ok) {
      console.log(`Response error: ${res.status}`);
      return {
        _t: "error",
        error: `Response error: ${res.status}`,
      };
    }

    return {
      _t: "success",
      res: "Ok",
    };
  } catch (error) {
    console.error(error);
    return {
      _t: "error",
      error: `Response error: ${error}`,
    };
  }
}

export async function getRecommendation(userId: number) {
  try {
    const res = await fetch(
      `http://${process.env.REC_URL}:${process.env.REC_PORT}/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.error(`Response error: ${res.status}`);
      return {
        _t: "error",
        error: `Response error: ${res.status}`,
      };
    }
    const result = await res.json();
    return {
      _t: "success",
      res: result,
    };
  } catch (error) {
    console.error(error);
    return {
      _t: "error",
      error: `Response error: ${error}`,
    };
  }
}

export async function createRecoView(userId: number, productId: string) {
  try {
    const res = await fetch(
      `http://${process.env.REC_URL}:${process.env.REC_PORT}/view/${userId}/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.error(`Response error: ${res.status}`);
      return {
        _t: "error",
        error: `Response error: ${res.ok}`,
      };
    }
    const result = await res.json();
    return {
      _t: "success",
      res: result,
    };
  } catch (error) {
    console.error(`Response error: ${error}`);
    return {
      _t: "error",
      error: `Response error: ${error}`,
    };
  }
}

export async function createRecoBook(userId: number, productId: number) {
  try {
    const res = await fetch(
      `http://${process.env.REC_URL}:${process.env.REC_PORT}/book/${userId}/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return {
        _t: "error",
        error: `Response error: ${res.ok}`,
      };
    }
    const result = await res.json();
    return {
      _t: "success",
      res: result,
    };
  } catch (error) {
    console.error(error);
    return {
      _t: "error",
      error: `Response error: ${error}`,
    };
  }
}
