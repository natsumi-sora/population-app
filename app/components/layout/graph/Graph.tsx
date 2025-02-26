'use client';

import { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchPopulation } from '../../../hooks/usePopulation';
import styles from './graph.module.css';

type PopulationCategory = 'total' | 'young' | 'working' | 'elderly';

interface GraphProps {
  selectedPrefectures: { code: number; name: string }[];
}

const categories: { key: PopulationCategory; label: string }[] = [
  { key: 'total', label: '総人口' },
  { key: 'young', label: '年少人口' },
  { key: 'working', label: '生産年齢人口' },
  { key: 'elderly', label: '老年人口' },
];

export default function Graph({ selectedPrefectures }: GraphProps) {
  const [activeCategory, setActiveCategory] = useState<PopulationCategory>('total');
  const [populationData, setPopulationData] = useState<{ [key: number]: { year: number; value: number }[] }>({});

  useEffect(() => {
    async function fetchData() {
      if (selectedPrefectures.length === 0) {
        setPopulationData({});
        return;
      }

      const data = await fetchPopulation(selectedPrefectures, activeCategory);
      setPopulationData(
        Object.fromEntries(
          Object.entries(data).map(([code, prefData]) => [Number(code), prefData.data])
        )
);
    }

    fetchData();
  }, [selectedPrefectures, activeCategory]);

  // X軸の年リスト
  const years = useMemo(
    () => (selectedPrefectures.length > 0 ? populationData[selectedPrefectures[0].code]?.map((item) => item.year) || [] : []),
    [populationData, selectedPrefectures]
  );

  const options: Highcharts.Options = useMemo(
    () => ({
      title: { text: `人口推移グラフ (${categories.find((c) => c.key === activeCategory)?.label})`, align: 'center' },
      xAxis: { title: { text: '年' }, categories: years.map(String) },
      yAxis: { title: { text: '人口数（万人）' } },
      series: selectedPrefectures.map((pref) => ({
        name: pref.name,
        type: 'line',
        data: populationData[pref.code]?.map((item) => item.value) || [],
      })),
      accessibility: { enabled: false },
      responsive: {
        rules: [
          {
            condition: { maxWidth: 500 },
            chartOptions: {
              legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' },
            },
          },
        ],
      },
    }),
    [selectedPrefectures, populationData, activeCategory, years]
  );

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {categories.map((category) => (
          <button
            key={category.key}
            className={activeCategory === category.key ? styles.activeTab : styles.tab}
            onClick={() => setActiveCategory(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {selectedPrefectures.length > 0 ? <HighchartsReact highcharts={Highcharts} options={options} /> : <p>都道府県を選択してください</p>}
    </div>
  );
}