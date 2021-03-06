const getMusics = async (id) => {
  const request = await fetch(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
