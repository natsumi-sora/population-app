'use client';
import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchPopulation } from '../../../hooks/usePopulation'; // データ取得関数に修正
import { fetchPrefectures } from '../../../api/api';
import styles from './graph.module.css';
const categories = [
    { key: 'total', label: '総人口' },
    { key: 'young', label: '年少人口' },
    { key: 'working', label: '生産年齢人口' },
    { key: 'elderly', label: '老年人口' },
];
export default function Graph({ selectedPrefCodes }) {
    var _a, _b;
    const [prefNames, setPrefNames] = useState({});
    const [activeCategory, setActiveCategory] = useState('total');
    const [populationData, setPopulationData] = useState(null);
    // 人口データの取得
    useEffect(() => {
        async function fetchData() {
            if (selectedPrefCodes.length === 0) {
                setPopulationData(null);
                return;
            }
            const data = await fetchPopulation(selectedPrefCodes, activeCategory);
            setPopulationData(data);
        }
        fetchData();
    }, [selectedPrefCodes, activeCategory]);
    // 都道府県名の取得
    useEffect(() => {
        fetchPrefectures().then((data) => {
            const nameMap = data.reduce((acc, pref) => {
                acc[pref.code] = pref.name;
                return acc;
            }, {});
            setPrefNames(nameMap);
        });
    }, []);
    const years = populationData && selectedPrefCodes.length > 0
        ? ((_a = populationData[selectedPrefCodes[0]]) === null || _a === void 0 ? void 0 : _a.map((item) => item.year)) || []
        : [];
    const options = {
        title: {
            text: `人口推移グラフ (${(_b = categories.find((c) => c.key === activeCategory)) === null || _b === void 0 ? void 0 : _b.label})`,
            align: 'center',
        },
        xAxis: {
            title: { text: '年' },
            categories: years.map(String),
        },
        yAxis: {
            title: { text: '人口数（万人）' },
        },
        series: selectedPrefCodes.map((prefCode) => {
            var _a;
            return ({
                name: prefNames[prefCode] || `都道府県 ${prefCode}`,
                type: 'line',
                data: populationData ? (((_a = populationData[prefCode]) === null || _a === void 0 ? void 0 : _a.map((item) => item.value)) || []) : [],
            });
        }),
        accessibility: {
            enabled: false,
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                        },
                    },
                },
            ],
        },
    };
    return (<div className={styles.container}>
      <div className={styles.tabs}>
        {categories.map((category) => (<button key={category.key} className={activeCategory === category.key ? styles.activeTab : styles.tab} onClick={() => setActiveCategory(category.key)}>
            {category.label}
          </button>))}
      </div>

      {selectedPrefCodes.length > 0 ? (<HighchartsReact highcharts={Highcharts} options={options}/>) : (<p>都道府県を選択してください</p>)}
    </div>);
}
