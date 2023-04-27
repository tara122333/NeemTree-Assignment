import mongoose from 'mongoose';
mongoose.set("strictQuery", false);
export default async ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/KlimbAssignment",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};