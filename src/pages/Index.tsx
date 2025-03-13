
import React, { useState } from "react";
import ReservationCalendar from "@/components/ReservationCalendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleContinue = () => {
    if (selectedDate) {
      toast.success(`Reservation confirmed for ${format(selectedDate, "MMMM d, yyyy")}!`);
    } else {
      toast.error("Please select a date before continuing");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border py-6 px-4 md:px-6">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Reservation Date</h1>
        </div>
      </header>
      
      <main className="flex-1 container max-w-4xl py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-full md:w-auto">
            <ReservationCalendar 
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </div>
          
          <div className="w-full md:w-1/3 space-y-6">
            <div className="rounded-lg border border-border p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-reservation-primary" />
                Selected Date
              </h2>
              
              {selectedDate ? (
                <div className="text-lg">
                  {format(selectedDate, "MMMM d, yyyy")}
                </div>
              ) : (
                <div className="text-muted-foreground italic">No date selected</div>
              )}
            </div>
            
            <Button 
              onClick={handleContinue} 
              className="w-full py-6 text-lg bg-reservation-primary hover:bg-reservation-primary/90"
              disabled={!selectedDate}
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
