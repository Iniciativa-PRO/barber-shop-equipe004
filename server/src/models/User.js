const { Model, DataTypes } = require('sequelize');

class User extends Model{
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      telefone: DataTypes.STRING,
      senha: DataTypes.STRING
    }, {
      sequelize
    })
  }
  static associate(models){
    this.hasMany(models.User, { foreignKey: 'id_usuario', as: 'agendamentos' });
  }
}

module.exports = User

// DROP TABLE IF EXISTS `usuarios`;
// /*!40101 SET @saved_cs_client     = @@character_set_client */;
// /*!50503 SET character_set_client = utf8mb4 */;
// CREATE TABLE `usuarios` (
//   `ID_USUARIO` int NOT NULL,
//   `USUARIO` varchar(45) DEFAULT NULL,
//   `EMAIL` varchar(45) DEFAULT NULL,
//   `SENHA` varchar(45) DEFAULT NULL,
//   `USUARIO_PERFIS` varchar(45) DEFAULT NULL,
//   PRIMARY KEY (`ID_USUARIO`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
// /*!40101 SET character_set_client = @saved_cs_client */;