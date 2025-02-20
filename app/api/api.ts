//APIリクエスト処理

import axios from 'axios';

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
export const fetchPopulationData = async (prefCode: number) => {
  try {
    const response = await axios.get( `${BASE_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
      headers: {
        'X-API-KEY': API_KEY, // APIキーをヘッダーに追加
      },
    });
     return response.data.result.data[0].data; // 総人口データのみ取得
  } catch (error) {
    console.error('Error fetching population data:', error);
    return [];
  }
};
