export interface IPdfRepository {
  getInputPath(filename: string): string;

  getOutputPath(filename: string): string;

  readPdf(filename: string): Buffer;

  savePdf(
    filename: string,
    data: Uint8Array
  ): void;

  fileExists(
    folder: "uploads" | "output",
    filename: string
  ): boolean;
}