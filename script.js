let taskList = [];

const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");
const badHrElm = document.getElementById("badHrs");
const totalHrsElm = document.getElementById("totalHrs");

const totalHrsPerWeek = 24 * 7;

// get the form data on button click
const handleOnSubmit = (form) => {
  const newTask = new FormData(form);

  const obj = {
    id: randomStr(),
    task: newTask.get("task"),
    hr: +newTask.get("hr"),
    type: "entry",
  };
  const ttlHrs = total();
  // console.log(ttlHrs);
  if (ttlHrs + obj.hr > totalHrsPerWeek) {
    return alert("Sorry not enough hours left to fit this task for the week.");
  }
  console.log(ttlHrs);
  // add to the global array
  taskList.push(obj);
  console.log(taskList);

  displyEntryTask();
  // add a function to add hrs to the total hrs at the end.
  total();
};

// create a fuctioin that takes the array, loop though it and create html and push to the dom
const displyEntryTask = () => {
  let str = ``;
  const entryListOnly = taskList.filter((item) => item.type === "entry");
  entryListOnly.map((item, i) => {
    str += `
<tr>
<td>${i + 1}</td>
<td>${item.task}</td>
<td>${item.hr}hr</td>
<td class="text-end">
  <button class="btn btn-danger" onclick ="handleOnDelete('${item.id}')">
    <i class="fa-solid fa-trash"></i>
  </button>
  <button  onclick= "switchTask('${item.id}', 'bad')" class="btn btn-success >
    <i class="fa-solid fa-arrow-right"></i>
  </button>
</td>
</tr>`;
  });
  entryElm.innerHTML = str;
  // totalHrsElm.innerHTML = total();
  total();
};
const badEntryTask = () => {
  //   console.log(".........");
  let str = ``;
  const badListOnly = taskList.filter((item) => item.type === "bad");

  console.log(badListOnly);
  badListOnly.map((item, i) => {
    str += `
<tr>
<td>${i + 1}</td>
<td>${item.task}</td>
<td>${item.hr}hr</td>
<td class="text-end">
<button  onclick= "switchTask('${item.id}', 'entry')" class="btn btn-success">
    <i class="fa-solid fa-arrow-right"></i>
  </button>
  <button class="btn btn-danger" onclick ="handleOnDelete('${item.id}')">
    <i class="fa-solid fa-trash"></i>
  </button>
  
</td>
</tr>`;
  });
  const ttlbadHr = badListOnly.reduce((acc, item) => acc + item.hr, 0);
  //   console.log(str);
  badHrElm.innerHTML = ttlbadHr;
  badElm.innerHTML = str;
};

const randomStr = () => {
  const charLength = 6;
  const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
  let id = "";

  for (let i = 0; i < charLength; i++) {
    const randNum = Math.round(Math.random() * (str.length - 1));
    id += str[randNum];
  }

  return id;
};
const switchTask = (id, type) => {
  //   updating the tasklist based on the item
  taskList = taskList.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        type,
      };
    }
    return item;
  });
  displyEntryTask();
  badEntryTask();
  total();
};
const handleOnDelete = (id) => {
  if (window.confirm("Are you sure you want to delete?")) {
    taskList = taskList.filter((item) => item.id !== id);
    displyEntryTask();
    badEntryTask();
  }
};
const total = () => {
  const ttl = taskList.reduce((acc, item) => acc + item.hr, 0);
  totalHrsElm.innerText = ttl;
  return ttl;
};

// console.log(switchTask());

// // create a function to generate random id for the object.
// const randomStr = () => {
//   const charLength = 6;
//   const str = "QWERTYYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnnm";
//   let id = "";
//   for (let i = 0; i < charLength; i++) {
//     const randNum = Math.round(Math.random() * (str.length - 1));
//     id += str[randNum];
//   }
//   return id;
// };
// console.log(randomStr());
