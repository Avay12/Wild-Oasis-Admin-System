import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { Booking } from "../bookings/BookingDetail";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, status } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(+bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries();
    },
    onError: () => toast.error("There was an error while checking out"),
  });
  const isCheckingOut = status === "pending" ? true : false;
  return { checkout, isCheckingOut };
}
