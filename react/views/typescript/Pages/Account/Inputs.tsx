import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IInput } from '../../Store/Type/Interfaces';

const judgeIsWrong = (reg: RegExp, value: string) => {
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const InputEmail = ({ setState, isExternalWrong }: IInput) => {
  const [value, setValue] = useState('');
  const [isWrong, setIsWrong] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setState(value);
    if (value.length > 0) {
      setIsWrong(judgeIsWrong(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, value));
    } else {
      setIsWrong(false);
    }
  }, [value]);

  return (
    <InputBox>
      <InputStyle
        type="text"
        placeholder="이메일을 입력해주세요"
        value={value}
        onChange={handleChange}
      />
      {isWrong && <p className="alert">잘못된 이메일 형식입니다.</p>}
      {isExternalWrong && <p className="alert">이미 가입된 이메일 주소입니다.</p>}
    </InputBox>
  );
};

export const InputPassword = ({ setState }: IInput) => {
  const [value, setValue] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const { pathname } = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setState(value);
    if (value.length > 0) {
      setIsWrong(judgeIsWrong(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, value));
    } else {
      setIsWrong(false);
    }
  }, [value]);

  return (
    <InputBox>
      <InputStyle
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={value}
        onChange={handleChange}
      />
      {pathname.includes('/signup') && (
        <p className="password_guide">*8~16자의 영문, 숫자를 사용한 비밀번호를 입력해주세요.</p>
      )}
      {isWrong && <p className="alert">잘못된 비밀번호 형식입니다.</p>}
    </InputBox>
  );
};

export const InputPasswordAgain = ({ setState, isExternalWrong }: IInput) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <InputBox>
      <InputStyle
        type="password"
        placeholder="비밀번호를 재입력해주세요"
        value={value}
        onChange={handleChange}
      />
      {isExternalWrong && <p className="alert">비밀변호가 일치하지 않습니다</p>}
    </InputBox>
  );
};

const InputBox = styled.div`
  position: relative;
  .alert {
    ${({ theme }) => theme.mixin.textStyle.R_11}
    color: #ff5e5e;
    position: absolute;
    bottom: -20px;
    left: 0;
  }
  .password_guide {
    ${({ theme }) => theme.mixin.textStyle.R_11}
    margin-top: 10px;
    padding-left: 5px;
  }
`;

const InputStyle = styled.input`
  display: block;
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  box-shadow: none;
  border-radius: none;
  padding: 7px 5px;
  ${({ theme }) => theme.mixin.textStyle.R_16}
`;
