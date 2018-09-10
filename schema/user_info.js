const moment = require('moment')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_info', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ''
        },
        headImg: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'head_img',
            defaultValue: ''
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ''
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        address: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ''
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: ''
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }, {
        underscored: true,
        //timestamps: false,
        //paranoid: true,
        freezeTableName: true, // 为 true 则表的名称和 model 相同
        charset: 'utf8'
    })
}