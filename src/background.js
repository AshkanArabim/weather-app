const key = "563492ad6f917000010000018c6f4e9da8934a81ae4c0129851c9ab6";

export default async function getBG(weatherType) {
  const url = `https://api.pexels.com/v1/search?query=${weatherType}+weather&size=large&color=white`;
  return await fetch(url, {
    headers: {
      Authorization: key,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      const randomIndex = Math.floor(Math.random() * 14);
      return resp.photos[randomIndex].src.original;
    });
}
