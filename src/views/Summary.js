import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Money from '@material-ui/icons/AttachMoneyOutlined';
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
import Alarm from '@material-ui/icons/AlarmOutlined';
import { DatePicker } from '@material-ui/pickers';
import * as dayjs from 'dayjs';

import {
  GridItem,
  GridContainer,
  Card,
  CardHeader,
  CardIcon,
  CardFooter,
  Table,
  CardBody
} from '../components';
import * as FirestoreService from '../services/firebase';
import { AppContext } from '../contexts';
import styles from '../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export const Summary = () => {
  const classes = useStyles();
  const [month, setMonth] = useState(new Date());
  const [monthMassages, setMonthMassages] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    FirestoreService.getMassagesByDateRange(user.id, month, 'month')
      .then((data) => setMonthMassages(data))
      .catch((e) => console.log('error getting month massages', e));
  }, [month, user.id]);

  const calculateTotalMoney = () => {
    let total = 0;
    for (const element of monthMassages) {
      total += element.minutes;
    }
    const displayTotal = (total / 60) * 100;
    return displayTotal % 1 === 0 ? displayTotal : displayTotal.toFixed(2);
  };

  const calculateTotalMinutes = () => {
    let total = 0;
    for (const element of monthMassages) {
      total += element.minutes;
    }
    return total;
  };
  return (
    <div>
      <div className={classes.dateWrapper}>
        <DatePicker
          variant='inline'
          label='Month'
          value={month}
          onChange={setMonth}
          minDate={dayjs('2021-06-01')}
          maxDate={dayjs()}
          inputVariant='outlined'
          autoOk={true}
          views={['year', 'month']}
          format='MMMM YYYY'
        />
      </div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Money />
              </CardIcon>
              <p className={classes.cardCategory}>Money</p>
              <h3 className={classes.cardTitle}>
                {calculateTotalMoney()}&#8362;
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Month
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='info' stats icon>
              <CardIcon color='info'>
                <Alarm />
              </CardIcon>
              <p className={classes.cardCategory}>Minutes</p>
              <h3 className={classes.cardTitle}>{calculateTotalMinutes()}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Hours: {calculateTotalMinutes() / 60}/h
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color='warning'>
              <h4 className={classes.cardTitleWhite}>Massages</h4>
              <p className={classes.cardCategoryWhite}>Overview by date</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor='warning'
                tableHead={['Date', 'Minutes', 'Hours', 'Salary']}
                tableData={monthMassages.map((m) => [
                  m.date,
                  m.minutes,
                  `${m.minutes / 60}/h`,
                  `${(m.minutes / 60) * 100}₪`
                ])}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
