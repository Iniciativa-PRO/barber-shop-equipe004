const { Model, DataTypes } = require('sequelize');

class UserProfile extends Model{
  static init(sequelize){
    super.init({
      ID: DataTypes.INTEGER,
      USUARIO: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = UserProfile

// DROP TABLE IF EXISTS `usuario_perfis`;
// /*!40101 SET @saved_cs_client     = @@character_set_client */;
// /*!50503 SET character_set_client = utf8mb4 */;
// CREATE TABLE `usuario_perfis` (
//   `ID` int NOT NULL,
//   `USUARIO` varchar(45) DEFAULT NULL,
//   PRIMARY KEY (`ID`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
// /*!40101 SET character_set_client = @saved_cs_client */;