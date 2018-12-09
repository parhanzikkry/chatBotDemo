module.exports = (sequelize, DataType) => {
	return sequelize.define('schedules', {
        id_master: {
            type: DataType.BIGINT,
			validate: {
				notEmpty: true,
			}
        },
        description: {
			type: DataType.TEXT,
			validate: {
				notEmpty: true,
			}
		},
		date: {
			type: DataType.DATEONLY,
			validate: {
				notEmpty: true,
			}
		},
	});
}