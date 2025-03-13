
import React, { useState } from "react";
import ReservationCalendar from "../components/ReservationCalendar";
import TimeSelector from "../components/TimeSelector";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import "../styles/reservation.css";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    toast.success(`Selected date: ${format(date, "MMMM d, yyyy")}`);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    toast.success(`Selected time: ${time}`);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      toast.success(`Reservation confirmed for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}!`);
    } else if (selectedDate) {
      toast.error("Please select a time before continuing");
    } else {
      toast.error("Please select a date before continuing");
    }
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1 className="header-title">Reservation Date & Time</h1>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          <div className="reservation-layout">
            <div className="reservation-options">
              <ReservationCalendar 
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
              
              {selectedDate && (
                <TimeSelector
                  onTimeSelect={handleTimeSelect}
                  selectedTime={selectedTime}
                />
              )}
            </div>
            
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
              
              <div className="selection-card">
                <h2 className="selection-title">
                  <Clock className="selection-icon" size={20} />
                  Selected Time
                </h2>
                
                {selectedTime ? (
                  <p className="selected-date">
                    {selectedTime}
                  </p>
                ) : (
                  <p className="no-date-selected">
                    {selectedDate ? "No time selected" : "Select a date first"}
                  </p>
                )}
              </div>
              
              <button 
                className="button"
                onClick={handleContinue} 
                disabled={!selectedDate || !selectedTime}
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
