"use client";

import { useState, useEffect, useRef } from "react";
import { ScheduleCard } from './schedule-card'
import { DatePicker } from "@/components/pets/date-picker";
import axios from "axios";
import { Schedule } from "@/lib/types";

export default function ScheduleList() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;
  const bottomRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      console.log(date)
      setSelectedDate(date);
      setSchedules([])
      setCurrentPage(1)
      setHasMore(true)
    }
  };

  useEffect(() => {
    async function fetchSchedules() {
      console.log(selectedDate)
      try {
        if (selectedDate) {
          const response = await axios(`/api/schedule-list?date=${selectedDate.toLocaleDateString('en-CA')}&page=${currentPage}&limit=${itemsPerPage}`);
          const data = await response.data
          console.log(data.data, selectedDate)

          if (data.data.length > 0) {
            setSchedules((prevSchedules) => [...prevSchedules, ...data.data]);
            setHasMore(data.totalPages > currentPage);
          }
          console.log(schedules)
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    }

    if (hasMore) {
      fetchSchedules();
    }
  }, [currentPage, hasMore, selectedDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [loading, hasMore]);

  if (loading && currentPage === 1) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="space-y-2">
        <DatePicker
          date={selectedDate}
          onSelect={(date) => (handleDateChange(date))}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {schedules.map((schedule) => (
          <ScheduleCard key={schedule.petId} schedule={schedule} />
        ))}
      </div>

      {loading && currentPage > 1 && (
        <div className="text-center mt-4">Loading more pets...</div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}
