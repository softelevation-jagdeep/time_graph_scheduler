import './App.css';
import React, { useRef } from 'react';
import SchedulerUI from './shedule-ui';
import moment from 'moment';
function App() {
  const currentIsLoading = useRef(false);
  const demoResources = [
    {
      id: 'r1',
      name: 'Resource Name with custom color',
      bgColor: '#FA9E95',
      color: '#fff',
    },
    {
      id: 'r2',
      name: 'Resource Name with custom color',
      bgColor: '#000',
      color: '#fff',
    },
    {
      id: 'r3',
      name: 'bgcolor white & text color black',
      bgColor: '#fff',
      color: '#000',
    },
    {
      id: 'r4',
      name: 'Resource Name with custom color',
      bgColor: '#FA9E95',
      color: '#fff',
    },
    {
      id: 'r5',
      name: 'Resource Name with custom color',
      bgColor: '#FA9E95',
      color: '#fff',
    },
  ];
  const demoEvents = [
    {
      id: 9,
      start: moment().startOf('D').add(9, 'hour'),
      end: moment().startOf('D').add(15, 'hour'),
      resourceId: 'r1',
      title: 'R1 has many tasks 1',
    },
    {
      id: 10,
      start: moment().startOf('D').add(4, 'hour'),
      end: moment().startOf('D').add(8, 'hour'),
      resourceId: 'r1',
      title: 'R1 has recurring tasks every week on Tuesday, Friday',
      bgColor: '#f759ab',
    },
    {
      id: 11,
      start: moment().startOf('D').add(4, 'hour'),
      end: moment().startOf('D').add(14, 'hour'),
      resourceId: 'r2',
      title: 'R1 has many tasks 3',
    },
    {
      id: 12,
      start: moment().startOf('D').add(4, 'hour'),
      end: moment().startOf('D').add(14, 'hour'),
      resourceId: 'r3',
      title: 'R1 has many tasks 4',
    },
    {
      id: 13,
      start: moment().startOf('D').add(4, 'hour'),
      end: moment().startOf('D').add(14, 'hour'),
      resourceId: 'r4',
      title: 'R1 has many tasks 5',
    },
    {
      id: 14,
      start: moment().startOf('D').add(4, 'hour'),
      end: moment().startOf('D').add(14, 'hour'),
      resourceId: 'r5',
      title: 'R1 has many tasks 6',
    },
  ];
  return (
    <>
      <div style={{ float: 'right', marginRight: 20, fontWeight: 700 }}>
        Current Time:{moment().utcOffset('-0700').format('MM/DD/YYYY HHmm')}
      </div>
      <div style={{ float: 'right', marginRight: 20, fontWeight: 700 }}>
        EndDate=
        {moment().utcOffset('-0700').add(14, 'hours').endOf("hour").format('MM/DD/YYYY HHmm')}
      </div>
      <div style={{ float: 'right', marginRight: 20, fontWeight: 700 }}>
        StartDate=
        {moment()
          .utcOffset('-0700')
          .subtract(3, 'hours')
          .startOf("hour").format('MM/DD/YYYY HHmm')}
      </div>
      <div className="App">
        <SchedulerUI
          customResourceTableWidth="300px"
          isLoading={currentIsLoading.current}
          startDate={moment().utcOffset('-0700').subtract(3, 'hours')}
          endDate={moment().utcOffset('-0700').add(15, 'hours')}
          heading={'Time Graph Scheduler'}
          showCurrentTime={true}
          data={demoEvents}
          header={demoResources}
          showSecondTimeline={false}
          showSecondTime={false}
          dayCellWidth={'2.6%'}
          oddColor={'rgba(8}132}199}.04)'}
          scheduler={(e) => {}}
          resourceName={'Scheduler Details'}
          currentTime={moment().utcOffset('-0700')}
        />
      </div>
    </>
  );
}

export default App;
