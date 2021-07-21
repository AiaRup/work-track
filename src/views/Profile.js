import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  GridItem,
  GridContainer,
  Card,
  CardHeader,
  ProfileSettings,
  CardBody,
  ChangePassword
} from '../components';

export const Profile = () => {
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color='danger'>
              <h4>
                <FormattedMessage id='settings' />
              </h4>
            </CardHeader>
            <CardBody>
              <ProfileSettings />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color='rose'>
              <h4>
                <FormattedMessage id='settings' />
              </h4>
            </CardHeader>
            <CardBody>
              <ChangePassword />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};
