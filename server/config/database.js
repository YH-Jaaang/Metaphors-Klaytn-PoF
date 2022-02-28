module.exports = {
  HOST: "169.56.87.186",
  USER: "root",
  PASSWORD: "",
  DB: "text_adventure",
  dialect: "mariadb",
  timezone: '+09:00',
  pool: {
    max: 100,       // 최대 유지 connection 수
    min: 0,       // 최소 유지 connection 수
    acquire: 30000,
    idle: 10000   // connection을 몇ms까지 대기시킬 것인가 (이후엔 버려짐)
  }
};
