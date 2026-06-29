// Auto-generated from Knights Golf_New_v3.xlsx — do not hand-edit
import { putMany } from './db.js'

const SEED_VERSION = 'v10-hcp-w8-final'

export async function seedIfEmpty(db) {
  // Check if this seed version has already been applied
  const versionRow = await db.get('settings', 'seed_version')
  if (versionRow?.value === SEED_VERSION) return

  // Clear all stores before reseeding
  const stores = ['seasons', 'players', 'teams', 'team_players', 'weeks', 'matchups', 'scores', 'handicaps', 'season_player_hcp', 'dues']
  for (const s of stores) await db.clear(s)

  const seasons = [
  {
    "id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "name": "2026 Season",
    "start_date": "2026-04-13",
    "league_night": 1,
    "weeks": 20,
    "par": 35,
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
    "current_hcp": 9.6
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
    "current_hcp": 6.8
  },
  {
    "id": "838b93f9-0eaf-43d0-af14-408890905f59",
    "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 0.0,
    "current_hcp": 18.4
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
    "current_hcp": 9.6
  },
  {
    "id": "b757f1c7-9055-4a53-b831-7aec22e55052",
    "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 12.22,
    "current_hcp": 9.8
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
    "current_hcp": 3.8
  },
  {
    "id": "3c443fc2-58f3-47f6-9bc7-943f66f8ff40",
    "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 11.78,
    "current_hcp": 5.8
  },
  {
    "id": "7deaf9f0-a33c-4372-86ec-3a0909175c65",
    "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 9.12,
    "current_hcp": 8.0
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
    "current_hcp": 12.2
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
    "current_hcp": 6.6
  },
  {
    "id": "0e9fc6c2-5275-4ce6-a823-fbf5ac36516c",
    "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 19.82,
    "current_hcp": 16.6
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
    "current_hcp": 19.2
  },
  {
    "id": "e0aeba17-d0df-4058-8d42-5f3a8ffa994d",
    "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 0.0,
    "current_hcp": 17.2
  },
  {
    "id": "e49be85e-be5f-40e9-b712-85bfac4c220c",
    "player_id": "576803c2-f3d3-4d95-921f-083985db10cc",
    "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae",
    "prev_season_hcp": 13.31,
    "current_hcp": 9.2
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
    "current_hcp": 8.6
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
    {"id": "a44b6c45-3e89-f181-1496-7287593ad91b", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 1, "date": "2026-04-13", "week_type": "scramble"},
    {"id": "b9614276-7e3c-d9ee-b7c1-d68442cd784a", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 2, "date": "2026-04-20", "week_type": "regular"},
    {"id": "1fbc5fc6-1253-c1b1-4310-1a0cd63e5a5c", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 3, "date": "2026-04-27", "week_type": "regular"},
    {"id": "7dab1f4e-fe10-78cc-be67-89910c660722", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 4, "date": "2026-05-04", "week_type": "regular"},
    {"id": "04414e1f-be0d-abbc-94e9-5d29048d5e86", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 5, "date": "2026-05-11", "week_type": "regular"},
    {"id": "ac4881d6-0ea5-2f1c-190c-7324b8f90591", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 6, "date": "2026-05-18", "week_type": "regular"},
    {"id": "dc51d5c4-b6b4-e82d-ab89-91948809c294", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 7, "date": "2026-06-01", "week_type": "position_night"},
    {"id": "57ed3fc8-f15a-5d6c-b0f1-375e06df1f89", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 8, "date": "2026-06-08", "week_type": "regular"},
    {"id": "69c5829e-f720-4c69-0e3f-a6f2d8891c07", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 9, "date": "2026-06-15", "week_type": "regular"},
    {"id": "5eedc44e-4142-db82-d349-2bc46b6adc93", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 10, "date": "2026-06-22", "week_type": "regular"},
    {"id": "8edea147-94dc-fd4d-29f9-b63e10acb5b8", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 11, "date": "2026-06-29", "week_type": "regular"},
    {"id": "bfa8034a-a9b7-522b-23ac-47dc54e631de", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 12, "date": "2026-07-06", "week_type": "regular"},
    {"id": "ff2bbb45-b39d-0154-de2b-f7f4d662a654", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 13, "date": "2026-07-13", "week_type": "position_night"},
    {"id": "77474231-c901-9702-7a55-5196a5484390", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 14, "date": "2026-07-20", "week_type": "regular"},
    {"id": "794edacd-8d0b-7122-e130-0c2402037fd7", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 15, "date": "2026-07-27", "week_type": "regular"},
    {"id": "5db275df-636e-1cbb-687c-31c80fe59a0b", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 16, "date": "2026-08-03", "week_type": "regular"},
    {"id": "ff5fb3a6-8604-2285-bb7f-cbe89d571577", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 17, "date": "2026-08-10", "week_type": "regular"},
    {"id": "36d147af-73d7-01b8-03bf-e7c62284019b", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 18, "date": "2026-08-17", "week_type": "regular"},
    {"id": "60e38037-7e9a-059e-56ef-92c83a837c4d", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 19, "date": "2026-08-24", "week_type": "position_night"},
    {"id": "3c70b05e-b7e9-341a-e029-d5487dd78ab9", "season_id": "cebd083f-caf4-4ac7-af78-13c8184b3fae", "number": 20, "date": "2026-08-31", "week_type": "end_scramble"}
  ]
  const matchups = [
    {"id": "23f4b5d9-fbd3-7f1d-7341-44dbca1ed766", "week_id": "a44b6c45-3e89-f181-1496-7287593ad91b", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "hole_assignment": 1},
    {"id": "44584dd9-be7f-6679-b7b9-d123c8efab1c", "week_id": "a44b6c45-3e89-f181-1496-7287593ad91b", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "hole_assignment": 2},
    {"id": "3b6d0ae4-a793-2f2d-8394-494683d7ed62", "week_id": "a44b6c45-3e89-f181-1496-7287593ad91b", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 3},
    {"id": "ac77bafb-0751-7f7f-7d68-4ae4896e3da4", "week_id": "a44b6c45-3e89-f181-1496-7287593ad91b", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 4},
    {"id": "b0de90a6-a128-c2d4-2c1c-e3cb156ffca8", "week_id": "a44b6c45-3e89-f181-1496-7287593ad91b", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 5},
    {"id": "c742436a-e907-cb6c-e03c-05d99270b854", "week_id": "a44b6c45-3e89-f181-1496-7287593ad91b", "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 6},
    {"id": "7061d1c4-2214-5b73-4626-e43bf72ebdf7", "week_id": "a44b6c45-3e89-f181-1496-7287593ad91b", "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 7},
    {"id": "db21167d-a4ab-280a-8813-1fe40c75a3c5", "week_id": "b9614276-7e3c-d9ee-b7c1-d68442cd784a", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 1},
    {"id": "51fcb3d0-5b69-2809-f556-401ef84c4478", "week_id": "b9614276-7e3c-d9ee-b7c1-d68442cd784a", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 2},
    {"id": "89aa564a-414c-505f-8def-1052e76a9bb2", "week_id": "b9614276-7e3c-d9ee-b7c1-d68442cd784a", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 3},
    {"id": "749198a8-89d7-3ff0-e0bb-ac0fb31e0277", "week_id": "b9614276-7e3c-d9ee-b7c1-d68442cd784a", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 4},
    {"id": "d63c3200-1187-658f-8cb3-72d7085bf505", "week_id": "b9614276-7e3c-d9ee-b7c1-d68442cd784a", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 5},
    {"id": "28a7495e-3799-81f6-c951-1be002581cc8", "week_id": "b9614276-7e3c-d9ee-b7c1-d68442cd784a", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 6},
    {"id": "40635635-2336-b49f-ccc6-2b69c35f5be4", "week_id": "b9614276-7e3c-d9ee-b7c1-d68442cd784a", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 7},
    {"id": "5926c084-3165-3e3b-88c5-67de18048d37", "week_id": "1fbc5fc6-1253-c1b1-4310-1a0cd63e5a5c", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 1},
    {"id": "08fd6b33-8a39-ee66-7f2f-2a72a0feec14", "week_id": "1fbc5fc6-1253-c1b1-4310-1a0cd63e5a5c", "home_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 2},
    {"id": "d0ac0ede-541a-deda-0da4-9d5cc495be7c", "week_id": "1fbc5fc6-1253-c1b1-4310-1a0cd63e5a5c", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 3},
    {"id": "71316939-6706-a5ca-8d0e-012f50183461", "week_id": "1fbc5fc6-1253-c1b1-4310-1a0cd63e5a5c", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 4},
    {"id": "7166e418-4692-14fd-c1a5-add2e410a0a8", "week_id": "1fbc5fc6-1253-c1b1-4310-1a0cd63e5a5c", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 5},
    {"id": "b5dccda1-8b00-102a-6b34-6f351c4176fa", "week_id": "1fbc5fc6-1253-c1b1-4310-1a0cd63e5a5c", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 6},
    {"id": "5f3aecf3-26ae-b9bc-c682-74a0fea2e2b7", "week_id": "1fbc5fc6-1253-c1b1-4310-1a0cd63e5a5c", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "hole_assignment": 7},
    {"id": "5b932332-2e65-e211-c9f6-596e2d862e75", "week_id": "7dab1f4e-fe10-78cc-be67-89910c660722", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 1},
    {"id": "4aa4a0eb-b685-5219-af62-ea81f401cd7d", "week_id": "7dab1f4e-fe10-78cc-be67-89910c660722", "home_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 2},
    {"id": "99e19163-6870-9f25-96c9-42c6346460df", "week_id": "7dab1f4e-fe10-78cc-be67-89910c660722", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 3},
    {"id": "788a6253-bd26-dcc7-eb28-81cad1536deb", "week_id": "7dab1f4e-fe10-78cc-be67-89910c660722", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "hole_assignment": 4},
    {"id": "ee52f776-53db-c1ac-c7a1-0330fe0dced8", "week_id": "7dab1f4e-fe10-78cc-be67-89910c660722", "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 5},
    {"id": "ff09ecb5-8a2f-a66d-3a60-b5a8b7c877cc", "week_id": "7dab1f4e-fe10-78cc-be67-89910c660722", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 6},
    {"id": "c882889a-9b4b-702f-fff1-e3ed1c4822dc", "week_id": "7dab1f4e-fe10-78cc-be67-89910c660722", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 7},
    {"id": "30fc63a0-77e5-aea6-a83d-e552942ea954", "week_id": "04414e1f-be0d-abbc-94e9-5d29048d5e86", "home_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 1},
    {"id": "8e127d01-a097-e9f8-b933-3c19134166c7", "week_id": "04414e1f-be0d-abbc-94e9-5d29048d5e86", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 2},
    {"id": "d700a3c5-3236-a223-27a5-cc8b037dcb31", "week_id": "04414e1f-be0d-abbc-94e9-5d29048d5e86", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 3},
    {"id": "f9b24b25-48cd-bca1-91e4-46f1384bda7f", "week_id": "04414e1f-be0d-abbc-94e9-5d29048d5e86", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "hole_assignment": 4},
    {"id": "f201865a-4b3d-3a2c-9126-76337ba72766", "week_id": "04414e1f-be0d-abbc-94e9-5d29048d5e86", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 5},
    {"id": "ce20b3d8-81d0-4d70-01d4-aa7376b6bfcf", "week_id": "04414e1f-be0d-abbc-94e9-5d29048d5e86", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "hole_assignment": 6},
    {"id": "61ac25e8-085b-6915-fa17-34e11d7d403a", "week_id": "04414e1f-be0d-abbc-94e9-5d29048d5e86", "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 7},
    {"id": "dc3c2cd1-e151-7af7-5b94-75157a48b1d7", "week_id": "ac4881d6-0ea5-2f1c-190c-7324b8f90591", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 1},
    {"id": "3780ecb8-60a7-16de-0be2-962936e008e4", "week_id": "ac4881d6-0ea5-2f1c-190c-7324b8f90591", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "hole_assignment": 2},
    {"id": "263fd61c-326a-37bf-1999-5d440f7a6dc1", "week_id": "ac4881d6-0ea5-2f1c-190c-7324b8f90591", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 3},
    {"id": "766ad779-906d-b30a-844d-1b3bf1ccb7ae", "week_id": "ac4881d6-0ea5-2f1c-190c-7324b8f90591", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "hole_assignment": 4},
    {"id": "6c2c9ae0-b989-cb6e-6d98-6703aa0ea7b1", "week_id": "ac4881d6-0ea5-2f1c-190c-7324b8f90591", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 5},
    {"id": "ca8b0f16-567d-e28e-24a5-8d601d094ba3", "week_id": "ac4881d6-0ea5-2f1c-190c-7324b8f90591", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 6},
    {"id": "72de41a8-dde2-75b1-7b32-1ddcb5415385", "week_id": "ac4881d6-0ea5-2f1c-190c-7324b8f90591", "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 7},
    {"id": "30589747-7665-083f-29a5-c23cd08338d9", "week_id": "dc51d5c4-b6b4-e82d-ab89-91948809c294", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "hole_assignment": 1},
    {"id": "ce071e80-a38e-96c2-6974-91ad80158eae", "week_id": "dc51d5c4-b6b4-e82d-ab89-91948809c294", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "hole_assignment": 2},
    {"id": "ae6825cf-0c0e-fb9c-3b46-7d5c656c12b7", "week_id": "dc51d5c4-b6b4-e82d-ab89-91948809c294", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 3},
    {"id": "1ab116d8-4db9-4384-f9f3-96dc29378ad7", "week_id": "dc51d5c4-b6b4-e82d-ab89-91948809c294", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 4},
    {"id": "1e4f7e8d-4cbe-e638-6c52-74c424ba739d", "week_id": "dc51d5c4-b6b4-e82d-ab89-91948809c294", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 5},
    {"id": "a3294894-f830-2304-877a-0a2e50bfa8d5", "week_id": "dc51d5c4-b6b4-e82d-ab89-91948809c294", "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 6},
    {"id": "23fc5bfc-4a40-4249-e72b-82c44b316393", "week_id": "dc51d5c4-b6b4-e82d-ab89-91948809c294", "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 7},
    {"id": "25aa0bf0-ab3c-4be1-0056-52a0436bb2a4", "week_id": "57ed3fc8-f15a-5d6c-b0f1-375e06df1f89", "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 1},
    {"id": "fd335a5b-093d-5abf-dd6e-8fe3324eb7a7", "week_id": "57ed3fc8-f15a-5d6c-b0f1-375e06df1f89", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 2},
    {"id": "cfb55312-6148-620d-b927-f6d2572e9bd7", "week_id": "57ed3fc8-f15a-5d6c-b0f1-375e06df1f89", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "hole_assignment": 3},
    {"id": "347f47ba-1f3a-b688-5d1d-65dc7f639c0e", "week_id": "57ed3fc8-f15a-5d6c-b0f1-375e06df1f89", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 4},
    {"id": "2ca7102d-0864-8400-fb6b-eca0b73cdaf6", "week_id": "57ed3fc8-f15a-5d6c-b0f1-375e06df1f89", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 5},
    {"id": "edbbe441-a12e-3c95-2dc5-d7dd7f7f17e7", "week_id": "57ed3fc8-f15a-5d6c-b0f1-375e06df1f89", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 6},
    {"id": "4bc10e15-2652-a9df-4b05-f54f12f031da", "week_id": "57ed3fc8-f15a-5d6c-b0f1-375e06df1f89", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 7},
    {"id": "614f1fbd-e30e-d27a-6e42-ecb37a44adfb", "week_id": "69c5829e-f720-4c69-0e3f-a6f2d8891c07", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 1},
    {"id": "c09cc855-dde1-98b0-18e4-5af3d0ff92ff", "week_id": "69c5829e-f720-4c69-0e3f-a6f2d8891c07", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 2},
    {"id": "f6d32a19-a61d-7949-33ea-e4d3fafa3193", "week_id": "69c5829e-f720-4c69-0e3f-a6f2d8891c07", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 3},
    {"id": "e5e1ef8d-2855-8b8e-ac4d-aad8835378c1", "week_id": "69c5829e-f720-4c69-0e3f-a6f2d8891c07", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 4},
    {"id": "0ab7bdbb-bdd7-2755-961e-1332478dc56f", "week_id": "69c5829e-f720-4c69-0e3f-a6f2d8891c07", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 5},
    {"id": "a58ed8b9-a609-b31b-a97e-d244d369c08c", "week_id": "69c5829e-f720-4c69-0e3f-a6f2d8891c07", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 6},
    {"id": "59f2462c-738e-e1c7-47d3-183ac68d8b7b", "week_id": "69c5829e-f720-4c69-0e3f-a6f2d8891c07", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 7},
    {"id": "fcbc604f-1742-b360-662a-fe27370d8cf4", "week_id": "5eedc44e-4142-db82-d349-2bc46b6adc93", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 1},
    {"id": "127fa4ba-827e-8879-9c69-7f95a692abd6", "week_id": "5eedc44e-4142-db82-d349-2bc46b6adc93", "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 2},
    {"id": "6fd14599-23ac-b374-6e5f-b464a55b37f3", "week_id": "5eedc44e-4142-db82-d349-2bc46b6adc93", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 3},
    {"id": "482d9ad9-f9c7-acdc-80d6-170f50cbeed0", "week_id": "5eedc44e-4142-db82-d349-2bc46b6adc93", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "hole_assignment": 4},
    {"id": "210cdec2-1974-2107-bdda-6fc946412dbc", "week_id": "5eedc44e-4142-db82-d349-2bc46b6adc93", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 5},
    {"id": "267a50c3-6c51-eb01-5046-1a8bf5cdaca0", "week_id": "5eedc44e-4142-db82-d349-2bc46b6adc93", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 6},
    {"id": "598a5caf-21d1-e045-29b6-66c403bf15a7", "week_id": "5eedc44e-4142-db82-d349-2bc46b6adc93", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 7},
    {"id": "567c4df3-1ce7-6191-0f40-cb4a1ab5e44c", "week_id": "8edea147-94dc-fd4d-29f9-b63e10acb5b8", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "hole_assignment": 1},
    {"id": "44b02884-c269-88a2-ebcd-30bc4b4709f4", "week_id": "8edea147-94dc-fd4d-29f9-b63e10acb5b8", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 2},
    {"id": "f64db8c2-9533-0d8f-9f46-d1b6b905c6d3", "week_id": "8edea147-94dc-fd4d-29f9-b63e10acb5b8", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 3},
    {"id": "3744242d-593b-dbb3-9948-25790caf1c9c", "week_id": "8edea147-94dc-fd4d-29f9-b63e10acb5b8", "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 4},
    {"id": "44c18d35-41ec-391c-b98a-485debe78e6e", "week_id": "8edea147-94dc-fd4d-29f9-b63e10acb5b8", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 5},
    {"id": "13d6dc5e-c599-5db1-0551-1fcdee8a919b", "week_id": "8edea147-94dc-fd4d-29f9-b63e10acb5b8", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 6},
    {"id": "89e7040a-de9f-a6ff-d9d7-3cc2c94715e9", "week_id": "8edea147-94dc-fd4d-29f9-b63e10acb5b8", "home_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 7},
    {"id": "692236f7-2706-6b86-3ca6-51e60e5e5146", "week_id": "bfa8034a-a9b7-522b-23ac-47dc54e631de", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "hole_assignment": 1},
    {"id": "4fbc8d2c-34fb-49c6-1ec8-5d3618d3c64a", "week_id": "bfa8034a-a9b7-522b-23ac-47dc54e631de", "home_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 2},
    {"id": "e7ee031b-ab4f-3942-d2b9-82c30c28a44b", "week_id": "bfa8034a-a9b7-522b-23ac-47dc54e631de", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "hole_assignment": 3},
    {"id": "db683318-e51c-2c90-b74b-f8e5558f28e7", "week_id": "bfa8034a-a9b7-522b-23ac-47dc54e631de", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 4},
    {"id": "30dc6318-a9e3-09cc-ef66-7217e230cc49", "week_id": "bfa8034a-a9b7-522b-23ac-47dc54e631de", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 5},
    {"id": "0acdc88f-c58d-fb2d-8a28-47133779b6b5", "week_id": "bfa8034a-a9b7-522b-23ac-47dc54e631de", "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 6},
    {"id": "f59d42c3-9164-97f4-5587-2366b53e9731", "week_id": "bfa8034a-a9b7-522b-23ac-47dc54e631de", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 7},
    {"id": "5dc2271f-6726-501a-6659-0431372af4e0", "week_id": "ff2bbb45-b39d-0154-de2b-f7f4d662a654", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "hole_assignment": 1},
    {"id": "fd8605a4-30f7-5767-ec77-89447747af5a", "week_id": "ff2bbb45-b39d-0154-de2b-f7f4d662a654", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "hole_assignment": 2},
    {"id": "62703ce6-c7af-b964-1913-38f1231195d6", "week_id": "ff2bbb45-b39d-0154-de2b-f7f4d662a654", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 3},
    {"id": "cdf55240-f508-a648-cbf6-fa1da00caf4d", "week_id": "ff2bbb45-b39d-0154-de2b-f7f4d662a654", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 4},
    {"id": "f9dc756f-7d49-5fb3-8cae-fd4f059c47ac", "week_id": "ff2bbb45-b39d-0154-de2b-f7f4d662a654", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 5},
    {"id": "6bebd268-7abe-2ab6-3007-c830107e9b76", "week_id": "ff2bbb45-b39d-0154-de2b-f7f4d662a654", "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 6},
    {"id": "15050230-8ff4-2560-2c09-26a44cc6f211", "week_id": "ff2bbb45-b39d-0154-de2b-f7f4d662a654", "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 7},
    {"id": "4257c2ac-d224-1617-d61b-41af6e4a8446", "week_id": "77474231-c901-9702-7a55-5196a5484390", "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 1},
    {"id": "f0d7e940-5c9c-bb6d-cb03-5e85e3466847", "week_id": "77474231-c901-9702-7a55-5196a5484390", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 2},
    {"id": "f02eca74-f926-741b-7284-4c13dec27955", "week_id": "77474231-c901-9702-7a55-5196a5484390", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 3},
    {"id": "a1cc84fd-7989-7259-8a1b-aa59a629d15e", "week_id": "77474231-c901-9702-7a55-5196a5484390", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "hole_assignment": 4},
    {"id": "d8c12f5b-2b97-0b17-48ca-216844c103e4", "week_id": "77474231-c901-9702-7a55-5196a5484390", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 5},
    {"id": "55348741-ec70-c6d1-25c0-8a6f8638d060", "week_id": "77474231-c901-9702-7a55-5196a5484390", "home_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 6},
    {"id": "3f5300d0-3b21-add3-5d6e-e52844af9a1d", "week_id": "77474231-c901-9702-7a55-5196a5484390", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "hole_assignment": 7},
    {"id": "88e58240-1f70-fc8f-22ab-0bb06dd0dce3", "week_id": "794edacd-8d0b-7122-e130-0c2402037fd7", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 1},
    {"id": "5ff15541-f600-1d5c-3144-5ed741c79341", "week_id": "794edacd-8d0b-7122-e130-0c2402037fd7", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 2},
    {"id": "4748d956-025e-2a48-a948-dd0dc890d957", "week_id": "794edacd-8d0b-7122-e130-0c2402037fd7", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "hole_assignment": 3},
    {"id": "7db2ca96-d943-237e-4833-873e3006be0d", "week_id": "794edacd-8d0b-7122-e130-0c2402037fd7", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 4},
    {"id": "e2c7c198-276a-41cf-87de-1e93161acbf1", "week_id": "794edacd-8d0b-7122-e130-0c2402037fd7", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 5},
    {"id": "75f1f353-cb49-cfe4-404c-dab1d109c8cd", "week_id": "794edacd-8d0b-7122-e130-0c2402037fd7", "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 6},
    {"id": "b7a2075b-4c58-7a92-e60d-6622eba67055", "week_id": "794edacd-8d0b-7122-e130-0c2402037fd7", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "hole_assignment": 7},
    {"id": "7aa5284e-ff47-c173-a18c-ac28685e0c96", "week_id": "5db275df-636e-1cbb-687c-31c80fe59a0b", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 1},
    {"id": "6ceec45c-ad6a-c5f3-f443-ee51175717ce", "week_id": "5db275df-636e-1cbb-687c-31c80fe59a0b", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 2},
    {"id": "ec6bb66b-97d4-3f15-d740-53344dba5f3c", "week_id": "5db275df-636e-1cbb-687c-31c80fe59a0b", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 3},
    {"id": "989220d8-d5a5-777c-676b-ca29e8ac9f86", "week_id": "5db275df-636e-1cbb-687c-31c80fe59a0b", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "hole_assignment": 4},
    {"id": "32889f15-6f85-495f-04c4-51935a98ab0a", "week_id": "5db275df-636e-1cbb-687c-31c80fe59a0b", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 5},
    {"id": "71f62b9a-5b55-79cb-7569-273be2ad6fab", "week_id": "5db275df-636e-1cbb-687c-31c80fe59a0b", "home_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 6},
    {"id": "573d6705-97e6-289c-6c02-efcb9920b9c4", "week_id": "5db275df-636e-1cbb-687c-31c80fe59a0b", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 7},
    {"id": "c2e61595-c340-51ce-be52-587ffa767c2f", "week_id": "ff5fb3a6-8604-2285-bb7f-cbe89d571577", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 1},
    {"id": "fe96dcdc-320a-fc52-346a-574c02374090", "week_id": "ff5fb3a6-8604-2285-bb7f-cbe89d571577", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 2},
    {"id": "2f6d96ea-4067-2037-33be-485b73ed3f4b", "week_id": "ff5fb3a6-8604-2285-bb7f-cbe89d571577", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 3},
    {"id": "d49b6baf-eef5-2f8d-eb1d-245d97e2e1ff", "week_id": "ff5fb3a6-8604-2285-bb7f-cbe89d571577", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 4},
    {"id": "19748c43-e95b-36f6-9c0f-9fee5014affc", "week_id": "ff5fb3a6-8604-2285-bb7f-cbe89d571577", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 5},
    {"id": "718382da-e573-a188-2343-9499a8c6cea6", "week_id": "ff5fb3a6-8604-2285-bb7f-cbe89d571577", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "hole_assignment": 6},
    {"id": "88c2df6d-8dfe-a77c-c9e0-620767046821", "week_id": "ff5fb3a6-8604-2285-bb7f-cbe89d571577", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 7},
    {"id": "3c99c7b2-4080-c12b-8ed6-00b6e90628fd", "week_id": "36d147af-73d7-01b8-03bf-e7c62284019b", "home_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "away_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "hole_assignment": 1},
    {"id": "736ee2db-586f-dd51-912e-4f4f1f41508f", "week_id": "36d147af-73d7-01b8-03bf-e7c62284019b", "home_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "away_team_id": "db878758-8438-475d-81e8-b60209071cab", "hole_assignment": 2},
    {"id": "e5bf365c-2644-8a22-3c24-c7e8fc0285e5", "week_id": "36d147af-73d7-01b8-03bf-e7c62284019b", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 3},
    {"id": "b1d7a8ac-3273-8dc2-150a-072a9ebca319", "week_id": "36d147af-73d7-01b8-03bf-e7c62284019b", "home_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "away_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "hole_assignment": 4},
    {"id": "bc9568cd-d362-cc52-6893-e0fa8359fa95", "week_id": "36d147af-73d7-01b8-03bf-e7c62284019b", "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 5},
    {"id": "e2e34c91-3d11-5249-59ed-0ecc539e5baa", "week_id": "36d147af-73d7-01b8-03bf-e7c62284019b", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 6},
    {"id": "c8d151fc-e5a2-ec53-b776-e477981e8ff3", "week_id": "36d147af-73d7-01b8-03bf-e7c62284019b", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 7},
    {"id": "7a2db73e-3072-c315-b50d-344f40652d6c", "week_id": "60e38037-7e9a-059e-56ef-92c83a837c4d", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "hole_assignment": 1},
    {"id": "6aabdac2-77a6-239c-2147-469722871e56", "week_id": "60e38037-7e9a-059e-56ef-92c83a837c4d", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "hole_assignment": 2},
    {"id": "f3638efc-034d-7c76-3f12-61984e1ca6fa", "week_id": "60e38037-7e9a-059e-56ef-92c83a837c4d", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 3},
    {"id": "1f34ee84-24e3-ee4f-511e-d2ad4fd458d0", "week_id": "60e38037-7e9a-059e-56ef-92c83a837c4d", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 4},
    {"id": "41ff9bfa-68e3-c96e-61ab-756f014bd24d", "week_id": "60e38037-7e9a-059e-56ef-92c83a837c4d", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 5},
    {"id": "cafb85c4-e620-f261-4ee1-4af86bb302f9", "week_id": "60e38037-7e9a-059e-56ef-92c83a837c4d", "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 6},
    {"id": "38ec1249-e8b0-19cb-c948-4ef7580756ec", "week_id": "60e38037-7e9a-059e-56ef-92c83a837c4d", "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 7},
    {"id": "a5b8c476-f312-2074-6d2e-f22678aa8c6b", "week_id": "3c70b05e-b7e9-341a-e029-d5487dd78ab9", "home_team_id": "cc6ed51d-06f0-4515-8a8a-d5fa7a2489fd", "away_team_id": "d6f2c642-0d56-4921-a3ec-a96c7b27b72c", "hole_assignment": 1},
    {"id": "ebe69522-9e24-5eec-58e3-aa62f2a5ba24", "week_id": "3c70b05e-b7e9-341a-e029-d5487dd78ab9", "home_team_id": "2d0f8fcf-3576-4020-b2ee-7a73ad91dd6f", "away_team_id": "42884f58-915c-4a5f-954f-73bb95fa7398", "hole_assignment": 2},
    {"id": "e1015ea3-bb64-e337-9dae-4d795856c0c8", "week_id": "3c70b05e-b7e9-341a-e029-d5487dd78ab9", "home_team_id": "51003291-f08d-40c1-bb0e-ecdb003dd578", "away_team_id": "da9a0972-dcaa-4dc4-946b-596928be24a2", "hole_assignment": 3},
    {"id": "4b458151-6f81-8385-00d3-c544c92ed553", "week_id": "3c70b05e-b7e9-341a-e029-d5487dd78ab9", "home_team_id": "228fcff0-1912-4875-bebd-a78f3fd13c46", "away_team_id": "47a302df-73ee-4678-a6df-0ec44130e290", "hole_assignment": 4},
    {"id": "6f189d40-54e5-fe99-a99a-4f315c603f52", "week_id": "3c70b05e-b7e9-341a-e029-d5487dd78ab9", "home_team_id": "db878758-8438-475d-81e8-b60209071cab", "away_team_id": "4bedf568-c29e-44cd-be63-6693a141f2a7", "hole_assignment": 5},
    {"id": "7ef67e33-3203-b022-d034-490907406608", "week_id": "3c70b05e-b7e9-341a-e029-d5487dd78ab9", "home_team_id": "3997bc46-e78e-4319-bba3-fbb3df731fb8", "away_team_id": "7a5fe043-f133-4b95-b6a1-596b46daea9c", "hole_assignment": 6},
    {"id": "1b77976b-18de-dd9c-2660-551591daf29f", "week_id": "3c70b05e-b7e9-341a-e029-d5487dd78ab9", "home_team_id": "b880fc96-788d-492c-b1b3-5940efa91e55", "away_team_id": "33f76372-7937-4a54-84d4-9c50be263146", "hole_assignment": 7}
  ]
  const scores = [
    {"id": "8c1f2182-c9a2-b972-e0e2-cd69510c9476", "matchup_id": "23f4b5d9-fbd3-7f1d-7341-44dbca1ed766", "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8", "gross": 46, "is_blind": false},
    {"id": "d29ceb49-638b-dafa-357d-5d0a36260a7c", "matchup_id": "749198a8-89d7-3ff0-e0bb-ac0fb31e0277", "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8", "gross": 43, "is_blind": false},
    {"id": "937155af-58c8-32e9-44f1-a5ec8e402a36", "matchup_id": "7166e418-4692-14fd-c1a5-add2e410a0a8", "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8", "gross": 42, "is_blind": false},
    {"id": "4baf71e0-663a-d674-0938-8771733a45f8", "matchup_id": "99e19163-6870-9f25-96c9-42c6346460df", "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8", "gross": 45, "is_blind": false},
    {"id": "c6faa1d7-556f-f094-6c85-c725674750a6", "matchup_id": "d700a3c5-3236-a223-27a5-cc8b037dcb31", "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8", "gross": 54, "is_blind": false},
    {"id": "c85901b0-e5f9-9d88-d9c2-dcf02faa5679", "matchup_id": "ca8b0f16-567d-e28e-24a5-8d601d094ba3", "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8", "gross": 51, "is_blind": false},
    {"id": "bf40c902-f90e-3b49-86d2-af1c3f3711ac", "matchup_id": "30589747-7665-083f-29a5-c23cd08338d9", "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8", "gross": 54, "is_blind": false},
    {"id": "88c70cd3-c4f6-0981-5f6f-2cc371a56ef6", "matchup_id": "347f47ba-1f3a-b688-5d1d-65dc7f639c0e", "player_id": "22a93b47-0639-44d0-9ac1-f76de428bda8", "gross": 47, "is_blind": false},
    {"id": "6a6ecee8-3cee-c97f-6173-cd91f61bad29", "matchup_id": "23f4b5d9-fbd3-7f1d-7341-44dbca1ed766", "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89", "gross": 42, "is_blind": false},
    {"id": "1098fb4e-3310-d0e7-c789-17293960e2f3", "matchup_id": "749198a8-89d7-3ff0-e0bb-ac0fb31e0277", "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89", "gross": 42, "is_blind": false},
    {"id": "26ca2abc-25cc-f9c7-cddd-770cb896cb91", "matchup_id": "7166e418-4692-14fd-c1a5-add2e410a0a8", "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89", "gross": 54, "is_blind": false},
    {"id": "10628840-5875-07ed-dcab-b5ea35151200", "matchup_id": "99e19163-6870-9f25-96c9-42c6346460df", "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89", "gross": 42, "is_blind": false},
    {"id": "12963649-18fe-2f50-5a7a-69c8a78bfdc9", "matchup_id": "d700a3c5-3236-a223-27a5-cc8b037dcb31", "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89", "gross": 49, "is_blind": false},
    {"id": "3c0c81bc-3b83-fe55-97c2-7e045b6740ee", "matchup_id": "ca8b0f16-567d-e28e-24a5-8d601d094ba3", "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89", "gross": 43, "is_blind": false},
    {"id": "16921562-ae83-24de-6380-b759b7e2cd7d", "matchup_id": "30589747-7665-083f-29a5-c23cd08338d9", "player_id": "9c2a55d6-0218-4949-8784-b2b7cef84a89", "gross": 44, "is_blind": false},
    {"id": "cb540642-ee48-ed5d-b554-a0c16b24e033", "matchup_id": "23f4b5d9-fbd3-7f1d-7341-44dbca1ed766", "player_id": "1f2801b1-4e46-459b-9b99-919938b85746", "gross": 38, "is_blind": false},
    {"id": "b1406298-8515-8141-e2af-30e87180d6c8", "matchup_id": "51fcb3d0-5b69-2809-f556-401ef84c4478", "player_id": "1f2801b1-4e46-459b-9b99-919938b85746", "gross": 43, "is_blind": false},
    {"id": "0b6d05ba-bb4f-d2ec-868b-a2f53ca67cb9", "matchup_id": "d0ac0ede-541a-deda-0da4-9d5cc495be7c", "player_id": "1f2801b1-4e46-459b-9b99-919938b85746", "gross": 45, "is_blind": false},
    {"id": "5da52b0f-17e6-9234-b98c-140f9769298a", "matchup_id": "ff09ecb5-8a2f-a66d-3a60-b5a8b7c877cc", "player_id": "1f2801b1-4e46-459b-9b99-919938b85746", "gross": 45, "is_blind": false},
    {"id": "d548998a-8cb2-286d-1b21-d7360804ad0b", "matchup_id": "ce20b3d8-81d0-4d70-01d4-aa7376b6bfcf", "player_id": "1f2801b1-4e46-459b-9b99-919938b85746", "gross": 47, "is_blind": false},
    {"id": "aea9eeca-ab85-62b0-7674-64940311b368", "matchup_id": "766ad779-906d-b30a-844d-1b3bf1ccb7ae", "player_id": "1f2801b1-4e46-459b-9b99-919938b85746", "gross": 46, "is_blind": false},
    {"id": "b060d8da-1d8a-b664-e315-e35548b8b627", "matchup_id": "30589747-7665-083f-29a5-c23cd08338d9", "player_id": "1f2801b1-4e46-459b-9b99-919938b85746", "gross": 39, "is_blind": false},
    {"id": "12d7fdac-bb23-ae3f-86ff-f2e4cfb4fb47", "matchup_id": "cfb55312-6148-620d-b927-f6d2572e9bd7", "player_id": "1f2801b1-4e46-459b-9b99-919938b85746", "gross": 44, "is_blind": false},
    {"id": "be872e89-e5e6-050d-91ba-2938e2e279df", "matchup_id": "23f4b5d9-fbd3-7f1d-7341-44dbca1ed766", "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c", "gross": 50, "is_blind": false},
    {"id": "f52b0fd6-2aa4-1254-1938-856d0701c45f", "matchup_id": "51fcb3d0-5b69-2809-f556-401ef84c4478", "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c", "gross": 54, "is_blind": false},
    {"id": "b26f65bb-aa40-50c7-678f-cb1874b9830e", "matchup_id": "d0ac0ede-541a-deda-0da4-9d5cc495be7c", "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c", "gross": 58, "is_blind": false},
    {"id": "f7194466-e294-6c8e-c216-b748718a3b3d", "matchup_id": "ff09ecb5-8a2f-a66d-3a60-b5a8b7c877cc", "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c", "gross": 53, "is_blind": false},
    {"id": "854d1c33-2dda-1925-d0c0-ea0269156179", "matchup_id": "ce20b3d8-81d0-4d70-01d4-aa7376b6bfcf", "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c", "gross": 60, "is_blind": false},
    {"id": "76e59ae3-81eb-9502-30cf-cb8376041770", "matchup_id": "766ad779-906d-b30a-844d-1b3bf1ccb7ae", "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c", "gross": 55, "is_blind": false},
    {"id": "90cd7bbb-7f3d-f749-f678-fbe51ca080fe", "matchup_id": "30589747-7665-083f-29a5-c23cd08338d9", "player_id": "a388e4d8-994d-4841-8947-b21ef2a0c73c", "gross": 55, "is_blind": false},
    {"id": "8a4150bf-b286-19c4-2aae-e1197683ae89", "matchup_id": "44584dd9-be7f-6679-b7b9-d123c8efab1c", "player_id": "39178706-dfec-4db2-9717-6c420ee81a33", "gross": 47, "is_blind": false},
    {"id": "fcaa5b18-c577-ecea-daa1-eccd7f39f27e", "matchup_id": "28a7495e-3799-81f6-c951-1be002581cc8", "player_id": "39178706-dfec-4db2-9717-6c420ee81a33", "gross": 45, "is_blind": false},
    {"id": "37b0186e-60a9-c98c-70ed-bd431d740fbb", "matchup_id": "b5dccda1-8b00-102a-6b34-6f351c4176fa", "player_id": "39178706-dfec-4db2-9717-6c420ee81a33", "gross": 45, "is_blind": false},
    {"id": "8d2acffb-7db2-0481-4f85-d66a4bebc58a", "matchup_id": "5b932332-2e65-e211-c9f6-596e2d862e75", "player_id": "39178706-dfec-4db2-9717-6c420ee81a33", "gross": 47, "is_blind": false},
    {"id": "f1f224da-87a9-96f5-b0f4-a26eb6d78f8a", "matchup_id": "8e127d01-a097-e9f8-b933-3c19134166c7", "player_id": "39178706-dfec-4db2-9717-6c420ee81a33", "gross": 45, "is_blind": false},
    {"id": "2f230993-507c-ad20-32af-ac64d5132663", "matchup_id": "3780ecb8-60a7-16de-0be2-962936e008e4", "player_id": "39178706-dfec-4db2-9717-6c420ee81a33", "gross": 49, "is_blind": false},
    {"id": "066d5f9d-d73a-95fa-ff5a-46259004bc7e", "matchup_id": "ce071e80-a38e-96c2-6974-91ad80158eae", "player_id": "39178706-dfec-4db2-9717-6c420ee81a33", "gross": 46, "is_blind": false},
    {"id": "43adae29-c339-53f5-2632-74d35b332ffe", "matchup_id": "cfb55312-6148-620d-b927-f6d2572e9bd7", "player_id": "39178706-dfec-4db2-9717-6c420ee81a33", "gross": 41, "is_blind": false},
    {"id": "143c80df-e2cf-e40a-e8ec-378f8b513a5b", "matchup_id": "44584dd9-be7f-6679-b7b9-d123c8efab1c", "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab", "gross": 40, "is_blind": false},
    {"id": "45c85330-8759-8f08-00a8-db95261cdb97", "matchup_id": "28a7495e-3799-81f6-c951-1be002581cc8", "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab", "gross": 52, "is_blind": false},
    {"id": "3a7972cb-7a9e-53b8-12aa-2b958c08849e", "matchup_id": "b5dccda1-8b00-102a-6b34-6f351c4176fa", "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab", "gross": 50, "is_blind": false},
    {"id": "fcbcd1ee-7f0c-e702-0fa0-0e85c3effc11", "matchup_id": "5b932332-2e65-e211-c9f6-596e2d862e75", "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab", "gross": 45, "is_blind": false},
    {"id": "dcc03dae-e377-c300-3d74-9fb71b3ebe14", "matchup_id": "8e127d01-a097-e9f8-b933-3c19134166c7", "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab", "gross": 47, "is_blind": false},
    {"id": "4872c8ba-123d-626e-4795-15d133f3506b", "matchup_id": "3780ecb8-60a7-16de-0be2-962936e008e4", "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab", "gross": 52, "is_blind": false},
    {"id": "5806f874-1554-cdc9-a02c-6b1e6f46ac3a", "matchup_id": "ce071e80-a38e-96c2-6974-91ad80158eae", "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab", "gross": 46, "is_blind": false},
    {"id": "d760a91f-222e-86d8-7dc1-c7f13c1320b2", "matchup_id": "cfb55312-6148-620d-b927-f6d2572e9bd7", "player_id": "094c9953-7459-4fe1-8a60-fdc6c96357ab", "gross": 45, "is_blind": false},
    {"id": "5b070f1e-2b07-459f-38d3-c3b34e057e12", "matchup_id": "44584dd9-be7f-6679-b7b9-d123c8efab1c", "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa", "gross": 46, "is_blind": false},
    {"id": "d65ca7ad-8c4b-8170-b52b-a7152853a23f", "matchup_id": "89aa564a-414c-505f-8def-1052e76a9bb2", "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa", "gross": 46, "is_blind": false},
    {"id": "b3ef59b2-5588-bbf9-f66a-c8bf5091c9be", "matchup_id": "5926c084-3165-3e3b-88c5-67de18048d37", "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa", "gross": 47, "is_blind": false},
    {"id": "1992f0b0-4777-8ff9-612f-c5397519be67", "matchup_id": "788a6253-bd26-dcc7-eb28-81cad1536deb", "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa", "gross": 46, "is_blind": false},
    {"id": "6b1c6c79-3db0-0f7d-f35d-8db3c3695239", "matchup_id": "f9b24b25-48cd-bca1-91e4-46f1384bda7f", "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa", "gross": 44, "is_blind": false},
    {"id": "7adef8a1-d70d-8124-e3e8-4212fa08a9c2", "matchup_id": "3780ecb8-60a7-16de-0be2-962936e008e4", "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa", "gross": 53, "is_blind": false},
    {"id": "1e6e8154-c339-bbba-4fe6-aef36f6cfc0b", "matchup_id": "ce071e80-a38e-96c2-6974-91ad80158eae", "player_id": "45801361-ad21-4fa2-89ad-ac7e13659eaa", "gross": 42, "is_blind": false},
    {"id": "5ef1d759-8a30-ae87-2d2c-19044d6009c1", "matchup_id": "44584dd9-be7f-6679-b7b9-d123c8efab1c", "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341", "gross": 58, "is_blind": false},
    {"id": "e1dcf567-44ac-ef9f-0bf2-e112e9771a2b", "matchup_id": "89aa564a-414c-505f-8def-1052e76a9bb2", "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341", "gross": 62, "is_blind": false},
    {"id": "4c764809-4401-3d2b-3ede-0c0fcc04e254", "matchup_id": "5926c084-3165-3e3b-88c5-67de18048d37", "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341", "gross": 54, "is_blind": false},
    {"id": "5ea1e2fc-6448-6cd2-cf2a-00b7d7ca1266", "matchup_id": "788a6253-bd26-dcc7-eb28-81cad1536deb", "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341", "gross": 54, "is_blind": false},
    {"id": "c5bac924-7735-34dd-cec3-8c48b86c8b03", "matchup_id": "f9b24b25-48cd-bca1-91e4-46f1384bda7f", "player_id": "58c79f2c-dd4e-45bd-ac61-91d8be5f3341", "gross": 55, "is_blind": false},
    {"id": "fa2366ef-e152-64ab-f2a4-c8793197998a", "matchup_id": "3b6d0ae4-a793-2f2d-8394-494683d7ed62", "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81", "gross": 38, "is_blind": false},
    {"id": "522f331e-eb85-c844-97ff-99d04c3fe9c5", "matchup_id": "40635635-2336-b49f-ccc6-2b69c35f5be4", "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81", "gross": 39, "is_blind": false},
    {"id": "df2a9d2a-bbc1-b092-f1cf-21dc8b3e26e2", "matchup_id": "71316939-6706-a5ca-8d0e-012f50183461", "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81", "gross": 40, "is_blind": false},
    {"id": "8f22b237-dc8b-d94a-0bd3-04520069fb8a", "matchup_id": "c882889a-9b4b-702f-fff1-e3ed1c4822dc", "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81", "gross": 42, "is_blind": false},
    {"id": "e25f439d-040c-07f4-2028-3594139178b0", "matchup_id": "f9b24b25-48cd-bca1-91e4-46f1384bda7f", "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81", "gross": 43, "is_blind": false},
    {"id": "10acebf3-ffb9-ea11-2e6a-2b45fb2cb260", "matchup_id": "766ad779-906d-b30a-844d-1b3bf1ccb7ae", "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81", "gross": 41, "is_blind": false},
    {"id": "c536f281-c7b1-b20a-5ee1-e43ec319ee96", "matchup_id": "ae6825cf-0c0e-fb9c-3b46-7d5c656c12b7", "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81", "gross": 43, "is_blind": false},
    {"id": "13b701be-f1b4-20fc-278d-bfe2293dd586", "matchup_id": "edbbe441-a12e-3c95-2dc5-d7dd7f7f17e7", "player_id": "f794f0e1-3958-48b7-ae96-ff6ba2b9cc81", "gross": 36, "is_blind": false},
    {"id": "c0a30b64-60b0-d50e-1217-f1296995caf1", "matchup_id": "3b6d0ae4-a793-2f2d-8394-494683d7ed62", "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470", "gross": 40, "is_blind": false},
    {"id": "236c6567-8115-ea4e-d97b-dbcb0fced412", "matchup_id": "40635635-2336-b49f-ccc6-2b69c35f5be4", "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470", "gross": 41, "is_blind": false},
    {"id": "806f4a96-f92e-09c2-9644-4cb14b422d95", "matchup_id": "71316939-6706-a5ca-8d0e-012f50183461", "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470", "gross": 42, "is_blind": false},
    {"id": "9112794a-5d21-e1e1-e786-fdb2bc01e07a", "matchup_id": "c882889a-9b4b-702f-fff1-e3ed1c4822dc", "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470", "gross": 41, "is_blind": false},
    {"id": "71049ac4-056c-0f5a-29d0-a7908a5676ed", "matchup_id": "f9b24b25-48cd-bca1-91e4-46f1384bda7f", "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470", "gross": 47, "is_blind": false},
    {"id": "67266665-ea85-1904-bc45-9e6e9160b01d", "matchup_id": "766ad779-906d-b30a-844d-1b3bf1ccb7ae", "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470", "gross": 43, "is_blind": false},
    {"id": "20146d87-adab-09f4-6e1c-e30d08043a01", "matchup_id": "ae6825cf-0c0e-fb9c-3b46-7d5c656c12b7", "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470", "gross": 41, "is_blind": false},
    {"id": "14b4dcf5-2d5d-1152-7b30-9ee94e3016b2", "matchup_id": "edbbe441-a12e-3c95-2dc5-d7dd7f7f17e7", "player_id": "e86deedb-14bb-4e79-a88e-0a7aea058470", "gross": 41, "is_blind": false},
    {"id": "889b9c57-9482-fdea-7191-2d2249cc3949", "matchup_id": "3b6d0ae4-a793-2f2d-8394-494683d7ed62", "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79", "gross": 42, "is_blind": false},
    {"id": "3b5e6158-ef2d-b438-99fa-54a9387148ec", "matchup_id": "db21167d-a4ab-280a-8813-1fe40c75a3c5", "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79", "gross": 46, "is_blind": false},
    {"id": "392f9dbb-5502-0fe3-f4ec-796b1a69f0e0", "matchup_id": "5f3aecf3-26ae-b9bc-c682-74a0fea2e2b7", "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79", "gross": 44, "is_blind": false},
    {"id": "33116cc9-363a-cbd6-8431-eb3e9dd92d30", "matchup_id": "c882889a-9b4b-702f-fff1-e3ed1c4822dc", "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79", "gross": 47, "is_blind": false},
    {"id": "fafb71d1-4b60-89af-1ad4-4cf1bc8c4c47", "matchup_id": "8e127d01-a097-e9f8-b933-3c19134166c7", "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79", "gross": 45, "is_blind": false},
    {"id": "f528551d-aeda-7b3d-1f91-9b18819bd809", "matchup_id": "263fd61c-326a-37bf-1999-5d440f7a6dc1", "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79", "gross": 44, "is_blind": false},
    {"id": "5a72480c-652f-29cf-032a-a08a5f420723", "matchup_id": "ae6825cf-0c0e-fb9c-3b46-7d5c656c12b7", "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79", "gross": 44, "is_blind": false},
    {"id": "182336a8-7a89-e05a-78f2-f594fe7c8fc3", "matchup_id": "4bc10e15-2652-a9df-4b05-f54f12f031da", "player_id": "e724d747-9aa5-469c-995e-1d3d4dad3e79", "gross": 41, "is_blind": false},
    {"id": "391963cb-2375-f68c-d014-d4f5e16a3a8b", "matchup_id": "3b6d0ae4-a793-2f2d-8394-494683d7ed62", "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8", "gross": 44, "is_blind": false},
    {"id": "bfebc4da-d42d-581d-647d-c508e280a2a8", "matchup_id": "db21167d-a4ab-280a-8813-1fe40c75a3c5", "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8", "gross": 44, "is_blind": false},
    {"id": "14c29266-bd74-4073-3259-6e3dfd5d8d97", "matchup_id": "5f3aecf3-26ae-b9bc-c682-74a0fea2e2b7", "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8", "gross": 43, "is_blind": false},
    {"id": "edb44061-b2f2-17c3-ba74-bb58a5e376fa", "matchup_id": "c882889a-9b4b-702f-fff1-e3ed1c4822dc", "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8", "gross": 41, "is_blind": false},
    {"id": "cc571c86-a2a9-0787-539f-0eeaaab9e30f", "matchup_id": "8e127d01-a097-e9f8-b933-3c19134166c7", "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8", "gross": 52, "is_blind": false},
    {"id": "e9041e07-3ea5-d921-da60-fda09979d302", "matchup_id": "263fd61c-326a-37bf-1999-5d440f7a6dc1", "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8", "gross": 48, "is_blind": false},
    {"id": "1fcac796-f834-f27c-0f76-a08bbbc92fc6", "matchup_id": "ae6825cf-0c0e-fb9c-3b46-7d5c656c12b7", "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8", "gross": 41, "is_blind": false},
    {"id": "6a56f730-5349-bb8a-8b60-41795c87deac", "matchup_id": "4bc10e15-2652-a9df-4b05-f54f12f031da", "player_id": "5e233e80-4b3d-4789-8260-3b433243eea8", "gross": 39, "is_blind": false},
    {"id": "7485bed4-66a6-7563-b9ba-c0c5ffae8fc5", "matchup_id": "ac77bafb-0751-7f7f-7d68-4ae4896e3da4", "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9", "gross": 44, "is_blind": false},
    {"id": "a46c955c-f42b-680c-16cd-061d8da3f9ba", "matchup_id": "d63c3200-1187-658f-8cb3-72d7085bf505", "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9", "gross": 41, "is_blind": false},
    {"id": "9d707515-0ca8-1976-6152-fb5974cad6bd", "matchup_id": "5f3aecf3-26ae-b9bc-c682-74a0fea2e2b7", "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9", "gross": 43, "is_blind": false},
    {"id": "eb59b1af-b46a-3faa-0937-4947ab1fcd14", "matchup_id": "788a6253-bd26-dcc7-eb28-81cad1536deb", "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9", "gross": 39, "is_blind": false},
    {"id": "d403ce96-aa9b-7181-9c44-0d64106f2b25", "matchup_id": "ce20b3d8-81d0-4d70-01d4-aa7376b6bfcf", "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9", "gross": 47, "is_blind": false},
    {"id": "3eda3efb-05ba-e37c-4e7c-06f612337047", "matchup_id": "6c2c9ae0-b989-cb6e-6d98-6703aa0ea7b1", "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9", "gross": 40, "is_blind": false},
    {"id": "701a88b6-c104-518a-dae4-eae8c395970f", "matchup_id": "1ab116d8-4db9-4384-f9f3-96dc29378ad7", "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9", "gross": 40, "is_blind": false},
    {"id": "c5d2c963-f53c-f2ab-fce5-1135ec996265", "matchup_id": "2ca7102d-0864-8400-fb6b-eca0b73cdaf6", "player_id": "15370581-1169-4bd0-95c0-f2718f8d99f9", "gross": 44, "is_blind": false},
    {"id": "81fcb029-3945-a554-42c4-af99e5f6ec2e", "matchup_id": "ac77bafb-0751-7f7f-7d68-4ae4896e3da4", "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639", "gross": 43, "is_blind": false},
    {"id": "aee4c23d-2ead-8e2f-0982-5c19ede83f75", "matchup_id": "d63c3200-1187-658f-8cb3-72d7085bf505", "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639", "gross": 40, "is_blind": false},
    {"id": "167ee49b-8490-5664-9f29-8d8ec5665e39", "matchup_id": "5f3aecf3-26ae-b9bc-c682-74a0fea2e2b7", "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639", "gross": 43, "is_blind": false},
    {"id": "5d1cf66e-9a69-5ac6-6576-a580866db7dd", "matchup_id": "788a6253-bd26-dcc7-eb28-81cad1536deb", "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639", "gross": 43, "is_blind": false},
    {"id": "a37bd596-8f8f-035b-475b-74c266d248df", "matchup_id": "ce20b3d8-81d0-4d70-01d4-aa7376b6bfcf", "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639", "gross": 42, "is_blind": false},
    {"id": "5fc4014d-4962-5d76-028f-daebc8c6afdc", "matchup_id": "6c2c9ae0-b989-cb6e-6d98-6703aa0ea7b1", "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639", "gross": 45, "is_blind": false},
    {"id": "482b2b8a-406c-a22e-783d-b69572b873b5", "matchup_id": "1ab116d8-4db9-4384-f9f3-96dc29378ad7", "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639", "gross": 45, "is_blind": false},
    {"id": "bf1aa541-7f29-7a9d-a854-9d78d0aa1a39", "matchup_id": "2ca7102d-0864-8400-fb6b-eca0b73cdaf6", "player_id": "1c65fdde-dcaf-42fc-8d45-8f22c35fd639", "gross": 38, "is_blind": false},
    {"id": "e8dac5af-d60c-4de8-29dd-a80a57d138fb", "matchup_id": "ac77bafb-0751-7f7f-7d68-4ae4896e3da4", "player_id": "1199232e-d347-4204-84f1-7ba2d024d813", "gross": 44, "is_blind": false},
    {"id": "692c1b11-afc1-5d87-123d-1f9dc0746bcc", "matchup_id": "d63c3200-1187-658f-8cb3-72d7085bf505", "player_id": "1199232e-d347-4204-84f1-7ba2d024d813", "gross": 46, "is_blind": false},
    {"id": "965c4bb3-6bf9-0ff9-a49b-16a1e6d795cb", "matchup_id": "71316939-6706-a5ca-8d0e-012f50183461", "player_id": "1199232e-d347-4204-84f1-7ba2d024d813", "gross": 52, "is_blind": false},
    {"id": "3dc51c01-4f9c-86be-4d47-4d9f98d192eb", "matchup_id": "5b932332-2e65-e211-c9f6-596e2d862e75", "player_id": "1199232e-d347-4204-84f1-7ba2d024d813", "gross": 50, "is_blind": false},
    {"id": "e77cb448-7ced-816a-b518-d0aebff3172c", "matchup_id": "61ac25e8-085b-6915-fa17-34e11d7d403a", "player_id": "1199232e-d347-4204-84f1-7ba2d024d813", "gross": 63, "is_blind": false},
    {"id": "01b99873-9341-ee9d-b2ad-ed902b8e1404", "matchup_id": "72de41a8-dde2-75b1-7b32-1ddcb5415385", "player_id": "1199232e-d347-4204-84f1-7ba2d024d813", "gross": 44, "is_blind": false},
    {"id": "02a75cc5-fac0-cc12-2139-01d3277bd1d6", "matchup_id": "ac77bafb-0751-7f7f-7d68-4ae4896e3da4", "player_id": "50184776-4b69-4e22-917b-0567d87e03ce", "gross": 45, "is_blind": false},
    {"id": "bb53d6b1-6ec7-c854-c233-864596cf6750", "matchup_id": "d63c3200-1187-658f-8cb3-72d7085bf505", "player_id": "50184776-4b69-4e22-917b-0567d87e03ce", "gross": 46, "is_blind": false},
    {"id": "e487b3ad-d27a-46e6-782a-8a7b63e9f2ac", "matchup_id": "71316939-6706-a5ca-8d0e-012f50183461", "player_id": "50184776-4b69-4e22-917b-0567d87e03ce", "gross": 39, "is_blind": false},
    {"id": "b53af300-4eb8-73d5-cf93-c2ebe77fa347", "matchup_id": "5b932332-2e65-e211-c9f6-596e2d862e75", "player_id": "50184776-4b69-4e22-917b-0567d87e03ce", "gross": 44, "is_blind": false},
    {"id": "50d0304c-8b69-997d-3d19-dd99612c0362", "matchup_id": "61ac25e8-085b-6915-fa17-34e11d7d403a", "player_id": "50184776-4b69-4e22-917b-0567d87e03ce", "gross": 44, "is_blind": false},
    {"id": "413a1fb8-0c79-2b11-1a92-abe513e6e760", "matchup_id": "72de41a8-dde2-75b1-7b32-1ddcb5415385", "player_id": "50184776-4b69-4e22-917b-0567d87e03ce", "gross": 41, "is_blind": false},
    {"id": "41202384-add7-bfda-469c-06fb9175d972", "matchup_id": "1ab116d8-4db9-4384-f9f3-96dc29378ad7", "player_id": "50184776-4b69-4e22-917b-0567d87e03ce", "gross": 40, "is_blind": false},
    {"id": "3d3d0539-9082-77c4-161e-4a426b30b230", "matchup_id": "25aa0bf0-ab3c-4be1-0056-52a0436bb2a4", "player_id": "50184776-4b69-4e22-917b-0567d87e03ce", "gross": 48, "is_blind": false},
    {"id": "8a9d276a-7208-12ff-52a6-214743098cb0", "matchup_id": "b0de90a6-a128-c2d4-2c1c-e3cb156ffca8", "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68", "gross": 46, "is_blind": false},
    {"id": "b04f5e6e-13aa-cfa5-acef-a5b5514fe76a", "matchup_id": "db21167d-a4ab-280a-8813-1fe40c75a3c5", "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68", "gross": 48, "is_blind": false},
    {"id": "c48aad35-9c7b-eb02-e89b-e1bcedd9d0b0", "matchup_id": "5926c084-3165-3e3b-88c5-67de18048d37", "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68", "gross": 45, "is_blind": false},
    {"id": "e4e5922f-cb9f-12aa-3cf9-6b0746d9bbc2", "matchup_id": "ff09ecb5-8a2f-a66d-3a60-b5a8b7c877cc", "player_id": "c6e134c3-b627-4360-883c-8e20fe7e7c68", "gross": 41, "is_blind": false},
    {"id": "4a471f66-5da6-1fb6-0290-aca993db4189", "matchup_id": "b0de90a6-a128-c2d4-2c1c-e3cb156ffca8", "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e", "gross": 47, "is_blind": false},
    {"id": "4964dd94-fe34-1be7-6fb2-54a631cf9411", "matchup_id": "db21167d-a4ab-280a-8813-1fe40c75a3c5", "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e", "gross": 54, "is_blind": false},
    {"id": "781cb7f1-642c-0901-3c5a-119ab4c35c6c", "matchup_id": "5926c084-3165-3e3b-88c5-67de18048d37", "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e", "gross": 52, "is_blind": false},
    {"id": "a90a5788-e1e4-1d03-1788-1b4d1e399d4a", "matchup_id": "ff09ecb5-8a2f-a66d-3a60-b5a8b7c877cc", "player_id": "3f9d2954-30f7-46fb-82ae-aeaa4bf8941e", "gross": 48, "is_blind": false},
    {"id": "9225b9dd-6b5a-8630-a622-461b085cdc88", "matchup_id": "b0de90a6-a128-c2d4-2c1c-e3cb156ffca8", "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51", "gross": 42, "is_blind": false},
    {"id": "412a693c-0083-0289-d0b3-2c04c4544235", "matchup_id": "40635635-2336-b49f-ccc6-2b69c35f5be4", "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51", "gross": 42, "is_blind": false},
    {"id": "c1b0f7c1-1fdb-6891-d4c0-a187f4864232", "matchup_id": "b5dccda1-8b00-102a-6b34-6f351c4176fa", "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51", "gross": 41, "is_blind": false},
    {"id": "f07b07a2-595f-7595-9315-a23fc78675fe", "matchup_id": "4aa4a0eb-b685-5219-af62-ea81f401cd7d", "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51", "gross": 44, "is_blind": false},
    {"id": "1514c658-e098-82fb-9846-7021950f1fd6", "matchup_id": "30fc63a0-77e5-aea6-a83d-e552942ea954", "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51", "gross": 48, "is_blind": false},
    {"id": "93363c1b-62be-fac2-9e52-55036707fc29", "matchup_id": "ca8b0f16-567d-e28e-24a5-8d601d094ba3", "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51", "gross": 47, "is_blind": false},
    {"id": "f531e4a7-c74b-ee1a-0d27-52609e27b474", "matchup_id": "1e4f7e8d-4cbe-e638-6c52-74c424ba739d", "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51", "gross": 45, "is_blind": false},
    {"id": "02959f0a-4fd6-83a0-a46d-ec01373b6d7f", "matchup_id": "25aa0bf0-ab3c-4be1-0056-52a0436bb2a4", "player_id": "5cfe4a20-e0d5-4970-a61c-a4fdff613d51", "gross": 39, "is_blind": false},
    {"id": "36a7aa33-8c1e-b379-ff79-a05d94b7248d", "matchup_id": "b0de90a6-a128-c2d4-2c1c-e3cb156ffca8", "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4", "gross": 51, "is_blind": false},
    {"id": "45a004b6-3d1f-dd39-2f1d-6bb6b1d29d49", "matchup_id": "40635635-2336-b49f-ccc6-2b69c35f5be4", "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4", "gross": 52, "is_blind": false},
    {"id": "87f3472a-8cb9-8e26-f23e-ac43c1e23359", "matchup_id": "b5dccda1-8b00-102a-6b34-6f351c4176fa", "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4", "gross": 55, "is_blind": false},
    {"id": "bc9300ee-dc11-d18c-38a1-20fb1d4a4496", "matchup_id": "4aa4a0eb-b685-5219-af62-ea81f401cd7d", "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4", "gross": 59, "is_blind": false},
    {"id": "320aeca0-ecd5-b381-75ce-70d7b0a6be31", "matchup_id": "30fc63a0-77e5-aea6-a83d-e552942ea954", "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4", "gross": 54, "is_blind": false},
    {"id": "0bcd9c6c-defa-aac2-31ab-852f1186fcec", "matchup_id": "ca8b0f16-567d-e28e-24a5-8d601d094ba3", "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4", "gross": 54, "is_blind": false},
    {"id": "234affa9-c5cf-03dc-3c23-106810a3ba65", "matchup_id": "1e4f7e8d-4cbe-e638-6c52-74c424ba739d", "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4", "gross": 54, "is_blind": false},
    {"id": "681cdfdb-f8b6-6e54-66f4-2673e33d5d2a", "matchup_id": "25aa0bf0-ab3c-4be1-0056-52a0436bb2a4", "player_id": "3baea938-96a5-45b7-a7f0-3ab79774a7b4", "gross": 47, "is_blind": false},
    {"id": "47e6ca0c-81b4-d04e-dd54-1d40e0534398", "matchup_id": "c742436a-e907-cb6c-e03c-05d99270b854", "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd", "gross": 50, "is_blind": false},
    {"id": "0f143db2-34f7-4e5f-da1b-a46477d537d9", "matchup_id": "89aa564a-414c-505f-8def-1052e76a9bb2", "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd", "gross": 50, "is_blind": false},
    {"id": "30098c08-9142-6cdc-8e9f-8073fcf30b49", "matchup_id": "d0ac0ede-541a-deda-0da4-9d5cc495be7c", "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd", "gross": 47, "is_blind": false},
    {"id": "6ac92e43-0d37-c945-cf25-1256f9664970", "matchup_id": "ee52f776-53db-c1ac-c7a1-0330fe0dced8", "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd", "gross": 54, "is_blind": false},
    {"id": "a4963966-ab7e-a58e-755c-538796710e6a", "matchup_id": "d700a3c5-3236-a223-27a5-cc8b037dcb31", "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd", "gross": 47, "is_blind": false},
    {"id": "0bfad7f5-8c56-05c9-0375-503b281cffab", "matchup_id": "dc3c2cd1-e151-7af7-5b94-75157a48b1d7", "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd", "gross": 47, "is_blind": false},
    {"id": "f2a9f3ac-69f5-3e5c-5c4f-a14a8712f89b", "matchup_id": "a3294894-f830-2304-877a-0a2e50bfa8d5", "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd", "gross": 49, "is_blind": false},
    {"id": "6dddecf4-6e06-24b2-4d99-97ac5afd4003", "matchup_id": "2ca7102d-0864-8400-fb6b-eca0b73cdaf6", "player_id": "58a25cb4-d240-4853-9410-8da86b7b56bd", "gross": 53, "is_blind": false},
    {"id": "d08b3edb-bbb9-0a01-801a-bbf6d6b83923", "matchup_id": "c742436a-e907-cb6c-e03c-05d99270b854", "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63", "gross": 52, "is_blind": false},
    {"id": "59be55b1-d9dd-f630-3f3b-d6cce9205dd6", "matchup_id": "89aa564a-414c-505f-8def-1052e76a9bb2", "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63", "gross": 57, "is_blind": false},
    {"id": "b3c446b5-37e5-2ce4-aa61-f7f429a6ca9e", "matchup_id": "d0ac0ede-541a-deda-0da4-9d5cc495be7c", "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63", "gross": 54, "is_blind": false},
    {"id": "ee3728a4-15ec-5259-559b-b09668700467", "matchup_id": "ee52f776-53db-c1ac-c7a1-0330fe0dced8", "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63", "gross": 55, "is_blind": false},
    {"id": "d13f8d64-11dc-695b-83e9-9594988b8687", "matchup_id": "d700a3c5-3236-a223-27a5-cc8b037dcb31", "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63", "gross": 59, "is_blind": false},
    {"id": "0b2f27c1-f62e-1685-42e2-ccffdfe05140", "matchup_id": "dc3c2cd1-e151-7af7-5b94-75157a48b1d7", "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63", "gross": 54, "is_blind": false},
    {"id": "160ef562-2f8f-d534-e0ea-be1b893c604a", "matchup_id": "a3294894-f830-2304-877a-0a2e50bfa8d5", "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63", "gross": 64, "is_blind": false},
    {"id": "a4c144e8-9731-b992-fb3b-d7fca4cb670a", "matchup_id": "2ca7102d-0864-8400-fb6b-eca0b73cdaf6", "player_id": "f9fb1f9e-08b5-4c9b-96f6-0a8acb6ddc63", "gross": 56, "is_blind": false},
    {"id": "a3eb0217-0afa-c027-e06f-bae20c462223", "matchup_id": "c742436a-e907-cb6c-e03c-05d99270b854", "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2", "gross": 52, "is_blind": false},
    {"id": "a7cf4c2a-58e7-3258-d8c3-b3922862306b", "matchup_id": "28a7495e-3799-81f6-c951-1be002581cc8", "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2", "gross": 58, "is_blind": false},
    {"id": "0050eb4f-57a5-f264-2999-7a4d2f3fbeac", "matchup_id": "08fd6b33-8a39-ee66-7f2f-2a72a0feec14", "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2", "gross": 50, "is_blind": false},
    {"id": "5ab19503-1d9f-94ee-18c0-a1c33c11b4a4", "matchup_id": "99e19163-6870-9f25-96c9-42c6346460df", "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2", "gross": 55, "is_blind": false},
    {"id": "04da3333-b18c-b53c-393e-a29c68b50e6a", "matchup_id": "30fc63a0-77e5-aea6-a83d-e552942ea954", "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2", "gross": 60, "is_blind": false},
    {"id": "ab651c29-a536-c665-4cbd-244d2f937b07", "matchup_id": "72de41a8-dde2-75b1-7b32-1ddcb5415385", "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2", "gross": 58, "is_blind": false},
    {"id": "9b406580-0d36-5d30-df31-2b434cfaea52", "matchup_id": "a3294894-f830-2304-877a-0a2e50bfa8d5", "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2", "gross": 49, "is_blind": false},
    {"id": "75fb18fb-c30a-5c69-e555-dcc1192d1f9c", "matchup_id": "4bc10e15-2652-a9df-4b05-f54f12f031da", "player_id": "8b27968d-3365-455e-b36a-b61a691ecca2", "gross": 55, "is_blind": false},
    {"id": "56272f9a-2982-b50a-c936-e5962265717f", "matchup_id": "c742436a-e907-cb6c-e03c-05d99270b854", "player_id": "576803c2-f3d3-4d95-921f-083985db10cc", "gross": 42, "is_blind": false},
    {"id": "322f6cb6-b36a-ca9e-8d36-4cf0098ebf10", "matchup_id": "28a7495e-3799-81f6-c951-1be002581cc8", "player_id": "576803c2-f3d3-4d95-921f-083985db10cc", "gross": 45, "is_blind": false},
    {"id": "a9459347-2a97-cb5f-93d5-696840f0266f", "matchup_id": "08fd6b33-8a39-ee66-7f2f-2a72a0feec14", "player_id": "576803c2-f3d3-4d95-921f-083985db10cc", "gross": 45, "is_blind": false},
    {"id": "afb2e332-1437-4791-ca86-b0de9415ef40", "matchup_id": "99e19163-6870-9f25-96c9-42c6346460df", "player_id": "576803c2-f3d3-4d95-921f-083985db10cc", "gross": 53, "is_blind": false},
    {"id": "6d88728a-7322-7fc4-987c-e363fbbdf52e", "matchup_id": "30fc63a0-77e5-aea6-a83d-e552942ea954", "player_id": "576803c2-f3d3-4d95-921f-083985db10cc", "gross": 43, "is_blind": false},
    {"id": "75f74190-3669-03b5-9959-234962a02982", "matchup_id": "72de41a8-dde2-75b1-7b32-1ddcb5415385", "player_id": "576803c2-f3d3-4d95-921f-083985db10cc", "gross": 47, "is_blind": false},
    {"id": "8838197d-a025-b6cc-da82-e000c16bd2d1", "matchup_id": "a3294894-f830-2304-877a-0a2e50bfa8d5", "player_id": "576803c2-f3d3-4d95-921f-083985db10cc", "gross": 48, "is_blind": false},
    {"id": "c78bc2ed-7f3e-dc7f-a3df-5eba29dce231", "matchup_id": "4bc10e15-2652-a9df-4b05-f54f12f031da", "player_id": "576803c2-f3d3-4d95-921f-083985db10cc", "gross": 46, "is_blind": false},
    {"id": "21b1ab80-fedf-b375-c919-73bd67f33f9f", "matchup_id": "7061d1c4-2214-5b73-4626-e43bf72ebdf7", "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c", "gross": 56, "is_blind": false},
    {"id": "dbfcf8eb-0719-e650-7069-9ad8a40b5065", "matchup_id": "51fcb3d0-5b69-2809-f556-401ef84c4478", "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c", "gross": 52, "is_blind": false},
    {"id": "60ae390c-e06f-d295-81b5-95a1c641b97a", "matchup_id": "7166e418-4692-14fd-c1a5-add2e410a0a8", "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c", "gross": 56, "is_blind": false},
    {"id": "5a6c5524-58ea-fba8-5c72-d5fca5ab70a4", "matchup_id": "ee52f776-53db-c1ac-c7a1-0330fe0dced8", "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c", "gross": 49, "is_blind": false},
    {"id": "e85a35d0-f124-a673-edd6-ca3c705292cc", "matchup_id": "f201865a-4b3d-3a2c-9126-76337ba72766", "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c", "gross": 61, "is_blind": false},
    {"id": "c7285d17-a5b9-2d04-a3d6-d6d13be97a87", "matchup_id": "6c2c9ae0-b989-cb6e-6d98-6703aa0ea7b1", "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c", "gross": 60, "is_blind": false},
    {"id": "76d32b97-ec8e-96bc-37d8-6eae395b199b", "matchup_id": "23fc5bfc-4a40-4249-e72b-82c44b316393", "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c", "gross": 50, "is_blind": false},
    {"id": "8afcc09e-cd8b-dc48-71bd-3be953c05122", "matchup_id": "edbbe441-a12e-3c95-2dc5-d7dd7f7f17e7", "player_id": "bc9f2e32-535f-4ed7-8530-aa1c2fefad7c", "gross": 51, "is_blind": false},
    {"id": "91e3dbe9-9672-4fb3-43e8-6c94c390966a", "matchup_id": "7061d1c4-2214-5b73-4626-e43bf72ebdf7", "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406", "gross": 50, "is_blind": false},
    {"id": "b62d4348-852e-fdc7-5e9c-a05c0420dbd2", "matchup_id": "51fcb3d0-5b69-2809-f556-401ef84c4478", "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406", "gross": 49, "is_blind": false},
    {"id": "d839ab74-c35a-724f-d9a6-75dacc7b2f34", "matchup_id": "7166e418-4692-14fd-c1a5-add2e410a0a8", "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406", "gross": 58, "is_blind": false},
    {"id": "fcbfb4bc-fcd5-2793-0db3-345fc290711a", "matchup_id": "ee52f776-53db-c1ac-c7a1-0330fe0dced8", "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406", "gross": 50, "is_blind": false},
    {"id": "857498f5-3875-9854-3ff6-36bdd5c38b7a", "matchup_id": "f201865a-4b3d-3a2c-9126-76337ba72766", "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406", "gross": 56, "is_blind": false},
    {"id": "0012c85b-6f32-24b9-248d-6520ceb8a9fa", "matchup_id": "6c2c9ae0-b989-cb6e-6d98-6703aa0ea7b1", "player_id": "6beb4d57-3fdc-49b3-a830-d4bba2efe406", "gross": 49, "is_blind": false},
    {"id": "23627c8c-4fa3-22ef-4317-de0516d40855", "matchup_id": "7061d1c4-2214-5b73-4626-e43bf72ebdf7", "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf", "gross": 45, "is_blind": false},
    {"id": "38a8173f-6422-bb2d-45e6-4e69549f3d9b", "matchup_id": "749198a8-89d7-3ff0-e0bb-ac0fb31e0277", "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf", "gross": 45, "is_blind": false},
    {"id": "ab812f39-65df-b3df-7a9f-529dadfd389d", "matchup_id": "08fd6b33-8a39-ee66-7f2f-2a72a0feec14", "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf", "gross": 54, "is_blind": false},
    {"id": "ba2b4826-d5ce-4259-78b6-2543f5aea1c5", "matchup_id": "4aa4a0eb-b685-5219-af62-ea81f401cd7d", "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf", "gross": 42, "is_blind": false},
    {"id": "1ad56f4a-65f1-4263-73bf-060730e2289c", "matchup_id": "61ac25e8-085b-6915-fa17-34e11d7d403a", "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf", "gross": 46, "is_blind": false},
    {"id": "3d2a23ff-fa63-14e8-c3e0-b642110dadbe", "matchup_id": "263fd61c-326a-37bf-1999-5d440f7a6dc1", "player_id": "b42100a4-f210-4512-a0b1-bb02100442cf", "gross": 40, "is_blind": false},
    {"id": "7f4e6ea9-b822-2b19-a9e0-4882ebd506fd", "matchup_id": "7061d1c4-2214-5b73-4626-e43bf72ebdf7", "player_id": "e1d37712-5c13-4c2a-b576-44033095b725", "gross": 60, "is_blind": false},
    {"id": "86ab8c8c-0409-d08b-168b-1d7f12fa969f", "matchup_id": "749198a8-89d7-3ff0-e0bb-ac0fb31e0277", "player_id": "e1d37712-5c13-4c2a-b576-44033095b725", "gross": 49, "is_blind": false},
    {"id": "0febeeaf-76c5-f0bf-44b4-b32615900e6e", "matchup_id": "08fd6b33-8a39-ee66-7f2f-2a72a0feec14", "player_id": "e1d37712-5c13-4c2a-b576-44033095b725", "gross": 51, "is_blind": false},
    {"id": "19c4c753-01c1-59ce-5914-690f26a340d0", "matchup_id": "4aa4a0eb-b685-5219-af62-ea81f401cd7d", "player_id": "e1d37712-5c13-4c2a-b576-44033095b725", "gross": 51, "is_blind": false},
    {"id": "105554d2-1110-7521-3e36-6a8fd76830af", "matchup_id": "61ac25e8-085b-6915-fa17-34e11d7d403a", "player_id": "e1d37712-5c13-4c2a-b576-44033095b725", "gross": 55, "is_blind": false},
    {"id": "869e0295-6e93-ffb8-9c7b-66843fcfe7a8", "matchup_id": "263fd61c-326a-37bf-1999-5d440f7a6dc1", "player_id": "e1d37712-5c13-4c2a-b576-44033095b725", "gross": 49, "is_blind": false}
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
  await db.put('settings', { id: 'seed_version', value: SEED_VERSION })
}
