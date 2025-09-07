import "./globals.scss";
import '@ant-design/v5-patch-for-react-19';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { AppHeader } from "@/components/Header";
import { geistMono, geistSans } from "./config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru_RU">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
         <AntdRegistry>
           <Layout className="container-root">
              <AppHeader />
                <Layout className="container-content">
                    <Content className="content" >
                      { children }
                    </Content>
                </Layout>
            </Layout>
         </AntdRegistry>
      </body>
    </html>
  );
}
