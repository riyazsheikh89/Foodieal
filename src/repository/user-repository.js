import CrudRepository from './crud-repository.js';
import User from '../models/user.js';

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    // find with a particular field
    async findBy(data) {
        try {
            const result = await User.findOne(data);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;

