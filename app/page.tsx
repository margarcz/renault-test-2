"use client"

import { CalendarIcon, Car, CarFront, FileText, PenToolIcon as Tool } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Dashboard() {
  // State for active main tab
  const [activeTab, setActiveTab] = useState("overview")
  // State for active distribution tab
  const [activeDistTab, setActiveDistTab] = useState("distribution")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-yellow-400 font-bold text-xl">
            Renault Group
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-yellow-400">
              Dashboard
            </Link>
            <Link href="/rezervace" className="text-white hover:text-yellow-100">
              Rezervace
            </Link>
            <Link href="/servis-vozidel" className="text-white hover:text-yellow-100">
              Servis vozidel
            </Link>
            <Link href="/predavaci-protokol" className="text-white hover:text-yellow-100">
              Předávací protokol
            </Link>
            <Link href="/kategorizace-vozidel" className="text-white hover:text-yellow-100">
              Kategorizace vozidel
            </Link>
            <Link href="/tydenni-report" className="text-white hover:text-yellow-100">
              Týdenní report
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Správa vozového parku Renault Group</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Vehicles Card */}
          <div
            className="border rounded-lg p-6 flex justify-between items-start cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => (window.location.href = "/vozidla")}
          >
            <div>
              <h3 className="text-gray-600 mb-1">Celkový počet vozidel</h3>
              <p className="text-4xl font-bold mb-2">11</p>
              <p className="text-sm text-gray-500">7 Renault, 4 Dacia</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Car className="h-6 w-6 text-yellow-500" />
            </div>
          </div>

          {/* Available Vehicles Card */}
          <div
            className="border rounded-lg p-6 flex justify-between items-start cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => (window.location.href = "/dostupna-vozidla")}
          >
            <div>
              <h3 className="text-gray-600 mb-1">Dostupná vozidla</h3>
              <p className="text-4xl font-bold mb-2">7</p>
              <p className="text-sm text-gray-500">6 PRESS, 5 FLEET</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CarFront className="h-6 w-6 text-green-500" />
            </div>
          </div>

          {/* Active Reservations Card */}
          <Link
            href="/rezervace/seznam"
            className="border rounded-lg p-6 flex justify-between items-start cursor-pointer hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="text-gray-600 mb-1">Aktivní rezervace</h3>
              <p className="text-4xl font-bold mb-2">10</p>
              <p className="text-sm text-gray-500">13 novinářů, 14 influencerů</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <CalendarIcon className="h-6 w-6 text-blue-500" />
            </div>
          </Link>
        </div>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Service Alert Card */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-4">
                <Tool className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium">Naplánované servisy</h3>
                <p className="text-sm text-gray-600">3 vozidla vyžadují servis v příštích 14 dnech</p>
              </div>
            </div>
            <Link href="/servis-vozidel" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
              Zobrazit detail
            </Link>
          </div>

          {/* Handover Protocol Alert Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Předávací protokoly</h3>
                <p className="text-sm text-gray-600">2 naplánovaná předání vozidel tento týden</p>
              </div>
            </div>
            <Link
              href="/predavaci-protokol"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
            >
              Zobrazit detail
            </Link>
          </div>

          {/* Weekly Report Alert Card */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Týdenní report</h3>
                <p className="text-sm text-gray-600">Nový report je připraven k odeslání</p>
              </div>
            </div>
            <Link href="/tydenni-report" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
              Zobrazit report
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            <button
              className={`px-1 py-4 ${activeTab === "overview" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-black"}`}
              onClick={() => setActiveTab("overview")}
            >
              Přehled
            </button>
            <button
              className={`px-1 py-4 ${activeTab === "availability" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-black"}`}
              onClick={() => setActiveTab("availability")}
            >
              Dostupnost vozidel
            </button>
            <button
              className={`px-1 py-4 ${activeTab === "upcoming" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-black"}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Nadcházející rezervace
            </button>
          </nav>
        </div>

        {/* Dashboard Content based on active tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fleet Distribution */}
            <div className="lg:col-span-2 border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Fleet Distribution</h2>
              <p className="text-gray-500 text-sm mb-6">Overview of vehicle distribution by brand and fleet type</p>

              <div className="border-b mb-4">
                <nav className="flex space-x-8">
                  <button
                    className={`px-1 py-2 ${activeDistTab === "distribution" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-black"}`}
                    onClick={() => setActiveDistTab("distribution")}
                  >
                    Distribution
                  </button>
                  <button
                    className={`px-1 py-2 ${activeDistTab === "status" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-black"}`}
                    onClick={() => setActiveDistTab("status")}
                  >
                    Status
                  </button>
                </nav>
              </div>

              <div className="flex items-center justify-center h-64 text-gray-500">
                {activeDistTab === "distribution"
                  ? "Distribution data will be displayed here"
                  : "Status data will be displayed here"}
              </div>
            </div>

            {/* Fleet Summary */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Fleet Summary</h2>
              <p className="text-gray-500 text-sm mb-6">Key statistics about the vehicle fleet</p>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Total Vehicles</p>
                    <p className="text-4xl font-bold">11</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Available</p>
                    <p className="text-4xl font-bold">7</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">PRESS Fleet</p>
                    <p className="text-4xl font-bold">6</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">FLEET Type</p>
                    <p className="text-4xl font-bold">5</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Renault</p>
                    <p className="text-4xl font-bold">7</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Dacia</p>
                    <p className="text-4xl font-bold">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "availability" && (
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Dostupnost vozidel</h2>
            <p className="text-gray-600">Zde bude zobrazen přehled dostupnosti vozidel podle data a času.</p>
            <div className="mt-8 flex items-center justify-center h-64 border rounded bg-gray-50">
              <p className="text-gray-500">Kalendář dostupnosti vozidel bude zobrazen zde</p>
            </div>
          </div>
        )}

        {activeTab === "upcoming" && (
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Nadcházející rezervace</h2>
            <p className="text-gray-600 mb-4">Zde je zobrazen seznam nadcházejících rezervací vozidel.</p>
            <Link
              href="/rezervace"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 inline-block mb-6"
            >
              Vytvořit novou rezervaci
            </Link>
            <div className="mt-4">
              <div className="border-b py-4">
                <p className="font-medium">Renault Megane E-Tech</p>
                <p className="text-sm text-gray-500">15.5.2025 - 22.5.2025 | Jan Novák (Auto Revue)</p>
              </div>
              <div className="border-b py-4">
                <p className="font-medium">Dacia Duster</p>
                <p className="text-sm text-gray-500">18.5.2025 - 25.5.2025 | Petr Svoboda (Svět motorů)</p>
              </div>
              <div className="border-b py-4">
                <p className="font-medium">Renault Austral</p>
                <p className="text-sm text-gray-500">20.5.2025 - 27.5.2025 | Marie Nováková (influencer)</p>
              </div>
              <div className="text-center mt-4">
                <Link href="/rezervace/seznam" className="text-blue-600 hover:text-blue-800 font-medium">
                  Zobrazit všechny rezervace
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
