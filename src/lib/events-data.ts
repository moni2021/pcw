
export interface UpcomingEvent {
  name: string;
  date: string; // YYYY-MM-DD
  description?: string;
}

export const eventsData: UpcomingEvent[] = [
  {
    name: "Independence Day",
    date: "2024-08-15",
    description: "National holiday celebrating India's independence."
  },
  {
    name: "Raksha Bandhan",
    date: "2024-08-19",
    description: "Festival celebrating the bond between brothers and sisters."
  },
  {
    name: "Janmashtami",
    date: "2024-08-26",
    description: "Hindu festival celebrating the birth of Krishna."
  },
  {
    name: "Ganesh Chaturthi",
    date: "2024-09-07",
    description: "Hindu festival celebrating the arrival of Ganesha to earth."
  },
  {
    name: "Mahatma Gandhi Jayanti",
    date: "2024-10-02",
    description: "National holiday celebrating the birthday of Mahatma Gandhi."
  },
  {
    name: "Dussehra",
    date: "2024-10-12",
    description: "Hindu festival that celebrates the victory of good over evil."
  },
  {
    name: "Diwali",
    date: "2024-11-01",
    description: "The festival of lights."
  },
  {
    name: "Christmas Day",
    date: "2024-12-25",
    description: "Christian festival celebrating the birth of Jesus."
  },
  {
    name: "New Year's Day",
    date: "2025-01-01",
    description: "The first day of the new year."
  },
  {
    name: "Republic Day",
    date: "2025-01-26",
    description: "National holiday celebrating the Constitution of India."
  }
];
