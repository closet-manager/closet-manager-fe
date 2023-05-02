interface Data {
  data: {
    item: {
      season: string; 
      color: string;
      clothing_type: string;
      size: string;
      notes: string;
    }
  } 
}

export const getAllItems = async () => {
  const url = "https://closet-manager-be.herokuapp.com/api/v1/users/1/items";
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

export const createItem = async (data: FormData) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items`;
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    console.error(response)
    throw new Error("Unable To Fetch Your Data. Try Later.");
  }
  return response.json();
};

export const editItem = async ({data}: Data , id: number) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json"
  },
    body:  JSON.stringify(data),
  });
  if (!response.ok) {
    console.error(response)
    throw new Error("Unable To Update Item. Try Later.");
  }
  return response;
};

export const getSingleItem = async (id: string) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/${id}`;
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

export const postCustomList = async (data: string) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/lists`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: data }),
  })
  if (!response.ok) {
    throw new Error("Could not delete.")
  }
  return response.json()
}

export const deleteCustomList = async (id: string | number) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/lists/${id}`
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

export const addToCalendar = async (date: string, id: string) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/events`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
  },
    body: JSON.stringify({
      "event": {
        "outfit_date": date,
        "item_id": id
      }
    }),
  });
  if (!response.ok) {
    console.error(response)
    throw new Error("Unable To Add Item. Try Later.");
  }
  return response
};