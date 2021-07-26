const fs = require("fs");
const filePath = "./employees.txt";

function readDataFromFile() {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync("employees.txt"));
        } else {
            return [];
        }
    } catch (err) {
        console.log(err);
    }
}

function writeDataToFile(data) {
    try {
        fs.writeFileSync("employees.txt", JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    readDataFromFile,
    writeDataToFile,
};
