class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response =  await this.model.create(data);
            return response;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }

    async get(id) {
        try {
            const response =  await this.model.findById(id);
            return response;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }

    // filter might be an empty object like: {}, it will fetch all the documents from a collection
    async getAll(filter) {
        try {
            const response = await this.model.find(filter);
            return response;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }

    async update(id, data) {
        try {
            // {new:true} -> it will return the updated document
            const response = await this.model.findByIdAndUpdate(id, data, {new: true});
            return response;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }

    async destroy(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }
}

export default CrudRepository;