// syllabus details
"use client";

import {
  ArrowRight,
  Award,
  BarChart,
  BookOpen,
  CheckCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "@radix-ui/react-progress";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { useRouter } from "next/navigation";
export function SyllabusDetails({ syllabusId }: { syllabusId: string }) {
  const { generateBoardForUnit, boardLoading } = useOrganizationData();
  const router = useRouter();
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
  const syllabus = syllabusList.find((syllabus) => {
    const id =
      typeof syllabus._id === "string" ? syllabus._id : syllabus._id.$oid;
    return id === syllabusId;
  });

  const handleGenerateBoard = (unitId: string) => {
    generateBoardForUnit(unitId).then((res: any) => {
      if (!res && !res._id) return;

      router.push(`/admin/boards/${res._id}`);
    });
  };
  if (boardLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Generating Course for Unit...
          </h2>
        </div>
      </div>
    );
  }
  if (!syllabus) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Syllabus Not Found
          </h2>
          <p className="text-gray-600">
            The requested syllabus could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{syllabus.title}</h1>
          <p className="text-gray-600">{syllabus.description}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <BookOpen className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Syllabus View</h3>
            <p className="text-sm text-gray-600">
              This view displays your course syllabus and units in a structured
              curriculum format. Use it to explore the syllabus and its units.
              You can also press 'Start' to generate the course for each unit in
              the syllabus.
            </p>
          </div>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Course Units</h2>
            {/* <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span>Not Started</span>
              </div>
            </div> */}
          </div>

          <div className="space-y-2">
            {syllabus.units.map((unit, index) => {
              return (
                <>
                  <div className="bg-white border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold
                                    ${"bg-gray-300"}`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm group-hover:text-blue-600 transition-colors">
                            {unit.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-gray-400" />
                            <span>{unit.activities.length} Activities</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span>{unit.activities.length * 15} min</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`px-2 h-7 text-xs
                                    ${"text-gray-600 hover:text-gray-700 hover:bg-gray-50"}`}
                          onClick={() => handleGenerateBoard(unit.id)}
                        >
                          Start
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Progress</p>
                    <h3 className="text-2xl font-bold">45%</h3>
                  </div>
                </div>
                <Progress value={45} className="h-2 mt-4" />
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mastery Points</p>
                    <h3 className="text-2xl font-bold">3,375</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Out of 7,500 possible points
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time Required</p>
                    <h3 className="text-2xl font-bold">4h 15m</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Last session: Yesterday
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
