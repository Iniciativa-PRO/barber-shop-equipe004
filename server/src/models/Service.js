const { Model, DataTypes } = require('sequelize');

class Service extends Model{
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING,
      loja: DataTypes.STRING,
      preco: DataTypes.STRING,
      descricao: DataTypes.STRING
    }, {
      sequelize
    })
  }
  static associate(models){
    this.hasMany(models.Service, { foreignKey: 'id_servico', as: 'servicos' })
  }
}

module.exports = Service

// DROP TABLE IF EXISTS `servicos`;
// /*!40101 SET @saved_cs_client     = @@character_set_client */;
// /*!50503 SET character_set_client = utf8mb4 */;
// CREATE TABLE `servicos` (
//   `ID_SERVICO` int NOT NULL,
//   `NOME` varchar(45) DEFAULT NULL,
//   `LOJA` varchar(45) DEFAULT NULL,
//   `PRECO` double DEFAULT NULL,
//   `DESCRICAO` longtext,
//   PRIMARY KEY (`ID_SERVICO`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
// /*!40101 SET character_set_client = @saved_cs_client */;

