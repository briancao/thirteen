import React from 'react';
import MenuBar from '../components/common/MenuBar';
import Header from '../components/domain/home/Header';
import Page from './../components/layouts/Page';
import Card from './../components/common/Card';
import TopPerformance from './../components/metrics/TopPerformance';

export default function Home() {
  var data = [
    { result: 'W', placement: 1 },
    { result: 'L', placement: 3 },
    { result: 'L', placement: 4 },
    { result: 'W', placement: 2 },
    { result: 'W', placement: 2 },
    { result: 'L', placement: 4 },
  ];

  return (
    <Page>
      <MenuBar />
      <div className="container-fluid">
        <div className="col">
          <div className="row">
            <Header />
          </div>
          <div className="row">
            <div className="col-8">
              <Card label="RECENT MATCHES">
                <TopPerformance data={data} />
              </Card>
            </div>
            <div className="col-4">
              <Card label="ONGOING MATCHES" />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <Card label="CURRENT SEASON RANK" />
            </div>
            <div className="col-4">
              <Card label="PERFORMANCE OVERVIEW" />
            </div>
            <div className="col-4">
              <Card label="TOP PERFORMANCE" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
