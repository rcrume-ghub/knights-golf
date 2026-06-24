// Auto-generated from Knights Golf_New_v3.xlsx — do not hand-edit
import { putMany } from './db.js'

export async function seedIfEmpty(db) {
  const existing = await db.count('seasons')
  if (existing > 0) return

  const seasons = [
  {
    "id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "name": "2026 Season",
    "start_date": "2026-04-13",
    "league_night": 1,
    "weeks": 20,
    "par": 36,
    "blind_score": 39,
    "max_handicap": 18,
    "is_active": true,
    "is_archived": false
  },
  {
    "id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "name": "2025 Season",
    "start_date": "2025-04-07",
    "league_night": 1,
    "weeks": 19,
    "par": 36,
    "blind_score": 39,
    "max_handicap": 18,
    "is_active": false,
    "is_archived": true
  }
]
  const players = [
  {
    "id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "first_name": "Dave",
    "last_name": "Dooley",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "first_name": "Butch",
    "last_name": "O'Nan",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "1f2801b1-4e46-459b-9b99-919938b85746",
    "first_name": "Eric",
    "last_name": "McGiveney",
    "email": "",
    "phone": "502-277-1334",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "a388e4d8-994d-4841-8947-b21ef2a0c73c",
    "first_name": "Caleb",
    "last_name": "McGiveney",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "first_name": "Jerry",
    "last_name": "Simpson",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "first_name": "Tim",
    "last_name": "Simpson",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "first_name": "Fred",
    "last_name": "Downs",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341",
    "first_name": "Mike",
    "last_name": "Skaggs",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81",
    "first_name": "Bobby",
    "last_name": "Crowdis",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "first_name": "Jerry",
    "last_name": "Wallace",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "e724d747-9aa5-469c-995e-1d3d4dad3e79",
    "first_name": "Richie",
    "last_name": "Stoess",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "5e233e80-4b3d-4789-8260-3b433243eea8",
    "first_name": "Kip",
    "last_name": "McGiveney",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "first_name": "John",
    "last_name": "Daugherty",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639",
    "first_name": "",
    "last_name": "Hooper",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "1199232e-d347-4204-84f1-7ba2d024d813",
    "first_name": "Robert",
    "last_name": "Crume",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "50184776-4b69-4e22-917b-0567d87e03ce",
    "first_name": "Pete",
    "last_name": "Gibson",
    "email": "",
    "phone": "502-593-3046",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "c6e134c3-b627-4360-883c-8e20fe7e7c68",
    "first_name": "Larry",
    "last_name": "Olds",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e",
    "first_name": "Greg",
    "last_name": "Olds",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "first_name": "Donnie",
    "last_name": "Blair",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "first_name": "Allan",
    "last_name": "Catlett",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "first_name": "Jason",
    "last_name": "McGiveney",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "first_name": "Bob",
    "last_name": "McGiveney",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "8b27968d-3365-455e-b36a-b61a691ecca2",
    "first_name": "Chris",
    "last_name": "Berry",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "first_name": "Mike",
    "last_name": "Evans",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c",
    "first_name": "Bob",
    "last_name": "Noble",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "first_name": "Doug",
    "last_name": "Surface",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "b42100a4-f210-4512-a0b1-bb02100442cf",
    "first_name": "George",
    "last_name": "Riley",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "e1d37712-5c13-4c2a-b576-44033095b725",
    "first_name": "Scott",
    "last_name": "Johnson",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "c2d8ddf0-08e5-4c33-9ba5-f14d18000128",
    "first_name": "Barry",
    "last_name": "Fallon",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "a9c0d809-cd18-4b49-9f60-6d49ed530bbb",
    "first_name": "Billy",
    "last_name": "Cook",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "6303feeb-99f0-4965-a1eb-b78242336773",
    "first_name": "Billy",
    "last_name": "Minturn",
    "email": "",
    "phone": "502-724-0524",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "a3f0246c-53bf-4a29-bd7c-96b3be909862",
    "first_name": "Bob",
    "last_name": "Bindner",
    "email": "",
    "phone": "502-345-5162",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "8561f20e-d42c-4749-be8c-2062abe0bc4d",
    "first_name": "Bobby",
    "last_name": "Montgomery",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "6c5751f8-d00d-4609-8b62-a901c3a2265b",
    "first_name": "Bruce",
    "last_name": "Harrison",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "86b15906-164e-40c9-bee6-ef91149e5177",
    "first_name": "Bruce",
    "last_name": "Jewell",
    "email": "",
    "phone": "502-523-2192",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "f6425748-d8c8-4dab-ab6a-b875d6544696",
    "first_name": "Chase",
    "last_name": "Montgomery",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "cdfa8028-3576-4cfc-a607-906146bfa418",
    "first_name": "Chris",
    "last_name": "Brown",
    "email": "",
    "phone": "502-593-3832",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "ecf24114-e7a5-4943-96f7-f12396ff07d6",
    "first_name": "Chuck",
    "last_name": "Coots",
    "email": "",
    "phone": "502-905-1008",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "3fc99779-bf58-45d8-98e8-4564ee34ab57",
    "first_name": "Coy",
    "last_name": "Harp",
    "email": "",
    "phone": "502-807-8170",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "82718a61-917d-471f-8ca1-3598313862a6",
    "first_name": "Danny",
    "last_name": "Graves",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "5ff21dad-2d42-41c6-9a3f-6b31e866834c",
    "first_name": "Dave",
    "last_name": "Hickey",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "5ae1fe76-e745-4216-bfc0-40e7bd4de5b1",
    "first_name": "David",
    "last_name": "Rausch",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "ccbfadd8-d859-46cd-bd14-cbdfcfb74788",
    "first_name": "Danny",
    "last_name": "Popplewell",
    "email": "",
    "phone": "502-551-2360",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "9e401065-52e0-4a51-8e1d-bf4a2ea86bba",
    "first_name": "Dennis",
    "last_name": "Jewell",
    "email": "",
    "phone": "502-544-9150",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "6c1894b7-3e50-427f-a6db-c3bf97f2ceb5",
    "first_name": "Derek",
    "last_name": "Simon",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "2b0ed269-dd98-42a7-979d-38b4df3d033d",
    "first_name": "Doug",
    "last_name": "Wheat",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "34985117-2557-44ea-87c2-b0eaf8b36ca0",
    "first_name": "Eddie",
    "last_name": "Ray",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "cd9d5dd4-2ba1-45c4-b082-5b6e34e634c9",
    "first_name": "George",
    "last_name": "Breit",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "56155500-0c25-4f3f-89a2-2f9009ac0655",
    "first_name": "Harvey",
    "last_name": "Smith",
    "email": "",
    "phone": "502-322-5199",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "b3b8f573-324e-4f83-8d52-c95267f4f99a",
    "first_name": "Jeff",
    "last_name": "Lozar",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "ba09e057-ddd6-4b5b-bd4c-bf20ecc3d773",
    "first_name": "Jeremy",
    "last_name": "Crick",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "3a94687b-a392-4dcf-84de-6784a8659f7b",
    "first_name": "Jeremy",
    "last_name": "Riley",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "820089c1-c0e8-431c-aa66-173c29df0e22",
    "first_name": "Jim",
    "last_name": "Ray",
    "email": "",
    "phone": "502-314-6325",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "a6092c77-1b79-4deb-aeab-a80b5a3c8873",
    "first_name": "Jimbo",
    "last_name": "Monks",
    "email": "",
    "phone": "502-724-7115",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "046f7ddc-cc38-46e5-94d6-9429b2d7b381",
    "first_name": "Joe",
    "last_name": "Fritsch",
    "email": "",
    "phone": "502-807-5787",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "92b25049-6b58-467b-bf36-fa8dfdc1ceb4",
    "first_name": "Joe",
    "last_name": "Miller",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "be1cb9a1-30a0-4b77-b1a0-d63682dad809",
    "first_name": "John",
    "last_name": "Mingus",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "41d6f335-d4a2-4b7b-b7c2-9d7a4f642ef5",
    "first_name": "Kirk",
    "last_name": "Bruce",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "7e88a74e-327c-469c-8031-c04ba4786e79",
    "first_name": "Larry",
    "last_name": "Stivers",
    "email": "",
    "phone": "502-762-5060",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "1a272dd6-8f1f-4662-a6e6-2910b25cfac9",
    "first_name": "Mark",
    "last_name": "Schweitzer",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "813476d0-6cd4-43d9-83ad-5b12cc6fb3fe",
    "first_name": "Mike",
    "last_name": "Kesterson",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "ee7a4e73-8cd3-45cb-807f-180a204d5255",
    "first_name": "Mike",
    "last_name": "Fee",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "19516088-a0ff-4b79-a00a-a96bcba52f5b",
    "first_name": "Mike",
    "last_name": "McGrew",
    "email": "",
    "phone": "502-333-2135",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "f3c9bdf0-8bf0-4f12-bcf0-45777ee112cc",
    "first_name": "Mike",
    "last_name": "Wilson",
    "email": "",
    "phone": "502-544-0287",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "88f91ee9-5d1e-4b65-a864-001c52984dd3",
    "first_name": "Richard",
    "last_name": "Englert",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "b49e51ae-13ad-4602-8b94-1c80d41d561e",
    "first_name": "Rick",
    "last_name": "Borders",
    "email": "",
    "phone": "502-592-8060",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "49f59782-1c83-4d57-ac0b-e6c29b4aae87",
    "first_name": "Ron",
    "last_name": "Kelty",
    "email": "",
    "phone": "502-741-7412",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "b7587a55-8318-4479-ab9e-0c90242e3a1f",
    "first_name": "Ronnie",
    "last_name": "Proffitt",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "8f12924f-0eaa-4a51-956c-4f419a86f52a",
    "first_name": "Shawn",
    "last_name": "Bindner",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "190ed774-4f23-4fdf-b386-bbd60765b30a",
    "first_name": "Steve",
    "last_name": "Ragosta",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "2af64f4c-2f37-4997-8c69-24322361e842",
    "first_name": "Steve",
    "last_name": "Wheatley",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "b74a70c8-2432-45cd-af7c-05ca5db96b56",
    "first_name": "Wayne",
    "last_name": "Mattingly",
    "email": "",
    "phone": "502-905-5642",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "7cf57af1-bb9d-4feb-a172-898327699279",
    "first_name": "Tim",
    "last_name": "Weist",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "ada10e8e-4301-47a5-acd6-c9f008f8e89c",
    "first_name": "Rob",
    "last_name": "Reynolds",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "e9b7c8ed-934b-484d-b124-71c3e93b731f",
    "first_name": "Ronnie",
    "last_name": "Brooks",
    "email": "",
    "phone": "",
    "status": "Active",
    "notes": ""
  },
  {
    "id": "f874955d-9ad8-44a3-aaf9-d768189c05dc",
    "first_name": "Ronnie",
    "last_name": "Johnson",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "fb379a25-aedc-4aaf-8dd6-40b569612244",
    "first_name": "Ron",
    "last_name": "Schuler",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "5326be96-bfa4-4d92-9a6d-9d776e15efb6",
    "first_name": "Scott",
    "last_name": "Norman",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "64a765b1-01c9-437f-bfdd-d6c1a74c4cae",
    "first_name": "Tim",
    "last_name": "Wiest",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "4290d08f-5f91-4e4f-91a3-40b4eb54311a",
    "first_name": "Dan",
    "last_name": "Dillon",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "b6caae54-f2ea-431b-9f12-2f098b988d3d",
    "first_name": "Bruce",
    "last_name": "Evans",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "a4e2ad90-0233-49fb-89d7-b8bdcad1d752",
    "first_name": "Rick",
    "last_name": "Breit",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "1ba2804c-8163-41c6-88c5-db965938ec29",
    "first_name": "Matt",
    "last_name": "Reynolds",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "0a5be693-d622-43bc-a7dd-00ea31adbbfb",
    "first_name": "Dave",
    "last_name": "Hooper",
    "email": "",
    "phone": "502-500-4136",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "50ae0474-8f4d-4c7f-9c57-df96e8a075c6",
    "first_name": "Kyle",
    "last_name": "Peerce",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "457fc779-0302-4629-a021-d81f837ffcfa",
    "first_name": "Nick",
    "last_name": "Groft",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  },
  {
    "id": "d2b43760-7ed7-4c00-b6bf-76a50ea4f089",
    "first_name": "Robbie",
    "last_name": "Stivers",
    "email": "",
    "phone": "",
    "status": "Sub",
    "notes": ""
  }
]
  const teams = [
  {
    "id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 1,
    "name": ""
  },
  {
    "id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 2,
    "name": ""
  },
  {
    "id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 3,
    "name": ""
  },
  {
    "id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 4,
    "name": ""
  },
  {
    "id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 5,
    "name": ""
  },
  {
    "id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 6,
    "name": ""
  },
  {
    "id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 7,
    "name": ""
  },
  {
    "id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 8,
    "name": ""
  },
  {
    "id": "db878758-8438-475d-81e8-b60209071cab",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 9,
    "name": ""
  },
  {
    "id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 10,
    "name": ""
  },
  {
    "id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 11,
    "name": ""
  },
  {
    "id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 12,
    "name": ""
  },
  {
    "id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 13,
    "name": ""
  },
  {
    "id": "33f76372-7937-4a54-84d4-9c50be263146",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 14,
    "name": ""
  },
  {
    "id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 18,
    "name": ""
  },
  {
    "id": "4c6769f5-561a-4f87-8777-be6936aaf2f8",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 1,
    "name": ""
  },
  {
    "id": "c638dcc2-929b-4ae2-9fa7-a171bf7a5ad5",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 2,
    "name": ""
  },
  {
    "id": "72a31bc5-15fb-4b0e-b441-f5f7055d8ad4",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 3,
    "name": ""
  },
  {
    "id": "85b84861-4d64-4b09-94a7-cdfc330f32a4",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 4,
    "name": ""
  },
  {
    "id": "0bdc4da0-eebb-4c71-86fa-02c95a0abefa",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 5,
    "name": ""
  },
  {
    "id": "c9a073d7-d330-472e-b81d-43eca605c9f7",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 6,
    "name": ""
  },
  {
    "id": "3cbb8fb8-394d-4e67-815b-32173b0718f4",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 7,
    "name": ""
  },
  {
    "id": "a3764ed6-2f53-4949-a66b-546af5ea1109",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 8,
    "name": ""
  },
  {
    "id": "6591ea74-c3fc-4859-83d0-1b2fc99aaae1",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 9,
    "name": ""
  },
  {
    "id": "2552a3d9-deda-4952-81b1-809ad54d8c4d",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 10,
    "name": ""
  },
  {
    "id": "253239d0-5851-44f4-a540-fb4e3b092e9a",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 11,
    "name": ""
  },
  {
    "id": "3cb105f8-2f81-4177-a6ae-330aaf583ddb",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 12,
    "name": ""
  },
  {
    "id": "5e1535c0-ba9c-4b90-b0c3-f9f1f4b153ae",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 13,
    "name": ""
  },
  {
    "id": "283adb3b-263d-4002-9c75-5cc44066b072",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 14,
    "name": ""
  },
  {
    "id": "d3d70ece-19a8-4756-a09e-c02159312392",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 15,
    "name": ""
  },
  {
    "id": "8a7f675e-a628-4caa-8158-5a9ba361f255",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 16,
    "name": ""
  },
  {
    "id": "25377534-dfc6-43ae-9c01-47b6197e8f34",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 18,
    "name": ""
  }
]
  const team_players = [
  {
    "id": "83932003-71d7-4a4a-96cd-134516bae38d",
    "team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8"
  },
  {
    "id": "57ceca30-4746-46bf-9595-b7e07095e18e",
    "team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89"
  },
  {
    "id": "a6e20108-4182-4514-bb3e-d9d614958d01",
    "team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "player_id": "1f2801b1-4e46-459b-9b99-919938b85746"
  },
  {
    "id": "6a12f310-83d3-42bc-afc2-1d9e41217e57",
    "team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c"
  },
  {
    "id": "b87b59ce-932a-4f12-a674-085d997f26e6",
    "team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33"
  },
  {
    "id": "83ba9040-9d51-4e3b-b56b-5c83dd0b6a89",
    "team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab"
  },
  {
    "id": "c2556631-bc5f-4079-b3db-2f7bd21755da",
    "team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa"
  },
  {
    "id": "039eb8bf-8b10-4b7e-838c-a07333d0b535",
    "team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341"
  },
  {
    "id": "f5ed0bf1-6b58-4ef3-8a86-9e61fdd57393",
    "team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81"
  },
  {
    "id": "8ed6c34a-966d-4d47-a116-6aaaafd3b490",
    "team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470"
  },
  {
    "id": "7c6bb592-401f-4348-bce9-7b7eaca25298",
    "team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79"
  },
  {
    "id": "3c6af296-c5df-4752-b799-f0fcd0d5d109",
    "team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8"
  },
  {
    "id": "b5939f11-2ce1-4a57-b96c-080d8a7ccfe7",
    "team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9"
  },
  {
    "id": "bbcecd6c-6ae0-42e1-b40a-a90797730d2b",
    "team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639"
  },
  {
    "id": "6fa49cf0-c1a3-4056-a9da-2d3386a5ddab",
    "team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "player_id": "1199232e-d347-4204-84f1-7ba2d024d813"
  },
  {
    "id": "b9b42f8f-8ffa-4bf9-8655-24146710011a",
    "team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce"
  },
  {
    "id": "ac264a42-1174-4f50-8eb1-2c55835cb08a",
    "team_id": "db878758-8438-475d-81e8-b60209071cab",
    "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68"
  },
  {
    "id": "071d4f21-cfdb-4070-8d6b-b6685fb6b3d2",
    "team_id": "db878758-8438-475d-81e8-b60209071cab",
    "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e"
  },
  {
    "id": "1968fb47-e996-401f-8d32-97090d11915b",
    "team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51"
  },
  {
    "id": "1aff0c83-d5ba-4244-a1c6-25e58500607a",
    "team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4"
  },
  {
    "id": "5ea63093-76b4-4ef9-950e-4eaa1c83d973",
    "team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd"
  },
  {
    "id": "57ec9d39-adee-4dbe-8bdf-e1fd54c36689",
    "team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63"
  },
  {
    "id": "5d530f62-c2b9-4347-8c51-4386d220abf1",
    "team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2"
  },
  {
    "id": "c75b9b2f-ebc7-435f-b08e-09e324ddea25",
    "team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc"
  },
  {
    "id": "89314d0f-eb7d-4b74-bb2c-3ab872798c8b",
    "team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c"
  },
  {
    "id": "7111764e-c979-4356-822c-0b4c06781cb8",
    "team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406"
  },
  {
    "id": "f7a26f87-e527-46b7-8d39-f111e594d8f5",
    "team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf"
  },
  {
    "id": "fddecfc8-1af7-44dd-8bb2-358d53bd191a",
    "team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "player_id": "e1d37712-5c13-4c2a-b576-44033095b725"
  },
  {
    "id": "1882cb29-5d9b-409a-aaa1-6b42fc86837a",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "c2d8ddf0-08e5-4c33-9ba5-f14d18000128"
  },
  {
    "id": "f528e24d-cba5-47ce-9f7f-26e38330b1cd",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "a9c0d809-cd18-4b49-9f60-6d49ed530bbb"
  },
  {
    "id": "faf3d855-f856-450d-9ea6-4aa06d4e98c3",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "6303feeb-99f0-4965-a1eb-b78242336773"
  },
  {
    "id": "afa2cce5-9aa2-4440-b07a-89a905b29227",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "a3f0246c-53bf-4a29-bd7c-96b3be909862"
  },
  {
    "id": "e815ec0a-e8a6-40df-93a5-d7ee851cdcdf",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "8561f20e-d42c-4749-be8c-2062abe0bc4d"
  },
  {
    "id": "43aefc11-d3a8-4877-9458-b5fd742559f6",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "6c5751f8-d00d-4609-8b62-a901c3a2265b"
  },
  {
    "id": "baf36c04-358c-4f72-a69d-f9423228ca3f",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "86b15906-164e-40c9-bee6-ef91149e5177"
  },
  {
    "id": "4e87c573-371a-47e2-b335-70a644cefdd1",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "f6425748-d8c8-4dab-ab6a-b875d6544696"
  },
  {
    "id": "bfce872e-08f9-4ecf-b98c-7d9e7de02603",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "cdfa8028-3576-4cfc-a607-906146bfa418"
  },
  {
    "id": "26fc6f9f-7a61-45f7-9b33-278eed2fe1ab",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "ecf24114-e7a5-4943-96f7-f12396ff07d6"
  },
  {
    "id": "c0f239d9-41b8-4fd2-8312-11bf54decd50",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "3fc99779-bf58-45d8-98e8-4564ee34ab57"
  },
  {
    "id": "d37a5809-43b9-469b-8ca4-fbf0e593446b",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "82718a61-917d-471f-8ca1-3598313862a6"
  },
  {
    "id": "9795a146-27b4-4c3a-9c8e-db964b4e9521",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "5ff21dad-2d42-41c6-9a3f-6b31e866834c"
  },
  {
    "id": "60d77910-029b-4365-984b-ebf21b75fbc4",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "5ae1fe76-e745-4216-bfc0-40e7bd4de5b1"
  },
  {
    "id": "a8daf799-683a-4db9-b18e-16fd251be356",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "ccbfadd8-d859-46cd-bd14-cbdfcfb74788"
  },
  {
    "id": "97fb45ec-9327-4764-9407-801ae53ffb28",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "9e401065-52e0-4a51-8e1d-bf4a2ea86bba"
  },
  {
    "id": "98ea6173-fb40-4f62-82ae-86bf40452cb3",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "6c1894b7-3e50-427f-a6db-c3bf97f2ceb5"
  },
  {
    "id": "a8f2d8eb-a2d3-4d86-95eb-1d39177c505c",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "2b0ed269-dd98-42a7-979d-38b4df3d033d"
  },
  {
    "id": "aad49ddf-474a-4a92-891b-93ccb255349d",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "34985117-2557-44ea-87c2-b0eaf8b36ca0"
  },
  {
    "id": "f0f9f7e6-7103-434d-917d-1efecacdb305",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "cd9d5dd4-2ba1-45c4-b082-5b6e34e634c9"
  },
  {
    "id": "7687bd0e-3fcc-45c3-9634-9a5d419d4112",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "56155500-0c25-4f3f-89a2-2f9009ac0655"
  },
  {
    "id": "4b47e39a-2ee6-4910-bd0a-794a3db9a566",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "b3b8f573-324e-4f83-8d52-c95267f4f99a"
  },
  {
    "id": "937c43d4-ba63-4ff3-a30e-aa02228cb9ca",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "ba09e057-ddd6-4b5b-bd4c-bf20ecc3d773"
  },
  {
    "id": "f156699b-5622-456c-88f9-6265edc2703f",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "3a94687b-a392-4dcf-84de-6784a8659f7b"
  },
  {
    "id": "cabf05ce-585b-41b4-86d3-1ebe57c197b3",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "820089c1-c0e8-431c-aa66-173c29df0e22"
  },
  {
    "id": "4704f1e6-f345-488f-9400-a45f7cc6edc4",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "a6092c77-1b79-4deb-aeab-a80b5a3c8873"
  },
  {
    "id": "1ba8c96a-a5bf-4611-b6be-a718de8b5838",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "046f7ddc-cc38-46e5-94d6-9429b2d7b381"
  },
  {
    "id": "bfdf5e7b-f86c-4b63-a857-00616285f1ff",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "92b25049-6b58-467b-bf36-fa8dfdc1ceb4"
  },
  {
    "id": "d591ae33-b7c9-46f4-8176-271f3af9a20f",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "be1cb9a1-30a0-4b77-b1a0-d63682dad809"
  },
  {
    "id": "41143c44-b6f0-41d0-b3f6-da78559f5602",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "41d6f335-d4a2-4b7b-b7c2-9d7a4f642ef5"
  },
  {
    "id": "dbcf2064-c968-4891-91b3-f2701418c2e3",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "7e88a74e-327c-469c-8031-c04ba4786e79"
  },
  {
    "id": "ac04b306-5cd9-47d0-bae0-f3aa950d71cf",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "1a272dd6-8f1f-4662-a6e6-2910b25cfac9"
  },
  {
    "id": "a12a2e67-b4b7-4c3f-92a8-e3b03229e5c2",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "813476d0-6cd4-43d9-83ad-5b12cc6fb3fe"
  },
  {
    "id": "6ebd7e0b-2f34-431d-97c1-fda50bd988c9",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "ee7a4e73-8cd3-45cb-807f-180a204d5255"
  },
  {
    "id": "49639f53-3e97-435f-83da-8ee3af113dc2",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "19516088-a0ff-4b79-a00a-a96bcba52f5b"
  },
  {
    "id": "25ff66d9-0641-45f4-bcdd-da40d2ad0654",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "f3c9bdf0-8bf0-4f12-bcf0-45777ee112cc"
  },
  {
    "id": "fbf3c710-1905-4919-a7df-4cfabeb60ca7",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "88f91ee9-5d1e-4b65-a864-001c52984dd3"
  },
  {
    "id": "a03fc927-9609-4fbe-ba4e-4a0b84042508",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "b49e51ae-13ad-4602-8b94-1c80d41d561e"
  },
  {
    "id": "56e65920-1668-4111-bcbe-24ffeb54963b",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "49f59782-1c83-4d57-ac0b-e6c29b4aae87"
  },
  {
    "id": "0aef0011-4b31-4e58-a0d3-99f0e2008989",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "b7587a55-8318-4479-ab9e-0c90242e3a1f"
  },
  {
    "id": "4975240c-ef7a-4392-865d-3c8ca6daae28",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "8f12924f-0eaa-4a51-956c-4f419a86f52a"
  },
  {
    "id": "ad8fb2ea-e187-4e6d-b422-be9bab4d944d",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "190ed774-4f23-4fdf-b386-bbd60765b30a"
  },
  {
    "id": "9058303a-84d2-406f-931a-82c2f400307f",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "2af64f4c-2f37-4997-8c69-24322361e842"
  },
  {
    "id": "a9ca8670-f0ff-46bf-8913-23290f1d127e",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "b74a70c8-2432-45cd-af7c-05ca5db96b56"
  },
  {
    "id": "eea49ff7-6c4a-4ec2-8fd1-02fac13488d1",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "7cf57af1-bb9d-4feb-a172-898327699279"
  },
  {
    "id": "7b878879-dcd3-455c-a9d5-06d8c9f8c4d4",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "ada10e8e-4301-47a5-acd6-c9f008f8e89c"
  },
  {
    "id": "4d419356-7d3d-411f-8b1b-8f024e0b8739",
    "team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "player_id": "e9b7c8ed-934b-484d-b124-71c3e93b731f"
  },
  {
    "id": "a3f87185-736c-41e0-941c-d42660f7ff74",
    "team_id": "4c6769f5-561a-4f87-8777-be6936aaf2f8",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8"
  },
  {
    "id": "7847ded0-c0e0-43eb-a434-57e01b1bad48",
    "team_id": "4c6769f5-561a-4f87-8777-be6936aaf2f8",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89"
  },
  {
    "id": "60275398-c428-4213-a13f-4ea2b0fc7853",
    "team_id": "c638dcc2-929b-4ae2-9fa7-a171bf7a5ad5",
    "player_id": "e9b7c8ed-934b-484d-b124-71c3e93b731f"
  },
  {
    "id": "4ab2e7b6-f9f2-44af-bbf3-f1cc6b1ee68f",
    "team_id": "c638dcc2-929b-4ae2-9fa7-a171bf7a5ad5",
    "player_id": "f874955d-9ad8-44a3-aaf9-d768189c05dc"
  },
  {
    "id": "035f8dd9-ef6f-437f-a17b-d1864d554496",
    "team_id": "72a31bc5-15fb-4b0e-b441-f5f7055d8ad4",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33"
  },
  {
    "id": "c286ab6c-5ffc-4a77-82ab-9fa3e7f8c098",
    "team_id": "72a31bc5-15fb-4b0e-b441-f5f7055d8ad4",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab"
  },
  {
    "id": "c656c7d0-0e58-4d89-aa5d-24544592838a",
    "team_id": "85b84861-4d64-4b09-94a7-cdfc330f32a4",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa"
  },
  {
    "id": "eac8eca4-6765-4971-b5bd-cb3226eb4b8a",
    "team_id": "85b84861-4d64-4b09-94a7-cdfc330f32a4",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341"
  },
  {
    "id": "4bf3208b-4a93-4333-a8dc-e949504f66c9",
    "team_id": "0bdc4da0-eebb-4c71-86fa-02c95a0abefa",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81"
  },
  {
    "id": "ff5a66e4-c5d7-464e-9567-05836b8348f5",
    "team_id": "0bdc4da0-eebb-4c71-86fa-02c95a0abefa",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470"
  },
  {
    "id": "0482b2cf-cb20-4667-a01b-4d48b0cbfd65",
    "team_id": "c9a073d7-d330-472e-b81d-43eca605c9f7",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79"
  },
  {
    "id": "d55905db-b020-409f-8ce2-ba97cbbefb03",
    "team_id": "c9a073d7-d330-472e-b81d-43eca605c9f7",
    "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8"
  },
  {
    "id": "3c1e4f97-c431-46d8-9e18-c33c982adc52",
    "team_id": "3cbb8fb8-394d-4e67-815b-32173b0718f4",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9"
  },
  {
    "id": "45991d2d-f89a-4e16-b18f-05f062cdcdfb",
    "team_id": "3cbb8fb8-394d-4e67-815b-32173b0718f4",
    "player_id": "fb379a25-aedc-4aaf-8dd6-40b569612244"
  },
  {
    "id": "911619b5-9f0d-4ee1-ad17-ff0d37939570",
    "team_id": "a3764ed6-2f53-4949-a66b-546af5ea1109",
    "player_id": "1199232e-d347-4204-84f1-7ba2d024d813"
  },
  {
    "id": "acdb4c0d-d643-4c18-a59a-816dc053d175",
    "team_id": "a3764ed6-2f53-4949-a66b-546af5ea1109",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce"
  },
  {
    "id": "4a625e7b-a6e7-45ec-b499-f6336c076488",
    "team_id": "6591ea74-c3fc-4859-83d0-1b2fc99aaae1",
    "player_id": "5326be96-bfa4-4d92-9a6d-9d776e15efb6"
  },
  {
    "id": "371422af-fa98-40b5-80f0-9450d93604ef",
    "team_id": "6591ea74-c3fc-4859-83d0-1b2fc99aaae1",
    "player_id": "64a765b1-01c9-437f-bfdd-d6c1a74c4cae"
  },
  {
    "id": "1350c372-cb20-4586-a23c-5775680c6753",
    "team_id": "2552a3d9-deda-4952-81b1-809ad54d8c4d",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51"
  },
  {
    "id": "24dbcf26-710a-45e4-9392-404db853f3d7",
    "team_id": "2552a3d9-deda-4952-81b1-809ad54d8c4d",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4"
  },
  {
    "id": "302d50dc-f3d4-47d2-90a2-09d9048b248d",
    "team_id": "253239d0-5851-44f4-a540-fb4e3b092e9a",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd"
  },
  {
    "id": "623c7ae7-e86f-4b54-ad5f-d64c286e3fc1",
    "team_id": "253239d0-5851-44f4-a540-fb4e3b092e9a",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63"
  },
  {
    "id": "d9782f83-a4cd-4a39-abc7-58f42729c795",
    "team_id": "3cb105f8-2f81-4177-a6ae-330aaf583ddb",
    "player_id": "ada10e8e-4301-47a5-acd6-c9f008f8e89c"
  },
  {
    "id": "7edff606-9feb-4d6f-83e1-b4d60de911b0",
    "team_id": "3cb105f8-2f81-4177-a6ae-330aaf583ddb",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc"
  },
  {
    "id": "f5717546-25b2-4b05-ae10-96897c874328",
    "team_id": "5e1535c0-ba9c-4b90-b0c3-f9f1f4b153ae",
    "player_id": "4290d08f-5f91-4e4f-91a3-40b4eb54311a"
  },
  {
    "id": "6de01ccb-fe48-446f-a6a6-6df2fc30641c",
    "team_id": "5e1535c0-ba9c-4b90-b0c3-f9f1f4b153ae",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406"
  },
  {
    "id": "b3ba4aa7-988c-4d33-95e3-4c11534f8098",
    "team_id": "283adb3b-263d-4002-9c75-5cc44066b072",
    "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf"
  },
  {
    "id": "c54908c6-3a1f-4cd5-8aa6-2de48f3d1dc9",
    "team_id": "283adb3b-263d-4002-9c75-5cc44066b072",
    "player_id": "e1d37712-5c13-4c2a-b576-44033095b725"
  },
  {
    "id": "75ab65db-fc5a-4a6d-9bce-83017c08cb99",
    "team_id": "d3d70ece-19a8-4756-a09e-c02159312392",
    "player_id": "b6caae54-f2ea-431b-9f12-2f098b988d3d"
  },
  {
    "id": "50b62f8e-1a37-44b8-a297-bb8eeecf9cc5",
    "team_id": "d3d70ece-19a8-4756-a09e-c02159312392",
    "player_id": "a4e2ad90-0233-49fb-89d7-b8bdcad1d752"
  },
  {
    "id": "7e32d810-e92b-42b1-9fd0-a1f8618ccf66",
    "team_id": "8a7f675e-a628-4caa-8158-5a9ba361f255",
    "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68"
  },
  {
    "id": "1cfad9df-8a6c-4db6-bb64-6f8232f1a1b1",
    "team_id": "8a7f675e-a628-4caa-8158-5a9ba361f255",
    "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e"
  },
  {
    "id": "d20b0e86-be0f-4cb7-ad87-c3018497392a",
    "team_id": "25377534-dfc6-43ae-9c01-47b6197e8f34",
    "player_id": "1ba2804c-8163-41c6-88c5-db965938ec29"
  },
  {
    "id": "544b61f9-08b0-4ff4-94d9-9e3bbba9f5f9",
    "team_id": "25377534-dfc6-43ae-9c01-47b6197e8f34",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c"
  }
]
  const season_player_hcp = [
  {
    "id": "5576bd95-cac3-4ac7-9e44-9cb8f5fa10c2",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 12.94,
    "current_hcp": 10.6
  },
  {
    "id": "013cf04e-96d8-4f15-a675-2aa19997e2b7",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 6.0,
    "current_hcp": 7.6
  },
  {
    "id": "33014592-f28a-427e-90c3-d54937cff9e4",
    "player_id": "1f2801b1-4e46-459b-9b99-919938b85746",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.83,
    "current_hcp": 8.2
  },
  {
    "id": "838b93f9-0eaf-43d0-af14-408890905f59",
    "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 0.0,
    "current_hcp": 20.0
  },
  {
    "id": "ee05d358-3855-4d8c-be0a-83df6b75bff4",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 12.0,
    "current_hcp": 9.4
  },
  {
    "id": "ff03f2d0-72b7-4bdd-9571-868368bf8cea",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 13.94,
    "current_hcp": 11.6
  },
  {
    "id": "b757f1c7-9055-4a53-b831-7aec22e55052",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 12.22,
    "current_hcp": 10.0
  },
  {
    "id": "fe7d811c-d455-4789-a260-0cae8f52da23",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 18.89,
    "current_hcp": 21.6
  },
  {
    "id": "4f011150-3eba-4643-aa70-b15045b84a33",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 6.44,
    "current_hcp": 4.6
  },
  {
    "id": "3c443fc2-58f3-47f6-9bc7-943f66f8ff40",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.78,
    "current_hcp": 6.2
  },
  {
    "id": "7deaf9f0-a33c-4372-86ec-3a0909175c65",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 9.12,
    "current_hcp": 8.6
  },
  {
    "id": "3c68f701-3c3b-4173-bd37-a05196dc0995",
    "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.76,
    "current_hcp": 6.6
  },
  {
    "id": "9f40d554-db66-48fd-bf69-ae9968328d98",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 8.24,
    "current_hcp": 5.6
  },
  {
    "id": "eb2b1580-0b60-4ddb-9933-1e36b6ff5a72",
    "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.0,
    "current_hcp": 6.2
  },
  {
    "id": "1b11b726-821a-455f-b5fc-31269e94c261",
    "player_id": "1199232e-d347-4204-84f1-7ba2d024d813",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 14.57,
    "current_hcp": 16.0
  },
  {
    "id": "2ff9a142-adf6-4d40-96cf-f4858c6328c8",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.19,
    "current_hcp": 6.6
  },
  {
    "id": "314c7a76-797c-420a-b83e-5151cca355b5",
    "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.0,
    "current_hcp": 10.0
  },
  {
    "id": "f6d8a219-1a18-4ed1-be39-29c269acaaf0",
    "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 13.83,
    "current_hcp": 15.25
  },
  {
    "id": "842efc43-900c-42f7-bbe6-74d5c065a71e",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 7.65,
    "current_hcp": 7.2
  },
  {
    "id": "0e9fc6c2-5275-4ce6-a823-fbf5ac36516c",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 19.82,
    "current_hcp": 17.2
  },
  {
    "id": "272bdc1f-e188-49ef-9e31-01811dcbd48e",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 14.24,
    "current_hcp": 13.0
  },
  {
    "id": "c2e4a564-f82e-4896-80bc-fe436724884e",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 23.18,
    "current_hcp": 20.2
  },
  {
    "id": "e0aeba17-d0df-4058-8d42-5f3a8ffa994d",
    "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 0.0,
    "current_hcp": 18.4
  },
  {
    "id": "e49be85e-be5f-40e9-b712-85bfac4c220c",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 13.31,
    "current_hcp": 10.2
  },
  {
    "id": "542c5a6e-9c21-4d0c-b4fe-5833f65783d4",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 18.0,
    "current_hcp": 16.6
  },
  {
    "id": "418ed607-c993-4894-bc6f-70b2df51a0c3",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 16.93,
    "current_hcp": 15.8
  },
  {
    "id": "e6e296db-64c5-444f-b3a3-6ff375cce463",
    "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.79,
    "current_hcp": 10.4
  },
  {
    "id": "2df7d973-62f2-4e64-b025-22999a6b1132",
    "player_id": "e1d37712-5c13-4c2a-b576-44033095b725",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 15.46,
    "current_hcp": 16.0
  },
  {
    "id": "d1d5136b-abc2-4314-8600-c7e35b9b8e4b",
    "player_id": "c2d8ddf0-08e5-4c33-9ba5-f14d18000128",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.0,
    "current_hcp": null
  },
  {
    "id": "1d7d3334-51d0-4eff-859f-47ed651b33a5",
    "player_id": "a9c0d809-cd18-4b49-9f60-6d49ed530bbb",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.0,
    "current_hcp": null
  },
  {
    "id": "f2b53f64-136a-403d-8064-1c01321d50ad",
    "player_id": "6303feeb-99f0-4965-a1eb-b78242336773",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 14.0,
    "current_hcp": null
  },
  {
    "id": "07f21519-9730-4f30-b480-761a139d86b8",
    "player_id": "a3f0246c-53bf-4a29-bd7c-96b3be909862",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.0,
    "current_hcp": null
  },
  {
    "id": "519bac4f-c733-4fe4-a420-9706a3589e66",
    "player_id": "8561f20e-d42c-4749-be8c-2062abe0bc4d",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 18.0,
    "current_hcp": null
  },
  {
    "id": "21ce579d-990d-4cd3-94f7-0945c445fba8",
    "player_id": "6c5751f8-d00d-4609-8b62-a901c3a2265b",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 5.0,
    "current_hcp": null
  },
  {
    "id": "688e0f94-1994-497a-b167-22b552996116",
    "player_id": "86b15906-164e-40c9-bee6-ef91149e5177",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 17.0,
    "current_hcp": null
  },
  {
    "id": "bae8b786-1881-4d5b-9674-c6f775b85f3f",
    "player_id": "f6425748-d8c8-4dab-ab6a-b875d6544696",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 4.0,
    "current_hcp": null
  },
  {
    "id": "2cc877bb-dfa5-4679-aeac-d4583ad13527",
    "player_id": "cdfa8028-3576-4cfc-a607-906146bfa418",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.0,
    "current_hcp": null
  },
  {
    "id": "195ad3d8-bd79-42cf-a69b-543dab8c9be1",
    "player_id": "ecf24114-e7a5-4943-96f7-f12396ff07d6",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 9.0,
    "current_hcp": null
  },
  {
    "id": "f4f742fb-f8ca-40c0-a07b-71fb58f0f469",
    "player_id": "3fc99779-bf58-45d8-98e8-4564ee34ab57",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 16.0,
    "current_hcp": null
  },
  {
    "id": "e695bc71-9ee3-4bb3-ac3c-9f6a8fbc5796",
    "player_id": "82718a61-917d-471f-8ca1-3598313862a6",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 14.0,
    "current_hcp": null
  },
  {
    "id": "6a3ea399-5ecb-4dc0-b0cc-73ccc189a1d2",
    "player_id": "5ff21dad-2d42-41c6-9a3f-6b31e866834c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 14.0,
    "current_hcp": null
  },
  {
    "id": "68f40389-5cb6-4214-a714-3fa3bb9e505c",
    "player_id": "5ae1fe76-e745-4216-bfc0-40e7bd4de5b1",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.0,
    "current_hcp": null
  },
  {
    "id": "12788e29-90df-44ae-9c53-38eb82c0b189",
    "player_id": "ccbfadd8-d859-46cd-bd14-cbdfcfb74788",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 6.0,
    "current_hcp": 8.2
  },
  {
    "id": "c3741e78-8297-48e9-a7ba-15214fc08710",
    "player_id": "9e401065-52e0-4a51-8e1d-bf4a2ea86bba",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 12.0,
    "current_hcp": null
  },
  {
    "id": "255e4348-fadb-4948-a566-66b9b36c11c7",
    "player_id": "6c1894b7-3e50-427f-a6db-c3bf97f2ceb5",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 13.4,
    "current_hcp": null
  },
  {
    "id": "ec2ceca4-681a-484f-b7d7-92debdfc9b75",
    "player_id": "2b0ed269-dd98-42a7-979d-38b4df3d033d",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.0,
    "current_hcp": null
  },
  {
    "id": "002dbfab-7d8b-4d60-8d83-ba7eeb0480e1",
    "player_id": "34985117-2557-44ea-87c2-b0eaf8b36ca0",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 1.0,
    "current_hcp": null
  },
  {
    "id": "4a296ed6-5feb-4c33-b332-431aae5c1d6e",
    "player_id": "cd9d5dd4-2ba1-45c4-b082-5b6e34e634c9",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 7.0,
    "current_hcp": null
  },
  {
    "id": "fbf7b98c-0070-4477-9be7-12129d1c2264",
    "player_id": "56155500-0c25-4f3f-89a2-2f9009ac0655",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 9.0,
    "current_hcp": null
  },
  {
    "id": "e98d52cb-621a-4b0d-b1d6-52bd12df6ba8",
    "player_id": "b3b8f573-324e-4f83-8d52-c95267f4f99a",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.0,
    "current_hcp": null
  },
  {
    "id": "3a90a04b-b772-4d10-84a7-699b4e069433",
    "player_id": "ba09e057-ddd6-4b5b-bd4c-bf20ecc3d773",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 6.0,
    "current_hcp": null
  },
  {
    "id": "f34cad36-02b1-497c-9fcd-8ae6e03c61da",
    "player_id": "3a94687b-a392-4dcf-84de-6784a8659f7b",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 18.0,
    "current_hcp": null
  },
  {
    "id": "f12bc971-f3e4-4213-a826-854e61c8d027",
    "player_id": "820089c1-c0e8-431c-aa66-173c29df0e22",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 6.0,
    "current_hcp": null
  },
  {
    "id": "79f06639-7dd1-44f1-b668-c320a55371e7",
    "player_id": "a6092c77-1b79-4deb-aeab-a80b5a3c8873",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.0,
    "current_hcp": null
  },
  {
    "id": "43adddbc-389e-429f-a6e0-dffb9ac1028e",
    "player_id": "046f7ddc-cc38-46e5-94d6-9429b2d7b381",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 16.0,
    "current_hcp": null
  },
  {
    "id": "80355962-56a3-4f2d-9479-3e5af35ed5d3",
    "player_id": "92b25049-6b58-467b-bf36-fa8dfdc1ceb4",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.0,
    "current_hcp": null
  },
  {
    "id": "05eaac92-238f-475b-a4e1-9117250b6047",
    "player_id": "be1cb9a1-30a0-4b77-b1a0-d63682dad809",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 2.0,
    "current_hcp": null
  },
  {
    "id": "549ac0b0-03b3-4fca-88fd-8f13de971539",
    "player_id": "41d6f335-d4a2-4b7b-b7c2-9d7a4f642ef5",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 9.0,
    "current_hcp": null
  },
  {
    "id": "17c65fac-1a5f-45f8-8f77-575818534426",
    "player_id": "7e88a74e-327c-469c-8031-c04ba4786e79",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.0,
    "current_hcp": null
  },
  {
    "id": "9db9408d-25c2-4b06-aabd-3c50705267a4",
    "player_id": "1a272dd6-8f1f-4662-a6e6-2910b25cfac9",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 7.0,
    "current_hcp": null
  },
  {
    "id": "3ac8c268-50f8-4c7f-9323-68a505dfefa3",
    "player_id": "813476d0-6cd4-43d9-83ad-5b12cc6fb3fe",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 7.0,
    "current_hcp": null
  },
  {
    "id": "6e916552-bd1f-4375-be02-b3d5eddac913",
    "player_id": "ee7a4e73-8cd3-45cb-807f-180a204d5255",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 5.0,
    "current_hcp": 12.5
  },
  {
    "id": "b287d442-f0d3-460a-a726-d66023dfacfc",
    "player_id": "19516088-a0ff-4b79-a00a-a96bcba52f5b",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 23.0,
    "current_hcp": null
  },
  {
    "id": "abfe33f3-8805-44b9-b12e-a8243242f0c0",
    "player_id": "f3c9bdf0-8bf0-4f12-bcf0-45777ee112cc",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.0,
    "current_hcp": null
  },
  {
    "id": "3022dd71-e137-4529-ab2b-98a6cd059395",
    "player_id": "88f91ee9-5d1e-4b65-a864-001c52984dd3",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.0,
    "current_hcp": null
  },
  {
    "id": "75578f29-2935-4d44-b8c2-cddbaddba37e",
    "player_id": "b49e51ae-13ad-4602-8b94-1c80d41d561e",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.0,
    "current_hcp": null
  },
  {
    "id": "c9895ce2-fdff-408d-8474-78f2683f6e06",
    "player_id": "49f59782-1c83-4d57-ac0b-e6c29b4aae87",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.0,
    "current_hcp": null
  },
  {
    "id": "da2070b3-ebaf-49f9-af20-06e67df232df",
    "player_id": "b7587a55-8318-4479-ab9e-0c90242e3a1f",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 21.4,
    "current_hcp": null
  },
  {
    "id": "f1afa727-3006-4d68-a4c0-66e769bb5eb7",
    "player_id": "8f12924f-0eaa-4a51-956c-4f419a86f52a",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 18.0,
    "current_hcp": null
  },
  {
    "id": "a6dcf34a-8418-4cc7-a106-a08445a9b4e8",
    "player_id": "190ed774-4f23-4fdf-b386-bbd60765b30a",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 16.0,
    "current_hcp": null
  },
  {
    "id": "b57c2d09-76d4-4241-8429-0684b4fbadb2",
    "player_id": "2af64f4c-2f37-4997-8c69-24322361e842",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.0,
    "current_hcp": null
  },
  {
    "id": "e82c7af0-9392-43d0-ae8d-9889279b0685",
    "player_id": "b74a70c8-2432-45cd-af7c-05ca5db96b56",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 10.0,
    "current_hcp": null
  },
  {
    "id": "5ef9f02b-88ff-4c2c-b101-fcc0d20cb4bc",
    "player_id": "7cf57af1-bb9d-4feb-a172-898327699279",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 14.75,
    "current_hcp": 16.75
  },
  {
    "id": "e6aa9748-9007-4c06-b894-2743f518dd7d",
    "player_id": "ada10e8e-4301-47a5-acd6-c9f008f8e89c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 0.0,
    "current_hcp": 13.75
  },
  {
    "id": "663abf26-3033-4543-8ea6-beaa01f1a224",
    "player_id": "e9b7c8ed-934b-484d-b124-71c3e93b731f",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 7.0,
    "current_hcp": 6.2
  },
  {
    "id": "214cdbe4-20dd-459f-a400-9c97f9669be9",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 44.0
  },
  {
    "id": "7b0d2845-3fb4-4b65-a888-b0298a0f6ced",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 42.0
  },
  {
    "id": "83135eff-917a-4066-b972-f7eefc793e6a",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 45.0
  },
  {
    "id": "9f3419ca-87f8-462e-a8b6-ad98e7316931",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 43.0
  },
  {
    "id": "f0dbac1b-77b9-4eab-b6f3-e18b5667e02a",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 46.0
  },
  {
    "id": "c0023597-6db5-44ae-a034-9d39b821683f",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 52.0
  },
  {
    "id": "b546ff19-d4e7-4885-ae08-bb3b57931560",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 39.0
  },
  {
    "id": "91a318ce-f6ae-4af8-96f8-5f685ff09b0b",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 41.0
  },
  {
    "id": "30da9218-fda3-4815-8a67-da119b655960",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 41.0
  },
  {
    "id": "e44e55ed-739e-4c5f-83ca-12d387ac2317",
    "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 43.0
  },
  {
    "id": "88ec78b8-dbdc-4b26-8d98-488907d556e1",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 39.0
  },
  {
    "id": "d84aaa09-cfaf-47d0-a860-bb47b527fd4c",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 52.0
  },
  {
    "id": "6ad2798d-9a41-4eb8-a936-926f07f421b3",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 42.0
  },
  {
    "id": "9051f589-fa37-46cd-a184-a00d91617cd5",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 57.0
  },
  {
    "id": "ca4197be-2932-44a5-906e-712d6e067128",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 51.0
  },
  {
    "id": "ffccd79d-2c88-42d5-90db-66557228c784",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 61.0
  },
  {
    "id": "0c0f1112-5cff-4a90-8e85-5541ce9de740",
    "player_id": "ada10e8e-4301-47a5-acd6-c9f008f8e89c",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 50.0
  },
  {
    "id": "b05c1fe1-9e3c-4849-8fa3-5a0aca32ee47",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 44.0
  },
  {
    "id": "844580a3-d0e4-49f5-8ae9-cb7a893107db",
    "player_id": "4290d08f-5f91-4e4f-91a3-40b4eb54311a",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 64.0
  },
  {
    "id": "fda32192-d34d-4bc9-a633-396922e6dff9",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 50.0
  },
  {
    "id": "53640ff4-7ecb-4589-85b7-c0749b24029b",
    "player_id": "b6caae54-f2ea-431b-9f12-2f098b988d3d",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 43.0
  },
  {
    "id": "9c43ae5c-7dcf-4a9f-bffb-59fe35d5f354",
    "player_id": "a4e2ad90-0233-49fb-89d7-b8bdcad1d752",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 52.0
  },
  {
    "id": "1632807f-6f7a-47f8-95e6-c6c712217fb4",
    "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "prev_season_hcp": null,
    "current_hcp": 41.0
  }
]
  const weeks = [
  {
    "id": "9cdc0f3c-09ea-4022-a6f4-ca959568b423",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 1,
    "date": "2026-04-13",
    "week_type": "scramble"
  },
  {
    "id": "279e869a-d712-4aa2-99ca-55b201154736",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 2,
    "date": "2026-04-20",
    "week_type": "regular"
  },
  {
    "id": "0becd14e-8647-4a8c-9d11-ea070a34bb53",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 3,
    "date": "2026-04-27",
    "week_type": "regular"
  },
  {
    "id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 4,
    "date": "2026-05-04",
    "week_type": "regular"
  },
  {
    "id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 5,
    "date": "2026-05-11",
    "week_type": "regular"
  },
  {
    "id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 6,
    "date": "2026-05-18",
    "week_type": "regular"
  },
  {
    "id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 7,
    "date": "2026-05-25",
    "week_type": "regular"
  },
  {
    "id": "1edebf97-f304-49a9-bbd3-ffb9b241e942",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 8,
    "date": "2026-06-01",
    "week_type": "regular"
  },
  {
    "id": "0287a7bd-be72-400e-85e8-268e948f5df7",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 9,
    "date": "2026-06-08",
    "week_type": "regular"
  },
  {
    "id": "87322ab6-ad6f-448b-b15e-ed21ee708e01",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 10,
    "date": "2026-06-15",
    "week_type": "regular"
  },
  {
    "id": "1a1d71c7-87b4-478e-9d24-bafc50395cd5",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 11,
    "date": "2026-06-22",
    "week_type": "regular"
  },
  {
    "id": "fd9ba2d7-9b04-411f-83c7-c890c4623a79",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 12,
    "date": "2026-06-29",
    "week_type": "regular"
  },
  {
    "id": "2dbd3f8c-4593-4e3f-8e24-d60e12621e5f",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 13,
    "date": "2026-07-06",
    "week_type": "regular"
  },
  {
    "id": "6f75d6df-353c-4afb-a8dc-ccc68bbfe1dd",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 14,
    "date": "2026-07-13",
    "week_type": "regular"
  },
  {
    "id": "11909c6a-7810-4852-877e-0a5ad5244013",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 15,
    "date": "2026-07-20",
    "week_type": "regular"
  },
  {
    "id": "4f73b841-e2e9-46d4-b570-2773d3e3119c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 16,
    "date": "2026-07-27",
    "week_type": "regular"
  },
  {
    "id": "fbd2fff7-b351-4895-95cc-f9a343c25962",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 17,
    "date": "2026-08-03",
    "week_type": "regular"
  },
  {
    "id": "8b103552-da44-4577-b95f-c1cc680780ac",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 18,
    "date": "2026-08-10",
    "week_type": "regular"
  },
  {
    "id": "dc946d17-3657-437a-ad23-7f75f5409938",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 19,
    "date": "2026-08-17",
    "week_type": "regular"
  },
  {
    "id": "d747eb98-7290-46ac-95b2-907d19fc7d37",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "number": 20,
    "date": "",
    "week_type": "end_scramble"
  },
  {
    "id": "dc8c8d1f-6c76-4364-b411-3fba943d037b",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 1,
    "date": "2024-04-08",
    "week_type": "regular"
  },
  {
    "id": "7ad0ca1a-435d-4d13-b575-0dfc039cf909",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 2,
    "date": "2024-04-14",
    "week_type": "regular"
  },
  {
    "id": "709fbac7-9f7b-4739-aceb-f63959d24c87",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 3,
    "date": "2024-04-21",
    "week_type": "regular"
  },
  {
    "id": "6738aefd-03f2-45bd-a09b-2005dca0c276",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 4,
    "date": "2024-04-28",
    "week_type": "regular"
  },
  {
    "id": "19838a95-2bd2-40b1-8164-447e7f1049fb",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 5,
    "date": "2024-05-05",
    "week_type": "regular"
  },
  {
    "id": "63e4bb45-f9c7-4594-b744-2a5e4774e7d0",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 6,
    "date": "2024-05-12",
    "week_type": "regular"
  },
  {
    "id": "7128995c-1718-4312-adb2-f4fa64500406",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 7,
    "date": "2024-05-19",
    "week_type": "regular"
  },
  {
    "id": "a293e6f7-2e46-48d1-9afc-f3f9fe386976",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 8,
    "date": "2024-06-02",
    "week_type": "regular"
  },
  {
    "id": "7a711edf-38c9-4827-84b4-3ccba52d840b",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 9,
    "date": "2025-06-09",
    "week_type": "regular"
  },
  {
    "id": "1b51dd38-9a30-4b3a-b6c8-f0eaf1ca30fe",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 10,
    "date": "2025-06-16",
    "week_type": "regular"
  },
  {
    "id": "ca69ea9d-59d4-4e8c-b95a-75ce2c4bda31",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 11,
    "date": "2025-06-23",
    "week_type": "regular"
  },
  {
    "id": "b4f984d3-3f10-45b0-b350-a8d992904871",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 12,
    "date": "2025-06-30",
    "week_type": "regular"
  },
  {
    "id": "13456862-a4f4-41d4-95fc-243e5338f4aa",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 13,
    "date": "2025-07-07",
    "week_type": "regular"
  },
  {
    "id": "ece766d2-e463-4e3b-b3f8-668d59cd3164",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 14,
    "date": "2025-07-14",
    "week_type": "regular"
  },
  {
    "id": "eb4e10f6-6daf-4715-a0c5-b5e96eada093",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 15,
    "date": "2025-07-21",
    "week_type": "regular"
  },
  {
    "id": "9617fd14-8573-4b04-8843-ecb7a6ce32d1",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 16,
    "date": "2025-07-28",
    "week_type": "regular"
  },
  {
    "id": "3a8f4d31-aaa3-49b6-bf80-d17065839c94",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 17,
    "date": "2025-08-04",
    "week_type": "regular"
  },
  {
    "id": "f086b2a4-6d07-4aa7-b90e-f8184968adb7",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 18,
    "date": "2025-08-11",
    "week_type": "regular"
  },
  {
    "id": "13ed8c51-18ac-4de3-aa2f-118b658f14e6",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "number": 19,
    "date": "2025-08-18",
    "week_type": "regular"
  }
]
  const matchups = [
  {
    "id": "af3eb264-f630-45f6-b0d0-1f06a3eb29a8",
    "week_id": "279e869a-d712-4aa2-99ca-55b201154736",
    "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 1
  },
  {
    "id": "a70afce9-9d16-438c-9922-c7f7ac2507cd",
    "week_id": "279e869a-d712-4aa2-99ca-55b201154736",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 2
  },
  {
    "id": "8e1fa12e-0029-4614-bec8-6d120fb5d1db",
    "week_id": "279e869a-d712-4aa2-99ca-55b201154736",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 3
  },
  {
    "id": "ee370eb3-6362-4ae8-8f9d-e0784950bd35",
    "week_id": "279e869a-d712-4aa2-99ca-55b201154736",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 4
  },
  {
    "id": "c43b7e4a-85ad-4e2a-9bf9-9969372438ad",
    "week_id": "279e869a-d712-4aa2-99ca-55b201154736",
    "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 5
  },
  {
    "id": "8a77d124-1d85-4032-b0b3-ad10a93b6329",
    "week_id": "279e869a-d712-4aa2-99ca-55b201154736",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 6
  },
  {
    "id": "3aa21033-36c5-4907-aba8-e2a0e995b14d",
    "week_id": "0becd14e-8647-4a8c-9d11-ea070a34bb53",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 1
  },
  {
    "id": "a117a200-76e8-49ec-95f2-98a44ec6a15a",
    "week_id": "0becd14e-8647-4a8c-9d11-ea070a34bb53",
    "home_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 2
  },
  {
    "id": "5c386402-fb95-417f-89a3-b21ea6006bed",
    "week_id": "0becd14e-8647-4a8c-9d11-ea070a34bb53",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 3
  },
  {
    "id": "75d60317-882e-44bb-9d05-5e14ea1b1d22",
    "week_id": "0becd14e-8647-4a8c-9d11-ea070a34bb53",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 4
  },
  {
    "id": "fc0debe9-ef46-4c3c-98d7-0a0a64141715",
    "week_id": "0becd14e-8647-4a8c-9d11-ea070a34bb53",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 5
  },
  {
    "id": "f55ea1d4-64b8-4e59-9b96-405b0f3628b1",
    "week_id": "0becd14e-8647-4a8c-9d11-ea070a34bb53",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 6
  },
  {
    "id": "fb87e027-6f6c-4da3-a35a-b30e26d2e738",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 1
  },
  {
    "id": "9dba10d8-a7fa-4890-b111-2f94927810d6",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "home_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 2
  },
  {
    "id": "3ce2803f-db0d-4255-8183-a63e94114ed7",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 3
  },
  {
    "id": "4df96c99-c529-40c9-bb9c-fd02c61e99fe",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "hole_assignment": 4
  },
  {
    "id": "921aaf05-1bdf-4df7-afe8-66281418c769",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 5
  },
  {
    "id": "78efdace-1404-417a-8d8b-fcef0cdf451f",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 6
  },
  {
    "id": "5da0c651-8185-4900-a4c1-367a494f211a",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "home_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 1
  },
  {
    "id": "9313bce7-8045-4c26-a7e6-bcd4987b0476",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "hole_assignment": 2
  },
  {
    "id": "d8b47586-63b8-4e10-9e3b-f7e089d758ce",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 3
  },
  {
    "id": "8bc36956-ab7e-40ab-bfff-ca38ff276c82",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "hole_assignment": 4
  },
  {
    "id": "4a6c5e2f-9d0f-4ae7-96fc-a71752246968",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "home_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 5
  },
  {
    "id": "16337ec5-4607-4501-8a36-ab255ba365cd",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "hole_assignment": 6
  },
  {
    "id": "2cc0bdde-ee67-4ca4-a64e-c42e141d1bdb",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "home_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 1
  },
  {
    "id": "002a871d-9728-4274-820b-c366d31714c6",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "hole_assignment": 2
  },
  {
    "id": "3af5ab44-b872-4547-953d-6617d03ecf16",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 3
  },
  {
    "id": "3dba026f-4231-4360-bb28-bf1103dcda76",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "hole_assignment": 4
  },
  {
    "id": "8f01d14c-ddf6-47ff-96b6-3493ae2d8ee7",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 5
  },
  {
    "id": "fc4861f3-3fc2-4f4d-b38b-3a43a99d44f4",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 6
  },
  {
    "id": "a1612204-3b63-4d43-af0e-9d4bf93e0e32",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 1
  },
  {
    "id": "ce1fe122-5709-4d9b-99af-e814b1913b17",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "home_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 2
  },
  {
    "id": "fed5af2a-3934-40f4-a85a-65e35f518302",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 3
  },
  {
    "id": "f86622f4-75fb-4462-84d6-eb9ca313c2de",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "home_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 4
  },
  {
    "id": "68c330cf-7cae-413e-9292-e08d65c6128a",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "home_team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "hole_assignment": 5
  },
  {
    "id": "60a4e661-b8f2-4774-8348-02128614fa66",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "hole_assignment": 6
  },
  {
    "id": "aa34af48-fd64-41bb-9d50-360fbb0aef60",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "hole_assignment": 7
  },
  {
    "id": "ff3b1672-9092-422f-ab02-75620a1995a4",
    "week_id": "1edebf97-f304-49a9-bbd3-ffb9b241e942",
    "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 1
  },
  {
    "id": "82a5582b-bac4-46b4-a4d6-57e72c7d9272",
    "week_id": "1edebf97-f304-49a9-bbd3-ffb9b241e942",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 2
  },
  {
    "id": "8f5beb81-66eb-40ac-8e89-6e814d9d501e",
    "week_id": "1edebf97-f304-49a9-bbd3-ffb9b241e942",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "hole_assignment": 3
  },
  {
    "id": "30941d00-8b80-4d7b-aee7-a24eae235296",
    "week_id": "1edebf97-f304-49a9-bbd3-ffb9b241e942",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 4
  },
  {
    "id": "4ac94552-4efb-43df-b54b-2e2b9886a1b5",
    "week_id": "1edebf97-f304-49a9-bbd3-ffb9b241e942",
    "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 5
  },
  {
    "id": "f2543940-e115-4d05-aac1-7c71fd57464f",
    "week_id": "1edebf97-f304-49a9-bbd3-ffb9b241e942",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 6
  },
  {
    "id": "5ecd8093-2f51-4956-8d8e-b83da237a5c6",
    "week_id": "0287a7bd-be72-400e-85e8-268e948f5df7",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 1
  },
  {
    "id": "4e97c84d-6c28-4faa-9354-7f4abf65b5f9",
    "week_id": "0287a7bd-be72-400e-85e8-268e948f5df7",
    "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 2
  },
  {
    "id": "3ce78e31-a7bd-43a1-8573-f55bc75d74f8",
    "week_id": "0287a7bd-be72-400e-85e8-268e948f5df7",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 3
  },
  {
    "id": "5abdc967-e5b4-4605-bd77-ea29523eaddc",
    "week_id": "0287a7bd-be72-400e-85e8-268e948f5df7",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 4
  },
  {
    "id": "828ef844-dbf0-4630-8e2e-c2940c81eb67",
    "week_id": "0287a7bd-be72-400e-85e8-268e948f5df7",
    "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 5
  },
  {
    "id": "0a4ee6a3-7098-44fa-91c3-c8a26fd932a8",
    "week_id": "0287a7bd-be72-400e-85e8-268e948f5df7",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 6
  },
  {
    "id": "c4e731f5-67f7-42c5-b06c-41428cb7935a",
    "week_id": "87322ab6-ad6f-448b-b15e-ed21ee708e01",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 1
  },
  {
    "id": "394801b2-69bc-4112-b7e7-29a0366e1a78",
    "week_id": "87322ab6-ad6f-448b-b15e-ed21ee708e01",
    "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 2
  },
  {
    "id": "a2091f85-31c7-4362-8bcc-1cc2ca6338aa",
    "week_id": "87322ab6-ad6f-448b-b15e-ed21ee708e01",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 3
  },
  {
    "id": "825c1f40-de29-47c2-b793-aabeba1a766a",
    "week_id": "87322ab6-ad6f-448b-b15e-ed21ee708e01",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "hole_assignment": 4
  },
  {
    "id": "2a20cb39-4a1f-4ced-aeda-548522a6bee7",
    "week_id": "87322ab6-ad6f-448b-b15e-ed21ee708e01",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 5
  },
  {
    "id": "074c4fae-5d61-44bc-84f3-ad96db576fa4",
    "week_id": "87322ab6-ad6f-448b-b15e-ed21ee708e01",
    "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 6
  },
  {
    "id": "8edce0ec-24da-4e81-aa3b-6acd277a5630",
    "week_id": "1a1d71c7-87b4-478e-9d24-bafc50395cd5",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "hole_assignment": 1
  },
  {
    "id": "cc2c87ba-8fa0-47a5-b559-c862ae21edf0",
    "week_id": "1a1d71c7-87b4-478e-9d24-bafc50395cd5",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 2
  },
  {
    "id": "13f81a86-3141-4b88-a9db-6f7ebbfe6ee0",
    "week_id": "1a1d71c7-87b4-478e-9d24-bafc50395cd5",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "hole_assignment": 3
  },
  {
    "id": "c5ca346d-56af-43c8-8483-aba9703a82cb",
    "week_id": "1a1d71c7-87b4-478e-9d24-bafc50395cd5",
    "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 4
  },
  {
    "id": "0e045890-3a84-4468-b330-dd861c6bb6ed",
    "week_id": "1a1d71c7-87b4-478e-9d24-bafc50395cd5",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 5
  },
  {
    "id": "83c9c023-9865-4170-8437-38af36895148",
    "week_id": "1a1d71c7-87b4-478e-9d24-bafc50395cd5",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 6
  },
  {
    "id": "3327de8a-05dc-406e-ad4e-16f40c9bbc46",
    "week_id": "fd9ba2d7-9b04-411f-83c7-c890c4623a79",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "hole_assignment": 1
  },
  {
    "id": "b1b63715-93b0-48a9-a392-dedc59775b15",
    "week_id": "fd9ba2d7-9b04-411f-83c7-c890c4623a79",
    "home_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 2
  },
  {
    "id": "8262ecc7-9849-4b8f-aa4b-68b076f90015",
    "week_id": "fd9ba2d7-9b04-411f-83c7-c890c4623a79",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "hole_assignment": 3
  },
  {
    "id": "e2a0e36b-1a8d-4190-9f58-d8822b81aa3a",
    "week_id": "fd9ba2d7-9b04-411f-83c7-c890c4623a79",
    "home_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 4
  },
  {
    "id": "9e7ce163-29c9-463b-9eaa-406c9bb3956e",
    "week_id": "fd9ba2d7-9b04-411f-83c7-c890c4623a79",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "hole_assignment": 5
  },
  {
    "id": "6858bb3e-05cb-4227-ade3-35dcb10dc38d",
    "week_id": "fd9ba2d7-9b04-411f-83c7-c890c4623a79",
    "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 6
  },
  {
    "id": "7a5ae562-f413-4b33-943c-899e6cd0331c",
    "week_id": "2dbd3f8c-4593-4e3f-8e24-d60e12621e5f",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "hole_assignment": 1
  },
  {
    "id": "45613551-5012-4f51-a8cb-0777537bf2ca",
    "week_id": "2dbd3f8c-4593-4e3f-8e24-d60e12621e5f",
    "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "hole_assignment": 2
  },
  {
    "id": "acf4aaa8-c652-4255-9f36-c5050992b278",
    "week_id": "2dbd3f8c-4593-4e3f-8e24-d60e12621e5f",
    "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "away_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "hole_assignment": 3
  },
  {
    "id": "a58dcf67-870b-4526-9e48-9bdd929561ab",
    "week_id": "2dbd3f8c-4593-4e3f-8e24-d60e12621e5f",
    "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "away_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "hole_assignment": 4
  },
  {
    "id": "963582eb-d89d-489a-b893-362fe3303bc2",
    "week_id": "2dbd3f8c-4593-4e3f-8e24-d60e12621e5f",
    "home_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "away_team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "hole_assignment": 5
  },
  {
    "id": "49414d75-8e35-4ce5-b535-6eb04c07f3b5",
    "week_id": "2dbd3f8c-4593-4e3f-8e24-d60e12621e5f",
    "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 6
  },
  {
    "id": "aab3ff05-02e9-45f5-8abb-aded39ff4fdd",
    "week_id": "2dbd3f8c-4593-4e3f-8e24-d60e12621e5f",
    "home_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 7
  },
  {
    "id": "9749f9c7-9aaf-4bfc-946d-616bc1cbba22",
    "week_id": "6f75d6df-353c-4afb-a8dc-ccc68bbfe1dd",
    "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 1
  },
  {
    "id": "0b7c0f0c-3c2c-4aef-a2e1-b4238afafb50",
    "week_id": "6f75d6df-353c-4afb-a8dc-ccc68bbfe1dd",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "hole_assignment": 2
  },
  {
    "id": "96d9e12f-95d8-475d-a823-6bd4f0c403ee",
    "week_id": "6f75d6df-353c-4afb-a8dc-ccc68bbfe1dd",
    "home_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 3
  },
  {
    "id": "1fa23f87-3979-4e57-bcd1-52a42e2324fc",
    "week_id": "6f75d6df-353c-4afb-a8dc-ccc68bbfe1dd",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "hole_assignment": 4
  },
  {
    "id": "6858d62e-54c6-45e0-94d7-cfc2e091f9bb",
    "week_id": "6f75d6df-353c-4afb-a8dc-ccc68bbfe1dd",
    "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 5
  },
  {
    "id": "d0afb716-aa85-46fb-95c2-d4627da6f7b8",
    "week_id": "6f75d6df-353c-4afb-a8dc-ccc68bbfe1dd",
    "home_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 6
  },
  {
    "id": "4f211a89-7b30-4899-a666-9702701daba4",
    "week_id": "11909c6a-7810-4852-877e-0a5ad5244013",
    "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 1
  },
  {
    "id": "076c6622-9db8-42ce-aab6-ba6c78f9a1ce",
    "week_id": "11909c6a-7810-4852-877e-0a5ad5244013",
    "home_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 2
  },
  {
    "id": "2e725846-72ee-43a5-8418-3caf2946ff46",
    "week_id": "11909c6a-7810-4852-877e-0a5ad5244013",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "hole_assignment": 3
  },
  {
    "id": "189e3259-dc32-4585-b399-65f1574361a5",
    "week_id": "11909c6a-7810-4852-877e-0a5ad5244013",
    "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 4
  },
  {
    "id": "6ee8ea0f-a78c-4176-a284-14dc97c7857d",
    "week_id": "11909c6a-7810-4852-877e-0a5ad5244013",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 5
  },
  {
    "id": "69311e7c-31c7-410f-aefa-e11ff7108cf2",
    "week_id": "11909c6a-7810-4852-877e-0a5ad5244013",
    "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 6
  },
  {
    "id": "42bcbb0e-8cbc-42f0-a127-f7e99edde4c4",
    "week_id": "4f73b841-e2e9-46d4-b570-2773d3e3119c",
    "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 1
  },
  {
    "id": "d0b0faa4-1afd-4d21-aa63-30e1a1f160a2",
    "week_id": "4f73b841-e2e9-46d4-b570-2773d3e3119c",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 2
  },
  {
    "id": "117732f6-6468-4ca5-8aa6-c38e6200d82a",
    "week_id": "4f73b841-e2e9-46d4-b570-2773d3e3119c",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 3
  },
  {
    "id": "cfd6d11b-74ad-48d7-ab39-7606907a0c8a",
    "week_id": "4f73b841-e2e9-46d4-b570-2773d3e3119c",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "hole_assignment": 4
  },
  {
    "id": "816f414c-c8fc-4813-9048-8f3449271a3f",
    "week_id": "4f73b841-e2e9-46d4-b570-2773d3e3119c",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 5
  },
  {
    "id": "5dd7d943-0da4-49d3-a24c-02935ac28c61",
    "week_id": "4f73b841-e2e9-46d4-b570-2773d3e3119c",
    "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 6
  },
  {
    "id": "101ccbf3-858d-48cd-9b0b-55d9652b54f0",
    "week_id": "fbd2fff7-b351-4895-95cc-f9a343c25962",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 1
  },
  {
    "id": "5bd0cdb9-c504-42e8-8293-32e40c33732a",
    "week_id": "fbd2fff7-b351-4895-95cc-f9a343c25962",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 2
  },
  {
    "id": "41115e98-2b60-4840-9844-777c06b986a3",
    "week_id": "fbd2fff7-b351-4895-95cc-f9a343c25962",
    "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 3
  },
  {
    "id": "e75c4cfa-379e-400e-b1ed-c2c6f0425bb7",
    "week_id": "fbd2fff7-b351-4895-95cc-f9a343c25962",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 4
  },
  {
    "id": "2af063f6-9cfb-4118-aa56-8535d09f3619",
    "week_id": "fbd2fff7-b351-4895-95cc-f9a343c25962",
    "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 5
  },
  {
    "id": "48e0d0bd-99c5-457e-afc7-e045a9a12dbf",
    "week_id": "fbd2fff7-b351-4895-95cc-f9a343c25962",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 6
  },
  {
    "id": "02ab1e14-7bbc-418a-85d4-54670236e2af",
    "week_id": "8b103552-da44-4577-b95f-c1cc680780ac",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 1
  },
  {
    "id": "9d8172a4-35e2-450a-845a-9703eafe4a5d",
    "week_id": "8b103552-da44-4577-b95f-c1cc680780ac",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 2
  },
  {
    "id": "324d8ec4-1860-445a-b78c-fd8d795163a9",
    "week_id": "8b103552-da44-4577-b95f-c1cc680780ac",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c",
    "hole_assignment": 3
  },
  {
    "id": "d846c1ae-af27-4aae-88f6-5dfdf8cad659",
    "week_id": "8b103552-da44-4577-b95f-c1cc680780ac",
    "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "hole_assignment": 4
  },
  {
    "id": "502b427f-e191-4e0c-90d8-c850feb2c75a",
    "week_id": "8b103552-da44-4577-b95f-c1cc680780ac",
    "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 5
  },
  {
    "id": "9ea5b071-a92d-4603-b74e-c2219b460c66",
    "week_id": "8b103552-da44-4577-b95f-c1cc680780ac",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 6
  },
  {
    "id": "e3b96973-900f-4fd6-ac20-680424a14598",
    "week_id": "dc946d17-3657-437a-ad23-7f75f5409938",
    "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd",
    "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146",
    "hole_assignment": 1
  },
  {
    "id": "02757baa-b8cf-4081-a06e-9161f4dea122",
    "week_id": "dc946d17-3657-437a-ad23-7f75f5409938",
    "home_team_id": "4e7515f7-841c-466c-9363-1f91fd11ccb7",
    "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55",
    "hole_assignment": 2
  },
  {
    "id": "01c96824-1ca3-4c40-ac8f-e5ad9785ab2e",
    "week_id": "dc946d17-3657-437a-ad23-7f75f5409938",
    "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c",
    "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8",
    "hole_assignment": 3
  },
  {
    "id": "0cff288b-5ced-4e6b-8c6b-53dded762191",
    "week_id": "dc946d17-3657-437a-ad23-7f75f5409938",
    "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f",
    "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7",
    "hole_assignment": 4
  },
  {
    "id": "4bf4d283-bf92-474b-97d3-3619d21779b9",
    "week_id": "dc946d17-3657-437a-ad23-7f75f5409938",
    "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398",
    "away_team_id": "db878758-8438-475d-81e8-b60209071cab",
    "hole_assignment": 5
  },
  {
    "id": "9aa9ba04-1ae3-4ece-9489-54cc3a4e4bdb",
    "week_id": "dc946d17-3657-437a-ad23-7f75f5409938",
    "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578",
    "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290",
    "hole_assignment": 6
  },
  {
    "id": "8d3694d7-b956-4c8f-af23-9dad2caa2c39",
    "week_id": "dc946d17-3657-437a-ad23-7f75f5409938",
    "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2",
    "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46",
    "hole_assignment": 7
  }
]
  const scores = [
  {
    "id": "8ad975c3-2950-4046-a626-ff085c702345",
    "matchup_id": "ee370eb3-6362-4ae8-8f9d-e0784950bd35",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "gross": 42,
    "is_blind": false
  },
  {
    "id": "6746a710-a40e-4543-8356-c435a062ad55",
    "matchup_id": "fc0debe9-ef46-4c3c-98d7-0a0a64141715",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "13820a6d-4d73-46d3-a1d4-2cbe132bd510",
    "matchup_id": "3ce2803f-db0d-4255-8183-a63e94114ed7",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "5de9baf3-9952-463d-92bf-d36e79cf4943",
    "matchup_id": "d8b47586-63b8-4e10-9e3b-f7e089d758ce",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "gross": 51,
    "is_blind": false
  },
  {
    "id": "0f34bdaf-7112-438c-8161-aafbda48f7a4",
    "matchup_id": "fc4861f3-3fc2-4f4d-b38b-3a43a99d44f4",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "54ba7c78-5796-4f70-a219-eca61a19f30b",
    "matchup_id": "a1612204-3b63-4d43-af0e-9d4bf93e0e32",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "3d88dfeb-14e9-46ac-aa0f-fe3358f5a5d4",
    "matchup_id": "ee370eb3-6362-4ae8-8f9d-e0784950bd35",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "gross": 42,
    "is_blind": false
  },
  {
    "id": "b74d8405-4d95-4ee2-85d7-f18bdd5c9c47",
    "matchup_id": "fc0debe9-ef46-4c3c-98d7-0a0a64141715",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "8b7ed035-c84e-4cdc-8afe-ade57641d6a5",
    "matchup_id": "3ce2803f-db0d-4255-8183-a63e94114ed7",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "gross": 42,
    "is_blind": false
  },
  {
    "id": "bd203e17-a79f-4709-8102-b044fc75c884",
    "matchup_id": "d8b47586-63b8-4e10-9e3b-f7e089d758ce",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "gross": 49,
    "is_blind": false
  },
  {
    "id": "bab57be2-f2fb-4239-949b-ae9477bb516d",
    "matchup_id": "fc4861f3-3fc2-4f4d-b38b-3a43a99d44f4",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "gross": 43,
    "is_blind": false
  },
  {
    "id": "d7576e2a-0dd4-4a35-99eb-7aafcbd4515d",
    "matchup_id": "a1612204-3b63-4d43-af0e-9d4bf93e0e32",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "07ec13ba-78a7-436e-86a4-d14676cdc76b",
    "matchup_id": "a70afce9-9d16-438c-9922-c7f7ac2507cd",
    "player_id": "1f2801b1-4e46-459b-9b99-919938b85746",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "bf41f51d-101e-49fd-91ef-25d2cf638feb",
    "matchup_id": "5c386402-fb95-417f-89a3-b21ea6006bed",
    "player_id": "1f2801b1-4e46-459b-9b99-919938b85746",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "c3276fe7-218e-4152-b5e9-61a1612c8b6b",
    "matchup_id": "78efdace-1404-417a-8d8b-fcef0cdf451f",
    "player_id": "1f2801b1-4e46-459b-9b99-919938b85746",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "87d66ce5-c461-4b56-9ba9-7087ff6d6d1d",
    "matchup_id": "16337ec5-4607-4501-8a36-ab255ba365cd",
    "player_id": "1f2801b1-4e46-459b-9b99-919938b85746",
    "gross": 46,
    "is_blind": false
  },
  {
    "id": "c9cbd8e0-727a-45e8-b4a7-7944d8f7500b",
    "matchup_id": "3dba026f-4231-4360-bb28-bf1103dcda76",
    "player_id": "1f2801b1-4e46-459b-9b99-919938b85746",
    "gross": 39,
    "is_blind": false
  },
  {
    "id": "e808b40b-e953-4061-9f38-73b776d2bbea",
    "matchup_id": "60a4e661-b8f2-4774-8348-02128614fa66",
    "player_id": "1f2801b1-4e46-459b-9b99-919938b85746",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "1471050d-4c9b-4297-b2c1-9517afe4b122",
    "matchup_id": "a70afce9-9d16-438c-9922-c7f7ac2507cd",
    "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c",
    "gross": 58,
    "is_blind": false
  },
  {
    "id": "dee0106a-11d7-4ae6-b62d-88aa327c2e9f",
    "matchup_id": "5c386402-fb95-417f-89a3-b21ea6006bed",
    "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c",
    "gross": 53,
    "is_blind": false
  },
  {
    "id": "aa9a0857-7ea4-444a-af85-c532347775e7",
    "matchup_id": "78efdace-1404-417a-8d8b-fcef0cdf451f",
    "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c",
    "gross": 60,
    "is_blind": false
  },
  {
    "id": "c10ad0e0-073f-46d7-b4da-6044d724926d",
    "matchup_id": "16337ec5-4607-4501-8a36-ab255ba365cd",
    "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c",
    "gross": 55,
    "is_blind": false
  },
  {
    "id": "3445ff4a-6a15-4d7f-8841-c7af475387e2",
    "matchup_id": "3dba026f-4231-4360-bb28-bf1103dcda76",
    "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c",
    "gross": 55,
    "is_blind": false
  },
  {
    "id": "6673774a-c777-4cd2-926f-9a79cd77f9d3",
    "matchup_id": "8a77d124-1d85-4032-b0b3-ad10a93b6329",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "e544dc70-94fc-4670-ad9e-af4efab9936f",
    "matchup_id": "f55ea1d4-64b8-4e59-9b96-405b0f3628b1",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "b6adfef2-2e4c-4796-9cd2-1ea12ea904f9",
    "matchup_id": "fb87e027-6f6c-4da3-a35a-b30e26d2e738",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "af42e62a-ce47-40ff-bdbe-756afb541764",
    "matchup_id": "9313bce7-8045-4c26-a7e6-bcd4987b0476",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "gross": 49,
    "is_blind": false
  },
  {
    "id": "ae09b957-7701-4e64-8bcf-7c2b7d422328",
    "matchup_id": "002a871d-9728-4274-820b-c366d31714c6",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "gross": 46,
    "is_blind": false
  },
  {
    "id": "3481ef36-ccee-4d42-8cbd-29f5f7e97452",
    "matchup_id": "aa34af48-fd64-41bb-9d50-360fbb0aef60",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "gross": 41,
    "is_blind": false
  },
  {
    "id": "447d1c43-4d4d-426e-94a9-6aca4807832c",
    "matchup_id": "8a77d124-1d85-4032-b0b3-ad10a93b6329",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "gross": 50,
    "is_blind": false
  },
  {
    "id": "eb6a0879-7421-4fd1-8a9f-c00e7ba77bc8",
    "matchup_id": "f55ea1d4-64b8-4e59-9b96-405b0f3628b1",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "d4a19c67-af4a-47c6-9b78-124e8ddf8730",
    "matchup_id": "fb87e027-6f6c-4da3-a35a-b30e26d2e738",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "c1bbf8a5-488d-46aa-a99a-c6bcb5a9c57e",
    "matchup_id": "9313bce7-8045-4c26-a7e6-bcd4987b0476",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "gross": 52,
    "is_blind": false
  },
  {
    "id": "9500ea6e-8aa7-468f-b5e8-15aebeda0dc6",
    "matchup_id": "002a871d-9728-4274-820b-c366d31714c6",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "gross": 46,
    "is_blind": false
  },
  {
    "id": "c1813fd7-af36-4dba-b6b7-790db981acf1",
    "matchup_id": "aa34af48-fd64-41bb-9d50-360fbb0aef60",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "520b07fa-2a92-4cfa-8e96-c6a56aa247cc",
    "matchup_id": "8e1fa12e-0029-4614-bec8-6d120fb5d1db",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "c2deb928-7cd1-4e2c-881a-b4ec703accb0",
    "matchup_id": "3aa21033-36c5-4907-aba8-e2a0e995b14d",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "gross": 46,
    "is_blind": false
  },
  {
    "id": "f835625a-0a84-487c-8b3c-7fe0b114a19d",
    "matchup_id": "4df96c99-c529-40c9-bb9c-fd02c61e99fe",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "311ae757-3488-4708-806e-ebf8a710f402",
    "matchup_id": "8bc36956-ab7e-40ab-bfff-ca38ff276c82",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "gross": 53,
    "is_blind": false
  },
  {
    "id": "a9f71394-777a-4a34-9be5-c8ff24c88a97",
    "matchup_id": "002a871d-9728-4274-820b-c366d31714c6",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "gross": 42,
    "is_blind": false
  },
  {
    "id": "c8f65c8c-51bd-4b45-9a3e-e36ba485cd19",
    "matchup_id": "8e1fa12e-0029-4614-bec8-6d120fb5d1db",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341",
    "gross": 62,
    "is_blind": false
  },
  {
    "id": "7155649c-6516-49fa-b13b-cc10f2715b9c",
    "matchup_id": "3aa21033-36c5-4907-aba8-e2a0e995b14d",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "4e2d9bac-0f27-4efb-b320-14c5c0ae9faf",
    "matchup_id": "4df96c99-c529-40c9-bb9c-fd02c61e99fe",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "0c4c7322-b20d-4fc0-9704-86b2e2cb3152",
    "matchup_id": "8bc36956-ab7e-40ab-bfff-ca38ff276c82",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341",
    "gross": 55,
    "is_blind": false
  },
  {
    "id": "97d51185-e680-44f8-8c4d-674ffa361e10",
    "matchup_id": "75d60317-882e-44bb-9d05-5e14ea1b1d22",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81",
    "gross": 42,
    "is_blind": false
  },
  {
    "id": "11e629d1-db24-4d39-a487-487d0e9d18eb",
    "matchup_id": "8bc36956-ab7e-40ab-bfff-ca38ff276c82",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81",
    "gross": 41,
    "is_blind": false
  },
  {
    "id": "70d59bfd-9aa0-434a-9ee3-faede8d4860c",
    "matchup_id": "3dba026f-4231-4360-bb28-bf1103dcda76",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81",
    "gross": 43,
    "is_blind": false
  },
  {
    "id": "4a699014-6054-4460-ace9-98045844dbb4",
    "matchup_id": "60a4e661-b8f2-4774-8348-02128614fa66",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81",
    "gross": 36,
    "is_blind": false
  },
  {
    "id": "c81fe3d3-4061-4881-ba6b-5442e957d3ac",
    "matchup_id": "75d60317-882e-44bb-9d05-5e14ea1b1d22",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "gross": 41,
    "is_blind": false
  },
  {
    "id": "28828321-8072-46df-af2e-ad644156e616",
    "matchup_id": "8bc36956-ab7e-40ab-bfff-ca38ff276c82",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "gross": 43,
    "is_blind": false
  },
  {
    "id": "0408847b-2628-46e4-8937-7665291c4c46",
    "matchup_id": "3dba026f-4231-4360-bb28-bf1103dcda76",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "gross": 41,
    "is_blind": false
  },
  {
    "id": "71b472e1-4a15-4d25-8b5d-1a166fc9a6a6",
    "matchup_id": "60a4e661-b8f2-4774-8348-02128614fa66",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "gross": 41,
    "is_blind": false
  },
  {
    "id": "361693f4-e640-4f78-ac3b-e7a66548cc83",
    "matchup_id": "af3eb264-f630-45f6-b0d0-1f06a3eb29a8",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "f870757f-672a-49d4-b0fb-b1b70d90fd75",
    "matchup_id": "9313bce7-8045-4c26-a7e6-bcd4987b0476",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "61eaca17-3bff-4e1c-8760-5afb4d30be44",
    "matchup_id": "3af5ab44-b872-4547-953d-6617d03ecf16",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "cd848f03-f99b-49b6-b9b3-b477a51cb2ae",
    "matchup_id": "af3eb264-f630-45f6-b0d0-1f06a3eb29a8",
    "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8",
    "gross": 43,
    "is_blind": false
  },
  {
    "id": "b6bdf832-c1a8-47db-bb26-4e94e80aa9ac",
    "matchup_id": "9313bce7-8045-4c26-a7e6-bcd4987b0476",
    "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8",
    "gross": 48,
    "is_blind": false
  },
  {
    "id": "20c8874d-700c-464f-b584-43ac77750c5a",
    "matchup_id": "3af5ab44-b872-4547-953d-6617d03ecf16",
    "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8",
    "gross": 41,
    "is_blind": false
  },
  {
    "id": "3b05ced4-5e7e-4fe8-ac13-f7fb61f0a76d",
    "matchup_id": "c43b7e4a-85ad-4e2a-9bf9-9969372438ad",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "gross": 43,
    "is_blind": false
  },
  {
    "id": "b57c046d-32fe-4207-a3cf-7661f8bad1bf",
    "matchup_id": "4df96c99-c529-40c9-bb9c-fd02c61e99fe",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "b34559e4-6c0b-4bfd-988e-31b0b8f9374e",
    "matchup_id": "16337ec5-4607-4501-8a36-ab255ba365cd",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "gross": 40,
    "is_blind": false
  },
  {
    "id": "af646b53-1250-49b4-9d4a-d8ef80de3a72",
    "matchup_id": "8f01d14c-ddf6-47ff-96b6-3493ae2d8ee7",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "gross": 40,
    "is_blind": false
  },
  {
    "id": "36eb4076-f766-4249-be3b-5c33fc97adac",
    "matchup_id": "68c330cf-7cae-413e-9292-e08d65c6128a",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "0699727c-9d35-4ae1-b378-7a4588574851",
    "matchup_id": "c43b7e4a-85ad-4e2a-9bf9-9969372438ad",
    "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639",
    "gross": 43,
    "is_blind": false
  },
  {
    "id": "c6ba109c-6393-481a-9dbf-5706ef9d159c",
    "matchup_id": "4df96c99-c529-40c9-bb9c-fd02c61e99fe",
    "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639",
    "gross": 42,
    "is_blind": false
  },
  {
    "id": "f4f3b9c6-3b13-4c6e-b2a2-2f6d5636780a",
    "matchup_id": "16337ec5-4607-4501-8a36-ab255ba365cd",
    "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "d429a5ab-948c-4dd8-800d-3b35631a93bf",
    "matchup_id": "8f01d14c-ddf6-47ff-96b6-3493ae2d8ee7",
    "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "597f1ff5-2eb6-468e-a0bf-754e6f13d148",
    "matchup_id": "68c330cf-7cae-413e-9292-e08d65c6128a",
    "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639",
    "gross": 38,
    "is_blind": false
  },
  {
    "id": "535e4a92-3433-4962-9a63-3c4077bb73bc",
    "matchup_id": "c43b7e4a-85ad-4e2a-9bf9-9969372438ad",
    "player_id": "1199232e-d347-4204-84f1-7ba2d024d813",
    "gross": 52,
    "is_blind": false
  },
  {
    "id": "5541fe17-2ba3-4ab5-8792-bd406d4661cf",
    "matchup_id": "75d60317-882e-44bb-9d05-5e14ea1b1d22",
    "player_id": "1199232e-d347-4204-84f1-7ba2d024d813",
    "gross": 50,
    "is_blind": false
  },
  {
    "id": "6a5e1f63-a035-4536-a91b-b8dc32f5702f",
    "matchup_id": "fb87e027-6f6c-4da3-a35a-b30e26d2e738",
    "player_id": "1199232e-d347-4204-84f1-7ba2d024d813",
    "gross": 63,
    "is_blind": false
  },
  {
    "id": "46091971-6c21-4c42-9143-ee52bbc1ca41",
    "matchup_id": "c43b7e4a-85ad-4e2a-9bf9-9969372438ad",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce",
    "gross": 39,
    "is_blind": false
  },
  {
    "id": "2b621345-f78c-45ac-8c83-480176ee2274",
    "matchup_id": "75d60317-882e-44bb-9d05-5e14ea1b1d22",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "90a87ebb-486c-4a6c-aa49-5d9e65986dc1",
    "matchup_id": "fb87e027-6f6c-4da3-a35a-b30e26d2e738",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "239f23b6-9f8f-4946-b746-2fe7f70a0ce0",
    "matchup_id": "f86622f4-75fb-4462-84d6-eb9ca313c2de",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce",
    "gross": 48,
    "is_blind": false
  },
  {
    "id": "0ded52e3-a21a-4abf-9910-c484aaa701cb",
    "matchup_id": "af3eb264-f630-45f6-b0d0-1f06a3eb29a8",
    "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68",
    "gross": 48,
    "is_blind": false
  },
  {
    "id": "63ede501-9a40-425f-9c8d-814a9078f7d9",
    "matchup_id": "3aa21033-36c5-4907-aba8-e2a0e995b14d",
    "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "b0d497e0-0d72-4478-904f-89b779033467",
    "matchup_id": "78efdace-1404-417a-8d8b-fcef0cdf451f",
    "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68",
    "gross": 41,
    "is_blind": false
  },
  {
    "id": "dce6466d-059d-4a31-88b5-cb00dc1c3b21",
    "matchup_id": "af3eb264-f630-45f6-b0d0-1f06a3eb29a8",
    "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "29db46e1-c9de-4990-aed3-95eb17184890",
    "matchup_id": "3aa21033-36c5-4907-aba8-e2a0e995b14d",
    "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e",
    "gross": 52,
    "is_blind": false
  },
  {
    "id": "1943a4f3-8710-45e8-8bde-64d2034fb31e",
    "matchup_id": "78efdace-1404-417a-8d8b-fcef0cdf451f",
    "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e",
    "gross": 48,
    "is_blind": false
  },
  {
    "id": "a1e46154-bcd7-4229-8c5a-b3af12acd125",
    "matchup_id": "f55ea1d4-64b8-4e59-9b96-405b0f3628b1",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "gross": 44,
    "is_blind": false
  },
  {
    "id": "69666c45-39b8-40bf-b1c5-8744e5b1ce27",
    "matchup_id": "9dba10d8-a7fa-4890-b111-2f94927810d6",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "gross": 48,
    "is_blind": false
  },
  {
    "id": "13a8ba56-8a18-4a93-9664-e9cb68e81668",
    "matchup_id": "5da0c651-8185-4900-a4c1-367a494f211a",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "b4444fac-7b72-42ef-a0d3-e2acf2b00624",
    "matchup_id": "fc4861f3-3fc2-4f4d-b38b-3a43a99d44f4",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "7324af74-8226-4db3-ac7e-826d9ffe6154",
    "matchup_id": "ce1fe122-5709-4d9b-99af-e814b1913b17",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "gross": 39,
    "is_blind": false
  },
  {
    "id": "5773439d-f580-4bba-9605-81a75350aa98",
    "matchup_id": "f55ea1d4-64b8-4e59-9b96-405b0f3628b1",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "gross": 59,
    "is_blind": false
  },
  {
    "id": "0a3caef3-53d0-47da-9c82-685776d8b8ac",
    "matchup_id": "9dba10d8-a7fa-4890-b111-2f94927810d6",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "9c0b0168-daa6-47a3-b85e-3ea09593c12c",
    "matchup_id": "5da0c651-8185-4900-a4c1-367a494f211a",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "3ab5f420-290e-4321-b5e5-7d9cf30be49c",
    "matchup_id": "fc4861f3-3fc2-4f4d-b38b-3a43a99d44f4",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "cb033763-e58e-4f43-b3d9-bdc09ab3a04f",
    "matchup_id": "ce1fe122-5709-4d9b-99af-e814b1913b17",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "585e2a39-5a77-45cf-aa1b-994d742d7bd1",
    "matchup_id": "8e1fa12e-0029-4614-bec8-6d120fb5d1db",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "0c92f4da-b2be-4f02-bf4f-c5bec6f01b16",
    "matchup_id": "5c386402-fb95-417f-89a3-b21ea6006bed",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "3f3a39dd-2b94-4d2c-8122-9e152e7771b8",
    "matchup_id": "921aaf05-1bdf-4df7-afe8-66281418c769",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "6a90af64-b5b9-4212-afa3-fe2fbc5d1303",
    "matchup_id": "d8b47586-63b8-4e10-9e3b-f7e089d758ce",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "757967ed-f20b-4a4a-9927-82282ed54494",
    "matchup_id": "2cc0bdde-ee67-4ca4-a64e-c42e141d1bdb",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "gross": 49,
    "is_blind": false
  },
  {
    "id": "6e62c8a0-5543-4a6f-b738-e9e6bb963a3c",
    "matchup_id": "a1612204-3b63-4d43-af0e-9d4bf93e0e32",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "gross": 53,
    "is_blind": false
  },
  {
    "id": "8a9ee1a3-c26d-4f7e-9e22-cc5b1e8b4663",
    "matchup_id": "8e1fa12e-0029-4614-bec8-6d120fb5d1db",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "99f2d87d-52a9-4db7-bb6a-671225f3553b",
    "matchup_id": "5c386402-fb95-417f-89a3-b21ea6006bed",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "gross": 55,
    "is_blind": false
  },
  {
    "id": "c3370b45-d575-4c2c-95f3-13dcb944de80",
    "matchup_id": "921aaf05-1bdf-4df7-afe8-66281418c769",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "gross": 59,
    "is_blind": false
  },
  {
    "id": "7d055b1c-0356-4d58-a7d0-684b41d4866f",
    "matchup_id": "d8b47586-63b8-4e10-9e3b-f7e089d758ce",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "9dc60de3-46e7-4a66-a1f2-18200aabc7fd",
    "matchup_id": "2cc0bdde-ee67-4ca4-a64e-c42e141d1bdb",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "gross": 64,
    "is_blind": false
  },
  {
    "id": "877fc422-9379-4a40-9b17-ddda95ed5a79",
    "matchup_id": "a1612204-3b63-4d43-af0e-9d4bf93e0e32",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "gross": 56,
    "is_blind": false
  },
  {
    "id": "e7a763ff-0f88-4b39-9b27-4b2a4f4b0915",
    "matchup_id": "8a77d124-1d85-4032-b0b3-ad10a93b6329",
    "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2",
    "gross": 50,
    "is_blind": false
  },
  {
    "id": "41c29807-ff35-4dce-afb8-ec391c5c1786",
    "matchup_id": "a117a200-76e8-49ec-95f2-98a44ec6a15a",
    "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2",
    "gross": 55,
    "is_blind": false
  },
  {
    "id": "3a2abd7e-d237-4c4a-a829-a9b9ae805b63",
    "matchup_id": "3ce2803f-db0d-4255-8183-a63e94114ed7",
    "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2",
    "gross": 60,
    "is_blind": false
  },
  {
    "id": "5cfb06c2-2cb1-45c5-bdb6-b9aeb05bc894",
    "matchup_id": "5da0c651-8185-4900-a4c1-367a494f211a",
    "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2",
    "gross": 58,
    "is_blind": false
  },
  {
    "id": "c34c2ab7-3835-41e4-8e87-b36325388d93",
    "matchup_id": "ce1fe122-5709-4d9b-99af-e814b1913b17",
    "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2",
    "gross": 55,
    "is_blind": false
  },
  {
    "id": "964cbf9a-2ae0-4b1e-b825-04ed7f0b2712",
    "matchup_id": "8a77d124-1d85-4032-b0b3-ad10a93b6329",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "gross": 45,
    "is_blind": false
  },
  {
    "id": "28f26038-8505-4425-adb4-abd12a01a188",
    "matchup_id": "a117a200-76e8-49ec-95f2-98a44ec6a15a",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "gross": 53,
    "is_blind": false
  },
  {
    "id": "bf657bc3-1d83-4192-ac6c-df2d1b06414b",
    "matchup_id": "3ce2803f-db0d-4255-8183-a63e94114ed7",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "gross": 43,
    "is_blind": false
  },
  {
    "id": "83c7bb81-4393-4289-a412-d3eaece4ff14",
    "matchup_id": "5da0c651-8185-4900-a4c1-367a494f211a",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "gross": 47,
    "is_blind": false
  },
  {
    "id": "36d23952-8afe-4b9a-8239-4af78a4d2726",
    "matchup_id": "ce1fe122-5709-4d9b-99af-e814b1913b17",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "gross": 46,
    "is_blind": false
  },
  {
    "id": "cb39307d-b6b0-4cf6-b3ce-830692478ff4",
    "matchup_id": "a70afce9-9d16-438c-9922-c7f7ac2507cd",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c",
    "gross": 56,
    "is_blind": false
  },
  {
    "id": "629e9e8e-e3b5-4ef2-ae4d-16cd897a17a8",
    "matchup_id": "fc0debe9-ef46-4c3c-98d7-0a0a64141715",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c",
    "gross": 49,
    "is_blind": false
  },
  {
    "id": "f44741c0-fb4c-499e-9ccf-ad683d49eedb",
    "matchup_id": "921aaf05-1bdf-4df7-afe8-66281418c769",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c",
    "gross": 61,
    "is_blind": false
  },
  {
    "id": "92cceb34-b6ef-43fc-b50c-74b96b2a0fec",
    "matchup_id": "4a6c5e2f-9d0f-4ae7-96fc-a71752246968",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c",
    "gross": 60,
    "is_blind": false
  },
  {
    "id": "5144bebe-10f4-4be3-9da0-b79d8319a36d",
    "matchup_id": "8f01d14c-ddf6-47ff-96b6-3493ae2d8ee7",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c",
    "gross": 50,
    "is_blind": false
  },
  {
    "id": "99e29c80-54a3-44e4-937c-d2d1d71c1c88",
    "matchup_id": "fed5af2a-3934-40f4-a85a-65e35f518302",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c",
    "gross": 51,
    "is_blind": false
  },
  {
    "id": "34a5882a-9239-4967-a819-57952558908f",
    "matchup_id": "a70afce9-9d16-438c-9922-c7f7ac2507cd",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "gross": 49,
    "is_blind": false
  },
  {
    "id": "90b337b3-b674-47a8-9af0-1199113207d9",
    "matchup_id": "fc0debe9-ef46-4c3c-98d7-0a0a64141715",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "gross": 58,
    "is_blind": false
  },
  {
    "id": "f7206a0f-af2e-4009-b293-21dc49f819aa",
    "matchup_id": "921aaf05-1bdf-4df7-afe8-66281418c769",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "gross": 50,
    "is_blind": false
  },
  {
    "id": "e6884c35-5944-43dd-bd2e-963777a3e602",
    "matchup_id": "4a6c5e2f-9d0f-4ae7-96fc-a71752246968",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "gross": 56,
    "is_blind": false
  },
  {
    "id": "4705eb6f-3121-4edc-a87d-b83afc054192",
    "matchup_id": "8f01d14c-ddf6-47ff-96b6-3493ae2d8ee7",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "gross": 49,
    "is_blind": false
  },
  {
    "id": "dcf7bc5c-df6b-4fde-95c9-2a9b48907cd0",
    "matchup_id": "ee370eb3-6362-4ae8-8f9d-e0784950bd35",
    "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf",
    "gross": 54,
    "is_blind": false
  },
  {
    "id": "68cea4c5-4599-4331-aa98-f83e46178e93",
    "matchup_id": "a117a200-76e8-49ec-95f2-98a44ec6a15a",
    "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf",
    "gross": 42,
    "is_blind": false
  },
  {
    "id": "0329044e-70ee-4f1d-8d43-6a6bb0007275",
    "matchup_id": "9dba10d8-a7fa-4890-b111-2f94927810d6",
    "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf",
    "gross": 46,
    "is_blind": false
  },
  {
    "id": "21e8a4c4-850b-43d6-b5aa-5f0132816fe8",
    "matchup_id": "ee370eb3-6362-4ae8-8f9d-e0784950bd35",
    "player_id": "e1d37712-5c13-4c2a-b576-44033095b725",
    "gross": 51,
    "is_blind": false
  },
  {
    "id": "b635dcc9-daf4-477e-87fb-2c43cc233cd9",
    "matchup_id": "a117a200-76e8-49ec-95f2-98a44ec6a15a",
    "player_id": "e1d37712-5c13-4c2a-b576-44033095b725",
    "gross": 51,
    "is_blind": false
  },
  {
    "id": "c9d0a879-2723-4ea4-b045-116965625aa2",
    "matchup_id": "9dba10d8-a7fa-4890-b111-2f94927810d6",
    "player_id": "e1d37712-5c13-4c2a-b576-44033095b725",
    "gross": 55,
    "is_blind": false
  }
]
  const handicaps = [
  {
    "id": "8cff71bc-0b9e-40b2-9de9-9aff74edb312",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 10.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "ef8a1f9f-123e-4517-8cdc-98d858464a4b",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 7.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "6290a0cb-c672-44ab-a8cb-dc464d230e27",
    "player_id": "1f2801b1-4e46-459b-9b99-919938b85746",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 8.2,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "76f91f2b-07c0-488d-8069-16da95ed2f35",
    "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "value": 20.0,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "d0fa0e8b-9030-45db-bf3e-5e824f567c1e",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 9.4,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "0c681e55-eda8-4aa2-ab54-92cf951bd40a",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 11.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "651137f4-8461-4c6c-ace8-8eca0802a6fd",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "value": 10.0,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "998074bb-53e9-4947-99b5-e51cdf8c096e",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "value": 21.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "1d6e850f-e081-4633-a0e5-6fb0880d7267",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 4.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "98443319-dbff-4959-b8cc-5a1aad5f290c",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 6.2,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "93e4c794-519d-493f-b9fe-abbac2494fc8",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 8.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "642d1f49-7dd1-4cd1-b8cc-6fa50c840f08",
    "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 6.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "2cf58f62-392a-4ceb-b26e-5ad1dfd56161",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 5.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "de15770c-7016-42fa-9f72-259d65f75e93",
    "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 6.2,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "20ebda4c-aaa2-4740-be94-0c1821fc2ec4",
    "player_id": "1199232e-d347-4204-84f1-7ba2d024d813",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "value": 16.0,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "f393699c-7224-4fb0-8d92-a9fc3c7a26f0",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 6.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "26a649ac-80b2-4c6e-9f44-a538f7da44ba",
    "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "value": 10.0,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "b72bf81b-06e0-4137-9a86-858b7ccf7722",
    "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "value": 15.25,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "6a81cbf3-a55d-48c1-a6d4-df79f649ecba",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 7.2,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "aa7d7f14-a307-451d-953a-79b1efc1ffcb",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 17.2,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "bbc5b1b5-1888-4eda-a26b-4d83363f1c94",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 13.0,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "99a49690-3391-462f-a023-4e5e5b5a4788",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 20.2,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "1001dfca-b1cf-434a-a002-e981d62e0e7a",
    "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 18.4,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "49ed1b8b-48d8-4848-85f7-ea91af626387",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 10.2,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "88a4994f-8f1c-4b21-a596-54aff4c5bfe8",
    "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "db1379f5-00e7-44b4-9ba7-0b363201de4e",
    "value": 16.6,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "dbbd0521-caf1-4b60-ac92-2d113c9602fa",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "value": 15.8,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "4e456679-f913-4581-9753-b37d6f6da2c9",
    "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "value": 10.4,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "4879bd83-0f65-4433-a7c5-b24cdcb58a52",
    "player_id": "e1d37712-5c13-4c2a-b576-44033095b725",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "ce03bf44-3e26-47e5-b144-f51b8b82e39b",
    "value": 16.0,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "5fae7698-b864-4cd0-b82c-d47c947c5785",
    "player_id": "ccbfadd8-d859-46cd-bd14-cbdfcfb74788",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "value": 8.2,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "7e0f95ef-148a-482f-9828-c6342bd72419",
    "player_id": "ee7a4e73-8cd3-45cb-807f-180a204d5255",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "value": 12.5,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "bed44e02-f9c3-4840-b30b-76ec72bebec7",
    "player_id": "7cf57af1-bb9d-4feb-a172-898327699279",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "value": 16.75,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "82adfa5f-7b25-4cea-8119-e9d9d95bf1e2",
    "player_id": "ada10e8e-4301-47a5-acd6-c9f008f8e89c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "0826f5aa-a3fc-482a-9f76-ae24fbf7d236",
    "value": 13.75,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "4a4c17f4-cc08-47eb-aa5d-931e20cdaf0f",
    "player_id": "e9b7c8ed-934b-484d-b124-71c3e93b731f",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "week_id": "43673d66-353b-4d91-8e8f-57efdd3dd7c2",
    "value": 6.2,
    "calculated_at": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "d996478b-92f5-4ebb-8370-f5f4093de8d2",
    "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 44.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "98dc5bb9-65ae-44c7-ace3-f51bdac1d376",
    "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 42.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "31957976-edb8-4d4b-86c1-c13e33c327a1",
    "player_id": "39178706-dfec-4db2-9717-6c420ee81a33",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 45.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "c807d756-c206-4608-9bde-560935a6aeb2",
    "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 43.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "cbbf7c36-b8be-4de6-8c0e-bde7ee70eaf3",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 46.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "18cc0215-f010-4638-bd8c-eeae1ad8f9ed",
    "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 52.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "449e3d56-4b1a-495d-b007-b1bc3064b37c",
    "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 39.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "c8f38013-ee78-4902-9ead-c0c20fd402c9",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 41.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "1cffbc3e-5fc9-45e8-aa12-bc5b7f2a1a11",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 41.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "ba573c73-4c93-4955-9ca2-8cead0b2e4cf",
    "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 43.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "1f0a5e52-0241-42e9-89b0-9cc0631551f9",
    "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 39.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "f51770c0-58f5-4704-b385-c569870e7ac8",
    "player_id": "50184776-4b69-4e22-917b-0567d87e03ce",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 52.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "cc97709f-5d09-4fba-a4c2-82c5f71b2557",
    "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 42.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "e7e0b5a4-0034-45e1-bc00-cb89ccc0c185",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 57.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "89d280d3-a1fa-419f-993f-08d650c7661d",
    "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 51.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "e694d149-c2b5-4eb5-9ba7-0999606116dd",
    "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 61.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "5dc6bcf1-b47a-4e6e-9c10-3e3085ee6dd8",
    "player_id": "ada10e8e-4301-47a5-acd6-c9f008f8e89c",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 50.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "87ed8447-7291-495c-ad85-ffb28d391f34",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 44.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "71e3be42-e98a-4bc1-b0fc-6778ed84dbfd",
    "player_id": "4290d08f-5f91-4e4f-91a3-40b4eb54311a",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 64.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "c9b5549e-4333-4b9a-a090-499e8c3c2c8e",
    "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 50.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "de439685-1dfc-47e7-9f91-32a147f9e31b",
    "player_id": "b6caae54-f2ea-431b-9f12-2f098b988d3d",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 43.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "6010ffe4-6f6b-4559-a45d-78f044b30a7f",
    "player_id": "a4e2ad90-0233-49fb-89d7-b8bdcad1d752",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 52.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  },
  {
    "id": "8f60bf7a-1f21-422e-a160-08392ea67062",
    "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68",
    "season_id": "967d8e8f-46d4-4be8-9ea4-cbbcd6f5f290",
    "week_id": null,
    "value": 41.0,
    "calculated_at": "2025-08-18T00:00:00.000Z"
  }
]

  await putMany('seasons', seasons)
  await putMany('players', players)
  await putMany('teams', teams)
  await putMany('team_players', team_players)
  await putMany('season_player_hcp', season_player_hcp)
  await putMany('weeks', weeks)
  await putMany('matchups', matchups)
  await putMany('scores', scores)
  await putMany('handicaps', handicaps)
}
