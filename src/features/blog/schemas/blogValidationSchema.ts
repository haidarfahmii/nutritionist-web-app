import * as Yup from "yup";

export const blogValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Title minimal 10 karakter")
    .max(200, "Title maksimal 200 karakter")
    .required("Title wajib diisi"),
  imageFile: Yup.mixed().nullable(),
  image: Yup.string().when("imageFile", ([imageFile], schema) => {
    if (imageFile) {
      return schema.required("Image URL atau file upload wajib diisi");
    }

    return schema
      .url("Image harus berupa URL yang valid (http:// atau https://)")
      .required("Image URL wajib diisi (jika tidak mengupload file)");
  }),
  author: Yup.string()
    .min(3, "Author minimal 3 karakter")
    .required("Author wajib diisi"),
  category: Yup.string().required("Category wajib diisi"),
  description: Yup.string()
    .min(20, "Description minimal 20 karakter")
    .max(500, "Description maksimal 500 karakter")
    .required("Description wajib diisi"),
  content: Yup.string()
    .min(100, "Content minimal 100 karakter")
    .required("Content wajib diisi"),
});
