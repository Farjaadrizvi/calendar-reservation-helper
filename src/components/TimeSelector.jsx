
import React from "react";
import { Clock } from "lucide-react";
import "../styles/reservation.css";

const TimeSelector = ({ onTimeSelect, selectedTime }) => {
  // Generate time slots from 9 AM to 9 PM in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 21; hour++) {
      const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour < 12 ? "AM" : "PM";
      
      // Add hour slot
      slots.push(`${hourFormatted}:00 ${period}`);
      
      // Add half-hour slot if not 9 PM
      if (hour !== 21) {
        slots.push(`${hourFormatted}:30 ${period}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="time-selector">
      <div className="time-selector-header">
        <Clock size={16} />
        <h3>Select Time</h3>
      </div>
      <div className="time-slots">
        {timeSlots.map((time) => (
          <button
            key={time}
            className={`time-slot ${selectedTime === time ? "time-slot-selected" : ""}`}
            onClick={() => onTimeSelect(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
