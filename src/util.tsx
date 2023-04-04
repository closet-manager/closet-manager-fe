interface attributes {
  season: string;
  clothing_type: string;
  size: string;
  color: string;
  image_url: string;
  notes: string;
}

interface Item {
  id: number;
  type: string;
  attributes: attributes;
}

export const singleItemCleaning = (item: Item): Item => {
 if (item!.attributes.season === "all_season") {
  item!.attributes.season = "all seasons"
 }
 if (item!.attributes.notes === "empty again" || item!.attributes.notes === null) {
  item!.attributes.notes = ""
 }
  if (item!.attributes.color === "unspecified") {
  item!.attributes.color = "";
 }
 return item
}