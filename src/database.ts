import mongoose from "mongoose";

export const connectToMongoDB = (uri: string) => {
    mongoose.connect(uri, {
    })
    .then(db => console.log('DB connected'))
    .catch(err => console.log('Couldn\'t connect DB', uri, err))
}