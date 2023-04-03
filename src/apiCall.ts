export const getAllItems = async () => {
  const url = "https://closet-manager-be.herokuapp.com/api/v1/users/1/items";
  // hard-coding this fetch for user 1 for now, make dynamic if we add other users
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable To Fetch Your Data. Try Later.");
  }
  return response.json();
};

export const filterItems = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable To Fetch Your Data. Try Later.")
  }
  return response.json()
};

export const createItem = async (data: any) => {
  // we cannot leave data: any!! We should make an interface 
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items`;
    // hard-coding this fetch for user 1 for now, make dynamic if we add other users
  const response = await fetch(url, {
    method: "POST",
    // "There is no "Content-Type" key in the headers — the 
    // content type is multipart/form-data,
    //  which is implied by the FormData object itself"
    body: data,
    // "The body is not stringified. The FormData API handles all 
    // the necessary processing for the image to be sent over the web."
  });
  if (!response.ok) {
    console.log(response)
    throw new Error("Unable To Fetch Your Data. Try Later.");
  }
  return response.json();
};

export const editItem = async ({data}, id: number) => {

  // we cannot leave data: any!! We should make an interface 
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/${id}`;
    // hard-coding this fetch for user 1 for now, make dynamic if we add other users
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json"
  },
    body:  JSON.stringify(data) ,
  });
  if (!response.ok) {
    console.log(response)
    throw new Error("Unable To Update Item. Try Later.");
  }
  return response;
};

export const getSingleItem = async (id: string) => {
   const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/${id}`;
  // hard-coding this fetch for user 1 for now, make dynamic if we add other users
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable To Fetch Your Data. Try Later.");
  }
  return response.json();
}

export const deleteItem = async (id: string | number) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/${id}`
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  }
  const res = await fetch(url, config)
  if (!res.ok) {
    throw new Error("Could not delete.")
  }
  return res.json();
}