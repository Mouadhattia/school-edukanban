"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Globe, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Site, SiteSettings } from "@/lib/types";
import { useOrganizationData } from "@/contexts/organization-data-context";

export default function NewSitePage() {
  const { createNewSite, sites } = useOrganizationData();
  console.log("sites", sites);
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subdomain: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const newSite = await createNewSite({
        name: formData.name,
        domain: `${formData.subdomain}.edusite.com`,
      });

      toast.success("Website created successfully!", {
        description:
          "You'll now be taken to the editor to customize your site.",
      });

      // After creating the site, find it in the updated sites list

      if (!newSite?._id) {
        throw new Error("Site created but no ID returned");
      }

      router.push(`/admin/sites/${newSite._id}/editor`);
    } catch (error: unknown) {
      console.error("Error creating site:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Error creating site", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (formData.name) {
      const formattedSubdomain = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      setFormData((prev) => ({
        ...prev,
        subdomain: formattedSubdomain,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        subdomain: "",
      }));
    }
  }, [formData.name]);

  const selectedTemplate = [
    {
      id: "1",
      name: "Modern School",
      category: "high-school",
      description:
        "A clean, contemporary design for high schools and academies.",
      image: "/modern-school-website-template.png",
      features: [
        "Homepage with hero banner",
        "Staff directory",
        "News section",
        "Events calendar",
      ],
      difficulty: "Easy",
    },
    {
      id: "2",
      name: "Elementary School",
      category: "elementary",
      description:
        "Colorful and engaging design perfect for elementary schools.",
      image: "/elementary-school-website.png",
      features: [
        "Colorful design",
        "Class pages",
        "Parent resources",
        "Student showcase",
      ],
      difficulty: "Easy",
    },
    {
      id: "3",
      name: "High School Pro",
      category: "high-school",
      description: "Professional and academic design for high schools.",
      image: "/high-school-website-template.png",
      features: [
        "Academic program pages",
        "Athletics section",
        "College resources",
        "Staff directory",
      ],
      difficulty: "Medium",
    },
    {
      id: "4",
      name: "University Prep",
      category: "high-school",
      description: "Sophisticated design for college preparatory schools.",
      image: "/university-prep-school-website.png",
      features: [
        "College admissions resources",
        "Advanced course catalog",
        "Alumni stories",
        "Campus life",
      ],
      difficulty: "Medium",
    },
  ].find((t) => t.id === templateId);

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create New School Website</h1>
          <p className="text-muted-foreground mt-2">
            Start building your school's online presence with our easy-to-use
            website builder.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Site Details
            </CardTitle>
            <CardDescription>
              Enter the basic information for your new school website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Site Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Lincoln Elementary School"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of your school..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex">
                  <Input
                    id="subdomain"
                    name="subdomain"
                    placeholder="lincoln-elementary"
                    value={formData.subdomain}
                    onChange={handleInputChange}
                    className="rounded-r-none"
                    required
                    disabled
                  />
                  <div className="flex items-center px-3 bg-muted border border-l-0 rounded-r-md text-sm text-muted-foreground">
                    .edusite.com
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This will be your website's URL:{" "}
                  {formData.subdomain || "your-subdomain"}.edusite.com
                </p>
              </div>

              {selectedTemplate && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted">
                    <h3 className="font-medium">Template</h3>
                  </div>
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-20 h-20 rounded overflow-hidden">
                      <img
                        src={selectedTemplate.image || "/placeholder.svg"}
                        alt="Template"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-lg">
                        {selectedTemplate.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedTemplate.description}
                      </p>
                      <p className="text-xs mt-1">
                        Difficulty: {selectedTemplate.difficulty}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/school-dashboard">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Site"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
