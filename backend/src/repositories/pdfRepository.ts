import fs from "fs";
import path from "path";
import { IPdfRepository } from "./interfaces/IPdfRepository";

class PdfRepository implements IPdfRepository{

getInputPath(filename:string): string{
    return path.join(
    process.cwd(),
    "uploads",
    filename
   
);
}

getOutputPath(filename:string):string{
    return  path.join(
    process.cwd(),
    "output",
    filename
  );
}

  readPdf(filename: string): Buffer {
    const filePath =
      this.getInputPath(filename);

    return fs.readFileSync(filePath);
  }

   savePdf(
    filename: string,
    data: Uint8Array
  ): void {

    const filePath =
      this.getOutputPath(filename);

    fs.writeFileSync(filePath, data);
  } 

   fileExists(
    folder: "uploads" | "output",
    filename: string
  ): boolean {

    const filePath = path.join(
      process.cwd(),
      folder,
      filename
    );

    return fs.existsSync(filePath);
  } 

}

// export default new PdfRepository();
export default  PdfRepository;