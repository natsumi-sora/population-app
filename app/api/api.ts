//APIリクエスト処理

import axios from 'axios';

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationResponse {
  label: string;
  data: PopulationData[];
}

interface FetchPopulationResult {
  total: PopulationData[];
  young: PopulationData[];
  working: PopulationData[];
  elderly: PopulationData[];
}

const BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app';

// 環境変数からAPIキーを取得
const API_KEY = process.env.NEXT_PUBLIC_YUMEMI_API_KEY;


//県名の取得の記述
export const fetchPrefectures = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/prefectures`, {
      headers: {
        'X-API-KEY': API_KEY, // APIキーをヘッダーに追加
      },
    });

    return response.data.result.map((pref: { prefCode: number; prefName: string }) => ({
      code: pref.prefCode,
      name: pref.prefName,
    }));// 都道府県データを返す

  } catch (error) {
    console.error('Error fetching prefectures:', error);
    return [];
  }
};

//人口データの取得
export const fetchPopulationData = async (prefCode: number): Promise<FetchPopulationResult> => {
  try {
    const response = await axios.get( `${BASE_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
      headers: {
        'X-API-KEY': API_KEY, // APIキーをヘッダーに追加
      },
    });
    const result = response.data.result as PopulationResponse[];

    return {
      total: result.find((d) => d.label === "総人口")?.data.map((item) => ({
        year: item.year,
        value: item.value / 10000, // X万人表記にする
      })) || [],
      young: result.find((d) => d.label === "年少人口")?.data.map((item) => ({
        year: item.year,
        value: item.value / 10000, // X万人表記にする
      })) || [],
      working: result.find((d) => d.label === "生産年齢人口")?.data.map((item) => ({
        year: item.year,
        value: item.value / 10000, // X万人表記にする
      })) || [],
      elderly: result.find((d) => d.label === "老年人口")?.data.map((item) => ({
        year: item.year,
        value: item.value / 10000, // X万人表記にする
      })) || [],
    };
  } catch (error) {
    console.error('Error fetching population data:', error);
    return { total: [], young: [], working: [], elderly: [] };
  }
};
