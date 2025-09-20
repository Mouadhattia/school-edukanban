"use client";

import type React from "react";
import Image from "next/image";
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Award,
  Download,
  Video,
  SlidersHorizontal,
  Star,
  Zap,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { Card as CardType } from "@/lib/types";
import { useState } from "react";
import { KanbanBoard } from "@/components/admin/kanban-board-view";

export default function KanbanBoardPage({
  params,
}: {
  params: { id: string };
}) {
  const { board } = useOrganizationData();
  const activities = [
    {
      title:
        "Version 1: cognomen reprehenderit caste alii quis universe comburo perspiciatis",
      _id: {
        $oid: "68c58dea8572145288f7c97e",
      },
      id: {
        $oid: "68c58dea8572145288f7c97d",
      },
      version: 1,
      basicInfo: {
        title:
          "Version 1: cognomen reprehenderit caste alii quis universe comburo perspiciatis",
        description:
          "Trucido calco deprimo vociferor quasi acidus. Supellex acerbitas iste omnis suffragium nesciunt virgo. Rerum auctor depopulo officiis custodia terminatio praesentium tamen.",
        subject: "pe",
        gradeLevel: "prek",
        type: "interactive",
        duration: "20 mins",
        difficulty: "intermediate",
        standardsType: "common-core",
        learningObjectives:
          "Admiratio civitas suppellex assumenda cruentus dolorum cohaero.\nTurba cuius usus crebro amor defleo adsidue cogo.\nAiunt apostolus socius agnitio antiquus supra currus dedico decerno.\nAduro ciminatio amoveo vetus magni copiose.\nSuus cenaculum vigilo viridis crastinus quasi absens sed.",
        standardAlignments: [],
        activitySettings: {
          randomizeQuestions: false,
          immediateFeedback: false,
          showHints: false,
        },
      },
      content: {
        blocks: [
          {
            id: "fbe79280-d744-4523-97bb-f6bc4da0d9c7",
            type: "text",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: {
                    level: 2,
                  },
                  content: [
                    {
                      type: "text",
                      text: "Venio sollicito considero somnus audio illum tyrannus aliquam denuo.",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Chirographum sol capio vilicus charisma accusamus stips vilitas solutio circumvenio. Virgo charisma spiculum victus collum. Sopor ambitus concedo aegrus curiositas.\n\nConitor tubineus compono accusantium sumo. Praesentium trado arguo theologus deporto vetus demergo delicate approbo. Cibus chirographum benevolentia ager pecto conor vacuus venia libero.",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Arbitro statua adaugeo audacia vado vilitas casso vulgaris clibanus dapifer. Demum thorax conscendo. Architecto abbas charisma contra attero error artificiose ceno amoveo error.",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Crepusculum eligendi debeo vigor caecus tot amitto expedita. Custodia crebro angelus voluptas stabilis tepidus repellat conturbo enim reiciendis. Ascisco tamdiu accommodo.",
                    },
                  ],
                },
              ],
            },
            chosen: false,
            selected: false,
          },
          {
            id: "f7ba4d00-f339-4be6-96e6-90de7fb06330",
            type: "text",
            chosen: false,
            selected: false,
            content: {
              type: "doc",
              content: [
                {
                  type: "youtube",
                  attrs: {
                    src: "https://www.youtube.com/watch?v=PNx9f4CCxDg",
                    width: 640,
                    height: 360,
                    start: 0,
                    end: null,
                    suggestedQuality: "hd720",
                  },
                },
              ],
            },
          },
          {
            id: "4fb799f4-5f65-4306-8521-c74d4e6a03ab",
            type: "multiple_choice",
            content: "<p>Valetudo crux teneo thorax dolorem.</p>",
            question: "Aggredior totus torqueo ulterius ea abscido.",
            options: [
              {
                text: "cursus suggero cui thermae attonbitus",
                isCorrect: false,
              },
              {
                text: "totus cinis error",
                isCorrect: true,
              },
              {
                text: "suggero tergiversatio",
                isCorrect: false,
              },
              {
                text: "teres praesentium baiulus",
                isCorrect: false,
              },
            ],
            explanation:
              "Tonsor super aestas thymum ceno considero bos avarus velociter. Copiose acerbitas fuga omnis tenuis urbs absque soleo crur caste.",
            chosen: false,
            selected: false,
          },
          {
            id: "b18a7b91-3b6b-4ac2-8d27-8aecfe26dd08",
            type: "multiple_choice",
            content:
              "<p>Contra dolorum adsum theca vespillo vicissitudo appello canis.</p>",
            question:
              "Vicinus quidem circumvenio soleo amet acquiro atqui sufficio hic magni.",
            options: [
              {
                text: "aufero tenus creptio",
                isCorrect: false,
              },
              {
                text: "desipio blandior",
                isCorrect: false,
              },
              {
                text: "turpis vita verbera optio spiritus",
                isCorrect: false,
              },
              {
                text: "placeat caecus derideo",
                isCorrect: true,
              },
            ],
            explanation:
              "Depopulo calamitas vulgaris calco. Timor approbo una tres suppellex angustus vae desparatus commodi cursus.",
            chosen: false,
            selected: false,
          },
          {
            id: "21a529be-df87-4e75-a06d-9487893b22a7",
            type: "matching_pair",
            content:
              "<p>Vomica tergeo voluptatem cumque cohaero cras summa tabgo.</p>",
            pairs: [
              {
                left: "debeo",
                right: "aufero",
              },
              {
                left: "quo",
                right: "sponte",
              },
              {
                left: "acer",
                right: "artificiose",
              },
              {
                left: "tibi",
                right: "vulgus",
              },
            ],
            chosen: false,
            selected: false,
          },
          {
            id: "46c70f1a-008d-4ec2-b4f6-492c3d6dafe1",
            type: "matching_pair",
            content: "<p>Anser arx demergo.</p>",
            pairs: [
              {
                left: "volup",
                right: "suasoria",
              },
              {
                left: "somniculosus",
                right: "peccatus",
              },
              {
                left: "tertius",
                right: "volo",
              },
              {
                left: "audax",
                right: "architecto",
              },
            ],
            chosen: false,
            selected: false,
          },
          {
            id: "4ca7c64b-a0a6-4eb8-a45d-34c9def9ad02",
            type: "fill_in_blank",
            content: "<p>Fill in: [___] [___]</p>",
            text: "Fill in: [___] [___]",
            blanks: [
              {
                answer: "studio",
              },
              {
                answer: "creator",
              },
            ],
            chosen: false,
            selected: false,
          },
        ],
        additionalContent: {
          instructions:
            "Deorsum anser chirographum. Vereor ara civis decor suggero eius talus quam caelum.",
          materials: "Pen, Notebook",
          assessment: "Velit ut textus decet.",
          extensions: "Uter supra ipsa.",
          resources: "https://prudent-individual.org",
        },
      },
      teacherSection: {
        instructions: "Comis cultura caritas. Quos verus hic delego.",
        guides:
          "Voluptatibus assumenda vergo defero iure umbra debilito ultio.",
        answerKeys: "Answers are inside the interactive blocks.",
        notes:
          "Curia thesaurus verbum ambitus causa repellendus quis sumptus consuasor.",
      },
      studentSection: {
        instructions:
          "Stipes adficio uxor desolo at peior dignissimos animi spero.",
        content:
          "Annus admiratio cotidie laudantium vester possimus pariatur. Crepusculum vivo totidem campana catena sursum. Vomica ager clam verus contra cerno.\nVesco depono comitatus bos tertius thesis. Bellum ubi dignissimos carpo blanditiis caveo distinctio tergum. Nemo aperiam supplanto excepturi ciminatio asperiores corpus tantum audio vitiosus.",
        worksheets: "https://crazy-dredger.name/",
        resources: "https://big-secrecy.com",
      },
      createdBy: {
        $oid: "68c58dea8572145288f7c974",
      },
      organization: {
        $oid: "68c58dea8572145288f7c979",
      },
      status: "finished",
      createdAt: {
        $date: "2025-01-13T22:18:08.093Z",
      },
      updatedAt: {
        $date: "2025-09-13T15:29:46.784Z",
      },
      __v: 0,
      promptId: {
        $oid: "68c58dea8572145288f7c9f7",
      },
    },
    {
      title: "Version 2: amo doloribus culpa",
      _id: {
        $oid: "68c58dea8572145288f7c97f",
      },
      id: {
        $oid: "68c58dea8572145288f7c97d",
      },
      version: 2,
      basicInfo: {
        title: "Version 2: amo doloribus culpa",
        description:
          "Spargo spiritus et fugit a tamquam contra cultellus allatus demens. Comptus apostolus collum alo vado caute sponte cruciamentum. Crudelis cenaculum tergiversatio dolorum curiositas.",
        subject: "art",
        gradeLevel: "6-8",
        type: "assessment",
        duration: "30 mins",
        difficulty: "advanced",
        standardsType: "state",
        learningObjectives:
          "Totus dolor contego mollitia audio suscipit suffoco error aureus versus.\nCalco venustas traho porro conspergo.",
        standardAlignments: [],
        activitySettings: {
          randomizeQuestions: true,
          immediateFeedback: true,
          showHints: true,
        },
      },
      content: {
        blocks: [
          {
            id: "646b21ef-ef0d-4d08-a443-eaa511f1647e",
            type: "text",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: {
                    level: 2,
                  },
                  content: [
                    {
                      type: "text",
                      text: "Thalassinus artificiose viscus caelestis tamquam.",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Fugit conatus sum urbs audacia vigilo. Terga bos chirographum recusandae. Turba facere pel est cibus similique arx defero.",
                    },
                  ],
                },
              ],
            },
            chosen: false,
            selected: false,
          },
          {
            id: "63f485c2-53ad-48f2-9cbe-475c6f8ee460",
            type: "text",
            chosen: false,
            selected: false,
            content: {
              type: "doc",
              content: [
                {
                  type: "youtube",
                  attrs: {
                    src: "https://www.youtube.com/watch?v=ZAqIoDhornk",
                    width: 640,
                    height: 360,
                    start: 0,
                    end: null,
                    suggestedQuality: "hd720",
                  },
                },
              ],
            },
          },
          {
            id: "6fb9717e-d1d1-4e6e-ae7f-c3a40f2fdcd1",
            type: "multiple_choice",
            content: "<p>Comprehendo vicinus nemo cena.</p>",
            question:
              "Tenuis thorax sordeo commodo una contra necessitatibus cunabula.",
            options: [
              {
                text: "studio capitulus verus abscido",
                isCorrect: false,
              },
              {
                text: "aggredior alveus tui",
                isCorrect: false,
              },
              {
                text: "degenero ventosus placeat arbustum",
                isCorrect: false,
              },
              {
                text: "argentum peior vinculum esse",
                isCorrect: true,
              },
            ],
            explanation:
              "Arcus subnecto caute damnatio. Voluntarius nobis vorago sub.",
            chosen: false,
            selected: false,
          },
          {
            id: "6aadbb22-1d3a-4afd-a67f-017d44b0b80c",
            type: "multiple_choice",
            content:
              "<p>Ex victoria delectus barba cultellus dolor deinde stella vinculum et.</p>",
            question:
              "Ascit avaritia adopto defungo mollitia nam thema vulnero.",
            options: [
              {
                text: "verecundia voluptates validus",
                isCorrect: false,
              },
              {
                text: "deorsum absconditus vulgivagus",
                isCorrect: false,
              },
              {
                text: "uter defetiscor conqueror",
                isCorrect: false,
              },
              {
                text: "claustrum amicitia provident",
                isCorrect: true,
              },
            ],
            explanation:
              "Vulnus suspendo incidunt pauci deficio civitas debilito succedo pel. Aegre quaerat cumque.",
            chosen: false,
            selected: false,
          },
          {
            id: "eca82717-b3d4-4d7b-bd49-797cc5255d89",
            type: "matching_pair",
            content:
              "<p>Adfero earum coadunatio aegre asperiores patior calculus peccatus.</p>",
            pairs: [
              {
                left: "molestias",
                right: "traho",
              },
              {
                left: "celo",
                right: "culpa",
              },
              {
                left: "decipio",
                right: "torrens",
              },
            ],
            chosen: false,
            selected: false,
          },
          {
            id: "4e5a23fe-2776-4433-bea4-d99df846fc9f",
            type: "matching_pair",
            content: "<p>Ab copia aggredior.</p>",
            pairs: [
              {
                left: "stipes",
                right: "bis",
              },
              {
                left: "denego",
                right: "pel",
              },
              {
                left: "praesentium",
                right: "paens",
              },
            ],
            chosen: false,
            selected: false,
          },
          {
            id: "59f0c9f9-ef49-4dbf-a82d-2ef1e71aca8b",
            type: "fill_in_blank",
            content: "<p>Fill in: [___]</p>",
            text: "Fill in: [___]",
            blanks: [
              {
                answer: "dolore",
              },
            ],
            chosen: false,
            selected: false,
          },
          {
            id: "6c1ae60b-a89f-4520-ab62-ed404b8b2edb",
            type: "fill_in_blank",
            content: "<p>Fill in: [___] [___]</p>",
            text: "Fill in: [___] [___]",
            blanks: [
              {
                answer: "spiculum",
              },
              {
                answer: "aspernatur",
              },
            ],
            chosen: false,
            selected: false,
          },
        ],
        additionalContent: {
          instructions:
            "Ultio sophismata vesper. Vigor incidunt coniecto nobis cinis compono venia.",
          materials: "Pen, Notebook",
          assessment: "Apud vilis corrumpo.",
          extensions:
            "Arca repellendus arguo suppono argumentum cohaero suus delibero amaritudo abutor.",
          resources: "https://hard-to-find-swanling.name",
        },
      },
      teacherSection: {
        instructions:
          "Tyrannus addo correptius spiculum coma delego accommodo vulgaris. Asperiores spargo et brevis subnecto adeo fugit tutis labore.",
        guides: "Repellat derideo defendo depono cubo audio.",
        answerKeys: "Answers are inside the interactive blocks.",
        notes: "Amaritudo paulatim carcer tollo.",
      },
      studentSection: {
        instructions:
          "Modi clibanus praesentium ocer tristis adulescens utor vinculum benevolentia adiuvo.",
        content:
          "Voro totidem facere angelus adinventitias asporto thalassinus combibo. Caute altus defleo thesaurus. Spero odio correptius.\nIpsa crustulum suffragium villa traho sunt minima crur tabernus textor. Sol vero eius certus. Alioqui valens tui culpo correptius suadeo.",
        worksheets: "https://flimsy-alligator.biz/",
        resources: "https://all-mozzarella.info",
      },
      createdBy: {
        $oid: "68c58dea8572145288f7c974",
      },
      organization: {
        $oid: "68c58dea8572145288f7c979",
      },
      status: "draft",
      createdAt: {
        $date: "2024-11-25T22:34:24.468Z",
      },
      updatedAt: {
        $date: "2025-09-13T15:29:46.788Z",
      },
      __v: 0,
      promptId: {
        $oid: "68c58dea8572145288f7c9f9",
      },
    },
    {
      title: "Version 1: temptatio utroque corrupti",
      _id: {
        $oid: "68c58dea8572145288f7c981",
      },
      id: {
        $oid: "68c58dea8572145288f7c980",
      },
      version: 1,
      basicInfo: {
        title: "Version 1: temptatio utroque corrupti",
        description:
          "Apparatus adiuvo alioqui charisma voro conor. Dolore vicinus talio vesica arcus virga. Baiulus architecto aggredior.",
        subject: "math",
        gradeLevel: "prek",
        type: "interactive",
        duration: "30 mins",
        difficulty: "intermediate",
        standardsType: "ngss",
        learningObjectives:
          "Saepe ater admitto vix ustilo aer arbitro tutamen creator.\nVigor defessus adhuc defessus stipes depulso tres canonicus cohors dignissimos.\nTabella victoria xiphias animus.\nAmo totam pax quasi timidus.\nCaritas aestas casus.",
        standardAlignments: [],
        activitySettings: {
          randomizeQuestions: true,
          immediateFeedback: false,
          showHints: false,
        },
      },
      content: {
        blocks: [
          {
            id: "b99d4781-f56b-412f-86a3-1e3207d2aac2",
            type: "text",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: {
                    level: 2,
                  },
                  content: [
                    {
                      type: "text",
                      text: "Compello benevolentia coepi laboriosam patior debilito eaque curtus varius capillus.",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Voco carus aegrus. Denuncio cattus annus sollers comitatus ad creber conventus decumbo asporto. Odio voluptatibus aedificium cimentarius suffragium tamen stipes.",
                    },
                  ],
                },
              ],
            },
            chosen: false,
            selected: false,
          },
          {
            id: "f9869b72-0e1a-4d39-81dd-dadc1179fc76",
            type: "text",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: {
                    level: 2,
                  },
                  content: [
                    {
                      type: "text",
                      text: "Crur consectetur supra ter vitiosus.",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Tamquam demum absconditus nesciunt caelum auxilium aggero ipsa ad delego. Necessitatibus excepturi corrumpo bestia ulciscor abscido cruciamentum agnitio approbo. Stabilis caste talio trans.\n\nDistinctio desino adversus. Quaerat vado unus statua audeo cras. Supplanto virgo cruciamentum.",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ventus clementia desparatus. Eligendi cum crebro fugiat amoveo vallum tempore laborum defendo thymum. Id vorago decimus curso venia vulgivagus sophismata.\n\nTabula totam velociter decimus umbra similique turpis adhaero. Sub tutamen ipsam templum umquam cubicularis quas succedo. Vapulus capillus vix crudelis cunctatio esse appello.",
                    },
                  ],
                },
              ],
            },
            chosen: false,
            selected: false,
          },
          {
            id: "0c0fc439-b654-472f-9e2b-03c30ebae0cf",
            type: "text",
            chosen: false,
            selected: false,
            content: {
              type: "doc",
              content: [
                {
                  type: "youtube",
                  attrs: {
                    src: "https://www.youtube.com/watch?v=PZ7lDrwYdZc",
                    width: 640,
                    height: 360,
                    start: 0,
                    end: null,
                    suggestedQuality: "hd720",
                  },
                },
              ],
            },
          },
          {
            id: "b2ebd49e-7923-4484-b9c5-835b9861fc60",
            type: "multiple_choice",
            content:
              "<p>Aranea villa fuga aufero cilicium attonbitus aestus.</p>",
            question:
              "Benigne vesper thesaurus careo bardus quibusdam correptius.",
            options: [
              {
                text: "perferendis totam non aut assumenda",
                isCorrect: false,
              },
              {
                text: "crebro absens",
                isCorrect: false,
              },
              {
                text: "baiulus appello ultio patria",
                isCorrect: false,
              },
              {
                text: "talis voluntarius",
                isCorrect: true,
              },
            ],
            explanation:
              "Colligo auxilium capitulus delicate patior assentator aperiam. Vis accusantium in ad cura.",
            chosen: false,
            selected: false,
          },
          {
            id: "d454a680-6911-4a46-85b8-e2593f69806d",
            type: "multiple_choice",
            content:
              "<p>Tricesimus corpus aegrus maiores laborum comes thema pecto admiratio ante.</p>",
            question: "Tamquam culpo nisi optio.",
            options: [
              {
                text: "vesco delinquo patrocinor terreo calcar",
                isCorrect: false,
              },
              {
                text: "toties aperte advenio",
                isCorrect: false,
              },
              {
                text: "veritatis circumvenio vulpes una",
                isCorrect: true,
              },
              {
                text: "absorbeo caste theologus",
                isCorrect: false,
              },
            ],
            explanation:
              "Varietas conitor reprehenderit clam. Facere tollo comedo deorsum usitas tibi cervus spiculum deputo ubi.",
            chosen: false,
            selected: false,
          },
          {
            id: "015b572d-9820-49dc-a1c6-8018dcf61111",
            type: "matching_pair",
            content:
              "<p>Vestrum solus dolore spiculum corrumpo vulpes depereo.</p>",
            pairs: [
              {
                left: "sufficio",
                right: "cogo",
              },
              {
                left: "terreo",
                right: "validus",
              },
              {
                left: "desparatus",
                right: "laudantium",
              },
            ],
            chosen: false,
            selected: false,
          },
          {
            id: "5fede3bf-dbb9-4d1f-b223-5570a747d2fa",
            type: "fill_in_blank",
            content: "<p>Fill in: [___]</p>",
            text: "Fill in: [___]",
            blanks: [
              {
                answer: "doloremque",
              },
            ],
            chosen: false,
            selected: false,
          },
          {
            id: "56c4a59f-6f06-4ab4-994d-2f018a905d43",
            type: "fill_in_blank",
            content: "<p>Fill in: [___] [___] [___]</p>",
            text: "Fill in: [___] [___] [___]",
            blanks: [
              {
                answer: "ipsam",
              },
              {
                answer: "audio",
              },
              {
                answer: "placeat",
              },
            ],
            chosen: false,
            selected: false,
          },
        ],
        additionalContent: {
          instructions:
            "Atqui catena vorax cibo sollers taedium vesica. Arbor quos statim aestivus venio sumo adflicto.",
          materials: "None",
          assessment:
            "Comitatus studio voveo vere thorax cimentarius deludo tenetur nam coniecto.",
          extensions:
            "Depono vulticulus vilitas averto delectus decimus arcesso depromo.",
          resources: "https://warm-tail.net",
        },
      },
      teacherSection: {
        instructions:
          "Sordeo velit decretum aestas versus demulceo. Decumbo tollo clementia demitto tantum abduco distinctio mollitia dolorem velociter.",
        guides: "Cado cauda deficio admoneo talis.",
        answerKeys: "Answers are inside the interactive blocks.",
        notes: "Aegrotatio labore contego coniuratio thesaurus speciosus.",
      },
      studentSection: {
        instructions: "Adiuvo vestrum cornu sopor.",
        content:
          "Audax amitto addo uredo nostrum verus corroboro utique quo verecundia. Debeo voro sordeo somniculosus acervus votum quod corpus commodi adnuo. Adnuo celebrer tenax uterque.\nVictus adfectus aedificium vado utrimque. Pecto tubineus cohaero qui deorsum labore deduco. Volva conculco subito.",
        worksheets: "https://boring-conversation.org",
        resources: "https://optimistic-anticodon.com/",
      },
      createdBy: {
        $oid: "68c58dea8572145288f7c974",
      },
      organization: {
        $oid: "68c58dea8572145288f7c978",
      },
      status: "finished",
      createdAt: {
        $date: "2025-07-02T06:41:11.174Z",
      },
      updatedAt: {
        $date: "2025-09-13T15:29:46.791Z",
      },
      __v: 0,
      promptId: {
        $oid: "68c58dea8572145288f7c9fc",
      },
    },
  ];
  const [filters, setFilters] = useState({
    search: "",
    types: [],
    statuses: [],
    difficulties: [],
    duration: "",
    points: "",
  });

  const filteredActivities = activities.filter((activity) => {
    // Search filter
    if (
      filters.search &&
      !activity.basicInfo.title
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      !activity.basicInfo.description
        .toLowerCase()
        .includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Duration filter
    if (filters.duration) {
      const durationMinutes = Number.parseInt(activity.basicInfo.duration);
      if (filters.duration === "short" && durationMinutes > 15) return false;
      if (
        filters.duration === "medium" &&
        (durationMinutes <= 15 || durationMinutes > 25)
      )
        return false;
      if (filters.duration === "long" && durationMinutes <= 25) return false;
    }

    return true;
  });
  const resetFilters = () => {
    setFilters({
      search: "",
      types: [],
      statuses: [],
      difficulties: [],
      duration: "",
      points: "",
    });
  };
  function getActivityTypeIcon(type: string) {
    switch (type) {
      case "quiz":
        return <Zap className="h-4 w-4" />;
      case "test":
      case "assessment":
        return <Star className="h-4 w-4" />;
      case "practice":
      case "interactive":
        return <CheckCircle className="h-4 w-4" />;
      case "lesson":
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  }

  // Helper function to get activity type badge color
  function getActivityTypeBadgeColor(type: string) {
    switch (type) {
      case "quiz":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "test":
      case "assessment":
        return "bg-red-100 text-red-800 border-red-200";
      case "practice":
      case "interactive":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "lesson":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  // Helper function to get subject badge color
  function getSubjectBadgeColor(subject: string) {
    switch (subject) {
      case "math":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "science":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "english":
      case "language":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "history":
      case "social":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "art":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "pe":
      case "physical":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  }

  // Helper function to get grade level badge color
  function getGradeLevelBadgeColor(gradeLevel: string) {
    switch (gradeLevel) {
      case "prek":
      case "k":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "1":
      case "2":
      case "3":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "3-5":
      case "4":
      case "5":
        return "bg-lime-100 text-lime-800 border-lime-200";
      case "6-8":
      case "6":
      case "7":
      case "8":
        return "bg-violet-100 text-violet-800 border-violet-200";
      case "9-12":
      case "high school":
        return "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200";
      case "college":
      case "university":
        return "bg-sky-100 text-sky-800 border-sky-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  }

  // Helper function to get difficulty badge color
  function getDifficultyBadgeColor(difficulty: string) {
    switch (difficulty) {
      case "beginner":
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }
  const [currentActivity, setCurrentActivity] = useState<any | null>(
    activities[0] || null
  );
  function getStatusText(status: any) {
    switch (status) {
      case "mastered":
        return "Mastered";
      case "proficient":
        return "Proficient";
      case "familiar":
        return "Familiar";
      case "attempted":
        return "Attempted";
      case "draft":
        return "Draft";
      default:
        return "Active";
    }
  }

  // Helper function to get status color
  function getStatusColor(status: any) {
    switch (status) {
      case "mastered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "proficient":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "familiar":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "attempted":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "draft":
        return "bg-slate-100 text-slate-800 border-slate-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1">
        {/* Main Content */}
        <main className="w-full p-4 md:p-8">
          <Tabs defaultValue="content" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {board?.title}
                </h1>
                <p className="text-gray-600">{board?.description}</p>
              </div>
              <TabsList>
                <TabsTrigger value="content">Activities</TabsTrigger>
                <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
              </TabsList>
            </div>

            {/* Content View */}
            <TabsContent value="content" className="mt-0">
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Activities View
                    </h3>
                    <p className="text-sm text-gray-600">
                      This view shows all board activities in a structured list
                      format. Select an activity to view its details and start
                      working on it.
                    </p>
                  </div>
                </div>
              </div>

              {filteredActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-gray-200">
                  <SlidersHorizontal className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No activities match your filters
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    Try adjusting your filters or search criteria to find
                    activities.
                  </p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Activities */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Activities List */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>
                          Activities ({filteredActivities.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {filteredActivities.map((activity, index) => (
                            <div
                              key={activity._id.$oid}
                              className={`flex items-center gap-4 p-4 rounded-lg border ${
                                currentActivity &&
                                currentActivity._id.$oid === activity._id.$oid
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:bg-gray-50"
                              } transition-colors cursor-pointer`}
                              onClick={() => setCurrentActivity(activity)}
                            >
                              <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                {/* <Image
                                  src={
                                    activity.basicInfo.image ||
                                    "/placeholder.svg"
                                  }
                                  alt={activity.title}
                                  fill
                                  className="object-cover"
                                /> */}
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                  {getActivityTypeIcon(activity.basicInfo.type)}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-medium truncate">
                                    {activity.basicInfo.title}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-1.5 flex-wrap mt-1">
                                  <Badge
                                    variant="outline"
                                    className={`${getSubjectBadgeColor(
                                      activity.basicInfo.subject
                                    )} text-xs`}
                                  >
                                    {activity.basicInfo.subject}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`${getGradeLevelBadgeColor(
                                      activity.basicInfo.gradeLevel
                                    )} text-xs`}
                                  >
                                    Grade {activity.basicInfo.gradeLevel}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`${getActivityTypeBadgeColor(
                                      activity.basicInfo.type
                                    )} text-xs`}
                                  >
                                    {activity.basicInfo.type}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`${getStatusColor(
                                      activity.status
                                    )} text-xs`}
                                  >
                                    {getStatusText(activity.status)}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`${getDifficultyBadgeColor(
                                      activity.basicInfo.difficulty
                                    )} text-xs`}
                                  >
                                    {activity.basicInfo.difficulty
                                      .charAt(0)
                                      .toUpperCase() +
                                      activity.basicInfo.difficulty.slice(1)}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 truncate mt-1">
                                  {activity.basicInfo.description}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {activity.basicInfo.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Award className="h-3 w-3" />
                                    {activity.content?.blocks?.length || 0}{" "}
                                    blocks
                                  </span>
                                </div>
                              </div>

                              <Button>View</Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Column - Current Activity and Resources */}
                  <div className="space-y-6">
                    {/* Current Activity */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Selected Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {currentActivity ? (
                          <>
                            <div className="relative h-40 w-full rounded-md overflow-hidden mb-4">
                              <Image
                                src={"/placeholder.svg"}
                                alt={currentActivity.basicInfo.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/50 flex items-end">
                                <div className="p-4">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="text-white">
                                      {getActivityTypeIcon(
                                        currentActivity.basicInfo.type
                                      )}
                                    </div>
                                    <span className="text-xs uppercase font-medium text-gray-200">
                                      {currentActivity.basicInfo.type}
                                    </span>
                                  </div>
                                  <h3 className="font-bold text-lg text-white drop-shadow-lg">
                                    {currentActivity.basicInfo.title}
                                  </h3>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">
                                  Description
                                </h4>
                                <p className="text-sm">
                                  {currentActivity.basicInfo.description}
                                </p>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                                    Duration
                                  </h4>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>
                                      {currentActivity.basicInfo.duration}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                                    Blocks
                                  </h4>
                                  <div className="flex items-center gap-1">
                                    <Award className="h-4 w-4 text-gray-400" />
                                    <span>
                                      {currentActivity.content?.blocks
                                        ?.length || 0}{" "}
                                      blocks
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                                    Status
                                  </h4>
                                  <Badge
                                    variant="outline"
                                    className={`${getStatusColor(
                                      currentActivity.status
                                    )}`}
                                  >
                                    {getStatusText(currentActivity.status)}
                                  </Badge>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">
                                  Difficulty
                                </h4>
                                <Badge
                                  variant="outline"
                                  className={`${getDifficultyBadgeColor(
                                    currentActivity.basicInfo.difficulty
                                  )}`}
                                >
                                  {currentActivity.basicInfo.difficulty
                                    .charAt(0)
                                    .toUpperCase() +
                                    currentActivity.basicInfo.difficulty.slice(
                                      1
                                    )}
                                </Badge>
                              </div>

                              <Separator />

                              <div className="pt-2">
                                <Button className="w-full">
                                  {currentActivity.status === "mastered" ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 mr-2" />{" "}
                                      Review Activity
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-4 w-4 mr-2" /> View
                                      Activity
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">
                              Select an activity to view details
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Activity Resources */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Activity Resources</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {currentActivity ? (
                          <div className="space-y-3">
                            {currentActivity.teacherSection && (
                              <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                <div className="flex-1">
                                  <h4 className="font-medium">
                                    Teacher Instructions
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Guidance for educators
                                  </p>
                                </div>
                              </div>
                            )}

                            {currentActivity.studentSection?.worksheets && (
                              <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                <Download className="h-5 w-5 text-blue-600" />
                                <div className="flex-1">
                                  <h4 className="font-medium">
                                    Student Worksheets
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Downloadable practice materials
                                  </p>
                                </div>
                              </div>
                            )}

                            {currentActivity.content?.additionalContent
                              ?.resources && (
                              <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                <Video className="h-5 w-5 text-blue-600" />
                                <div className="flex-1">
                                  <h4 className="font-medium">
                                    Additional Resources
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Supplementary learning materials
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-500 text-sm">
                              Select an activity to view resources
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="kanban" className="mt-0">
              <KanbanBoard boardId={params.id} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
