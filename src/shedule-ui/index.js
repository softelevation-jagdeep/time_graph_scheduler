import React, { Component } from 'react';
//import moment from 'moment'
//import 'moment/locale/zh-cn';
import Scheduler, {
  SchedulerData,
  ViewTypes,
  CellUnits,
} from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import { map, size, toNumber } from 'lodash';
import './styles.css';
import { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect } from 'react';
import { useRef } from 'react';
const SchedulerUi = ({
  showCurrentTime = false,
  showSecondTimeline = false,
  showSecondTime = false,
  startDate = moment().startOf('day'),
  data,
  dayCellWidth = '2.6%',
  oddColor = 'rgba(8,132,199,.04)',
  header,
  customResourceTableWidth = '2.6%',
  isLoading = false,
  heading = '',
  scheduler = (e) => {},
  resourceName = 'Scheduler Details',
  endDate = moment().endOf('day'),
  currentTime = moment().utcOffset('-0700'),
}) => {
  const [lineWidth, setlineWidth] = useState(0);
  const [isInternalLoading, setisInternalLoading] = useState(0);
  const [localCurrentTime, setlocalCurrentTime] = useState(currentTime);
  const currViewData = useRef({});
  const cellWidth = (tim, isTime = 0, isNormal = false) => {
    let cellWidthPerMinute =
      document.querySelector('.scheduler-bg-table thead th.header3-text')
        ?.clientWidth / 60;
    let timewidth =
      toNumber(moment(localCurrentTime).format('mm')) * cellWidthPerMinute;
    const finalData =
      (document.querySelector('.scheduler-bg-table thead th.header3-text')
        ?.clientWidth +
        1) *
        tim +
      document.querySelector('#RBS-Scheduler-root tbody tr td')?.clientWidth +
      timewidth -
      isTime;
    if (isNormal) {
      return finalData;
    }
    setlineWidth(finalData);
  };

  useEffect(() => {
    const timeinterval = setInterval(() => {
      setlocalCurrentTime(moment(localCurrentTime).add(1, 'minute'));
    }, 60000);

    return () => {
      clearInterval(timeinterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setisInternalLoading(true);
    setTimeout(() => {
      map(header, (item) => {
        document.querySelector(
          `td[data-resource-id='${item.id}']`,
        ).style.backgroundColor = item.bgColor;
        document.querySelector(
          `td[data-resource-id='${item.id}']`,
        ).style.color = item.color;
        setisInternalLoading(false);
      });
      let lineHours =
        toNumber(moment(localCurrentTime).format('HH')) -
        toNumber(moment(startDate).format('HH'));
      if (lineHours < 0) {
        lineHours =
          24 -
          toNumber(moment(startDate).format('HH')) +
          toNumber(moment(localCurrentTime).format('HH'));
      }
      console.log('lineHours', lineHours);
      cellWidth(lineHours);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [header]);

  window.addEventListener('resize', () => {
    let lineHours =
      toNumber(moment(localCurrentTime).format('HH')) -
      toNumber(moment(startDate).format('HH'));
    if (lineHours < 0) {
      lineHours = 3;
    }
    cellWidth(lineHours);
    console.log(132, lineHours);
  });
  class Basic extends Component {
    constructor(props) {
      super(props);
      const { data, header, setEvents, setResources, resourceName, oddColor } =
        props;
      currViewData.current = new SchedulerData(
        new moment(moment().utcOffset('-0700')),
        ViewTypes.Custom2,
        false,
        false,
        {
          displayWeekend: false,
          eventItemPopoverEnabled: true,
          headerEnabled: false,
          startResizable: false,
          endResizable: false,
          movable: false,
          creatable: false,
          customCellWidth: dayCellWidth,
          scrollToSpecialMomentEnabled: false,
          eventItemLineHeight: 50,
          eventItemHeight: 25,
          eventItemwidth: 30,
          dayCellWidth: dayCellWidth,
          nonAgendaDayCellHeaderFormat: 'M/D|HHmm',
          customResourceTableWidth: customResourceTableWidth,
          nonWorkingTimeBodyBgColor: oddColor,
          nonWorkingTimeHeadBgColor: oddColor,
          defaultEventBgColor: '#1b74a4',
          schedulerWidth: '95%',
          resourceName: resourceName,
        },
        {
          getCustomDateFunc: this.getCustomDate,
          isNonWorkingTimeFunc: this.isNonWorkingTime,
        },
      );
      setResources(currViewData.current);
      setEvents(currViewData.current);
      currViewData.current.setResources(header);
      currViewData.current.setEvents(data);
    }
    componentDidUpdate(previousProps, previousState) {
      currViewData.current.setResources(header);
      currViewData.current.setEvents(data);
    }
    render() {
      const { header, lineWidth, heading } = this.props;
      setTimeout(() => {
        map(header, (item) => {
          document.querySelector(
            `td[data-resource-id='${item.id}']`,
          ).style.backgroundColor = item.bgColor;
          document.querySelector(
            `td[data-resource-id='${item.id}']`,
          ).style.color = item.color;
        });
        let data = window.document.querySelector(
          '#RBS-Scheduler-root.table:nth-child(4) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2)',
        );
        data.style.overflow = '';
        // data.style.width = cellWidth(size(header), -2, true);
        console.log('diiiiiiiiv', data.scrollLeft);
        data.setAttribute('onScroll', (e) => {
          console.log('sdd', e);
        });
      }, 50);
      return (
        <div className="scheduleName">
          <h2>{heading}</h2>
          {showCurrentTime && (
            <>
              <div
                style={{
                  borderLeft: '3px solid red',
                  height:
                    30 +
                    size(header) *
                      toNumber(
                        document
                          .querySelector('.event-container')
                          ?.style.height.replace('px', ''),
                      ),
                  position: 'absolute',
                  width: 0,
                  maxWidth: 0,
                  marginTop: 40,
                  marginLeft: lineWidth,
                  boxShadow: ' 0px 0px 10px gray',
                  zIndex: '999',
                }}
              />
              <p
                style={{
                  position: 'absolute',
                  marginTop:
                    70 +
                    size(header) *
                      toNumber(
                        document
                          .querySelector('.event-container')
                          ?.style.height.replace('px', ''),
                      ),
                  marginLeft: lineWidth - 16,
                  zIndex: '999',
                }}
              >
                {moment(localCurrentTime).format('HHmm')}
              </p>
            </>
          )}
          <Scheduler schedulerData={currViewData.current} />
        </div>
      );
    }
    isNonWorkingTime = (schedulerData, time) => {
      const { localeMoment } = schedulerData;
      if (schedulerData.cellUnit === CellUnits.Hour) {
        let hour = localeMoment(time).hour();
        if (hour % 2 === 0) return true;
      } else {
        let dayOfWeek = localeMoment(time).weekday();
        if (dayOfWeek === 0 || dayOfWeek === 6) return true;
      }
      return false;
    };

    getCustomDate = (schedulerData, num, date = undefined) => {
      let { startDate, endDate } = this.props;
      const { viewType } = schedulerData;
      let cellUnit;
      if (viewType === ViewTypes.Custom2) {
        cellUnit = CellUnits.Hour;
        startDate = moment(startDate)
          .startOf('h')
          .format('YYYY-MM-DD HH:mm:ss');
        endDate = moment(endDate)
          .subtract(24, 'hours')
          .endOf('h')
          .format('YYYY-MM-DD HH:mm:ss');
      }
      return {
        startDate,
        endDate,
        cellUnit,
      };
    };
  }
  return (
    <div>
      <>
        {isInternalLoading || isLoading || lineWidth === 0 ? (
          <div
            className="scheduleName"
            style={{ zIndex: '9999', minHeight: '200vh' }}
          >
            {heading && <h2>Unit Scheduler</h2>}
            <SkeletonTheme baseColor="#e3e3e3" highlightColor="#d4d2d2">
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'4px 0 0 4px'}
                count={1}
                width={'15%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                count={15}
                borderRadius={2}
                width={'4.9%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                count={1}
                borderRadius={'0 4px 4px 0'}
                width={'4.9%'}
                height="40px"
                inline
              />
            </SkeletonTheme>
            <SkeletonTheme baseColor="#ededed" highlightColor="#d4d2d2">
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'4px 0 0 4px'}
                count={1}
                width={'15%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'0px 4px 4px 0px'}
                count={1}
                width={'80%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'4px 0 0 4px'}
                count={1}
                width={'15%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'0px 4px 4px 0px'}
                count={1}
                width={'80%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'4px 0 0 4px'}
                count={1}
                width={'15%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'0px 4px 4px 0px'}
                count={1}
                width={'80%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'4px 0 0 4px'}
                count={1}
                width={'15%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'0px 4px 4px 0px'}
                count={1}
                width={'80%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'4px 0 0 4px'}
                count={1}
                width={'15%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'0px 4px 4px 0px'}
                count={1}
                width={'80%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'4px 0 0 4px'}
                count={1}
                width={'15%'}
                height="40px"
                inline
              />
              <Skeleton
                style={{ marginRight: 1 }}
                borderRadius={'0px 4px 4px 0px'}
                count={1}
                width={'80%'}
                height="40px"
                inline
              />
            </SkeletonTheme>
          </div>
        ) : (
          <></>
        )}
        {size(header) > 0 && (
          <Basic
            showCurrentTime={showCurrentTime}
            showSecondTimeline={showSecondTimeline}
            showSecondTime={showSecondTime}
            startDate={startDate}
            endDate={endDate}
            localCurrentTime={localCurrentTime}
            lineWidth={lineWidth}
            resourceName={resourceName}
            header={header}
            oddColor={oddColor}
            heading={heading}
            data={data}
            setEvents={(event) => {
              scheduler(event);
            }}
            setResources={(event) => {
              scheduler(event);
            }}
          />
        )}
      </>
    </div>
  );
};

export default withDragDropContext(SchedulerUi);
