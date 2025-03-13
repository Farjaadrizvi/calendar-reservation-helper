
import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
         addDays, isSameMonth, isSameDay, isToday, isBefore } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import "../styles/reservation.css";

const ReservationCalendar = ({ onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth);
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-weekday" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    
    return days;
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = new Date();
    
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const isDisabled = isBefore(day, today) && !isSameDay(day, today);
        
        days.push(
          <div
            className={`calendar-day ${
              !isSameMonth(day, monthStart) ? "calendar-day-disabled" : ""
            } ${isToday(day) ? "calendar-day-today" : ""} ${
              selectedDate && isSameDay(day, selectedDate) ? "calendar-day-selected" : ""
            } ${isDisabled ? "calendar-day-disabled" : ""}`}
            key={day.toString()}
            onClick={() => !isDisabled && onDateSelect(cloneDay)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div className="calendar-grid" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    
    return rows;
  };
  
  return (
    <div className="reservation-calendar">
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="calendar-nav-btn" onClick={prevMonth}>
            <ChevronLeft size={16} />
          </button>
          <div className="calendar-title">
            {format(currentMonth, "MMMM yyyy")}
          </div>
          <button className="calendar-nav-btn" onClick={nextMonth}>
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="calendar-grid">
          {renderDays()}
        </div>
        {renderCells()}
      </div>
    </div>
  );
};

export default ReservationCalendar;
