import * as mongoose from 'mongoose';

export const PackagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    _package: {
        recommendVersion: {
          type: String,
          required: false
        },
        addedBy: {
          type: String,
          required: true,
        },
        isImportant: {
          type: Boolean,
          required: true
        }
    }
});
