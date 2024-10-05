import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

interface BookingFieldStat {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}

export interface Booking {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  status: any;
  observations: string;
  isPaid: boolean;
  guests: { fullName: string };
  cabins: { name: string; email: string };
}

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();

  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings as [BookingFieldStat]}
        confirmedStays={confirmedStays as [Booking]}
        numDays={numDays}
        cabinCount={cabins!.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays as [Booking]} />
      <SalesChart bookings={bookings as [BookingFieldStat]} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
