// Next.jsのApp Routerの `page.tsx` はサーバーコンポーネントとして扱う

import { fetchPrefectures } from '../../../api/api';

export default async function Prefectures() {
  const prefectures = await fetchPrefectures();
  return prefectures;
}