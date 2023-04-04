import UserRepository from "../repository/user-repository.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            throw error;
        }
    }


    async login(data) {
        try {
            const user = await this.userRepository.findBy({email: data.email});
            if (!user) {
                throw {message: "No user found with this email!"}
            }

            if(!user.comparePassword(data.password)) {
                throw {message: "Oops! incorrect password"}
            }
            // send the user back, if everything is correct
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getById(data) {
        try {
            const user = await this.userRepository.get(data);
            return user;
        } catch (error) {
            throw error;
        }
    }
}


export default UserService;