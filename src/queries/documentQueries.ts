const createDoc = (data: any) => {
  let status = 200;
  fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_SERVER}/api/posts/createPost`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((resMessage) => {
      if (status == 200) {
      }
    });
};

export { createDoc };
