import API from "./api";

export const uploadPdf = async (
  formData: FormData
) => {
  const res = await API.post(
    "/upload",
    formData
  );

  return res.data;
};

export const extractPdf = async (
  filename: string,
  pages: number[]
) => {
  const res = await API.post(
    "/extract",
    {
      filename,
      pages,
    }
  );

  return res.data;
};