import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Money from '@material-ui/icons/AttachMoneyOutlined';
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
import Alarm from '@material-ui/icons/AlarmOutlined';
import { DatePicker } from '@material-ui/pickers';

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

import styles from '../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export const Summary = () => {
  const classes = useStyles();
  const [month, setMonth] = useState(new Date());
  return (
    <div>
      <div className={classes.dateWrapper}>
        <DatePicker
          variant='inline'
          label='Month'
          value={month}
          onChange={setMonth}
          minDate={new Date('2021-06-01')}
          maxDate={new Date()}
          // maxDate={new Date()}
          inputVariant='outlined'
          autoOk={true}
          views={['month', 'year']}
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
              <h3 className={classes.cardTitle}>{'1000'}&#8362;</h3>
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
              <h3 className={classes.cardTitle}>{8000}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Hours: {120}/h
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
                tableData={[
                  ['01/07/2021', '150', '4.5', '350'],
                  ['02/07/2021', '300', '5', '400'],
                  ['03/07/2021', '420', '6.45', '600'],
                  ['04/07/2021', '300', '5.5', '520']
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
