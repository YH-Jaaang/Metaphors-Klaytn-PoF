import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import Detail from './Detail';
import Viewer from './Viewer';
import { INovelDetail } from '../../Store/Type/Interfaces';

const Work = () => {
  const [novelDetail, setNovelDetail] = useState<INovelDetail>({
    novelId: 0,
    name: '',
    author: '',
    imagePath: '',
    issueDate: '',
    description: '',
    nftItems: '',
    genre: '',
    current: 0,
  });

  return (
    <Routes>
      <Route
        path="/:id"
        element={<Detail novelDetail={novelDetail} setNovelDetail={setNovelDetail} />}
      />
      <Route path="/viewer/:id/*" element={<Viewer novelDetail={novelDetail} />} />
    </Routes>
  );
};

export default Work;
