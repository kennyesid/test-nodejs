const faker = require('faker');

class UserService {
  constructor() {
    this.users = [];
    this.buildUser();
  }

  buildUser() {
    this.users.push({
      id: faker.datatype.uuid(),
      name: 'yesid alejandro',
      email: 'kennyesid@gmail.com',
      type: 'admin',
      password: '123456'
    })
  }

  find() {
    return new Promise((resolve) => {
      resolve(this.users);
    })
  }

  async create(data) {

    const user = this.users.find(item => item.email === data.email);

    if (user) {
      return -1
    }

    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async findOne(email) {
    const user = this.users.find(item => item.email === email);
    if (!user) {
      throw boom.notFound('usuario no encontrado');
    }
    if (user.isBlock) {
      throw boom.conflict('usuario bloqueado');
    }
    return user;
  }

  async findOneById(id) {
    const user = this.users.find(item => item.id === id);
    if (!user) {
      throw boom.notFound('usuario no encontrado');
    }
    if (user.isBlock) {
      throw boom.conflict('usuario bloqueado');
    }
    return user;
  }

  async update(id, name, email, type, password) {
    const user = this.users.find(item => item.id === id);
    if (user === -1) {
      throw boom.notFound('usuario no encontrado');
    }

    user.name = name;
    user.email = email;
    user.type = type;
    user.password = password;

    return user;
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.users.splice(index, 1);
    return { id };
  }

}

module.exports = UserService;
