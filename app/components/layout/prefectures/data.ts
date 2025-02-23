import { fetchPrefectures } from '@/app/api/api';

// 都道府県データの型
export type Prefecture = { code: number; name: string };

// サーバーサイドで都道府県データを取得する関数
export async function getPrefectures(): Promise<Prefecture[]> {
  return await fetchPrefectures();
}
