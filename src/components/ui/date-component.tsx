import { useEffect, useState } from 'react';

export default function DateComponent({
  date,
  dateLabel,
  className
}: {
  date: Date | string | undefined;
  dateLabel?: string;
  className?: string;
}) {
  const [humanized, setHumanized] = useState('');

  useEffect(() => {
    if (!date) return;
    const today = new Date();

    const diffTime = Math.abs(today.getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      setHumanized('today');
    } else if (diffDays <= 2) {
      setHumanized('yesterday');
    } else if (diffDays <= 7) {
      setHumanized(`${diffDays} days ago`);
    } else if (diffDays <= 13) {
      setHumanized(`${Math.floor(diffDays / 7)} week ago`);
    } else if (diffDays <= 30) {
      setHumanized(`${Math.floor(diffDays / 7)} weeks ago`);
    } else if (diffDays <= 59) {
      setHumanized(`${Math.floor(diffDays / 30)} month ago`);
    } else if (diffDays <= 365) {
      setHumanized(`${Math.floor(diffDays / 30)} months ago`);
    } else {
      setHumanized(`${Math.floor(diffDays / 365)} year ago`);
    }
  }, []);

  return date ? (
    <span className={className}>
      {dateLabel ? dateLabel + ' ' : ''}
      {humanized}
    </span>
  ) : null;
}
