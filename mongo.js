const mongoose= require('mongoose')

mongoose.connect("mongodb://localhost:27017/signin")
.then(()=>{
  console.log('mongodb connected');
})
.catch(()=>{
  console.log('sign error');
})

const signin_Schema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }

})

const collection = new mongoose.model('sign_collec', signin_Schema)

data = [
{
  name:"Kaarthic",
  password:"abc"
},
{
  name:"Karthikeyen",
  password:"defg"
},
{
  name:"Naveen",
  password:"xyzw"
}]

async function insertData() {
  for (const item of data) {
    try {
      // Check if the document with the same name already exists
      const existingUser = await collection.findOne({ name: item.name });

      if (!existingUser) {
        await collection.create(item);
        console.log(`Inserted: ${item.name}`);
      } else {
        console.log(`User already exists: ${item.name}`);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }
}


insertData();