import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { Booking } from "../bookings/BookingDetail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, status } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: string;
      breakfast: Object;
    }) =>
      updateBooking(+bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });
  const isCheckingIn = status === "pending" ? true : false;
  return { checkin, isCheckingIn };
}
