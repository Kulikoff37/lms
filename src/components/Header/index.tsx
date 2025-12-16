"use client";

import React from "react";
import { Header } from "antd/lib/layout/layout";
import { Menu, MenuProps } from "antd";
import { DEFAULT_MENU_ITEM, MENU_ITEMS, Links } from "./constants";
import { useRouter, usePathname } from "next/navigation";

export const AppHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine the selected key based on the current pathname
  const getSelectedKey = () => {
    if (pathname === '/' || pathname.startsWith('/testing')) {
      return Links.Testing;
    }
    if (pathname.startsWith('/editor')) {
      return Links.Editor;
    }
    return DEFAULT_MENU_ITEM[0]; // fallback to default
  };

  const selectedKey = getSelectedKey();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
  };
  return (
  <Header>
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={MENU_ITEMS}
      onClick={onClick}
    />
  </Header>
  )
}

