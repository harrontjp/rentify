import { Badge } from "@/components/ui/badge";
import { Booking } from "../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { format } from "date-fns";
const mockBookings: Booking[] = [
  {
    id: "1",
    carId: "car1",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-05"),
    totalPrice: 400,
    status: "confirmed",
    includeInsurance: true,
    customerName: "John Doe",
  },
  {
    id: "2",
    carId: "car2",
    startDate: new Date("2025-06-10"),
    endDate: new Date("2025-06-15"),
    totalPrice: 750,
    status: "pending",
    includeInsurance: false,
    customerName: "John Doe",
  },
];
const BookingsPage = () => {
  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>My Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Insurance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      {format(booking.startDate, "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(booking.endDate, "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>${booking.totalPrice}</TableCell>
                    <TableCell>
                      {booking.includeInsurance ? (
                        <Badge variant="default">Yes</Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BookingsPage;

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-500 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Rentify</h3>
            <p className="max-w-xs">
              Premium car rental service providing quality vehicles for your
              travel needs.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li> Home</li>
              <li> Cars</li>
              <li> About Us</li>
              <li> Contact</li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium text-gray-800">
              Car Categories
            </h3>
            <ul className="space-y-2">
              <li> MVPs</li>
              <li> SUVs</li>
              <li> Saloon</li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Contact Us</h3>
            <address className="not-italic">
              <p>123 Main Street</p>
              <p>Singapore 512332</p>
              <p className="mt-3">info@rentify.com</p>
              <p>(65) 1234-4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Rentify. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
