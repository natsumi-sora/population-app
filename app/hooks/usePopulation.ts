import { useEffect, useState } from 'react';
import { fetchPopulationData } from '../api/api';


// 年ごとの人口データ
type PopulationData = { year: number; value: number }[];

// 取得する人口カテゴリの型
type PopulationCategory = 'total' | 'young' | 'working' | 'elderly';

// 都道府県コードごとのデータ構造
type PopulationResult = { [key: number]: PopulationData };

export function usePopulation(prefCodes: number[], category: PopulationCategory) {
  const [population, setPopulation] = useState<PopulationResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const newPopulation: PopulationResult = {};
      for (const code of prefCodes) {
        const data = await fetchPopulationData(code);
        if (data && category in data) {
          newPopulation[code] = data[category];
        } else {
          console.warn(`Data for category "${category}" not found in response`);
          newPopulation[code] = [];
        }
      }
      setPopulation(newPopulation);
    };

    if (prefCodes.length > 0) {
      fetchData();
    }
  }, [prefCodes, category]); // category も依存関係に追加

  return population;
}