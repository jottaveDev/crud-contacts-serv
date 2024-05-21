const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await ContactRepository.findAll(orderBy);
    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);
    if (!contact) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;
    const emailExists = await ContactRepository.findByEmail(email);
    const phoneExists = await ContactRepository.findByPhone(phone);

    if (!name) {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    if (emailExists) {
      return res.status(400).json({ message: 'Email existente' });
    }
    if (phoneExists) {
      return res.status(400).json({ message: 'Telefone existente' });
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
    const contactByEmail = await ContactRepository.findByEmail(email);
    const phoneExists = await ContactRepository.findByPhone(phone);

    if (!contactExists) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    if (!name) {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ message: 'Esse email já existe' });
    }
    if (phoneExists && phoneExists.id !== id) {
      return res.status(400).json({ message: 'Telefone existente' });
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
    await ContactRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
