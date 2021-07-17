import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Edit from '@material-ui/icons/EditOutlined';
import Delete from '@material-ui/icons/DeleteForeverOutlined';

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
              {task.massageType}
            </TableCell>
            <TableCell className={tableCellClasses + classes.bold}>
              {task.massageMinutes}
            </TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id='tooltip-top'
                title='Edit'
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
                title='Remove'
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
            <TableCell className={tableCellClasses}>List is empty</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};