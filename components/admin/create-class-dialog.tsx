"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Info, Plus, Trash2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { FullClassRoomCreationData } from "@/lib/types";

interface CreateClassDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClass: (classData: any) => void;
}

// context

export function CreateClassDialog({
  isOpen,
  onClose,
  onCreateClass,
}: CreateClassDialogProps) {
  const {
    subjects,
    levels,
    rooms,
    createLevel,
    createRoom,
    createSubject,
    getAllSubjects,
    getAllLevels,
    getAllRooms,
    deleteLevel,
    deleteSubject,
    deleteRoom,
    user,
    getAllStudyPeriods,
    createStudyPeriod,
    deleteStudyPeriod,
    getUsers,
    usersData,
    studyPeriods,
  } = useOrganizationData();

  //useDebounce
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);

      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  };

  const [search, setSearch] = useState("");
  //useDebounce
  const debouncedSearch = useDebounce(search, 500);
  const [name, setName] = useState("");
  const [isLevelComboboxOpen, setIsLevelComboboxOpen] = useState(false);
  const [isSubjectComboboxOpen, setIsSubjectComboboxOpen] = useState(false);
  const [isRoomComboboxOpen, setIsRoomComboboxOpen] = useState(false);
  const [isPeriodComboboxOpen, setIsPeriodComboboxOpen] = useState(false);

  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<"active" | "scheduled">("active");
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState("");
  const [period, setPeriod] = useState("");
  // Weekly schedule state - each day can have its own time
  const [weeklySchedule, setWeeklySchedule] = useState<
    Record<string, { start: string; end: string }>
  >({});
  const [courseName, setCourseName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isTeacherComboboxOpen, setIsTeacherComboboxOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [isLevelDialogOpen, setIsLevelDialogOpen] = useState(false);
  const [newLevelName, setNewLevelName] = useState("");
  const [newLevelDescription, setNewLevelDescription] = useState("");
  const [isCreatingLevel, setIsCreatingLevel] = useState(false);
  const [levelToDelete, setLevelToDelete] = useState<string | null>(null);
  const [isDeletingLevel, setIsDeletingLevel] = useState(false);
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectDescription, setNewSubjectDescription] = useState("");
  const [isCreatingSubject, setIsCreatingSubject] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  const [isDeletingSubject, setIsDeletingSubject] = useState(false);
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomCapacity, setNewRoomCapacity] = useState("");
  const [newRoomLocation, setNewRoomLocation] = useState<"online" | "local">(
    "local"
  );
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);
  const [isDeletingRoom, setIsDeletingRoom] = useState(false);
  const [isPeriodDialogOpen, setIsPeriodDialogOpen] = useState(false);
  const [newPeriodName, setNewPeriodName] = useState("");

  const [newPeriodStartDate, setNewPeriodStartDate] = useState<
    Date | undefined
  >(undefined);
  const [newPeriodEndDate, setNewPeriodEndDate] = useState<Date | undefined>(
    undefined
  );
  const [isCreatingPeriod, setIsCreatingPeriod] = useState(false);
  const [periodToDelete, setPeriodToDelete] = useState<string | null>(null);
  const [isDeletingPeriod, setIsDeletingPeriod] = useState(false);

  useEffect(() => {
    if (user) {
      setToken(localStorage.getItem("token") || "");
    }
  }, [user]);

  useEffect(() => {
    if (user?.schoolIds && token && isOpen) {
      getAllSubjects(token, {
        page: 1,
        limit: 1000,
        search: debouncedSearch,
        schoolId: user?.schoolIds[0],
      });
      getAllLevels(token, {
        page: 1,
        limit: 1000,
        search: debouncedSearch,
        schoolId: user?.schoolIds[0],
      });
      getAllRooms(token, {
        search: debouncedSearch,
        schoolId: user?.schoolIds[0],
      });
      getAllStudyPeriods(token, {
        schoolId: user?.schoolIds[0],
        search: debouncedSearch,
      });
      getUsers(
        {
          page: 1,
          limit: 1000,
          search: debouncedSearch,
          role: "teacher",
        },
        token
      );
    }
  }, [user, token, isOpen, debouncedSearch]);

  const handleDayToggle = (day: string) => {
    if (weeklySchedule[day]) {
      // Remove the day from schedule
      const newSchedule = { ...weeklySchedule };
      delete newSchedule[day];
      setWeeklySchedule(newSchedule);
    } else {
      // Add the day with default times
      setWeeklySchedule({
        ...weeklySchedule,
        [day]: { start: "09:00", end: "10:00" },
      });
    }
  };

  const handleTimeChange = (
    day: string,
    timeType: "start" | "end",
    value: string
  ) => {
    setWeeklySchedule({
      ...weeklySchedule,
      [day]: {
        ...weeklySchedule[day],
        [timeType]: value,
      },
    });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Update the handleSubmit function to properly create a class
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.schoolIds?.[0]) return;
    // Validate required fields
    if (!name.trim()) {
      alert("Please enter a class name");
      return;
    }

    if (!courseName.trim()) {
      alert("Please enter a course name");
      return;
    }

    if (!selectedTeacher) {
      alert("Please select a teacher");
      return;
    }

    if (Object.keys(weeklySchedule).length === 0) {
      alert("Please select at least one day for the weekly schedule");
      return;
    }

    setIsSubmitting(true);

    // Find the IDs for the selected names
    const selectedSubject = subjects?.subjects?.find((s) => s.name === subject);
    const selectedLevel = levels?.levels?.find((l) => l.name === grade);
    const selectedRoom = rooms?.find((r) => r.name === room);
    const selectedPeriod = studyPeriods?.find((p) => p.name === period);

    // Prepare the class data according to FullClassRoomCreationData interface
    const classData: FullClassRoomCreationData = {
      name: name.trim(),
      description: description.trim() || "",
      courseName: courseName.trim(), // Note: fixing the typo from FullClassRoomCreationData.coureName
      subjectId: selectedSubject?._id || "",
      teacherId: selectedTeacher,
      weeklySchedule,
      levelId: selectedLevel?._id || "",
      roomId: selectedRoom?._id || "",
      studyPeriodId: selectedPeriod?._id || "",
      status,
      schoolId: user.schoolIds[0],
    };

    console.log("Submitting class data:", classData);
    onCreateClass(classData);
    resetForm();
    setIsSubmitting(false);
    onClose();
  };

  const resetForm = () => {
    setName("");
    setGrade("");
    setSubject("");
    setStartDate(undefined);
    setEndDate(undefined);
    setStatus("active");
    setDescription("");
    setRoom("");
    setPeriod("");
    setWeeklySchedule({});
    setCourseName("");
    setSelectedTeacher("");

    setCurrentStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCreateLevel: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (!user?.schoolIds?.[0] || !token || !newLevelName.trim()) return;

    try {
      setIsCreatingLevel(true);
      await createLevel(
        {
          name: newLevelName.trim(),
          description: newLevelDescription.trim() || undefined,
          schoolId: user.schoolIds[0],
        },
        token
      );
      // Preselect the newly created level by name
      setGrade(newLevelName.trim());
      setNewLevelName("");
      setNewLevelDescription("");
      setIsLevelDialogOpen(false);
    } finally {
      setIsCreatingLevel(false);
    }
  };

  const handleDeleteLevel = async (levelId: string) => {
    if (!token) return;
    try {
      setIsDeletingLevel(true);
      await deleteLevel(levelId, token);
      // If the deleted level was selected, clear the selection
      const deletedLevel = levels?.levels?.find((l) => l._id === levelId);
      if (deletedLevel && grade === deletedLevel.name) {
        setGrade("");
      }
    } finally {
      setIsDeletingLevel(false);
      setLevelToDelete(null);
    }
  };

  const handleCreateSubject: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (!user?.schoolIds?.[0] || !token || !newSubjectName.trim()) return;

    try {
      setIsCreatingSubject(true);
      await createSubject(
        {
          name: newSubjectName.trim(),
          description: newSubjectDescription.trim() || undefined,
          schoolId: user.schoolIds[0],
        },
        token
      );
      // Preselect the newly created subject by name
      setSubject(newSubjectName.trim());
      setNewSubjectName("");
      setNewSubjectDescription("");
      setIsSubjectDialogOpen(false);
    } finally {
      setIsCreatingSubject(false);
    }
  };

  const handleDeleteSubject = async (subjectId: string) => {
    if (!token) return;
    try {
      setIsDeletingSubject(true);
      await deleteSubject(subjectId, token);
      // If the deleted subject was selected, clear the selection
      const deletedSubject = subjects?.subjects?.find(
        (s) => s._id === subjectId
      );
      if (deletedSubject && subject === deletedSubject.name) {
        setSubject("");
      }
    } finally {
      setIsDeletingSubject(false);
      setSubjectToDelete(null);
    }
  };

  const handleCreateRoom: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (!user?.schoolIds?.[0] || !token || !newRoomName.trim()) return;

    try {
      setIsCreatingRoom(true);
      await createRoom(
        {
          name: newRoomName.trim(),
          capacity: parseInt(newRoomCapacity) || 0,
          location: newRoomLocation,
          schoolId: user.schoolIds[0],
        },
        token
      );
      // Preselect the newly created room by name
      setRoom(newRoomName.trim());
      setNewRoomName("");
      setNewRoomCapacity("");
      setNewRoomLocation("local");
      setIsRoomDialogOpen(false);
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!token) return;
    try {
      setIsDeletingRoom(true);
      await deleteRoom(roomId, token);
      // If the deleted room was selected, clear the selection
      const deletedRoom = rooms?.find((r) => r._id === roomId);
      if (deletedRoom && room === deletedRoom.name) {
        setRoom("");
      }
    } finally {
      setIsDeletingRoom(false);
      setRoomToDelete(null);
    }
  };

  const handleCreatePeriod: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (!user?.schoolIds?.[0] || !token || !newPeriodName.trim()) return;

    try {
      setIsCreatingPeriod(true);
      await createStudyPeriod(
        {
          name: newPeriodName.trim(),
          startDate: newPeriodStartDate,
          endDate: newPeriodEndDate,
          schoolId: user.schoolIds[0],
        },
        token
      );
      // Preselect the newly created period by name
      setPeriod(newPeriodName.trim());
      setNewPeriodName("");
      setNewPeriodStartDate(undefined);
      setNewPeriodEndDate(undefined);
      setIsPeriodDialogOpen(false);
    } finally {
      setIsCreatingPeriod(false);
    }
  };

  const handleDeletePeriod = async (periodId: string) => {
    if (!token) return;
    try {
      setIsDeletingPeriod(true);
      await deleteStudyPeriod(periodId, token);
      // If the deleted period was selected, clear the selection
      const deletedPeriod = studyPeriods?.find((p) => p._id === periodId);
      if (deletedPeriod && period === deletedPeriod.name) {
        setPeriod("");
      }
    } finally {
      setIsDeletingPeriod(false);
      setPeriodToDelete(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
              <DialogDescription>
                Create a new class or course for your school
              </DialogDescription>
            </DialogHeader>

            {currentStep === 1 && (
              <div className="py-4">
                <div className="mb-4">
                  <Label className="mb-2 block">Class Type</Label>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="trad-name">Class Name</Label>
                      <Input
                        id="trad-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Grade 5A"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <div className="relative">
                        <div className="flex">
                          <div className="flex-1">
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              aria-expanded={isLevelComboboxOpen}
                              className="w-full justify-between"
                              onClick={() => setIsLevelComboboxOpen((o) => !o)}
                            >
                              {grade ? grade : "Select grade level"}
                              <span className="sr-only">toggle</span>
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => setIsLevelDialogOpen(true)}
                            aria-label="Add level"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {isLevelComboboxOpen && (
                          <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                            <Command onValueChange={(val) => setSearch(val)}>
                              <CommandInput
                                placeholder="Search levels..."
                                // value={search}
                              />
                              <CommandList>
                                <CommandEmpty>No levels found.</CommandEmpty>
                                {(levels?.levels?.length ? levels.levels : [])
                                  .filter((lvl) =>
                                    search
                                      ? lvl.name
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                                      : true
                                  )
                                  .map((lvl) => (
                                    <CommandItem
                                      key={lvl._id}
                                      className="flex items-center justify-between"
                                      onSelect={() => {
                                        setGrade(lvl.name);
                                        setIsLevelComboboxOpen(false);
                                      }}
                                    >
                                      <span>{lvl.name}</span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setLevelToDelete(lvl._id);
                                        }}
                                        aria-label={`Delete ${lvl.name}`}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </CommandItem>
                                  ))}
                                {/* {!levels?.levels?.length && (
                                    <>
                                      {[
                                        "Kindergarten",
                                        "1st Grade",
                                        "2nd Grade",
                                        "3rd Grade",
                                        "4th Grade",
                                        "5th Grade",
                                        "6th Grade",
                                        "7th Grade",
                                        "8th Grade",
                                        "9th Grade",
                                        "10th Grade",
                                        "11th Grade",
                                        "12th Grade",
                                      ]
                                        .filter((n) =>
                                          search
                                            ? n
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                            : true
                                        )
                                        .map((n) => (
                                          <CommandItem
                                            key={n}
                                            onSelect={() => {
                                              setGrade(n);
                                              setIsLevelComboboxOpen(false);
                                            }}
                                          >
                                            {n}
                                          </CommandItem>
                                        ))}
                                    </>
                                  )} */}
                              </CommandList>
                            </Command>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <div className="relative">
                        <div className="flex">
                          <div className="flex-1">
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              aria-expanded={isSubjectComboboxOpen}
                              className="w-full justify-between"
                              onClick={() =>
                                setIsSubjectComboboxOpen((o) => !o)
                              }
                            >
                              {subject ? subject : "Select subject"}
                              <span className="sr-only">toggle</span>
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => setIsSubjectDialogOpen(true)}
                            aria-label="Add subject"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {isSubjectComboboxOpen && (
                          <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                            <Command onValueChange={(val) => setSearch(val)}>
                              <CommandInput
                                placeholder="Search subjects..."
                                // value={search}
                              />
                              <CommandList>
                                <CommandEmpty>No subjects found.</CommandEmpty>
                                {(subjects?.subjects?.length
                                  ? subjects.subjects
                                  : []
                                )
                                  .filter((subj) =>
                                    search
                                      ? subj.name
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                                      : true
                                  )
                                  .map((subj) => (
                                    <CommandItem
                                      key={subj._id}
                                      className="flex items-center justify-between"
                                      onSelect={() => {
                                        setSubject(subj.name);
                                        setIsSubjectComboboxOpen(false);
                                      }}
                                    >
                                      <span>{subj.name}</span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSubjectToDelete(subj._id);
                                        }}
                                        aria-label={`Delete ${subj.name}`}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </CommandItem>
                                  ))}
                              </CommandList>
                            </Command>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the class"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="py-4">
                <h3 className="text-lg font-medium mb-4">
                  Schedule &amp; Location
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="teacher">Assign Teacher</Label>
                      <div className="relative">
                        <div className="flex">
                          <div className="flex-1">
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              aria-expanded={isTeacherComboboxOpen}
                              className="w-full justify-between"
                              onClick={() =>
                                setIsTeacherComboboxOpen((o) => !o)
                              }
                            >
                              {selectedTeacher
                                ? (() => {
                                    const teacher = usersData?.users?.find(
                                      (u: any) => u._id === selectedTeacher
                                    );
                                    return teacher
                                      ? teacher.fullName
                                      : "Select teacher...";
                                  })()
                                : "Select teacher..."}
                              <svg
                                className="ml-2 h-4 w-4 shrink-0 opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                        {isTeacherComboboxOpen && (
                          <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
                            <Command>
                              <CommandInput placeholder="Search teachers..." />
                              <CommandEmpty>No teachers found.</CommandEmpty>
                              <CommandList>
                                {usersData?.users
                                  ?.filter(
                                    (user: any) => user.role === "teacher"
                                  )
                                  ?.map((teacher: any) => (
                                    <CommandItem
                                      key={teacher._id}
                                      value={teacher._id}
                                      onSelect={() => {
                                        setSelectedTeacher(teacher._id);
                                        setIsTeacherComboboxOpen(false);
                                      }}
                                      className="flex cursor-pointer items-center justify-between py-2 pl-8 pr-2"
                                    >
                                      <span>{teacher.fullName}</span>
                                      <span className="text-sm text-muted-foreground">
                                        {teacher.email}
                                      </span>
                                    </CommandItem>
                                  ))}
                              </CommandList>
                            </Command>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-2 ">
                      <Label htmlFor="trad-name">Course Name</Label>
                      <Input
                        id="trad-name"
                        className="w-full"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder="e.g., English"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="period">Period</Label>
                      <div className="relative">
                        <div className="flex">
                          <div className="flex-1">
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              aria-expanded={isPeriodComboboxOpen}
                              className="w-full justify-between"
                              onClick={() => setIsPeriodComboboxOpen((o) => !o)}
                            >
                              {period
                                ? (() => {
                                    const selectedPeriod = studyPeriods?.find(
                                      (p) => p.name === period
                                    );
                                    if (
                                      selectedPeriod?.startDate &&
                                      selectedPeriod?.endDate
                                    ) {
                                      const startFormatted = format(
                                        new Date(selectedPeriod.startDate),
                                        "dd/MM"
                                      );
                                      const endFormatted = format(
                                        new Date(selectedPeriod.endDate),
                                        "dd/MM"
                                      );
                                      return `${period} ${startFormatted} - ${endFormatted}`;
                                    }
                                    return period;
                                  })()
                                : "Select period"}
                              <span className="sr-only">toggle</span>
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => setIsPeriodDialogOpen(true)}
                            aria-label="Add period"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {isPeriodComboboxOpen && (
                          <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                            <Command onValueChange={(val) => setSearch(val)}>
                              <CommandInput
                                placeholder="Search periods..."
                                // value={search}
                              />
                              <CommandList>
                                <CommandEmpty>No periods found.</CommandEmpty>
                                {(studyPeriods?.length ? studyPeriods : [])
                                  .filter((periodItem) =>
                                    search
                                      ? periodItem.name
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                                      : true
                                  )
                                  .map((periodItem) => {
                                    const formatDateRange = () => {
                                      if (
                                        periodItem.startDate &&
                                        periodItem.endDate
                                      ) {
                                        const startFormatted = format(
                                          new Date(periodItem.startDate),
                                          "dd/MM"
                                        );
                                        const endFormatted = format(
                                          new Date(periodItem.endDate),
                                          "dd/MM"
                                        );
                                        return ` ${startFormatted} - ${endFormatted}`;
                                      }
                                      return "";
                                    };

                                    return (
                                      <CommandItem
                                        key={periodItem._id}
                                        className="flex items-center justify-between"
                                        onSelect={() => {
                                          setPeriod(periodItem.name);
                                          setIsPeriodComboboxOpen(false);
                                        }}
                                      >
                                        <span>
                                          {periodItem.name}
                                          {formatDateRange()}
                                        </span>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setPeriodToDelete(periodItem._id);
                                          }}
                                          aria-label={`Delete ${periodItem.name}`}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </CommandItem>
                                    );
                                  })}
                              </CommandList>
                            </Command>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="room">Room</Label>
                      <div className="relative">
                        <div className="flex">
                          <div className="flex-1">
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              aria-expanded={isRoomComboboxOpen}
                              className="w-full justify-between"
                              onClick={() => setIsRoomComboboxOpen((o) => !o)}
                            >
                              {room ? room : "Select room"}
                              <span className="sr-only">toggle</span>
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => setIsRoomDialogOpen(true)}
                            aria-label="Add room"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {isRoomComboboxOpen && (
                          <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                            <Command onValueChange={(val) => setSearch(val)}>
                              <CommandInput
                                placeholder="Search rooms..."
                                // value={search}
                              />
                              <CommandList>
                                <CommandEmpty>No rooms found.</CommandEmpty>
                                {(rooms?.length ? rooms : [])
                                  .filter((roomItem) =>
                                    search
                                      ? roomItem.name
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                                      : true
                                  )
                                  .map((roomItem) => (
                                    <CommandItem
                                      key={roomItem._id}
                                      className="flex items-center justify-between"
                                      onSelect={() => {
                                        setRoom(roomItem.name);
                                        setIsRoomComboboxOpen(false);
                                      }}
                                    >
                                      <span>{roomItem.name}</span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setRoomToDelete(roomItem._id);
                                        }}
                                        aria-label={`Delete ${roomItem.name}`}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </CommandItem>
                                  ))}
                              </CommandList>
                            </Command>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <Label>Weekly Schedule</Label>
                    <div className="space-y-3">
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((day) => (
                        <div key={day} className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant={
                              weeklySchedule[day] ? "default" : "outline"
                            }
                            onClick={() => handleDayToggle(day)}
                            className="w-20 text-xs"
                          >
                            {day.substring(0, 3)}
                          </Button>
                          {weeklySchedule[day] && (
                            <div className="flex items-center gap-2 flex-1">
                              <div className="grid gap-1">
                                <Label
                                  htmlFor={`${day}-start`}
                                  className="text-xs"
                                >
                                  Start
                                </Label>
                                <Input
                                  id={`${day}-start`}
                                  type="time"
                                  value={weeklySchedule[day].start}
                                  onChange={(e) =>
                                    handleTimeChange(
                                      day,
                                      "start",
                                      e.target.value
                                    )
                                  }
                                  className="w-24"
                                />
                              </div>
                              <div className="grid gap-1">
                                <Label
                                  htmlFor={`${day}-end`}
                                  className="text-xs"
                                >
                                  End
                                </Label>
                                <Input
                                  id={`${day}-end`}
                                  type="time"
                                  value={weeklySchedule[day].end}
                                  onChange={(e) =>
                                    handleTimeChange(day, "end", e.target.value)
                                  }
                                  className="w-24"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                >
                  Back
                </Button>
              )}
              {currentStep < 2 ? (
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Class"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isLevelDialogOpen} onOpenChange={setIsLevelDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create Level</DialogTitle>
            <DialogDescription>
              Add a new grade level for your school
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateLevel} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="new-level-name">Level name</Label>
              <Input
                id="new-level-name"
                value={newLevelName}
                onChange={(e) => setNewLevelName(e.target.value)}
                placeholder="e.g., Grade 5A or Freshman"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-level-description">
                Description (optional)
              </Label>
              <Textarea
                id="new-level-description"
                value={newLevelDescription}
                onChange={(e) => setNewLevelDescription(e.target.value)}
                placeholder="Brief description"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsLevelDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreatingLevel || !newLevelName.trim()}
              >
                {isCreatingLevel ? "Creating..." : "Create Level"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Level Confirmation Dialog */}
      <Dialog
        open={!!levelToDelete}
        onOpenChange={() => setLevelToDelete(null)}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Level</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this level? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLevelToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeletingLevel}
              onClick={() => levelToDelete && handleDeleteLevel(levelToDelete)}
            >
              {isDeletingLevel ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Subject Dialog */}
      <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create Subject</DialogTitle>
            <DialogDescription>
              Add a new subject for your school
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubject} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="new-subject-name">Subject name</Label>
              <Input
                id="new-subject-name"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                placeholder="e.g., Advanced Mathematics or Biology"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-subject-description">
                Description (optional)
              </Label>
              <Textarea
                id="new-subject-description"
                value={newSubjectDescription}
                onChange={(e) => setNewSubjectDescription(e.target.value)}
                placeholder="Brief description"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSubjectDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreatingSubject || !newSubjectName.trim()}
              >
                {isCreatingSubject ? "Creating..." : "Create Subject"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Subject Confirmation Dialog */}
      <Dialog
        open={!!subjectToDelete}
        onOpenChange={() => setSubjectToDelete(null)}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Subject</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subject? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSubjectToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeletingSubject}
              onClick={() =>
                subjectToDelete && handleDeleteSubject(subjectToDelete)
              }
            >
              {isDeletingSubject ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Room Dialog */}
      <Dialog open={isRoomDialogOpen} onOpenChange={setIsRoomDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
            <DialogDescription>
              Add a new room for your school
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateRoom} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="new-room-name">Room name</Label>
              <Input
                id="new-room-name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="e.g., Room 101 or Computer Lab"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-room-capacity">Capacity</Label>
              <Input
                id="new-room-capacity"
                type="number"
                value={newRoomCapacity}
                onChange={(e) => setNewRoomCapacity(e.target.value)}
                placeholder="e.g., 30"
                min="1"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-room-location">Location</Label>
              <Select
                value={newRoomLocation}
                onValueChange={(value) =>
                  setNewRoomLocation(value as "online" | "local")
                }
              >
                <SelectTrigger id="new-room-location">
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRoomDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreatingRoom || !newRoomName.trim()}
              >
                {isCreatingRoom ? "Creating..." : "Create Room"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Room Confirmation Dialog */}
      <Dialog open={!!roomToDelete} onOpenChange={() => setRoomToDelete(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this room? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRoomToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeletingRoom}
              onClick={() => roomToDelete && handleDeleteRoom(roomToDelete)}
            >
              {isDeletingRoom ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Period Dialog */}
      <Dialog open={isPeriodDialogOpen} onOpenChange={setIsPeriodDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create Study Period</DialogTitle>
            <DialogDescription>
              Add a new study period for your school
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePeriod} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="new-period-name">Period name</Label>
              <Input
                id="new-period-name"
                value={newPeriodName}
                onChange={(e) => setNewPeriodName(e.target.value)}
                placeholder="e.g., Fall Semester 2024 or 1st Quarter"
                required
              />
            </div>
            <div className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="new-period-start-date">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="new-period-start-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-11",
                        !newPeriodStartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newPeriodStartDate
                        ? format(newPeriodStartDate, "PPP")
                        : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3">
                      <Calendar
                        mode="single"
                        selected={newPeriodStartDate}
                        onSelect={setNewPeriodStartDate}
                        initialFocus
                        className="rounded-md border-0"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="new-period-end-date">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="new-period-end-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-11",
                        !newPeriodEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newPeriodEndDate
                        ? format(newPeriodEndDate, "PPP")
                        : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3">
                      <Calendar
                        mode="single"
                        selected={newPeriodEndDate}
                        onSelect={setNewPeriodEndDate}
                        initialFocus
                        disabled={(date) =>
                          newPeriodStartDate ? date < newPeriodStartDate : false
                        }
                        className="rounded-md border-0"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPeriodDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreatingPeriod || !newPeriodName.trim()}
              >
                {isCreatingPeriod ? "Creating..." : "Create Period"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Period Confirmation Dialog */}
      <Dialog
        open={!!periodToDelete}
        onOpenChange={() => setPeriodToDelete(null)}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Study Period</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this study period? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPeriodToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeletingPeriod}
              onClick={() =>
                periodToDelete && handleDeletePeriod(periodToDelete)
              }
            >
              {isDeletingPeriod ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
