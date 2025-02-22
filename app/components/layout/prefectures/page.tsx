//# 都道府県選択コンポーネント

'use client';

import { useState, useEffect } from 'react';
import { fetchPrefectures } from '@/app/api/api'; // `api.ts` から関数をインポート
import styles from './prefectures.module.css';

// 都道府県データの型
type Prefecture = { code: number; name: string };

interface PrefectureSelectorProps {
  onSelect: (selected: number[]) => void;
}

export default function PrefectureSelector({ onSelect }: PrefectureSelectorProps) {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  //APIから都道府県名を取得
  useEffect(() => {
    fetchPrefectures().then(setPrefectures);
  }, []);

  //チェックボックス
  const handleCheckboxChange = (code: number) => {
    setSelected((prev) => {
      const newSelection = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
      return newSelection;// 状態更新
    });
  };

   // useEffectを使って、selectedが変更されたタイミングでonSelectを呼び出す
  useEffect(() => {
    onSelect(selected); // 状態更新後に親コンポーネントのonSelectを呼び出す
  }, [selected, onSelect]); // selectedが変更された場合に呼び出される

  return (
    <div className={styles.grid}>
      {prefectures.map((pref) => (
        <label key={pref.code} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            value={pref.code}
            onChange={() => handleCheckboxChange(pref.code)}
            checked={selected.includes(pref.code)}
          />
          {pref.name}
        </label>
      ))}
    </div>
  );
}