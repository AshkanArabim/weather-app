const key = "563492ad6f917000010000018c6f4e9da8934a81ae4c0129851c9ab6";

export default async function getBG(weatherType) {
  const url = `https://api.pexels.com/v1/search?query=${weatherType}+weather&size=large`;
  return await fetch(url, {
    headers: {
      Authorization: key,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      return resp.photos[0].src.original;
    });
}
