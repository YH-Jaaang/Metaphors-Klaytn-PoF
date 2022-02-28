#Metaphors-Klaytn

# 개요
본 프로젝트는 2021 위믹스 해커톤에 참가하여 구현한 PoF 팀의 프로젝트입니다.

## 프로젝트 구조
```bash
- Metaphors
    +- public         ==> 정적 리소스 파일들
    +- routes         ==> Express 소스 파일들
    +- stories        ==> React 스토리북 소스 파일들
    +- truffle 
      +- abi          ==> 스마트 컨트랙트의 abi 파일들
      +- address      ==> 스마트 컨트랙트 ADDRESS
      +- contracts    ==> Solidity 소스 파일들
      +- migrations   ==> Migrate를 위한 자바스크립트 소스 파일들
      +- test         ==> Solidity 테스트 소스 코드
```

# 빌드
## 시스템 필요사항
* node 12.22.9
* truffle 5.1.23
* mariadb 5.5.68

## 시스템 빌드 방법
### Smart Contract(Solidity) 컴파일
* 명령어 실행시, truffle/address 경로에 위치한 기존 스마트 컨트랙트 주소 변경
* Klaytn Baobab Test Network 사용
```bash
  $ truffle compile
```
### Smart Contract(Solidity) 테스트
* 명령어 실행시, truffle/test 경로에 위치한 테스트 코드 실행 
* Ganache Network 에서 사용 가능
```bash
  $ truffle test --network ganache [private key]
```
### Smart Contract(Solidity) 배포
* 명령어 실행시, truffle/address 경로에 위치한 기존 스마트 컨트랙트 주소 변경
* Klaytn Baobab Test Network 사용
```bash
  $ truffle migrate --network baobab [private key]
```


### 서버
#### 포그라운드에서 실행
```bash
  $ node bin/www [private key]
```
#### 백그라운드에서 실행
```bash
  $ nohup node bin/www [private key] > [로그 파일 경로] &  
   
```
