import axios from "axios";

const perset_key = process.env.NEXT_PUBLIC_API_CLOUDINARY_PERSET_KEY || ""
const cloud_name = process.env.NEXT_PUBLIC_API_CLOUDINARY_CLOUD_NAME || ""

export const uploadfile = async (e) => {
  const file = e.target.files[0]
  const formData = new FormData();
  let url = ""
  formData.append("file", file)
  formData.append("upload_preset", perset_key)
  await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData).then(res => {
    url = res.data.url;
  }).catch(err => console.log(err))
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById('output');
    output.src = reader.result;
  };
  reader.readAsDataURL(e.target.files[0]);
  return url
}