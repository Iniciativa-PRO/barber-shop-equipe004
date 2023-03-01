const { Model, DataTypes } = require('sequelize');

class Scheduling extends Model{
  static init(sequelize){
    super.init({
      ID: DataTypes.INTEGER,
      DATA_AGENDAMENTO: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = Scheduling

// CREATE TABLE `agendamentos` (
//     `ID` int NOT NULL,
//     `DATA_AGENDAMENTO` datetime DEFAULT NULL,
//     `ID_SERVICO` int DEFAULT NULL,
//     `ID_USUARIO` int DEFAULT NULL,
//     PRIMARY KEY (`ID`),
//     KEY `FK_IDSERVICO` (`ID_SERVICO`),
//     KEY `FK_IDSUARIO` (`ID_USUARIO`),
//     CONSTRAINT `FK_IDSERVICO` FOREIGN KEY (`ID_SERVICO`) REFERENCES `servicos` (`ID_SERVICO`),
//     CONSTRAINT `FK_IDSUARIO` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;