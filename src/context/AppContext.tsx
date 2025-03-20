import { createContext, useState, useEffect, ReactNode } from "react";

// Define types for the context
interface AppContextType {
  data: string;
  setData: (value: string) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<string>(() => {
    // Load from sessionStorage on first render
    const savedData = sessionStorage.getItem("appData");
    return savedData ? JSON.parse(savedData) : "";
  });

  // Save to sessionStorage whenever data updates
  useEffect(() => {
    sessionStorage.setItem("appData", JSON.stringify(data));
  }, [data]);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
