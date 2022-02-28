import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FirstSignIn from './FirstSignIn';
import Signin from './Signin';
import Signup from './Signup';
import CreateCharacterNft from './CreateCharacterNft';
import CompleteCreateCharacter from './CompleteCreateCharacter';

const Account = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup/*" element={<Signup />} />
      <Route path="/firstsignin" element={<FirstSignIn />} />
      <Route path="/character" element={<CreateCharacterNft />} />
      <Route path="/complete" element={<CompleteCreateCharacter />} />
    </Routes>
  );
};

export default Account;
