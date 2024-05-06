const db = require('../../database');

class CategoryRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(
      `SELECT * FROM categories ORDER BY name ${direction}`,
    );
    return rows;
  }

  async create({ name }) {
    const [row] = await db.query(
      `
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `,
      [name],
    );
    return row;
  }
}

module.exports = new CategoryRepository();
