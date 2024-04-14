// NOTE: Do not use arrow function for virtual-property and static-method.
module.exports = (mongoose) => {

// Sets model & collection name here.
const modelName = 'User';
const collectionName = 'users';

const schema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    token: {type: String}

  }, {
    id: false,
    strict: true,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

  // Define a model or retrieves it.
  schema.set('toObject', { virtuals: true });
  schema.set('toJSON', { virtuals: true });

  mongoose.model(modelName, schema, collectionName);


};