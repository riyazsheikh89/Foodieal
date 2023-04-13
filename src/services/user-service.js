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
            const user = await this.userRepository.findByEmailWithPassword({email: data.email});
            if (!user) {
                throw {message: "No user found with this email!"}
            }

            const response = await user.comparePassword(data.password);
            if(!response) {
                throw {message: "Oops! incorrect password"}
            }
            // send the user back, if everything is correct
            return user;
        } catch (error) {
            throw error;
        }
    }

    // get a particular user
    async getUser(data) {
        try {
            const user = await this.userRepository.get(data);
            return user;
        } catch (error) {
            throw error;
        }
    }

    // get all users
    async getUsers(filter) {
        try {
            const users = await this.userRepository.getAll(filter);
            return users;
        } catch (error) {
            throw error;
        }
    }

    //generate password reset link
    async generateResetLink(data) {
        try {
           const user = await this.userRepository.findBy(data);
           if (!user) {
            throw ('User not found with this email id');
           }
           // if user is found generate unique token and store it on DB
           const passResetToken = user.generatePasswordResetToken();
           await user.save({validateBeforeSave: false}); // as we have update the user, we need to save the document
           
           return passResetToken;
        } catch (error) {
            throw error;
        }
    }

    // Change the password for reset link
    async changePassword(payLoad, password) {
        try {
          const user = await this.userRepository.findBy(payLoad);
          if (!user) {
            throw  ("Invalide Reset Password token or token has expired! Please try again");
          }

          // if user has found, update the password
          user.password = password;
          user.passwordResetToken = undefined;
          user.resetTokenExpiry = undefined;
          await user.save();
          // return the user for sending login token
          return user;
        } catch (error) {
            throw error;
        }
    }

    // Update password
    async updatePassword(data, oldPassword, newPassword) {
        try {
            const user = await this.userRepository.findByIdWithPassword(data);
            const response = await user.comparePassword(oldPassword);
            if (!response) {
                throw ('Old password is incorrect! please enter the correct password');
            }
            user.password = newPassword;
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }
}


export default UserService;