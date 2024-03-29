import { useState, useEffect } from "react";
import { base_url } from "../../config.js";
import { useAppContext } from "../../Context";
import "./Counter.css";

interface CounterData {
  counters: number[];
}

function Counter() {
  const [counters, setCounters] = useState<number[]>([]);
  const { success } = useAppContext();

  useEffect(() => {
    async function fetchCounter() {
      try {
        const backendURL = `${base_url}/api/v1/counter`;
        const response = await fetch(backendURL);
        const data: CounterData = await response.json();

        if (response.ok) {
          setCounters(data.counters);
        } else {
          console.error("Failed to fetch counters: Response was not OK.");
        }
      } catch (error) {
        console.error("Error fetching counters:", error);
      }
    }

    fetchCounter();
  }, [success]);

  return (
    <div className="counter-container">
      <p className="counter-text">successful downloads&nbsp;</p>
      {counters.map((counter, index) => (
        <p className="counter-text" key={index}>
          {counter}
        </p>
      ))}
    </div>
  );
}

export default Counter;
