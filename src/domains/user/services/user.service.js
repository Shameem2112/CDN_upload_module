import userRepository from "../repositories/user.repository.js";

class UserService {
  async getUserById(id) {
    return await userRepository.findById(id);
  }

  async getUserByEmail(email) {
    return await userRepository.findByEmail(email);
  }
}

export default new UserService();