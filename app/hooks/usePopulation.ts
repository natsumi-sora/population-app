import { useEffect, useState } from 'react';
import { fetchPopulationData } from '../api/api';

interface PopulationData {
  year: number;
  value: number;
}

export const usePopulation = (selectedPrefCodes: number[]) => {
  const [data, setData] = useState<{ [key: number]: PopulationData[] }>({});

  useEffect(() => {
    if (selectedPrefCodes.length === 0) return;

    const fetchData = async () => {
      const newData: { [key: number]: PopulationData[] } = {};
      for (const prefCode of selectedPrefCodes) {
        newData[prefCode] = await fetchPopulationData(prefCode);
      }
      setData(newData);
    };

    fetchData();
  }, [selectedPrefCodes]);

  return data;
};
