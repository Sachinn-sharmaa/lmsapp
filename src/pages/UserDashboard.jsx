import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/UserDashboard.css';
import NavBar from './navBar.jsx'; // Make sure you’ve created this

const UserDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState('math');
  const [events, setEvents] = useState({});

  const formatDateKey = (date) => date.toISOString().split('T')[0];

  useEffect(() => {
    // Sample event data: can be replaced with API call
    setEvents({
      '2025-05-18': [
        { time: '10:00 AM', subject: 'Real Numbers', course: 'math' },
        { time: '3:00 PM', subject: 'Acids & Bases', course: 'science' }
      ],
      '2025-05-20': [
        { time: '11:00 AM', subject: 'Tenses Practice', course: 'english' }
      ],
      '2025-05-22': [
        { time: '12:00 PM', subject: 'Polynomials', course: 'math' }
      ]
    });
  }, []);

  const filteredEvents = (date) => {
    const key = formatDateKey(date);
    return (events[key] || []).filter(e => e.course === selectedCourse);
  };

  const todayClasses = filteredEvents(selectedDate);

  return (
    <div className="dashboard-container">
      {/* ✅ Navigation Bar */}
      <NavBar isLoggedIn={true} />

      {/* ✅ Dashboard Header */}
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard</h2>
        <p>Track your upcoming classes</p>

        <select
          className="course-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="english">English</option>
        </select>
      </div>

      {/* ✅ Main Content Area - Calendar & Events Side by Side */}
      <div className="dashboard-main">
        {/* Calendar Section */}
        <div className="calendar-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={({ date }) => {
              const dayEvents = filteredEvents(date);
              return (
                <div className="event-tile">
                  {dayEvents.map((event, index) => (
                    <div key={index} className="event">
                      <span className="event-time">{event.time}</span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </div>

        {/* Events of Selected Date */}
        <div className="selected-day-events">
          <h3>Classes for {selectedCourse.toUpperCase()} on {selectedDate.toDateString()}</h3>
          {todayClasses.length > 0 ? (
            todayClasses.map((e, i) => (
              <div className="event-card" key={i}>
                <strong>{e.time}</strong> - {e.subject}
              </div>
            ))
          ) : (
            <p className="no-class-msg">No classes scheduled for this day</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
