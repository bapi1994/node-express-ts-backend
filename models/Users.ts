import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";

class Register extends Model {
  public id!: number;
  public name!: string | null;
  public email!: string | null;
  public phone!: string | null;
  public password!: string | null;
  public status!: number;
}

Register.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(250),
    },
    email: {
      type: new DataTypes.STRING(250),
    },
    phone: {
      type: new DataTypes.STRING(250),
    },
    password: {
      type: new DataTypes.STRING(200),
    },
    status: {
      type: new DataTypes.INTEGER(),
      defaultValue: 0,
    },
  },
  {
    tableName: "db_users",
    sequelize: sequelize,
    timestamps: true,
  }
);

export default Register;
