const fs= require('fs');
const path= require('path');

const scriptDir = __dirname;

let files=[]

try {
    const file = fs.readdirSync(scriptDir);
    files.push(...file);
} catch (err) {
    console.error("Error reading directory:", err);
}

for(let file of files){
    const ext = path.extname(file);
    
    // Skip if no extension or if it's a directory
    if (!ext || fs.statSync(path.join(scriptDir, file)).isDirectory()) {
        continue;
    }

    // Remove the dot from extension (e.g., '.js' → 'js')
    const folderName = ext.slice(1);
    const folderPath = path.join(scriptDir, folderName);

    // Create folder if it doesn't exist
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        // Move the file to the appropriate folder
        if(ext!='.js' && ext!='.json'){
            // console.log(ext)
            fs.renameSync(
                path.join(scriptDir, file),
                path.join(folderPath, file)
            );
            console.log(`Moved ${file} to ${folderName} folder`);
        }
        else{
            console.log("All clutters removed!")
        }
    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
}