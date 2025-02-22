import { fetchPopulationData } from '../api/api';

// 年ごとの人口データ
type PopulationData = { year: number; value: number }[];

// 取得する人口カテゴリの型
type PopulationCategory = 'total' | 'young' | 'working' | 'elderly';

// 都道府県コードごとのデータ構造
type PopulationResult = { [key: number]: PopulationData };

// ✅ カスタムフックではなく、単なる非同期関数に変更
export async function fetchPopulation(prefCodes: number[], category: PopulationCategory): Promise<PopulationResult> {
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

  return newPopulation;
}
