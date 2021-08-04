import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Tooltip,
  IconButton,
  Table,
  TableRow,
  TableBody,
  TableCell
} from '@material-ui/core';
import Edit from '@material-ui/icons/EditOutlined';
import Delete from '@material-ui/icons/DeleteForeverOutlined';
import { FormattedMessage } from 'react-intl';

import styles from '../assets/jss/material-dashboard-react/components/tasksStyle.js';

const useStyles = makeStyles(styles);

export const Tasks = ({ tasks, rtlActive, onDelete, onEdit }) => {
  const classes = useStyles();
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: rtlActive
  });
  return (
    <Table className={classes.table}>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>
              <FormattedMessage id={task.type?.toLowerCase()} />
            </TableCell>
            <TableCell className={tableCellClasses + classes.bold}>
              {task.minutes}
            </TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id='tooltip-top'
                title={<FormattedMessage id='edit' />}
                placement='top'
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label='Edit'
                  className={classes.tableActionButton}
                  onClick={() => onEdit(task)}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + ' ' + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                id='tooltip-top-start'
                title={<FormattedMessage id='remove' />}
                placement='top'
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label='Close'
                  className={classes.tableActionButton}
                  onClick={() => onDelete(task.id)}
                >
                  <Delete
                    className={
                      classes.tableActionButtonIcon + ' ' + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
        {!tasks.length && (
          <TableRow className={classes.tableRow}>
            <TableCell className={tableCellClasses}>
              <FormattedMessage id='no_massages_yet' />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
