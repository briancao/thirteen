import React from 'react';
import MenuBar from '../components/common/MenuBar';
import Header from '../components/domain/home/Header';
import Page from './../components/layouts/Page';
import Card from './../components/common/Card';

export default function Home() {
  return (
    <Page>
      <MenuBar />
      <div className="container">
        <div className="col">
          <div className="row">
            <Header />
          </div>
          <div className="row">
            <div className="col-8">
              <Card label="RECENT MATCHES" />
            </div>
            <div className="col-4">
              <Card label="ONGOING MATCHES" />
            </div>
          </div>
          <div className="row">
            <div className="col-4"><Card label="CURRENT SEASON RANK" /></div>
            <div className="col-4"><Card label="PERFORMANCE OVERVIEW" /></div>
            <div className="col-4"><Card label="TOP PERFORMANCE" /></div>
          </div>
        </div>
      </div>
    </Page>
  );
}
