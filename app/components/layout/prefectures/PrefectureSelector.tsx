//クライアントコンポーネント化
'use client';

import { useState, useEffect } from 'react';
import styles from './prefectures.module.css';

interface Prefecture {
  code: number;
  name: string;
}

interface PrefectureSelectorProps {
  prefectures: Prefecture[];
  onSelect: (selected: number[]) => void;
}

export default function PrefectureSelector({ prefectures, onSelect }: PrefectureSelectorProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleCheckboxChange = (code: number) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

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