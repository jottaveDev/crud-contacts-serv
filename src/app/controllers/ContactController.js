const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const contacts = await ContactRepository.findAll();
    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      res.status(404).json({ error: 'user not found' });
    }

    res.json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const emailExists = await ContactRepository.findByEmail(email);

    if (emailExists) {
      return res.status(400).json({ error: 'Email existing' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      res.status(404).json({ error: 'user not found' });
    }

    await ContactRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
