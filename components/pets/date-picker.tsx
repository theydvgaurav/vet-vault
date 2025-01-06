"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function DatePicker({ date, onSelect }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    onSelect(selectedDate);
    setIsOpen(false); // Close the popover when a date is selected
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-medium border rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:border-green-500 focus:border-green-500",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
          {date ? (
            <span className="text-lg font-semibold">{format(date, "PPP")}</span>
          ) : (
            <span className="text-sm text-muted-foreground">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-4 shadow-lg rounded-xl mt-2 backdrop-blur-md z-50"
        align="start"
        style={{
          position: "absolute",
          top: "calc(100% + 10px)", // Position above the button
          background: "rgba(15, 23, 42, 1)"
        }} 
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect} // Use handleSelect to close popover
          initialFocus
          className="rounded-lg shadow-md"
        />
      </PopoverContent>
    </Popover>
  );
}
