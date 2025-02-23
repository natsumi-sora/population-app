import { fetchPopulationData } from '../api/api';
// ✅ カスタムフックではなく、単なる非同期関数に変更
export async function fetchPopulation(prefCodes, category) {
    const newPopulation = {};
    for (const code of prefCodes) {
        const data = await fetchPopulationData(code);
        if (data && category in data) {
            newPopulation[code] = data[category];
        }
        else {
            console.warn(`Data for category "${category}" not found in response`);
            newPopulation[code] = [];
        }
    }
    return newPopulation;
}
