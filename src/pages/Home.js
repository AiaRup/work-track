import React, { useState } from 'react';

import { Modal, Tabs } from '../components';

const Home = () => {
  const [modalVisible, setmodalVisible] = useState(true);
  return (
    <>
      <div>Hola</div>
      <Tabs />
      <Modal visible={modalVisible} />
    </>
  );
};

export default Home;
