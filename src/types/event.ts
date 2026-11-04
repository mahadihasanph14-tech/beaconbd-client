export type EventType = "Cleanup" | "Plantation" | "Donation" | "Education" | "Health" | "Other";

export type EventItem = {
  _id: string;
  title: string;
  description: string;
  type: EventType;
  image: string;
  location: string;
  date: string;
  creatorEmail: string;
  creatorName?: string;
  participants?: number;
};
