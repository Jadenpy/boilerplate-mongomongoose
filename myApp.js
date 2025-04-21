require('dotenv').config();
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('成功连接到MongoDB数据库');
}).catch((err) => {
  console.log('连接数据库失败：', err);
});

// 1. Assign Mongoose Schema to a variable
const Schema = mongoose.Schema;

// name:string
// name:{type:String}
// name{type:String,required:true}

// 2. Create Person schema.
// const personSchema = new Schema({
//   name: {type: String, required: true},
//   age: Number,
//   favoriteFoods: [String]
// });
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});


// 3. Create Person model from the schema.
// const Person = mongoose.model("Person", personSchema);
// const Person = mongoose.model("Person", personSchema);






let Person = mongoose.model("Person", personSchema);

// var Person = mongoose.model('Person', personSchema);

// var createAndSavePerson = function(done) {
//   var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

//   janeFonda.save(function(err, data) {
//     if (err) return console.error(err);
//     done(null, data)
//   });
// };

const createAndSavePerson = (done) => {
  let janeFonda = new Person({
    name: "Jane Fonda",
    age: 84,
    favoriteFoods: ["eggs", "fish", "fresh fruit"]
  })

  janeFonda.save(function(err,data) {
    if (err) return console.error(err);
    done(null ,data);
  })
};
// 列表准备
let arrayofPeople = [
  {name: "Jaden", age: 43, favoriteFoods: ["三文鱼", "炒饭", "排骨汤"]},
  {name: "Alex", age: 19, favoriteFoods: ["山珍", "海味"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  // 实例化
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.error (err);
    done(null,people);

  })
  // done(null /*, data*/);
};

let personName = "jaden"
const findPeopleByName = (personName, done) => {
  Person.find( {name:personName}, function(err, personFound) {
    if (err) return console.error (err);
    done(null,personFound);
  })
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error (err);
    done(null, data);
  })
  // done(null /*, data*/);
};
// find
const findPersonById = (personId, done) => {
  Person.findById( {_id: personId}, function(err,data){
    if (err) return console.error (err);
    done(null, data);
  })
}
 
// classic find & update
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // 找出person 通过给定的ID
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
  // 在被找出人的信息增加
    person.favoriteFoods.push(foodToAdd);
  // 保存
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    })
  })
};
// find & update
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
// done(null /*, data*/);
};
// remove one
const removeById = (personId, done) => {
  Person.findOneAndDelete({_id: personId}, (err, data) => {
    if (err) return console.log(err);
    done(null , data);
  })
  
};
// remove many
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removeResult) => {
    if (err) return console.log(err);
    done(null , removeResult);
  })
};

// 链式操作   
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1}) 
  .limit(2)
  .select('-age')
  .exec((err, foundPeople) => {
    if (err) return console.log(err);
    done(null , foundPeople);
  })
};

// /** **Well Done !!**
// /* You completed these challenges, let's go celebrate !
//  */

// //----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
console.log("** **App.js is running now**")