export interface IPdfService {
  extractPages(
    filename: string,
    pages: number[]
  ): Promise<string>;

  getUploadedPdfPath(
    filename: string
  ): string;

  getOutputPdfPath(
    filename: string
  ): string;
}