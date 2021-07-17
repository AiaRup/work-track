import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Money from '@material-ui/icons/Money';
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';

import {
  GridItem,
  GridContainer,
  Card,
  CardHeader,
  CardIcon,
  CardFooter,
  CustomTabs,
  Tasks,
  FloatingButton,
  Modal
} from '../components';

import { bugs, website, hours } from '../variables/general.js';
import styles from '../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export const Dashboard = () => {
  const classes = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [todayMassages, setTodayMassages] = useState([]);

  const handleMassageInsert = ({ massageType, massageMinutes }) => {
    const totalMin = totalMinutes + massageMinutes;
    setModalVisible(false);
    setTotalMinutes(totalMin);
    setTodayMassages([...todayMassages, { massageMinutes, massageType }]);
    setTotalMoney((totalMin / 60) * 100);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Money />
              </CardIcon>
              <p className={classes.cardCategory}>Money</p>
              <h3 className={classes.cardTitle}>{totalMoney}&#8362;</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Today
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='info' stats icon>
              <CardIcon color='info'>
                <AccessibilityNewIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Today Massages</p>
              <h3 className={classes.cardTitle}>{totalMinutes}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                hours: {totalMinutes / 60}/h
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title='Tasks:'
            headerColor='primary'
            tabs={[
              {
                tabName: 'Bugs',
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                    hours={hours}
                  />
                )
              },
              {
                tabName: 'Website',
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
      <FloatingButton onClick={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        onOk={handleMassageInsert}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};
