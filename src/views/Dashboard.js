import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Money from '@material-ui/icons/Money';
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { v4 as uuidv4 } from 'uuid';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [todayMassages, setTodayMassages] = useState([]);
  const [massageEditable, setMassageEditable] = useState({});

  const handleMassageInsert = ({ massageType, massageMinutes, id }) => {
    setModalVisible(false);
    // if massage exists, update it
    if (id) {
      const updateMassage = todayMassages.find((item) => item.id === id);
      updateMassage.massageType = massageType;
      updateMassage.massageMinutes = massageMinutes;
      setTodayMassages(todayMassages);
      setMassageEditable({});
    } else {
      setTodayMassages([
        ...todayMassages,
        { massageMinutes, massageType, id: uuidv4() }
      ]);
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
      total += element.massageMinutes;
    }
    return (total / 60) * 100;
  };

  const calculateTotalMinutes = () => {
    let total = 0;
    for (const element of todayMassages) {
      total += element.massageMinutes;
    }
    return total;
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
                <AccessibilityNewIcon />
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
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Massages</h4>
              <p className={classes.cardCategoryWhite}>17/07/2021</p>
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
