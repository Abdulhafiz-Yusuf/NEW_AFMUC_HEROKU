module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: { type: Sequelize.INT },
        name: { type: Sequelize.STRING },
        state: { type: Sequelize.STRING },
        lga: { type: Sequelize.STRING },
        phone: { type: Sequelize.BIGINT(11) },
        email: { type: Sequelize.STRING },
        donor: { type: Sequelize.BOOLEAN },
        bg: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
    });
    return User;
};