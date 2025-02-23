// app/page.tsx (トップページ)

// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import PrefectureSelector from './components/layout/prefectures/PrefectureSelector';
import Graph from './components/layout/graph/Graph';
import styles from './page.module.css';
import { fetchPrefectures } from '../app/api/api';

export default function Home() {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);
  const [prefectures, setPrefectures] = useState<{ code: number; name: string }[]>([]);

  useEffect(() => {
    fetchPrefectures().then(setPrefectures);
  }, []);

  return (
    <div>
      <h1 className={styles.title}>都道府県別人口グラフ</h1>
      <section>
        <PrefectureSelector prefectures={prefectures} onSelect={setSelectedPrefCodes} />
      </section>
      <section>
        <Graph selectedPrefCodes={selectedPrefCodes} />
      </section>
      <p className={styles.source}>
        出典<br />
        RESAS（地域経済分析システム）のデータを加工して作成 <br />
        人口構成データ：総務省「国勢調査」/厚生労働省「人口動態調査」/国立社会保障・人口問題研究所「日本の地域別将来推計人口」
      </p>
    </div>
  );
}
