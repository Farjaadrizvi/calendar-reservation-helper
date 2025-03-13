
import React, { useState } from "react";
import ReservationCalendar from "../components/ReservationCalendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import "../styles/reservation.css";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(undefined);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    toast.success(`Selected date: ${format(date, "MMMM d, yyyy")}`);
  };

  const handleContinue = () => {
    if (selectedDate) {
      toast.success(`Reservation confirmed for ${format(selectedDate, "MMMM d, yyyy")}!`);
    } else {
      toast.error("Please select a date before continuing");
    }
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1 className="header-title">Reservation Date</h1>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          <div className="reservation-layout">
            <ReservationCalendar 
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
            
            <div className="selection-panel">
              <div className="selection-card">
                <h2 className="selection-title">
                  <CalendarIcon className="selection-icon" size={20} />
                  Selected Date
                </h2>
                
                {selectedDate ? (
                  <p className="selected-date">
                    {format(selectedDate, "MMMM d, yyyy")}
                  </p>
                ) : (
                  <p className="no-date-selected">No date selected</p>
                )}
              </div>
              
              <button 
                className="button"
                onClick={handleContinue} 
                disabled={!selectedDate}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
