// app/components/layout/prefectures/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { fetchPrefectures } from '@/app/api/api';
import styles from './prefectures.module.css';
// PrefectureSelectorコンポーネント
const PrefectureSelector = ({ onSelect }) => {
    const [prefectures, setPrefectures] = useState([]);
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        fetchPrefectures().then(setPrefectures);
    }, []);
    const handleCheckboxChange = (code) => {
        setSelected((prev) => {
            const newSelection = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
            return newSelection;
        });
    };
    useEffect(() => {
        onSelect(selected); // 親コンポーネントに選択した都道府県コードを渡す
    }, [selected, onSelect]);
    return (<div className={styles.grid}>
      {prefectures.map((pref) => (<label key={pref.code} className={styles.checkboxLabel}>
          <input type="checkbox" value={pref.code.toString()} onChange={() => handleCheckboxChange(pref.code)} checked={selected.includes(pref.code)}/>
          {pref.name}
        </label>))}
    </div>);
};
// PrefecturesPageコンポーネントの型を引数に追加
const PrefecturesPage = ({ onSelect }) => {
    const [prefectures, setPrefectures] = useState([]);
    const [selectedPrefCodes, setSelectedPrefCodes] = useState([]);
    useEffect(() => {
        fetchPrefectures().then(setPrefectures);
    }, []);
    const selectedPrefNames = prefectures
        .filter((pref) => selectedPrefCodes.includes(pref.code))
        .map((pref) => pref.name);
    const handleSelect = (selected) => {
        setSelectedPrefCodes(selected);
        onSelect(selected); // 親コンポーネントの onSelect を呼び出す
    };
    return (<div className={styles.select}>
      <h1>都道府県選択</h1>
      <PrefectureSelector onSelect={handleSelect}/>
      <p>選択された都道府県名: {selectedPrefNames.join(', ')}</p>
    </div>);
};
export default PrefecturesPage;
