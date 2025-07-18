
import { PdfReader } from "pdfreader";

export const checkFile = async (filePath) => {
    let data = []
    let isTextList = []
    const reader = new PdfReader();

    
    const result  =  await new Promise((resolve, reject) => {
        reader.parseFileItems(filePath, (err, item) => {
            if (err) console.error("error:", err);
        else if (!item){
            resolve(data[data.length - 1])
        }
        else if (item.text){
            if(item.y > 50) {
                data.push(item.text)
            }
            }
        });
    });
    return result
}


