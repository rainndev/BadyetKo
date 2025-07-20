// src/hooks/useSpendingTip.ts

import { useEffect, useState } from "react";
import { spendingTips } from "@/data/spendingTips";

const TIP_KEY = "lastSpendingTip";
const TIME_KEY = "lastSpendingTime";

const getRandomTip = (): string => {
  const index = Math.floor(Math.random() * spendingTips.length);
  return spendingTips[index];
};

const has12HoursPassed = (lastTime: number | null): boolean => {
  if (!lastTime) return true;
  const now = Date.now();
  const oneMinute = 1 * 60 * 1000;
  return now - lastTime > oneMinute;
};

export const useSpendingTip = (category: string): string => {
  const [tip, setTip] = useState<string>("");
  useEffect(() => {
    const lastTime = localStorage.getItem(TIME_KEY);
    const lastTip = localStorage.getItem(TIP_KEY);
    const lastTimestamp = lastTime ? parseInt(lastTime) : null;

    if (lastTip && !has12HoursPassed(lastTimestamp)) {
      setTip(lastTip.replace("<category>", category));
    } else {
      const newTip = getRandomTip();
      localStorage.setItem(TIP_KEY, newTip);
      localStorage.setItem(TIME_KEY, Date.now().toString());
      setTip(newTip.replace("<category>", category));
    }
  }, [category]);

  return tip;
};
