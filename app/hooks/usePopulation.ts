import { fetchPopulationData } from '../api/api';

// 年ごとの人口データ
type PopulationData = { year: number; value: number }[];

// 取得する人口カテゴリの型
type PopulationCategory = 'total' | 'young' | 'working' | 'elderly';

// 都道府県データの型
type Prefecture = { code: number; name: string };

// 修正: `prefectures` を `Prefecture[]` 型に変更
export async function fetchPopulation(
  prefectures: Prefecture[], // 変更: `{ code, name }[]` を受け取る
  category: PopulationCategory
): Promise<{ [key: number]: { name: string; data: PopulationData } }> {
  const newPopulation: { [key: number]: { name: string; data: PopulationData } } = {};

  for (const pref of prefectures) {
    const data = await fetchPopulationData(pref.code);
    if (data && category in data) {
      newPopulation[pref.code] = { name: pref.name, data: data[category] };
    } else {
      console.warn(`Data for category "${category}" not found in response`);
      newPopulation[pref.code] = { name: pref.name, data: [] };
    }
  }

  return newPopulation;
}