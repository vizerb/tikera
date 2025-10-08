const ticketTypes = [
  { id: 1, name: "Diák", price: 2000 },
  { id: 2, name: "Felnőtt", price: 2500 },
  { id: 3, name: "Nyugdíjas", price: 1800 },
];

const idToApiType = {
  1: "student",
  2: "normal",
  3: "senior",
};

const apiTypeToId = {
  student: 1,
  normal: 2,
  senior: 3,
};

export default ticketTypes;

export { idToApiType, apiTypeToId };
