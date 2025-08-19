"use client";

import React, { useEffect, useState } from "react";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ImageIcon,
  ArrowLeft,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Grid,
  ListOrdered,
  Users,
  Star,
  CheckCircle,
  Shield,
  Lightbulb,
  Target,
  Heart,
  Video,
  Zap,
  VideoIcon,
} from "lucide-react";

type AuthView = "signin" | "signup" | null;

export default function Preview() {
  const { id } = useParams<{ id: string }>();
  const { getSiteById, selectedSite, user, courses, getAllCourses } =
    useOrganizationData();
  const [activePage, setActivePage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authView, setAuthView] = useState<AuthView>(null);
  // colors
  const textColor = selectedSite?.settings?.colors?.text;
  const primaryColor = selectedSite?.settings?.colors?.primary;
  const secondaryColor = selectedSite?.settings?.colors?.secondary;

  const [token, setToken] = useState<string | null>(null);

  const [productCarouselIndex, setProductCarouselIndex] = useState(0);
  const [carouselStates, setCarouselStates] = useState<Record<string, number>>(
    {}
  );
  const [allProductsStates, setAllProductsStates] = useState<
    Record<
      string,
      {
        searchTerm: string;
        sortBy: string;
        layout: string;
        currentPage: number;
      }
    >
  >({});

  // Product detail state
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);

  // Helper function to handle product detail view
  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token && user) {
      getAllCourses(token, {
        schoolId: user?.schoolIds?.[0] || "",
        search: "",
        page: 1,
        limit: 999,
      });
    }
  }, [token, user]);

  const coursesList = courses?.courses || [];
  useEffect(() => {
    if (id) {
      setLoading(true);
      getSiteById(id).finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (selectedSite && selectedSite.pages && selectedSite.pages.length > 0) {
      // Default to homepage or first page
      const home = selectedSite.pages.find((p: any) => p.is_homepage);
      setActivePage(home ? home._id : selectedSite.pages[0]._id);
    }
  }, [selectedSite]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (!selectedSite) {
    return (
      <div className="flex justify-center items-center h-screen">
        Site not found
      </div>
    );
  }

  const page = selectedSite.pages.find((p: any) => p._id === activePage);
  const sections = page && (page as any).sections ? (page as any).sections : [];

  // Sign In Preview Component
  const SignInPreview = () => (
    <div className="min-h-screen bg-[#F8FAFC] p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        {/* Back to Home button */}
        <div className="mb-6 flex items-center gap-2 justify-center">
          <Button
            style={{
              color: textColor,
            }}
            variant="outline"
            onClick={() => setAuthView(null)}
            className="flex items-center gap-2 outline-none border-none"
          >
            <span className="text-4xl font-bold capitalize">
              {selectedSite.name}
            </span>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-gray-900 mb-2"
            style={{
              color: textColor,
            }}
          >
            Sign In
          </h1>
          <p className="text-gray-600">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-black hover:text-gray-600">
              Forgot password?
            </a>
          </div>

          <Button
            style={{
              backgroundColor: primaryColor,
              // color: textColor,
            }}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => setAuthView("signup")}
              className="text-black hover:text-gray-600 font-medium"
            >
              Sign up here
            </button>
          </p>
        </div>
      </Card>
    </div>
  );

  // Sign Up Preview Component
  const SignUpPreview = () => (
    <div className="min-h-screen bg-[#F8FAFC] p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        {/* Back to Home button */}
        <div className="mb-6 flex items-center gap-2 justify-center">
          <Button
            variant="outline"
            onClick={() => setAuthView(null)}
            className="flex items-center gap-2 outline-none border-none"
            style={{
              color: textColor,
            }}
          >
            <span className="text-4xl font-bold capitalize">
              {selectedSite.name}
            </span>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-gray-900 mb-2"
            style={{
              color: textColor,
            }}
          >
            Sign Up
          </h1>
          <p className="text-gray-600">Create your account to get started.</p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          {/* <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div> */}

          <div>
            <label
              htmlFor="signupEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="signupEmail"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="signupPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="signupPassword"
              type="password"
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-black hover:text-gray-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-black hover:text-gray-600">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            style={{
              backgroundColor: primaryColor,
              // color: textColor,
            }}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => setAuthView("signin")}
              className="text-black hover:text-gray-600 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </Card>
    </div>
  );

  // Product Detail View Component
  const ProductDetailView = () => {
    if (!selectedProduct) return null;

    return (
      <div className="min-h-screen bg-white">
        {/* Enhanced Navbar */}
        <header className="w-full bg-white border-b border-gray-200 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Logo/Brand */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a
                    href="/"
                    className="flex items-center space-x-2 text-2xl font-bold hover:opacity-80 transition-opacity"
                    style={{ color: primaryColor || "#000" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: primaryColor || "#000" }}
                    >
                      {selectedSite.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block">{selectedSite.name}</span>
                  </a>
                </div>
              </div>

              {/* Center: Navigation Links */}
              <nav className="hidden md:flex flex-1 justify-center">
                <div className="flex items-center space-x-8">
                  {selectedSite.pages.map((p: any) => (
                    <button
                      key={p._id}
                      onClick={() => {
                        setActivePage(p._id);
                        setAuthView(null);
                        setShowProductDetail(false);
                        setSelectedProduct(null);
                      }}
                      className={`px-3 py-2 rounded-md text-sm font-medium capitalize transition-all duration-200 relative ${
                        p._id === activePage
                          ? "text-white shadow-md"
                          : "text-gray-700 hover:text-white hover:shadow-sm"
                      }`}
                      style={{
                        backgroundColor:
                          p._id === activePage ? primaryColor : "transparent",
                        ...(p._id !== activePage && {
                          ":hover": {
                            backgroundColor: primaryColor,
                          },
                        }),
                      }}
                      onMouseEnter={(e) => {
                        if (p._id !== activePage) {
                          e.currentTarget.style.backgroundColor =
                            primaryColor || "#000";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (p._id !== activePage) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {p.title}
                      {p._id === activePage && (
                        <div
                          className="absolute bottom-0 left-0 w-full h-0.5"
                          style={{ backgroundColor: textColor || "#fff" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Right: Auth buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setAuthView("signin")}
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors border border-gray-300 hover:border-gray-400"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                  }}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setAuthView("signup")}
                  className="text-white px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: primaryColor,
                    boxShadow: `0 2px 4px ${primaryColor}20`,
                  }}
                >
                  Sign Up
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2"
                  onClick={() => {
                    // You can implement mobile menu toggle here
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Mobile navigation */}
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {selectedSite.pages.map((p: any) => (
                  <button
                    key={p._id}
                    onClick={() => {
                      setActivePage(p._id);
                      setAuthView(null);
                      setShowProductDetail(false);
                      setSelectedProduct(null);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium capitalize transition-colors ${
                      p._id === activePage
                        ? "text-white"
                        : "text-gray-700 hover:text-white"
                    }`}
                    style={{
                      backgroundColor:
                        p._id === activePage ? primaryColor : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (p._id !== activePage) {
                        e.currentTarget.style.backgroundColor =
                          primaryColor || "#000";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (p._id !== activePage) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Page Title and Description */}
        <div className="max-w-6xl mx-auto px-4 py-8 border-b">
          <div className="text-center space-y-4">
            <h1
              className="text-4xl font-bold text-gray-900"
              style={{
                color: textColor,
              }}
            >
              {selectedProduct.title || selectedProduct.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {selectedProduct.description ||
                "Discover the details of this amazing product and enhance your learning experience."}
            </p>
          </div>
        </div>

        {/* Product Detail Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Media */}
            <div className="space-y-6">
              {/* Product Image */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title || selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ShoppingBag className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Product Video */}
              {selectedProduct.video &&
                selectedProduct.video.includes("youtube") && (
                  // youtube video
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src={selectedProduct.video}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  {selectedProduct.title || selectedProduct.name}
                </h1>

                {/* Product ID */}
                <p className="text-sm text-muted-foreground mb-2">
                  Product ID: {selectedProduct._id || selectedProduct.id}
                </p>

                {/* School */}
                {selectedProduct.school && (
                  <p className="text-lg text-muted-foreground mb-4">
                    By {selectedProduct.school}
                  </p>
                )}

                {/* Price */}
                <div className="text-4xl font-bold text-primary mb-6">
                  ${selectedProduct.price || "0"}
                </div>

                {/* Duration */}
                {selectedProduct.duration && (
                  <div className="flex items-center gap-2 mb-6">
                    <VideoIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg">
                      {selectedProduct.duration} hours
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProduct.description || "No description available."}
                </p>
              </div>

              {/* Order Now Button */}
              <div className="pt-6">
                <Button
                  size="lg"
                  className="w-full text-lg py-6"
                  onClick={() => setAuthView("signin")}
                  style={{
                    backgroundColor: primaryColor,
                    // color: textColor,
                  }}
                >
                  Order Now
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Please log in to place an order
                </p>
              </div>

              {/* Additional Product Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Course Details</h3>
                <div className="space-y-2">
                  {selectedProduct.level && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="capitalize">
                        {selectedProduct.level}
                      </span>
                    </div>
                  )}
                  {selectedProduct.category && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{selectedProduct.category}</span>
                    </div>
                  )}
                  {selectedProduct.language && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language:</span>
                      <span>{selectedProduct.language}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="bg-black text-white"
          style={{
            backgroundColor: primaryColor,
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">{selectedSite.name}</h3>
                <p className="text-gray-300 text-sm">
                  Building the future of education with innovative solutions and
                  cutting-edge technology.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Quick Links</h4>
                <ul className="space-y-2">
                  {selectedSite.pages.map((page: any) => (
                    <li key={page._id}>
                      <button
                        onClick={() => {
                          setActivePage(page._id);
                          setAuthView(null);
                          setShowProductDetail(false);
                          setSelectedProduct(null);
                        }}
                        className="text-gray-300 hover:text-white transition-colors text-sm capitalize"
                      >
                        {page.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Services</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Online Learning
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Course Management
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Student Progress
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Educational Resources
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Contact Us</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-300 text-sm">
                      info@
                      {selectedSite.name.toLowerCase().replace(/\s+/g, "")}
                      .com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-300 text-sm">
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-300 text-sm">
                      123 Education St, Learning City, LC 12345
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm">
                © {new Date().getFullYear()} {selectedSite.name}. All rights
                reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Conditional rendering: show auth views, product detail, or main content */}
      {authView === "signin" ? (
        <SignInPreview />
      ) : authView === "signup" ? (
        <SignUpPreview />
      ) : showProductDetail ? (
        <ProductDetailView />
      ) : (
        <>
          {/* Enhanced Main Navbar */}
          <header className="w-full bg-white border-b border-gray-200 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Left: Logo/Brand */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <a
                      href="/"
                      className="flex items-center space-x-2 text-2xl font-bold hover:opacity-80 transition-opacity"
                      style={{ color: primaryColor || "#000" }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: primaryColor || "#000" }}
                      >
                        {selectedSite.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden sm:block">
                        {selectedSite.name}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Center: Navigation Links */}
                <nav className="hidden md:flex flex-1 justify-center">
                  <div className="flex items-center space-x-8">
                    {selectedSite.pages.map((p: any) => (
                      <button
                        key={p._id}
                        onClick={() => {
                          setActivePage(p._id);
                          setAuthView(null);
                        }}
                        className={`px-3 py-2 rounded-md text-sm font-medium capitalize transition-all duration-200 ${
                          p._id === activePage
                            ? "text-white shadow-md"
                            : "text-gray-700 hover:text-white hover:shadow-sm"
                        }`}
                        style={{
                          backgroundColor:
                            p._id === activePage ? primaryColor : "transparent",
                          ...(p._id !== activePage && {
                            ":hover": {
                              backgroundColor: primaryColor,
                            },
                          }),
                        }}
                        onMouseEnter={(e) => {
                          if (p._id !== activePage) {
                            e.currentTarget.style.backgroundColor =
                              primaryColor || "#000";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (p._id !== activePage) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Right: Auth buttons */}
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => setAuthView("signin")}
                    className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors border border-gray-300 hover:border-gray-400"
                    style={{
                      borderColor: primaryColor,
                      color: primaryColor,
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => setAuthView("signup")}
                    className="text-white px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:shadow-lg"
                    style={{
                      backgroundColor: primaryColor,
                      boxShadow: `0 2px 4px ${primaryColor}20`,
                    }}
                  >
                    Sign Up
                  </Button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    onClick={() => {
                      // You can implement mobile menu toggle here
                    }}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Mobile navigation */}
              <div className="md:hidden border-t border-gray-200">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {selectedSite.pages.map((p: any) => (
                    <button
                      key={p._id}
                      onClick={() => {
                        setActivePage(p._id);
                        setAuthView(null);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium capitalize transition-colors ${
                        p._id === activePage
                          ? "text-white"
                          : "text-gray-700 hover:text-white"
                      }`}
                      style={{
                        backgroundColor:
                          p._id === activePage ? primaryColor : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (p._id !== activePage) {
                          e.currentTarget.style.backgroundColor =
                            primaryColor || "#000";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (p._id !== activePage) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </header>
          <main className="w-full max-w-6xl mx-auto pb-16">
            <div className=" p-4 min-h-[400px]">
              {sections.length === 0 && (
                <div className="text-center text-muted-foreground py-16">
                  This page is empty.
                </div>
              )}
              {sections.map((section: any) => {
                switch (section.type) {
                  case "hero":
                    return (
                      <section key={section._id} className="my-8">
                        <div
                          className="text-center p-8 rounded-lg"
                          style={{
                            backgroundColor:
                              section.content.backgroundColor || "transparent",
                            backgroundImage:
                              section.content.backgroundImage?.hide === false &&
                              section.content.backgroundImage?.src
                                ? `url(${section.content.backgroundImage.src})`
                                : section.content.backgroundImage &&
                                  typeof section.content.backgroundImage ===
                                    "string"
                                ? `url(${section.content.backgroundImage})`
                                : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <h2
                            className="text-5xl font-bold mb-4"
                            style={{
                              color:
                                section.content.backgroundColor ||
                                section.content.backgroundImage?.hide ===
                                  false ||
                                (section.content.backgroundImage &&
                                  typeof section.content.backgroundImage ===
                                    "string")
                                  ? "white"
                                  : "inherit",
                              textShadow:
                                section.content.backgroundImage?.hide ===
                                  false ||
                                (section.content.backgroundImage &&
                                  typeof section.content.backgroundImage ===
                                    "string")
                                  ? "2px 2px 4px rgba(0,0,0,0.7)"
                                  : "none",
                            }}
                          >
                            {section.content.title}
                          </h2>
                          <p
                            className="text-xl mb-6"
                            style={{
                              color:
                                section.content.backgroundColor ||
                                section.content.backgroundImage?.hide ===
                                  false ||
                                (section.content.backgroundImage &&
                                  typeof section.content.backgroundImage ===
                                    "string")
                                  ? "white"
                                  : "inherit",
                              textShadow:
                                section.content.backgroundImage?.hide ===
                                  false ||
                                (section.content.backgroundImage &&
                                  typeof section.content.backgroundImage ===
                                    "string")
                                  ? "1px 1px 2px rgba(0,0,0,0.7)"
                                  : "none",
                            }}
                          >
                            {section.content.subtitle}
                          </p>
                          {section.content.ctaText && (
                            <Button
                              asChild
                              onClick={() => {
                                if (section.content.ctaLink?.pageId) {
                                  // Find the page and redirect to it
                                  const targetPage = selectedSite.pages.find(
                                    (page: any) =>
                                      page._id ===
                                      section.content.ctaLink.pageId
                                  );
                                  if (targetPage) {
                                    setActivePage(targetPage._id);
                                    setAuthView(null); // Reset auth view
                                  }
                                }
                              }}
                              style={{
                                backgroundColor: primaryColor,
                                boxShadow:
                                  section.content.backgroundImage?.hide ===
                                    false ||
                                  (section.content.backgroundImage &&
                                    typeof section.content.backgroundImage ===
                                      "string")
                                    ? "0 4px 8px rgba(0,0,0,0.3)"
                                    : "none",
                              }}
                            >
                              <a>{section.content.ctaText}</a>
                            </Button>
                          )}
                        </div>
                      </section>
                    );
                  case "heading":
                    return (
                      <section key={section._id} className="my-8">
                        <div
                          className="text-center p-6 rounded-lg"
                          style={{
                            backgroundColor:
                              section.content.backgroundColor || "transparent",
                            backgroundImage:
                              section.content.backgroundImage?.hide === false &&
                              section.content.backgroundImage?.src
                                ? `url(${section.content.backgroundImage.src})`
                                : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <h2
                            className={`font-bold mb-2 text-${
                              section.content.level === 1
                                ? "4xl"
                                : section.content.level === 2
                                ? "3xl"
                                : "2xl"
                            }`}
                            style={{
                              color:
                                section.content.backgroundColor ||
                                section.content.backgroundImage?.hide === false
                                  ? "white"
                                  : textColor || "inherit",
                              textShadow:
                                section.content.backgroundImage?.hide === false
                                  ? "2px 2px 4px rgba(0,0,0,0.7)"
                                  : "none",
                            }}
                          >
                            {section.content.text}
                          </h2>
                        </div>
                      </section>
                    );
                  case "paragraph":
                    return (
                      <section key={section._id} className="my-6">
                        <p className="text-md text-muted-foreground text-center">
                          {section.content.text}
                        </p>
                      </section>
                    );
                  case "features":
                    return (
                      <section
                        key={section._id}
                        className="my-8 p-8 rounded-lg"
                        style={{
                          backgroundColor:
                            section.content.backgroundColor || "#f8fafc",
                        }}
                      >
                        <h3 className="text-3xl font-bold mb-8 text-center">
                          {section.content.title}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {(section.content.items || []).map(
                            (item: any, idx: number) => {
                              // Simple icon rendering - in a real implementation you'd dynamically import
                              const renderIcon = () => {
                                switch (item.icon) {
                                  case "BookOpen":
                                    return (
                                      <BookOpen className="h-12 w-12 text-primary" />
                                    );
                                  case "Users":
                                    return (
                                      <Users className="h-12 w-12 text-primary" />
                                    );
                                  case "Building":
                                    return (
                                      <Grid className="h-12 w-12 text-primary" />
                                    ); // Using Grid as Building fallback
                                  case "Star":
                                    return (
                                      <Star className="h-12 w-12 text-primary" />
                                    );
                                  case "CheckCircle":
                                    return (
                                      <CheckCircle className="h-12 w-12 text-primary" />
                                    );
                                  case "Award":
                                    return (
                                      <Star className="h-12 w-12 text-primary" />
                                    ); // Using Star as Award fallback
                                  case "Shield":
                                    return (
                                      <Shield className="h-12 w-12 text-primary" />
                                    );
                                  case "Globe":
                                    return (
                                      <Grid className="h-12 w-12 text-primary" />
                                    ); // Using Grid as Globe fallback
                                  case "Lightbulb":
                                    return (
                                      <Lightbulb className="h-12 w-12 text-primary" />
                                    );
                                  case "Target":
                                    return (
                                      <Target className="h-12 w-12 text-primary" />
                                    );
                                  case "Heart":
                                    return (
                                      <Heart className="h-12 w-12 text-primary" />
                                    );
                                  case "Zap":
                                    return (
                                      <Zap className="h-12 w-12 text-primary" />
                                    );
                                  default:
                                    return (
                                      <Star className="h-12 w-12 text-primary" />
                                    );
                                }
                              };

                              return (
                                <Card
                                  key={idx}
                                  className="p-8 text-center hover:shadow-lg transition-shadow border-0 bg-white"
                                >
                                  <div className="flex flex-col items-center space-y-6">
                                    <div className="p-4 bg-primary/10 rounded-full">
                                      {renderIcon()}
                                    </div>
                                    <div>
                                      <h4 className="text-xl font-semibold mb-3">
                                        {item.title}
                                      </h4>
                                      <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                </Card>
                              );
                            }
                          )}
                        </div>
                      </section>
                    );
                  case "testimonials":
                    return (
                      <section key={section._id} className="my-8">
                        <div
                          className="p-8 rounded-lg"
                          style={{
                            backgroundColor:
                              section.content.backgroundColor || "transparent",
                            backgroundImage:
                              section.content.backgroundImage?.hide === false &&
                              section.content.backgroundImage?.src
                                ? `url(${section.content.backgroundImage.src})`
                                : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <h3
                            className="text-2xl font-bold mb-6 text-center"
                            style={{
                              color:
                                section.content.backgroundColor ||
                                section.content.backgroundImage?.hide === false
                                  ? "white"
                                  : "inherit",
                              textShadow:
                                section.content.backgroundImage?.hide === false
                                  ? "2px 2px 4px rgba(0,0,0,0.7)"
                                  : "none",
                            }}
                          >
                            {section.content.title}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(section.content.testimonials || []).map(
                              (t: any, idx: number) => (
                                <Card
                                  key={idx}
                                  className="p-6 text-center bg-white/95 backdrop-blur-sm shadow-lg"
                                >
                                  {/* Author Image */}
                                  {t.image && (
                                    <div className="mb-4 flex justify-center">
                                      <img
                                        src={t.image}
                                        alt={t.author}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                      />
                                    </div>
                                  )}

                                  {/* Rating Stars */}
                                  {t.rating && (
                                    <div className="mb-4 flex justify-center">
                                      {[...Array(5)].map((_, starIndex) => (
                                        <Star
                                          key={starIndex}
                                          className={`h-5 w-5 ${
                                            starIndex < t.rating
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  )}

                                  <p className="italic text-muted-foreground mb-4 text-base leading-relaxed">
                                    "{t.quote}"
                                  </p>
                                  <div className="border-t pt-4">
                                    <span className="font-semibold text-lg block">
                                      {t.author}
                                    </span>
                                    <div className="text-sm text-muted-foreground mt-1">
                                      {t.role}
                                    </div>
                                  </div>
                                </Card>
                              )
                            )}
                          </div>
                        </div>
                      </section>
                    );
                  case "cta":
                    return (
                      <section key={section._id} className="my-8 text-center">
                        <div className="rounded-lg bg-muted/20 p-8">
                          <h3 className="text-2xl font-bold mb-2">
                            {section.content.title}
                          </h3>
                          <p className="mb-4">{section.content.description}</p>
                          {section.content.buttonText && (
                            <Button
                              onClick={() => {
                                if (section.content.ctaLink?.pageId) {
                                  // Find the page and redirect to it
                                  const targetPage = selectedSite.pages.find(
                                    (page: any) =>
                                      page._id ===
                                      section.content.ctaLink.pageId
                                  );
                                  if (targetPage) {
                                    setActivePage(targetPage._id);
                                    setAuthView(null); // Reset auth view
                                  }
                                }
                              }}
                              asChild
                            >
                              <a>{section.content.buttonText}</a>
                            </Button>
                          )}
                        </div>
                      </section>
                    );
                  case "contact_form":
                    return (
                      <section key={section._id} className="my-8">
                        <div
                          className="p-8 rounded-lg"
                          style={{
                            backgroundColor:
                              section.content.backgroundColor || "transparent",
                            backgroundImage:
                              section.content.backgroundImage?.hide === false &&
                              section.content.backgroundImage?.src
                                ? `url(${section.content.backgroundImage.src})`
                                : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="max-w-6xl mx-auto">
                            <h2
                              className={`text-3xl font-bold mb-4 ${
                                section.content.textPosition === "center"
                                  ? "text-center"
                                  : section.content.textPosition === "right"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                              style={{
                                color:
                                  section.content.backgroundColor ||
                                  section.content.backgroundImage?.hide ===
                                    false
                                    ? "white"
                                    : "inherit",
                                textShadow:
                                  section.content.backgroundImage?.hide ===
                                  false
                                    ? "2px 2px 4px rgba(0,0,0,0.7)"
                                    : "none",
                              }}
                            >
                              {section.content.title}
                            </h2>

                            {section.content.description && (
                              <p
                                className={`text-lg mb-8 ${
                                  section.content.textPosition === "center"
                                    ? "text-center"
                                    : section.content.textPosition === "right"
                                    ? "text-right"
                                    : "text-left"
                                }`}
                                style={{
                                  color:
                                    section.content.backgroundColor ||
                                    section.content.backgroundImage?.hide ===
                                      false
                                      ? "white"
                                      : "inherit",
                                  textShadow:
                                    section.content.backgroundImage?.hide ===
                                    false
                                      ? "1px 1px 2px rgba(0,0,0,0.7)"
                                      : "none",
                                }}
                              >
                                {section.content.description}
                              </p>
                            )}

                            <div
                              className={`grid grid-cols-1 ${
                                section.content.image?.hide === false
                                  ? "lg:grid-cols-2"
                                  : ""
                              } gap-8 items-start`}
                            >
                              {/* Contact Form */}
                              <div
                                className={`${
                                  section.content.textPosition === "right" &&
                                  section.content.image?.hide === false
                                    ? "lg:order-2"
                                    : ""
                                }`}
                              >
                                <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-lg">
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <input
                                          type="text"
                                          placeholder="Your Name"
                                          className="w-full p-3 rounded-lg border bg-background"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="email"
                                          placeholder="Your Email"
                                          className="w-full p-3 rounded-lg border bg-background"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Subject"
                                        className="w-full p-3 rounded-lg border bg-background"
                                      />
                                    </div>
                                    <div>
                                      <textarea
                                        placeholder="Your Message"
                                        className="w-full p-3 rounded-lg border bg-background min-h-[120px] resize-none"
                                      />
                                    </div>
                                    <Button
                                      className="w-full py-3 text-lg"
                                      style={{
                                        backgroundColor: primaryColor,
                                      }}
                                    >
                                      {section.content.buttonText ||
                                        "Send Message"}
                                    </Button>
                                  </div>
                                </Card>

                                {/* Contact Information Cards */}
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <Card className="p-4 text-center bg-white/95 backdrop-blur-sm">
                                    <h4 className="font-semibold mb-2">
                                      Address
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {section.content.address}
                                    </p>
                                  </Card>
                                  <Card className="p-4 text-center bg-white/95 backdrop-blur-sm">
                                    <h4 className="font-semibold mb-2">
                                      Email
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {section.content.email}
                                    </p>
                                  </Card>
                                  <Card className="p-4 text-center bg-white/95 backdrop-blur-sm">
                                    <h4 className="font-semibold mb-2">
                                      Phone
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {section.content.phone}
                                    </p>
                                  </Card>
                                </div>
                              </div>

                              {/* Contact Image */}
                              {section.content.image?.hide === false && (
                                <div
                                  className={`${
                                    section.content.textPosition === "right"
                                      ? "lg:order-1"
                                      : ""
                                  }`}
                                >
                                  <div className="flex items-center justify-center">
                                    {section.content.image?.src ? (
                                      <img
                                        src={section.content.image.src}
                                        alt={section.content.image.alt}
                                        className="w-full max-w-lg h-auto rounded-lg shadow-lg"
                                      />
                                    ) : (
                                      <div className="w-full max-w-lg h-96 bg-muted rounded-lg flex items-center justify-center">
                                        <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                    );
                  case "video":
                    return (
                      <section key={section._id} className="my-8">
                        <div
                          className="p-8 rounded-lg"
                          style={{
                            backgroundColor:
                              section.content.backgroundColor || "transparent",
                            backgroundImage:
                              section.content.backgroundImage?.hide === false &&
                              section.content.backgroundImage?.src
                                ? `url(${section.content.backgroundImage.src})`
                                : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div
                            className={`max-w-4xl mx-auto ${
                              section.content.textPosition === "center"
                                ? "text-center"
                                : section.content.textPosition === "right"
                                ? "text-right"
                                : "text-left"
                            }`}
                          >
                            {/* Title and Description */}
                            {(section.content.title ||
                              section.content.description) && (
                              <div className="mb-8">
                                {section.content.title && (
                                  <h2
                                    className="text-3xl font-bold mb-4"
                                    style={{
                                      color:
                                        section.content.backgroundColor ||
                                        section.content.backgroundImage
                                          ?.hide === false
                                          ? "white"
                                          : "inherit",
                                      textShadow:
                                        section.content.backgroundImage
                                          ?.hide === false
                                          ? "2px 2px 4px rgba(0,0,0,0.7)"
                                          : "none",
                                    }}
                                  >
                                    {section.content.title}
                                  </h2>
                                )}
                                {section.content.description && (
                                  <p
                                    className="text-lg leading-relaxed"
                                    style={{
                                      color:
                                        section.content.backgroundColor ||
                                        section.content.backgroundImage
                                          ?.hide === false
                                          ? "rgba(255,255,255,0.9)"
                                          : "inherit",
                                      textShadow:
                                        section.content.backgroundImage
                                          ?.hide === false
                                          ? "1px 1px 2px rgba(0,0,0,0.7)"
                                          : "none",
                                    }}
                                  >
                                    {section.content.description}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Video Player */}
                            {section.content.video ? (
                              <div className="aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
                                <iframe
                                  src={section.content.video}
                                  className="w-full h-full"
                                  allowFullScreen
                                  title={
                                    section.content.title || "Video content"
                                  }
                                  style={{
                                    border: "none",
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                                <div className="text-center">
                                  <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                  <p className="text-muted-foreground text-lg">
                                    No video URL provided
                                  </p>
                                  <p className="text-muted-foreground text-sm mt-2">
                                    Add a video URL in the editor to display
                                    content here.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                    );
                  case "contact":
                    return (
                      <section key={section._id} className="my-8">
                        <div className="flex flex-col md:flex-row items-center gap-6 bg-muted/20 rounded-lg p-6">
                          <div className="flex-shrink-0">
                            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <p className="mb-2">{section.content.text}</p>
                            <p className="text-sm text-muted-foreground italic">
                              {section.content.caption}
                            </p>
                          </div>
                        </div>
                      </section>
                    );
                  case "products":
                    return (
                      <section key={section._id} className="my-8">
                        <div className="mt-6">
                          <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">
                              {section.content.title}
                            </h3>
                            {section.content.description && (
                              <p className="text-muted-foreground">
                                {section.content.description}
                              </p>
                            )}
                          </div>

                          {coursesList.length > 0 ? (
                            coursesList.length <= 3 ? (
                              // Display as regular grid for 3 or fewer items
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {coursesList.map(
                                  (course: any, index: number) => (
                                    <Card
                                      key={index}
                                      className="overflow-hidden"
                                    >
                                      <div className="aspect-video bg-muted flex items-center justify-center">
                                        {course.image ? (
                                          <img
                                            src={course.image}
                                            alt={course.title || course.name}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                                        )}
                                      </div>
                                      <div className="p-4">
                                        <h4 className="font-semibold text-lg mb-2">
                                          {course.title || course.name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                          {course.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                          <span className="text-lg font-bold text-primary">
                                            ${course.price || "0"}
                                          </span>
                                          <Button
                                            style={{
                                              backgroundColor: primaryColor,
                                            }}
                                            size="sm"
                                            onClick={() =>
                                              handleViewDetails(course)
                                            }
                                          >
                                            View Details
                                          </Button>
                                        </div>
                                      </div>
                                    </Card>
                                  )
                                )}
                              </div>
                            ) : (
                              // Display as carousel for more than 3 items
                              <div className="relative">
                                {/* Carousel navigation buttons */}
                                <div className="flex justify-between items-center mb-4">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      setProductCarouselIndex((prev) =>
                                        prev > 0
                                          ? prev - 1
                                          : Math.max(0, coursesList.length - 3)
                                      )
                                    }
                                    disabled={productCarouselIndex === 0}
                                    className="z-10"
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </Button>
                                  <span className="text-sm text-muted-foreground">
                                    {productCarouselIndex + 1} -{" "}
                                    {Math.min(
                                      productCarouselIndex + 3,
                                      coursesList.length
                                    )}{" "}
                                    of {coursesList.length}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      setProductCarouselIndex((prev) =>
                                        prev < coursesList.length - 3
                                          ? prev + 1
                                          : 0
                                      )
                                    }
                                    disabled={
                                      productCarouselIndex >=
                                      coursesList.length - 3
                                    }
                                    className="z-10"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>

                                {/* Carousel container */}
                                <div className="overflow-hidden">
                                  <div
                                    className="flex transition-transform duration-300 ease-in-out gap-6"
                                    style={{
                                      transform: `translateX(-${
                                        productCarouselIndex * (100 / 3)
                                      }%)`,
                                    }}
                                  >
                                    {coursesList.map(
                                      (course: any, index: number) => (
                                        <div
                                          key={index}
                                          className="flex-none w-1/3 min-w-0"
                                        >
                                          <Card className="overflow-hidden h-full">
                                            <div className="aspect-video bg-muted flex items-center justify-center">
                                              {course.image ? (
                                                <img
                                                  src={course.image}
                                                  alt={
                                                    course.title || course.name
                                                  }
                                                  className="w-full h-full object-cover"
                                                />
                                              ) : (
                                                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                                              )}
                                            </div>
                                            <div className="p-4">
                                              <h4 className="font-semibold text-lg mb-2">
                                                {course.title || course.name}
                                              </h4>
                                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                {course.description}
                                              </p>
                                              <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-primary">
                                                  ${course.price || "0"}
                                                </span>
                                                <Button
                                                  size="sm"
                                                  style={{
                                                    backgroundColor:
                                                      primaryColor,
                                                  }}
                                                  onClick={() =>
                                                    handleViewDetails(course)
                                                  }
                                                >
                                                  View Details
                                                </Button>
                                              </div>
                                            </div>
                                          </Card>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">
                                No courses available to display as products.
                              </p>
                            </div>
                          )}

                          {/* Show All Button */}
                          {section.content.showAllButton?.show && (
                            <div className="mt-6 text-center">
                              <Button
                                style={{
                                  backgroundColor: primaryColor,
                                  color: "white",
                                }}
                                variant="outline"
                                className="px-8"
                                onClick={() => {
                                  if (section.content.showAllButton?.pageId) {
                                    // Find the page and redirect to it
                                    const targetPage = selectedSite.pages.find(
                                      (page: any) =>
                                        page._id ===
                                        section.content.showAllButton.pageId
                                    );
                                    if (targetPage) {
                                      setActivePage(targetPage._id);
                                      setAuthView(null); // Reset auth view
                                    }
                                  }
                                }}
                              >
                                {section.content.showAllButton.text ||
                                  "Show More"}
                              </Button>
                            </div>
                          )}
                        </div>
                      </section>
                    );

                  case "courses":
                    return (
                      <section key={section._id} className="my-8">
                        <div className="mt-6">
                          <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">
                              {section.content.title}
                            </h3>
                            {section.content.description && (
                              <p className="text-muted-foreground">
                                {section.content.description}
                              </p>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(section.content.courses || []).map(
                              (course: any, index: number) => (
                                <Card key={index} className="overflow-hidden">
                                  <div className="aspect-video bg-muted flex items-center justify-center">
                                    {course.image ? (
                                      <img
                                        src={course.image}
                                        alt={course.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                                    )}
                                  </div>
                                  <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-semibold text-lg">
                                        {course.name}
                                      </h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">
                                      {course.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                      <div className="flex items-center gap-4">
                                        <span className="font-medium">
                                          ${course.price}
                                        </span>
                                        <span className="text-muted-foreground">
                                          {course.duration} hours
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              )
                            )}
                          </div>
                        </div>
                      </section>
                    );
                  case "carousel":
                    return (
                      <section key={section._id} className="my-8">
                        <div>
                          <div
                            className="relative flex items-center overflow-hidden rounded-lg min-h-[24rem] md:min-h-[28rem]"
                            style={{
                              backgroundColor:
                                section.content.backgroundColor || "#f0f9ff",
                            }}
                          >
                            {(section.content.items || []).map(
                              (item: any, index: number) => {
                                const currentIndex =
                                  carouselStates[section._id] || 0;
                                const isActive = index === currentIndex;
                                const textPosition =
                                  section.content.textPosition || "left";

                                return (
                                  <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                      isActive
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 translate-x-full"
                                    }`}
                                  >
                                    <div
                                      className={`grid grid-cols-1 md:grid-cols-2 w-full h-full items-center gap-6 md:gap-10 ${
                                        textPosition === "right"
                                          ? "md:grid-flow-col-dense"
                                          : ""
                                      }`}
                                    >
                                      {/* Content Side */}
                                      <div
                                        className={`flex flex-col p-8 gap-6 ${
                                          textPosition === "right"
                                            ? "md:col-start-2"
                                            : ""
                                        }`}
                                      >
                                        <h2
                                          className={`text-4xl font-bold text-gray-900 transition-all duration-1000 delay-200 ${
                                            isActive
                                              ? "translate-x-0 opacity-100"
                                              : "-translate-x-10 opacity-0"
                                          }`}
                                        >
                                          {item.title}
                                        </h2>

                                        <div className="space-y-3">
                                          {(item.descriptions || []).map(
                                            (
                                              desc: string,
                                              descIndex: number
                                            ) => (
                                              <p
                                                key={descIndex}
                                                className={`text-lg text-gray-600 transition-all duration-1000 ${
                                                  isActive
                                                    ? "translate-x-0 opacity-100"
                                                    : "-translate-x-10 opacity-0"
                                                }`}
                                                style={{
                                                  transitionDelay: `${
                                                    400 + descIndex * 200
                                                  }ms`,
                                                }}
                                              >
                                                {desc}
                                              </p>
                                            )
                                          )}
                                        </div>

                                        <div
                                          className={`flex gap-4 transition-all duration-1000 delay-700 ${
                                            isActive
                                              ? "translate-y-0 opacity-100"
                                              : "translate-y-10 opacity-0"
                                          }`}
                                        >
                                          {(item.buttons || []).map(
                                            (button: any, btnIndex: number) => (
                                              <Button
                                                style={{
                                                  backgroundColor:
                                                    btnIndex % 2 === 0
                                                      ? primaryColor
                                                      : "white",
                                                  color:
                                                    btnIndex % 2 === 0
                                                      ? "white"
                                                      : primaryColor,
                                                }}
                                                key={btnIndex}
                                                variant={
                                                  btnIndex === 0
                                                    ? "default"
                                                    : "outline"
                                                }
                                                className="transition-all duration-300 hover:scale-105"
                                                onClick={() => {
                                                  if (button?.pageId) {
                                                    // Find the page and redirect to it
                                                    const targetPage =
                                                      selectedSite.pages.find(
                                                        (page: any) =>
                                                          page._id ===
                                                          button?.pageId
                                                      );
                                                    if (targetPage) {
                                                      setActivePage(
                                                        targetPage._id
                                                      );
                                                      setAuthView(null); // Reset auth view
                                                    }
                                                  }
                                                }}
                                              >
                                                {button.text}
                                              </Button>
                                            )
                                          )}
                                        </div>
                                      </div>

                                      {/* Image Side */}
                                      <div
                                        className={`p-8 ${
                                          textPosition === "right"
                                            ? "md:col-start-1"
                                            : ""
                                        }`}
                                      >
                                        <div
                                          className={`relative w-full max-w-[720px] bg-muted rounded-lg overflow-hidden transition-all duration-1000 delay-300 ${
                                            isActive
                                              ? "scale-100 opacity-100"
                                              : "scale-95 opacity-0"
                                          } aspect-[16/10] md:aspect-[16/9]`}
                                        >
                                          {item.image ? (
                                            <img
                                              src={item.image}
                                              alt={item.title}
                                              className="absolute inset-0 w-full h-full object-contain"
                                            />
                                          ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                              <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}

                            {/* Carousel Controls */}
                            {(section.content.items || []).length > 1 && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex =
                                      carouselStates[section._id] || 0;
                                    const newIndex =
                                      currentIndex === 0
                                        ? (section.content.items?.length || 1) -
                                          1
                                        : currentIndex - 1;
                                    setCarouselStates((prev) => ({
                                      ...prev,
                                      [section._id]: newIndex,
                                    }));
                                  }}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex =
                                      carouselStates[section._id] || 0;
                                    const newIndex =
                                      currentIndex ===
                                      (section.content.items?.length || 1) - 1
                                        ? 0
                                        : currentIndex + 1;
                                    setCarouselStates((prev) => ({
                                      ...prev,
                                      [section._id]: newIndex,
                                    }));
                                  }}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                  {(section.content.items || []).map(
                                    (_: any, index: number) => (
                                      <button
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                          (carouselStates[section._id] || 0) ===
                                          index
                                            ? "bg-primary scale-125"
                                            : "bg-white/60 hover:bg-white/80"
                                        }`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setCarouselStates((prev) => ({
                                            ...prev,
                                            [section._id]: index,
                                          }));
                                        }}
                                      />
                                    )
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </section>
                    );

                  case "allProducts":
                    return (
                      <section key={section._id} className="my-8 min-h-screen">
                        <div className="text-center mb-8">
                          <h3
                            className="text-3xl font-bold mb-4"
                            style={{
                              color: textColor,
                            }}
                          >
                            {section.content.title}
                          </h3>
                          {section.content.description && (
                            <p className="text-muted-foreground text-lg">
                              {section.content.description}
                            </p>
                          )}
                        </div>

                        {/* Search and Filters */}
                        <div className="mb-8 space-y-4">
                          {section.content.showSearch && (
                            <div className="flex justify-center">
                              <div className="w-full max-w-md">
                                <Input
                                  placeholder="Search products..."
                                  className="w-full"
                                  value={
                                    allProductsStates[section._id]
                                      ?.searchTerm || ""
                                  }
                                  onChange={(e) => {
                                    setAllProductsStates((prev) => ({
                                      ...prev,
                                      [section._id]: {
                                        ...prev[section._id],
                                        searchTerm: e.target.value,
                                        currentPage: 1,
                                      },
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-4 justify-center items-center">
                            {section.content.showSorting && (
                              <select
                                className="px-4 py-2 border rounded-md bg-background"
                                value={
                                  allProductsStates[section._id]?.sortBy ||
                                  "name"
                                }
                                onChange={(e) => {
                                  setAllProductsStates((prev) => ({
                                    ...prev,
                                    [section._id]: {
                                      ...prev[section._id],
                                      sortBy: e.target.value,
                                    },
                                  }));
                                }}
                              >
                                <option value="name">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price">
                                  Price (Low to High)
                                </option>
                                <option value="price-desc">
                                  Price (High to Low)
                                </option>
                                <option value="duration">Duration</option>
                              </select>
                            )}

                            <div className="flex gap-2">
                              <Button
                                variant={
                                  (allProductsStates[section._id]?.layout ||
                                    "grid") === "grid"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => {
                                  setAllProductsStates((prev) => ({
                                    ...prev,
                                    [section._id]: {
                                      ...prev[section._id],
                                      layout: "grid",
                                    },
                                  }));
                                }}
                              >
                                <Grid className="h-4 w-4" />
                              </Button>
                              <Button
                                variant={
                                  allProductsStates[section._id]?.layout ===
                                  "list"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => {
                                  setAllProductsStates((prev) => ({
                                    ...prev,
                                    [section._id]: {
                                      ...prev[section._id],
                                      layout: "list",
                                    },
                                  }));
                                }}
                              >
                                <ListOrdered className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Products Grid/List */}
                        {coursesList.length > 0 ? (
                          <div
                            className={`${
                              (allProductsStates[section._id]?.layout ||
                                "grid") === "list"
                                ? "space-y-4"
                                : "grid grid-cols-1 md:grid-cols-2 gap-8"
                            }`}
                          >
                            {coursesList
                              .filter((course: any) => {
                                const searchTerm =
                                  allProductsStates[
                                    section._id
                                  ]?.searchTerm?.toLowerCase() || "";
                                return (
                                  course.name
                                    .toLowerCase()
                                    .includes(searchTerm) ||
                                  course.description
                                    ?.toLowerCase()
                                    .includes(searchTerm)
                                );
                              })
                              .sort((a: any, b: any) => {
                                const sortBy =
                                  allProductsStates[section._id]?.sortBy ||
                                  "name";
                                switch (sortBy) {
                                  case "name":
                                    return a.name.localeCompare(b.name);
                                  case "name-desc":
                                    return b.name.localeCompare(a.name);
                                  case "price":
                                    return (
                                      parseFloat(a.price || "0") -
                                      parseFloat(b.price || "0")
                                    );
                                  case "price-desc":
                                    return (
                                      parseFloat(b.price || "0") -
                                      parseFloat(a.price || "0")
                                    );
                                  case "duration":
                                    return (
                                      parseFloat(a.duration || "0") -
                                      parseFloat(b.duration || "0")
                                    );
                                  default:
                                    return 0;
                                }
                              })
                              .map((course: any, index: number) =>
                                (allProductsStates[section._id]?.layout ||
                                  "grid") === "list" ? (
                                  // List Layout
                                  <Card key={index} className="overflow-hidden">
                                    <div className="flex">
                                      <div className="w-32 h-32 bg-muted flex items-center justify-center flex-shrink-0">
                                        {course.image ? (
                                          <img
                                            src={course.image}
                                            alt={course.name}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                                        )}
                                      </div>
                                      <div className="flex-1 p-4">
                                        <div className="flex justify-between items-start mb-2">
                                          <h4 className="font-semibold text-lg">
                                            {course.name}
                                          </h4>
                                          <span className="text-xl font-bold text-primary">
                                            ${course.price || "0"}
                                          </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                          {course.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                          <span className="text-sm text-muted-foreground">
                                            {course.duration} hours
                                          </span>
                                          <Button
                                            size="sm"
                                            style={{
                                              backgroundColor: primaryColor,
                                            }}
                                            onClick={() =>
                                              handleViewDetails(course)
                                            }
                                          >
                                            View Details
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                ) : (
                                  // Grid Layout
                                  <Card
                                    key={index}
                                    className="overflow-hidden hover:shadow-lg transition-shadow"
                                  >
                                    <div className="aspect-video bg-muted flex items-center justify-center">
                                      {course.image ? (
                                        <img
                                          src={course.image}
                                          alt={course.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                                      )}
                                    </div>
                                    <div className="p-4">
                                      <h4 className="font-semibold text-lg mb-2 line-clamp-1">
                                        {course.name}
                                      </h4>
                                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {course.description}
                                      </p>
                                      <div className="flex items-center justify-between mb-3">
                                        <span className="text-xl font-bold text-primary">
                                          ${course.price || "0"}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                          {course.duration} hours
                                        </span>
                                      </div>
                                      <Button
                                        className="w-full"
                                        style={{
                                          backgroundColor: primaryColor,
                                        }}
                                        size="sm"
                                        onClick={() =>
                                          handleViewDetails(course)
                                        }
                                      >
                                        View Details
                                      </Button>
                                    </div>
                                  </Card>
                                )
                              )}
                          </div>
                        ) : (
                          <div className="text-center py-16">
                            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h4 className="text-lg font-medium mb-2">
                              No Products Available
                            </h4>
                            <p className="text-muted-foreground">
                              There are no courses available to display as
                              products.
                            </p>
                          </div>
                        )}
                      </section>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </main>

          {/* Footer */}
          <footer
            className="bg-black text-white"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            <div className="max-w-6xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{selectedSite.name}</h3>
                  <p className="text-gray-300 text-sm">
                    Building the future of education with innovative solutions
                    and cutting-edge technology.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Quick Links</h4>
                  <ul className="space-y-2">
                    {selectedSite.pages.map((page: any) => (
                      <li key={page._id}>
                        <button
                          onClick={() => {
                            setActivePage(page._id);
                            setAuthView(null);
                          }}
                          className="text-gray-300 hover:text-white transition-colors text-sm capitalize"
                        >
                          {page.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Services</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        Online Learning
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        Course Management
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        Student Progress
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        Educational Resources
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Contact Us</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-300" />
                      <span className="text-gray-300 text-sm">
                        info@
                        {selectedSite.name.toLowerCase().replace(/\s+/g, "")}
                        .com
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-300" />
                      <span className="text-gray-300 text-sm">
                        +1 (555) 123-4567
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-300" />
                      <span className="text-gray-300 text-sm">
                        123 Education St, Learning City, LC 12345
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-300 text-sm">
                  © {new Date().getFullYear()} {selectedSite.name}. All rights
                  reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
