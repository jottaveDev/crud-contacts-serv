const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;
    const categories = await CategoryRepository.findAll(orderBy);
    res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoryRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ error: 'Category existing' });
    }

    const category = await CategoryRepository.create({ name });

    res.json(category);
  }

  async show(req, res) {
    const { id } = req.params;
    const category = await CategoryRepository.findById(id);

    if (!category) {
      res.status(404).json({ error: 'category not found' });
    }

    res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const categoryExists = await CategoryRepository.findById(id);
    if (!categoryExists) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const nameExists = await CategoryRepository.findByName(name);
    if (nameExists && nameExists.id !== id) {
      return res.status(400).json({ error: 'This name is already in use' });
    }

    const category = await CategoryRepository.update(id, { name });
    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;
    await CategoryRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
