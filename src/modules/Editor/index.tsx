'use client';
import { Tabs } from 'antd';
import { items } from './config';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Editor: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeKey, setActiveKey] = useState('1');

  // Get the initial active tab from query params
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['1', '2', '3'].includes(tabParam)) {
      setActiveKey(tabParam);
    } else {
      setActiveKey('1'); // Default to first tab
    }
  }, [searchParams]);

  const onChange = (key: string) => {
    setActiveKey(key);
    // Update URL with the selected tab
    const params = new URLSearchParams(searchParams);
    if (key === '1') {
      params.delete('tab'); // Use default (tab 1) when no param is present
    } else {
      params.set('tab', key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return <Tabs activeKey={activeKey} items={items} onChange={onChange} />;
};
