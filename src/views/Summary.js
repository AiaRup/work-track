import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Money from '@material-ui/icons/AttachMoneyOutlined';
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
import Alarm from '@material-ui/icons/AlarmOutlined';
import Tip from '@material-ui/icons/MoneyOutlined';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import { FormattedMessage } from 'react-intl';
import enLocale from 'date-fns/locale/en-US';
import thLocale from 'date-fns/locale/th';

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

const localeMap = {
  en: enLocale,
  th: thLocale
};

export const Summary = () => {
  const classes = useStyles();
  const [month, setMonth] = useState(new Date());
  const [monthMassages, setMonthMassages] = useState([]);
  const [monthTips, setMonthTips] = useState([]);
  const { user, language } = useContext(AppContext);

  useEffect(() => {
    FirestoreService.getMassagesByDateRange(user.id, month, 'month')
      .then((data) => setMonthMassages(data))
      .catch((e) => console.log('error getting month massages', e));
  }, [month, user.id]);

  useEffect(() => {
    FirestoreService.getTipsByDateRange(user.id, month, 'month')
      .then((data) => setMonthTips(data))
      .catch((e) => console.log('error getting month tips', e));
  }, [month, user.id]);

  const calculateTotalMoney = () => {
    let total = 0;
    for (const element of monthMassages) {
      total += element.minutes;
    }
    const displayTotal = (total / 60) * (user.hourSalary || 100);
    return displayTotal % 1 === 0 ? displayTotal : displayTotal.toFixed(2);
  };

  const calculateTotalMinutes = () => {
    let total = 0;
    for (const element of monthMassages) {
      total += element.minutes;
    }
    return total;
  };

  const calculateTotalHours = (minutes) => {
    let total = minutes / 60;
    if (total % 1 === 0) {
      return total;
    }
    const roundTotal = Math.trunc(total);
    const decimal = Math.round((total - roundTotal).toFixed(2) * 60) / 100;
    return (roundTotal + decimal).toFixed(2);
  };

  const roundNumber = (total) => {
    return total % 1 === 0 ? total : total.toFixed(2);
  };

  return (
    <div>
      <div className={classes.dateWrapper}>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          locale={localeMap[language]}
        >
          <DatePicker
            variant='inline'
            label={<FormattedMessage id='month' />}
            value={month}
            onChange={setMonth}
            minDate={dayjs('2021-06-01')}
            maxDate={dayjs()}
            inputVariant='outlined'
            autoOk={true}
            views={['year', 'month']}
            format='MMMM yyyy'
          />
        </MuiPickersUtilsProvider>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Money />
              </CardIcon>
              <p className={classes.cardCategory}>
                <FormattedMessage id='money' />
              </p>
              <h3 className={classes.cardTitle}>
                {calculateTotalMoney()}&#8362;
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                <FormattedMessage id='working_days' />:
                <span className={classes.bold}>{monthMassages.length}</span>
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
              <p className={classes.cardCategory}>
                <FormattedMessage id='minutes' />
              </p>
              <h3 className={classes.cardTitle}>{calculateTotalMinutes()}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                <FormattedMessage id='hours' />:{' '}
                <span className={classes.bold}>
                  {calculateTotalHours(calculateTotalMinutes())}
                </span>{' '}
                /h
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='danger' stats icon>
              <CardIcon color='danger'>
                <Tip />
              </CardIcon>
              <p className={classes.cardCategory}>
                <FormattedMessage id='tip' />
              </p>
              <h3 className={classes.cardTitle}>{monthTips}&#8362;</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                <FormattedMessage id='working_days' />:
                <span className={classes.bold}>{monthMassages.length}</span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color='warning'>
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage id='massages' />
              </h4>
              <p className={classes.cardCategoryWhite}>
                <FormattedMessage id='overview_by_date' />
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor='warning'
                tableHead={[
                  <FormattedMessage id='date' />,
                  <FormattedMessage id='minutes' />,
                  <FormattedMessage id='hours' />,
                  <FormattedMessage id='salary' />
                ]}
                tableData={monthMassages.map((m) => [
                  m.date,
                  m.minutes,
                  `${calculateTotalHours(m.minutes)} /h`,
                  `${roundNumber((m.minutes / 60) * 100)} ₪`
                ])}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
