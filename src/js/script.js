const startBTN = document.querySelector(".startBTN");
const start = {
  start() {
    const name = document.querySelector("#name").value;
    if (name == "") {
      console.log("e");
    } else {
      document.querySelector(".form").classList.add("remove");
      document.querySelector("main").classList.remove("remove");
      stage.start(
        name,
        document.querySelector(".name"),
        document.querySelector(".life"),
      );
    }
  },
};

startBTN.addEventListener("click", start.start);
