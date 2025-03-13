
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ReservationCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | undefined;
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  onDateSelect,
  selectedDate,
}) => {
  // Prevent selecting dates in the past
  const disabledDays = { before: new Date() };

  return (
    <div className="reservation-calendar">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date) {
            onDateSelect(date);
            toast.success(`Selected date: ${format(date, "MMMM d, yyyy")}`);
          }
        }}
        disabled={disabledDays}
        className={cn("rounded-md border p-3 pointer-events-auto")}
        classNames={{
          day_selected: "bg-reservation-primary text-primary-foreground",
          day_today: "bg-reservation-light text-foreground",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          caption: "flex items-center justify-center pt-1 relative",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
        }}
      />
    </div>
  );
};

export default ReservationCalendar;
