//APIリクエスト処理

import axios from 'axios';


const BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app';

// 環境変数からAPIキーを取得
const API_KEY = process.env.NEXT_PUBLIC_YUMEMI_API_KEY;

// 都道府県データの型
interface Prefecture {
  code: number;
  name: string;
}

// 人口データの型
interface PopulationData {
  year: number;
  value: number;
}

// 人口カテゴリの型（APIレスポンスの1つのデータ）
interface PopulationCategory {
  label: string;
  data: PopulationData[];
}

// APIレスポンス全体の型
interface PopulationResponse {
  result: {
    boundaryYear: number;
    data: PopulationCategory[];
  };
}

//県名の取得の記述
export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/prefectures`, {
      headers: {
        'X-API-KEY': API_KEY, // APIキーをヘッダーに追加
      },
    });

    return response.data.result.map((pref: { prefCode: number; prefName: string }) => ({
      code: pref.prefCode,
      name: pref.prefName,
    })); // 都道府県データを返す
  } catch (error) {
    console.error('Error fetching prefectures:', error);
    return [];
  }
};

//人口データの取得
export const fetchPopulationData = async (prefCode: number): Promise<{
  total: PopulationData[];
  young: PopulationData[];
  working: PopulationData[];
  elderly: PopulationData[];
}> => {
  try {
    const response = await axios.get<PopulationResponse>(
      `${BASE_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          'X-API-KEY': API_KEY, // APIキーをヘッダーに追加
        },
      }
    );

    const result = response.data.result.data;

    if (!Array.isArray(result)) {
      console.error("Invalid API response: result.data is not an array");
      return { total: [], young: [], working: [], elderly: [] };
    }

    const findCategoryData = (label: string): PopulationData[] =>
      result.find((d) => d.label === label)?.data.map((item) => ({
        year: item.year,
        value: item.value / 10000, // X万人表記にする
      })) || [];

    return {
      total: findCategoryData("総人口"),
      young: findCategoryData("年少人口"),
      working: findCategoryData("生産年齢人口"),
      elderly: findCategoryData("老年人口"),
    };
  } catch (error) {
    console.error('Error fetching population data:', error);
    return { total: [], young: [], working: [], elderly: [] };
  }
};
