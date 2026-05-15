//Bài 1
const isPrime = (n) => {
    if(n <= 2) return false;
    for (let i = 2; i < Math.sqrt(n); i++) {
        if(n%i === 0) return false;
    }
    return true;
}

const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const prime = numbers.filter((n) => isPrime(n));

console.log("===Bài 1===");
console.log("Mảng ban đầu: ", numbers);
console.log("Các số nguyên tố: ", prime);

//Bài 2

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  gender: "male",
  occupation: "developer",
  nationality: "American",
  city: "New York",
  hobbies: ["reading", "traveling", "photography"],
  languages: ["English", "Spanish"],
  education: {
    degree: "Bachelor",
    major: "Computer Science",
    university: "Harvard University",
  },
};

const {
    firstName,
    gender,
    education : {degree},
    languages : [english],
} = person

const student = {firstName, gender, degree, english};

console.log("\n===Bài 2===");
console.log("Thông tin student: ", student);


//Bài 3
const getInfo = ({firstName = "Quân", degree = "NA"}) => {
    console.log("firstName", firstName);
    console.log("degree", degree);
};

const sv1 = { firstName: "John", gender: "male", degree: "Bachelor", english: "English" };
const sv2 = { gender: "male", degree: "Bachelor", english: "English" };

console.log("\n===Bài 3===");
console.log("--- getinfo(sv1)");
getInfo(sv1);
console.log("--- getinfo(sv2)");
getInfo(sv2);

//Bài 4
let courses = [
  { id: 1, title: "ReactJS Tutorial", rating: 4.2 },
  { id: 2, title: "Angular Tutorial", rating: 2.5 },
  { id: 3, title: "VueJS Tutorial", rating: 3.8 },
  { id: 4, title: "Java Tutorial", rating: 4 },
  { id: 5, title: "JavaScript Tutorial", rating: 3.5 },
];

const highRatedCourse = courses.filter(({rating}) => rating >= 4);

console.log("\n===Bài 4===");
console.log(highRatedCourse);

//Bài 5
const lowRatedCourse = courses.filter(({rating}) => rating < 4).map(({id, title, rating}) => `${id} - ${title} - ${rating}`);

console.log("\n===Bài 5===");
console.log(lowRatedCourse);

// Bài 6
const addedCourses = [
  { id: 6, title: "PHP Tutorial", rating: 3 },
  { id: 7, title: "C# Tutorial", rating: 2 },
  { id: 8, title: "Docker Tutorial", rating: 3.8 },
];

const mergeCourse = (arr1, arr2) => [...arr1, ...arr2];
const allCourse = mergeCourse(courses, addedCourses);

console.log("\n===Bài 6===");
console.log(allCourse);














