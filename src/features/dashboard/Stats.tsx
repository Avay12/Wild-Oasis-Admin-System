import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { Booking } from "./DashboardLayout";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface Prop {
  bookings: Array<BookingFieldStat>;
  confirmedStays: Array<Booking>;
  numDays: number;
  cabinCount: number;
}

export interface BookingFieldStat {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: Prop) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = Number(bookings.reduce((acc, cur) => acc + cur.totalPrice, 0));
  // 3.
  const checkins = confirmedStays.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  // num checked in nights / all available nights
  //(num days * num cabins)

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
