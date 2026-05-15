let courses = [ 
  { 
    id: 1, 
    title: "ReactJS Tutorial", 
    rating: 4.2, 
  }, 
  { 
    id: 2, 
    title: "Angular Tutorial", 
    rating: 2.5, 
  }, 
  { 
    id: 3, 
    title: "VueJS Tutorial", 
    rating: 3.8, 
  }, 
  { 
    id: 4, 
    title: "Java Tutorial", 
    rating: 4, 
  }, 
  { 
    id: 5, 
    title: "JavaScript Tutorial", 
    rating: 3.5, 
  }, 
];

const addedCourses = [
  { id: 6, title: "PHP Tutorial", rating: 3 },
  { id: 7, title: "C# Tutorial", rating: 2 },
  { id: 8, title: "Docker Tutorial", rating: 3.8 },
];

const highRatedCourse = courses.filter(({rating}) => rating >= 4);
console.log("===Course có rating >= 4 là: ===");
console.log(highRatedCourse);

const lowRatedCourse = courses.filter(({rating}) => rating < 4)
                                .map(({id, title, rating}) => `${id} - ${title} - ${rating}`);
console.log("\n===Course có rating >=4 (đã format)===");
console.log(lowRatedCourse);

const mergeCourse = (arr1, arr2) => [...arr1, ...arr2];
const allCourse = mergeCourse(courses, addedCourses)
console.log(allCourse);




