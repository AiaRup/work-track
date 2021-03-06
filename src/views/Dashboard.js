import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Money from '@material-ui/icons/AttachMoneyOutlined';
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
import Alarm from '@material-ui/icons/AlarmOutlined';
import Tip from '@material-ui/icons/MoneyOutlined';
import Edit from '@material-ui/icons/EditOutlined';
import { IconButton } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
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
  Tasks,
  FloatingButton,
  Modal,
  TipsModal,
  CardBody,
  ErrorSnackbar
} from '../components';
import { AppContext } from '../contexts';
import * as FirestoreService from '../services/firebase';
import styles from '../assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { useNotification, useNotifier } from '../hooks';

const useStyles = makeStyles(styles);

const localeMap = {
  en: enLocale,
  th: thLocale
};

export const Dashboard = () => {
  const classes = useStyles();
  const [date, setDate] = useState(dayjs());
  const [modalVisible, setModalVisible] = useState(false);
  const [tipsModalVisible, setTipsModalVisible] = useState(false);
  const [todayMassages, setTodayMassages] = useState([]);
  const [todayTips, setTodayTips] = useState(undefined);
  const [massageEditable, setMassageEditable] = useState({});
  const { user, language } = useContext(AppContext);
  const { addNotification } = useNotification();

  useEffect(() => {
    const unsubscribe = FirestoreService.streamMassages(user.id, date, {
      next: (querySnapshot) => {
        const updatedMassages = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        setTodayMassages(
          updatedMassages?.sort(
            (a, b) => a.createdAt?.toDate() - b.createdAt?.toDate()
          )
        );
      },
      error: () => addNotification('error_list_massage', 'error')
    });
    return unsubscribe;
  }, [date, user.id, addNotification]);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamTips(user.id, date, {
      next: (querySnapshot) => {
        const tips = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        if (tips && tips[0]) {
          setTodayTips(tips[0]);
        } else {
          setTodayTips(undefined);
        }
      },
      error: (e) => console.log('error streaming tips', e)
    });
    return unsubscribe;
  }, [date, user.id]);

  const handleMassageInsert = ({ type, minutes, id }) => {
    setModalVisible(false);
    if (id) {
      FirestoreService.updateMassage(id, { type, minutes }).catch(() =>
        addNotification('error_update_massage', 'error')
      );
      setMassageEditable({});
    } else {
      FirestoreService.addMassage({
        minutes,
        type,
        id: uuidv4(),
        user: user.id,
        date: dayjs(date)
      }).catch(() => addNotification('error_add_massage', 'error'));
    }
  };

  const handleMassageDelete = useNotifier({
    action: (id) => {
      return FirestoreService.deleteMassage(id);
    },
    fail: 'error_delete_massage'
  });

  const handleMassageEdit = (item) => {
    setMassageEditable(item);
    setModalVisible(true);
  };

  const handleTipsInsert = ({ amount, id }) => {
    setTipsModalVisible(false);
    if (id) {
      FirestoreService.updateTips(id, { amount });
      setTodayTips(undefined);
    } else {
      FirestoreService.addTips({
        amount,
        id: uuidv4(),
        user: user.id,
        date: dayjs(date)
      });
    }
  };

  const calculateTotalMoney = () => {
    let total = 0;
    for (const element of todayMassages) {
      total += element.minutes;
    }
    const displayTotal = (total / 60) * (user.hourSalary || 100);
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
    if (total % 1 === 0) {
      return total;
    }
    const roundTotal = Math.trunc(total);
    const decimal = Math.round((total - roundTotal).toFixed(2) * 60) / 100;
    return (roundTotal + decimal).toFixed(2);
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
            label={<FormattedMessage id='today' />}
            value={date}
            onChange={setDate}
            maxDate={new Date()}
            format='dd/MM/yyyy'
            inputVariant='outlined'
            autoOk={true}
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
                <FormattedMessage id='today' />
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
                <span className={classes.bold}>{calculateTotalHours()}</span> /h
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='warning' stats icon>
              <CardIcon color='warning'>
                <Tip />
              </CardIcon>
              <p className={classes.cardCategory}>
                <FormattedMessage id='tip' />
              </p>
              <h3 className={classes.cardTitle}>
                {todayTips ? todayTips.amount : 0}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                <FormattedMessage id='today' />
              </div>
              <IconButton
                aria-label='Edit'
                className={classes.editButton}
                onClick={() => setTipsModalVisible(true)}
              >
                <Edit className={classes.editButtonIcon + ' ' + classes.edit} />
              </IconButton>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage id='massages' />
              </h4>
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
      <TipsModal
        visible={tipsModalVisible}
        onOk={handleTipsInsert}
        onClose={() => setTipsModalVisible(false)}
        tips={todayTips}
      />
    </div>
  );
};
