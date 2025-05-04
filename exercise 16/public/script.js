const generateButton = document.getElementById("generate");
const deleteButton = document.getElementById("delete");

generateButton.addEventListener("click", () => {{
        generateData();
        console.log("Generated data");
        window.location.reload();
    }
});

deleteButton.addEventListener("click", () => {
    deleteData();
    console.log("Deleted data");
});

const generateData = async () => {
    let response=await fetch("/generate");
    console.log("Generating data...", response);
}

const deleteData = async () => {
    let response= await fetch("/delete");
    document.querySelector('textarea').value="";
    console.log("Deleting data...", response);
}