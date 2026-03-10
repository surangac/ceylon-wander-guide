import { createContext, useContext, useState, ReactNode } from "react";

interface TripPlannerContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (v: boolean) => void;
}

const TripPlannerContext = createContext<TripPlannerContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  setIsOpen: () => {},
});

export const useTripPlanner = () => useContext(TripPlannerContext);

export const TripPlannerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <TripPlannerContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), setIsOpen }}>
      {children}
    </TripPlannerContext.Provider>
  );
};
