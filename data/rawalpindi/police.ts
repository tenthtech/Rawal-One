import type { CivicReference } from "@/data/rawalpindi/sources";

export type PoliceStationRecord = CivicReference & {
  id: string;
  title: string;
  kind: "Police station" | "Police post";
  circle: string;
  phones: readonly { label: string; tel: string }[];
};

export const policeCircles = [
  "Cantt Circle",
  "Saddar Circle",
  "City Circle",
  "Taxila Circle",
  "Gujar Khan Circle",
  "Waris Khan Circle",
  "Civil Lines Circle",
  "Kahuta Circle",
  "New Town Circle",
  "Murree Circle",
  "Kotli Sattian Circle"
] as const;

// Exact facilities and circle groups from the undated official Rawalpindi
// directory. Includes Murree and Kotli Sattian; not a current-boundary claim.
// Wah Cantt is retained without a telephone: the published number has an
// unresolved subscriber length. No corrected number is inferred.
const publishedDirectory: readonly Omit<PoliceStationRecord, keyof CivicReference>[] = [
  {
    "id": "cantt",
    "title": "Cantt",
    "kind": "Police station",
    "circle": "Cantt Circle",
    "phones": [
      {
        "label": "051-9270652",
        "tel": "0519270652"
      }
    ]
  },
  {
    "id": "saddar-barooni",
    "title": "Saddar Barooni",
    "kind": "Police station",
    "circle": "Saddar Circle",
    "phones": [
      {
        "label": "051-9292856",
        "tel": "0519292856"
      }
    ]
  },
  {
    "id": "city",
    "title": "City",
    "kind": "Police station",
    "circle": "City Circle",
    "phones": [
      {
        "label": "051-9334688",
        "tel": "0519334688"
      }
    ]
  },
  {
    "id": "ra-bazar",
    "title": "R.A Bazar",
    "kind": "Police station",
    "circle": "Cantt Circle",
    "phones": [
      {
        "label": "051-9270653",
        "tel": "0519270653"
      }
    ]
  },
  {
    "id": "chountra",
    "title": "Chountra",
    "kind": "Police station",
    "circle": "Saddar Circle",
    "phones": [
      {
        "label": "051-4673181",
        "tel": "0514673181"
      }
    ]
  },
  {
    "id": "ganjmandi",
    "title": "Ganjmandi",
    "kind": "Police station",
    "circle": "City Circle",
    "phones": [
      {
        "label": "051-9334366",
        "tel": "0519334366"
      }
    ]
  },
  {
    "id": "westridge",
    "title": "Westridge",
    "kind": "Police station",
    "circle": "Cantt Circle",
    "phones": [
      {
        "label": "051-9334349",
        "tel": "0519334349"
      }
    ]
  },
  {
    "id": "rawat",
    "title": "Rawat",
    "kind": "Police station",
    "circle": "Saddar Circle",
    "phones": [
      {
        "label": "051-3595100",
        "tel": "0513595100"
      }
    ]
  },
  {
    "id": "pirwadhai",
    "title": "Pirwadhai",
    "kind": "Police station",
    "circle": "City Circle",
    "phones": [
      {
        "label": "051-9334559",
        "tel": "0519334559"
      }
    ]
  },
  {
    "id": "naseerabad",
    "title": "Naseerabad",
    "kind": "Police station",
    "circle": "Cantt Circle",
    "phones": [
      {
        "label": "051-9334114",
        "tel": "0519334114"
      }
    ]
  },
  {
    "id": "police-post-adyala",
    "title": "Police Post Adyala",
    "kind": "Police post",
    "circle": "Saddar Circle",
    "phones": [
      {
        "label": "051-5133156",
        "tel": "0515133156"
      }
    ]
  },
  {
    "id": "ratta-amral",
    "title": "Ratta Amral",
    "kind": "Police station",
    "circle": "City Circle",
    "phones": [
      {
        "label": "051-9334844",
        "tel": "0519334844"
      }
    ]
  },
  {
    "id": "race-course",
    "title": "Race Course",
    "kind": "Police station",
    "circle": "Cantt Circle",
    "phones": [
      {
        "label": "051-9334088",
        "tel": "0519334088"
      }
    ]
  },
  {
    "id": "taxila",
    "title": "Taxila",
    "kind": "Police station",
    "circle": "Taxila Circle",
    "phones": [
      {
        "label": "051-9314355",
        "tel": "0519314355"
      }
    ]
  },
  {
    "id": "gujar-khan",
    "title": "Gujar Khan",
    "kind": "Police station",
    "circle": "Gujar Khan Circle",
    "phones": [
      {
        "label": "051-9330013",
        "tel": "0519330013"
      }
    ]
  },
  {
    "id": "waris-khan",
    "title": "Waris Khan",
    "kind": "Police station",
    "circle": "Waris Khan Circle",
    "phones": [
      {
        "label": "051-9334344",
        "tel": "0519334344"
      }
    ]
  },
  {
    "id": "wah-cantt",
    "title": "Wah Cantt",
    "kind": "Police station",
    "circle": "Taxila Circle",
    "phones": []
  },
  {
    "id": "mandra",
    "title": "Mandra",
    "kind": "Police station",
    "circle": "Gujar Khan Circle",
    "phones": [
      {
        "label": "051-3591333",
        "tel": "0513591333"
      }
    ]
  },
  {
    "id": "banni",
    "title": "Banni",
    "kind": "Police station",
    "circle": "Waris Khan Circle",
    "phones": [
      {
        "label": "051-9334455",
        "tel": "0519334455"
      }
    ]
  },
  {
    "id": "wah-sadar",
    "title": "Wah Sadar",
    "kind": "Police station",
    "circle": "Taxila Circle",
    "phones": [
      {
        "label": "051-9330005",
        "tel": "0519330005"
      }
    ]
  },
  {
    "id": "jatli",
    "title": "Jatli",
    "kind": "Police station",
    "circle": "Gujar Khan Circle",
    "phones": [
      {
        "label": "051-3556010",
        "tel": "0513556010"
      }
    ]
  },
  {
    "id": "police-post-city",
    "title": "Police Post City",
    "kind": "Police post",
    "circle": "Taxila Circle",
    "phones": [
      {
        "label": "051-9314242",
        "tel": "0519314242"
      }
    ]
  },
  {
    "id": "civil-lines",
    "title": "Civil Lines",
    "kind": "Police station",
    "circle": "Civil Lines Circle",
    "phones": [
      {
        "label": "051-9286039",
        "tel": "0519286039"
      }
    ]
  },
  {
    "id": "kahuta",
    "title": "Kahuta",
    "kind": "Police station",
    "circle": "Kahuta Circle",
    "phones": [
      {
        "label": "051-3311056",
        "tel": "0513311056"
      }
    ]
  },
  {
    "id": "new-town",
    "title": "New Town",
    "kind": "Police station",
    "circle": "New Town Circle",
    "phones": [
      {
        "label": "051-9290286",
        "tel": "0519290286"
      }
    ]
  },
  {
    "id": "airport",
    "title": "Airport",
    "kind": "Police station",
    "circle": "Civil Lines Circle",
    "phones": [
      {
        "label": "051-9280333",
        "tel": "0519280333"
      }
    ]
  },
  {
    "id": "kallar-syedan",
    "title": "Kallar Syedan",
    "kind": "Police station",
    "circle": "Kahuta Circle",
    "phones": [
      {
        "label": "051-9330009",
        "tel": "0519330009"
      }
    ]
  },
  {
    "id": "sadiqabad",
    "title": "Sadiqabad",
    "kind": "Police station",
    "circle": "New Town Circle",
    "phones": [
      {
        "label": "051-9334899",
        "tel": "0519334899"
      }
    ]
  },
  {
    "id": "morgha",
    "title": "Morgha",
    "kind": "Police station",
    "circle": "Civil Lines Circle",
    "phones": [
      {
        "label": "051-9334848",
        "tel": "0519334848"
      }
    ]
  },
  {
    "id": "women",
    "title": "Women",
    "kind": "Police station",
    "circle": "Civil Lines Circle",
    "phones": [
      {
        "label": "051-9292832",
        "tel": "0519292832"
      }
    ]
  },
  {
    "id": "police-post-dha",
    "title": "Police Post DHA",
    "kind": "Police post",
    "circle": "Civil Lines Circle",
    "phones": [
      {
        "label": "051-5138143",
        "tel": "0515138143"
      },
      {
        "label": "051-5138144",
        "tel": "0515138144"
      }
    ]
  },
  {
    "id": "kotli-sattian",
    "title": "Kotli Sattian",
    "kind": "Police station",
    "circle": "Kotli Sattian Circle",
    "phones": [
      {
        "label": "051-3356014",
        "tel": "0513356014"
      }
    ]
  },
  {
    "id": "murree",
    "title": "Murree",
    "kind": "Police station",
    "circle": "Murree Circle",
    "phones": [
      {
        "label": "051-3756632",
        "tel": "0513756632"
      }
    ]
  },
  {
    "id": "police-post-sunny-bank",
    "title": "Police Post Sunny Bank",
    "kind": "Police post",
    "circle": "Murree Circle",
    "phones": [
      {
        "label": "051-9269089",
        "tel": "0519269089"
      }
    ]
  }
];

export const policeStations: readonly PoliceStationRecord[] = publishedDirectory.map((station) => ({
  ...station,
  sourceIds: ["police-directory"],
  geographicScope: "Published Punjab Police Rawalpindi directory, including Murree and Kotli Sattian",
  lastVerified: "2026-10-13",
}));
