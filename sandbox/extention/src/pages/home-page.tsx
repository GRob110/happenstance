import React from "react";
import { PageLayout } from "../components/page-layout";

window.console.log('home-page.tsx');

export const HomePage: React.FC = () => (
  <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Happenstance
        </h1>
      </div>
  </PageLayout>
);
