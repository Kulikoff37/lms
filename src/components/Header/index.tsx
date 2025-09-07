"use client";

import React from "react";
import { Header } from "antd/lib/layout/layout";
import { Menu, MenuProps } from "antd";
import { DEFAULT_MENU_ITEM, MENU_ITEMS } from "./constants";
import { useRouter } from "next/navigation";

export const AppHeader: React.FC = () => {
  const router = useRouter();
  const onClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
  };
  return (
  <Header>
    <Menu 
      theme="dark" 
      mode="horizontal"
      defaultSelectedKeys={DEFAULT_MENU_ITEM}
      items={MENU_ITEMS}
      onClick={onClick}
    />
  </Header>
  )
}

