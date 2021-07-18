import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Money from '@material-ui/icons/AttachMoneyOutlined';
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
import Alarm from '@material-ui/icons/AlarmOutlined';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from '@material-ui/pickers';

import {
  GridItem,
  GridContainer,
  Card,
  CardHeader,
  CardIcon,
  CardFooter,
  Tasks,
  FloatingButton,
  Modal,
  CardBody
} from '../components';

import styles from '../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export const Dashboard = () => {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [todayMassages, setTodayMassages] = useState([]);
  const [massageEditable, setMassageEditable] = useState({});

  const handleMassageInsert = ({ type, minutes, id }) => {
    setModalVisible(false);
    // if massage exists, update it
    if (id) {
      const updateMassage = todayMassages.find((item) => item.id === id);
      updateMassage.type = type;
      updateMassage.minutes = minutes;
      setTodayMassages(todayMassages);
      setMassageEditable({});
    } else {
      setTodayMassages([...todayMassages, { minutes, type, id: uuidv4() }]);
    }
  };

  const handleMassageDelete = (id) => {
    setTodayMassages(todayMassages.filter((item) => item.id !== id));
  };

  const handleMassageEdit = (item) => {
    setMassageEditable(item);
    setModalVisible(true);
  };

  const calculateTotalMoney = () => {
    let total = 0;
    for (const element of todayMassages) {
      total += element.minutes;
    }
    const displayTotal = (total / 60) * 100;
    return displayTotal % 1 === 0 ? displayTotal : displayTotal.toFixed(2);
  };

  const calculateTotalMinutes = () => {
    let total = 0;
    for (const element of todayMassages) {
      total += element.minutes;
    }
    return total;
  };

  const calculateTotalHours = () => {
    let total = calculateTotalMinutes() / 60;
    return total % 1 === 0 ? total : total.toFixed(2);
  };

  return (
    <div>
      <div className={classes.dateWrapper}>
        <DatePicker
          variant='inline'
          label='Today'
          value={date}
          onChange={setDate}
          maxDate={new Date()}
          format='DD/MM/YYYY'
          inputVariant='outlined'
          autoOk={true}
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
                Today
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
                Hours: {calculateTotalHours()}/h
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Massages</h4>
            </CardHeader>
            <CardBody>
              <Tasks
                tasks={todayMassages}
                onDelete={handleMassageDelete}
                onEdit={handleMassageEdit}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <FloatingButton onClick={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        onOk={handleMassageInsert}
        onClose={() => setModalVisible(false)}
        massageEditable={massageEditable}
      />
    </div>
  );
};
