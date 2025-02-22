import { useEffect, useState } from 'react';
import { fetchPopulationData } from '../api/api';


type PopulationData = { year: number; value: number }[];
type PopulationResult = { [key: number]: PopulationData };


export function usePopulation(prefCodes: number[], category: 'total' | 'young' | 'working' | 'elderly') {
  const [population, setPopulation] = useState<PopulationResult>({});

  useEffect(() => {
    const fetchData = async () => {
      const newPopulation: PopulationResult = {};
      for (const code of prefCodes) {
        const data = await fetchPopulationData(code);
        newPopulation[code] = data[category];
      }
      setPopulation(newPopulation);
    };

    if (prefCodes.length > 0) {
      fetchData();
    }
  }, [prefCodes, category]); // category も依存関係に追加

  return population;
}