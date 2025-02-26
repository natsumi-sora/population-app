'use client';

import { useState, useEffect, useCallback } from 'react';
import PrefectureSelector from './components/layout/prefectures/PrefectureSelector';
import Graph from './components/layout/graph/Graph';
import styles from './page.module.css';
import { fetchPrefectures } from '../app/api/api';

export default function Home() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<{ code: number; name: string }[]>([]);
  const [prefectures, setPrefectures] = useState<{ code: number; name: string }[]>([]);

  useEffect(() => {
    fetchPrefectures().then(setPrefectures);
  }, []);

  const handleSelect = useCallback((selected: { code: number; name: string }[]) => {
    setSelectedPrefectures(selected);
  }, []);

  return (
    <div>
      <h1 className={styles.title}>都道府県別人口グラフ</h1>
      <section>
        <PrefectureSelector prefectures={prefectures} onSelect={handleSelect} />
      </section>
      <section>
        <Graph selectedPrefectures={selectedPrefectures} />
      </section>
    </div>
  );
}
