export type Booking = {
  id: string;
  carId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  includeInsurance: boolean;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
};
