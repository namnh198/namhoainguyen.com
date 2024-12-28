import { useState, useEffect } from 'react';

export const usePostDateStatus = (createdDate?: Date | string, modifiedDate?: Date | string, withinDay?: number) => {
  const [status, setStatus] = useState<'new' | 'updated' | 'updatedWithin' | 'normal'>('normal');

  useEffect(() => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - (withinDay || 7));

    if (createdDate) {
      const createdDateObj = new Date(createdDate);

      if (createdDateObj >= sevenDaysAgo) {
        setStatus('new');
        return;
      }
    }

    if (modifiedDate) {
      const modifiedDateObj = new Date(modifiedDate);

      if (modifiedDateObj >= sevenDaysAgo) {
        setStatus('updatedWithin');
        return;
      }

      if (createdDate && modifiedDateObj > new Date(createdDate)) {
        setStatus('updated');
        return;
      }
    }

    setStatus('normal');
  }, [createdDate, modifiedDate, withinDay]);

  return status;
};
