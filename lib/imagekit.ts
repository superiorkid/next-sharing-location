import ImageKit from "imagekit";
import { ImageLoaderProps } from "next/image";

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
// });

const imagekit = new ImageKit({
  publicKey: "public_+cAgvkGTrzWkUEUnAZxbndHJAcg=",
  privateKey: "private_b6p6ZIAnrzTGaCFZY7F70qvAWyc=",
  urlEndpoint: "https://ik.imagekit.io/superiorkid/",
});

export const imageKitLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  var urlEndpoint = "https://ik.imagekit.io/superiorkid/";
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

export default imagekit;
