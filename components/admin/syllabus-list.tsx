"use client";
// syllabus list

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const SyllabusList = () => {
  const syllabusList = [
    {
      _id: "68c58dea8572145288f7ca9f",
      title: "Voco thema titulus.",
      description:
        "Capio concedo averto capillus templum sopor communis commodo ventus crinis. Statim curis tripudio tubineus alias calamitas volva urbanus vulticulus termes.",
      subject: "art",
      gradeLevel: "3-5",
      units: [
        {
          id: "f08dee16-fdc1-4ee2-97fe-de9b5294392d",
          title: "Unit 1: abstergo quia",
          activities: [
            {
              $oid: "68c58dea8572145288f7c98f",
            },
            {
              $oid: "68c58dea8572145288f7c986",
            },
            {
              $oid: "68c58dea8572145288f7c9cb",
            },
            {
              $oid: "68c58dea8572145288f7c9df",
            },
          ],
        },
        {
          id: "17f41fc6-bed5-43e8-a30c-3b257ac604d4",
          title: "Unit 2: desino tamisium",
          activities: [
            {
              $oid: "68c58dea8572145288f7c9a5",
            },
            {
              $oid: "68c58dea8572145288f7c994",
            },
            {
              $oid: "68c58dea8572145288f7c9ad",
            },
            {
              $oid: "68c58dea8572145288f7c9d7",
            },
            {
              $oid: "68c58dea8572145288f7c9da",
            },
          ],
        },
        {
          id: "57179fa3-a1c1-4c63-9ec4-636a4f905e65",
          title: "Unit 3: pax voro",
          activities: [
            {
              $oid: "68c58dea8572145288f7c996",
            },
            {
              $oid: "68c58dea8572145288f7c9b8",
            },
            {
              $oid: "68c58dea8572145288f7c982",
            },
          ],
        },
      ],
      objectives: [
        "auditor asperiores supellex",
        "cotidie cerno peccatus",
        "aperiam culpo articulus",
      ],
      timeline: "4 weeks",
      resources: [
        {
          title: "videlicet caute vita",
          description: "Voro adeptio vulgaris cognatus vicinus uterque.",
          link: "https://bleak-euphonium.info/",
        },
        {
          title: "sumptus solium ademptio",
          description: "Soleo tollo socius thema.",
          link: "https://prestigious-flint.name",
        },
        {
          title: "copia tandem curia",
          description:
            "Tepidus odit cena deporto thymbra admoneo saepe reprehenderit cui alioqui.",
          link: "https://nocturnal-hierarchy.info/",
        },
      ],
      createdBy: {
        $oid: "68c58dea8572145288f7c975",
      },
      organization: {
        $oid: "68c58dea8572145288f7c978",
      },
      status: "published",
      __v: 0,
      createdAt: {
        $date: "2025-09-13T15:29:46.866Z",
      },
      updatedAt: {
        $date: "2025-09-13T15:29:46.866Z",
      },
    },
    {
      _id: {
        $oid: "68c58dea8572145288f7caa0",
      },
      title: "Trucido et theca.",
      description:
        "Sub adulatio volup. Terreo compello thema stabilis despecto cupiditas supellex.",
      subject: "social",
      gradeLevel: "prek",
      units: [
        {
          id: "ef01689d-6ad0-4b34-bdbb-73a20ebe809b",
          title: "Unit 1: tunc pecco",
          activities: [
            {
              $oid: "68c58dea8572145288f7c9c9",
            },
            {
              $oid: "68c58dea8572145288f7c9e4",
            },
            {
              $oid: "68c58dea8572145288f7c9d7",
            },
            {
              $oid: "68c58dea8572145288f7c9c2",
            },
          ],
        },
        {
          id: "d362a605-a557-425a-b230-b2ee454c5ce8",
          title: "Unit 2: abeo facere",
          activities: [
            {
              $oid: "68c58dea8572145288f7c99a",
            },
            {
              $oid: "68c58dea8572145288f7c9ad",
            },
            {
              $oid: "68c58dea8572145288f7c9ef",
            },
          ],
        },
        {
          id: "7ba90410-842c-4a71-bc16-37f590031f83",
          title: "Unit 3: terminatio calamitas",
          activities: [
            {
              $oid: "68c58dea8572145288f7c9b8",
            },
          ],
        },
        {
          id: "9e0acc6b-7ad2-4b41-9a67-743942d228b9",
          title: "Unit 4: bardus basium",
          activities: [
            {
              $oid: "68c58dea8572145288f7c994",
            },
            {
              $oid: "68c58dea8572145288f7c9da",
            },
            {
              $oid: "68c58dea8572145288f7c99f",
            },
            {
              $oid: "68c58dea8572145288f7c9df",
            },
            {
              $oid: "68c58dea8572145288f7c982",
            },
          ],
        },
      ],
      objectives: [
        "cernuus ascit viridis",
        "animi demitto annus",
        "auctor venustas suffragium",
      ],
      timeline: "7 weeks",
      resources: [
        {
          title: "pecus tepidus ater",
          description: "Volva spero comparo celer textus.",
          link: "https://wilted-department.net/",
        },
        {
          title: "urbanus utor suffoco",
          description:
            "Curto taceo altus arbitro totus tepesco assumenda bos creo cruciamentum.",
          link: "https://determined-story.org",
        },
      ],
      createdBy: {
        $oid: "68c58dea8572145288f7c975",
      },
      organization: {
        $oid: "68c58dea8572145288f7c978",
      },
      status: "published",
      __v: 0,
      createdAt: {
        $date: "2025-09-13T15:29:46.866Z",
      },
      updatedAt: {
        $date: "2025-09-13T15:29:46.866Z",
      },
    },
    {
      _id: {
        $oid: "68c58dea8572145288f7caa1",
      },
      title: "Tamquam amiculum porro.",
      description:
        "Cum validus copiose sufficio suspendo aequitas talio umbra. Veritatis nemo dicta verto commodi doloribus acsi subito.",
      subject: "language",
      gradeLevel: "college",
      units: [
        {
          id: "ad3ff7bc-f05f-437f-a7b0-3298e49de714",
          title: "Unit 1: vociferor convoco",
          activities: [
            {
              $oid: "68c58dea8572145288f7c9d1",
            },
          ],
        },
        {
          id: "ed0b3beb-6b81-4ec8-a12f-4929893afbf2",
          title: "Unit 2: curia despecto",
          activities: [
            {
              $oid: "68c58dea8572145288f7c9a9",
            },
            {
              $oid: "68c58dea8572145288f7c98d",
            },
            {
              $oid: "68c58dea8572145288f7c9d5",
            },
          ],
        },
        {
          id: "8b23c3de-ea83-4bbd-8395-e42b1cd7a74a",
          title: "Unit 3: umerus aperte",
          activities: [
            {
              $oid: "68c58dea8572145288f7c989",
            },
            {
              $oid: "68c58dea8572145288f7c992",
            },
            {
              $oid: "68c58dea8572145288f7c9bc",
            },
          ],
        },
      ],
      objectives: [
        "cuppedia optio angustus",
        "una adinventitias tardus",
        "voco tergeo cinis",
      ],
      timeline: "6 weeks",
      resources: [
        {
          title: "cattus strues laudantium",
          description: "Sophismata cohaero vulnus illo dens agnitio vulariter.",
          link: "https://bruised-brace.org/",
        },
        {
          title: "patrocinor vorax velum",
          description: "Comminor considero quas repudiandae supra solvo aiunt.",
          link: "https://livid-comestible.net/",
        },
      ],
      createdBy: {
        $oid: "68c58dea8572145288f7c975",
      },
      organization: {
        $oid: "68c58dea8572145288f7c979",
      },
      status: "draft",
      __v: 0,
      createdAt: {
        $date: "2025-09-13T15:29:46.866Z",
      },
      updatedAt: {
        $date: "2025-09-13T15:29:46.866Z",
      },
    },
  ];
  const router = useRouter();
  return (
    <div>
      <h1>Syllabus List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Grade Level</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {syllabusList.map((syllabus, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{syllabus.title}</TableCell>
              <TableCell className="capitalize">{syllabus.subject}</TableCell>
              <TableCell>{syllabus.gradeLevel}</TableCell>
              <TableCell>{syllabus.units.length} units</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => router.push(`/admin/syllabus/${syllabus._id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
