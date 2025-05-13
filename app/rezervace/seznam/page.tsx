"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronDown, ChevronUp, Search, X } from "lucide-react"

export default function ReservationListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock reservation data
  const reservations = [
    {
      id: 1,
      vehicle: "Renault Megane E-Tech",
      fleetType: "PRESS",
      startDate: "2025-05-14",
      endDate: "2025-05-21",
      user: "Jan Novák",
      organization: "Auto Revue",
      type: "journalist",
      status: "active",
    },
    {
      id: 2,
      vehicle: "Dacia Duster",
      fleetType: "FLEET",
      startDate: "2025-05-21",
      endDate: "2025-05-28",
      user: "Petr Svoboda",
      organization: "Svět motorů",
      type: "journalist",
      status: "upcoming",
    },
    {
      id: 3,
      vehicle: "Renault Austral",
      fleetType: "PRESS",
      startDate: "2025-05-07",
      endDate: "2025-05-14",
      user: "Marie Nováková",
      organization: "Instagram",
      type: "influencer",
      status: "completed",
    },
    {
      id: 4,
      vehicle: "Dacia Spring",
      fleetType: "FLEET",
      startDate: "2025-05-28",
      endDate: "2025-06-04",
      user: "Tomáš Novotný",
      organization: "Auto.cz",
      type: "journalist",
      status: "upcoming",
    },
    {
      id: 5,
      vehicle: "Renault Clio",
      fleetType: "PRESS",
      startDate: "2025-04-30",
      endDate: "2025-05-07",
      user: "Lucie Černá",
      organization: "YouTube",
      type: "influencer",
      status: "completed",
    },
  ]

  // Filter reservations based on search term and filters
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.organization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter
    const matchesType = typeFilter === "all" || reservation.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Format date to Czech format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" })
  }

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get status text in Czech
  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Aktivní"
      case "upcoming":
        return "Nadcházející"
      case "completed":
        return "Dokončeno"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-yellow-400 font-bold text-xl">
            Renault Group
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-yellow-100">
              Dashboard
            </Link>
            <Link href="/rezervace" className="text-yellow-400">
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
        <div className="flex items-center mb-6">
          <Link href="/" className="text-gray-500 hover:text-black mr-2">
            Dashboard
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          <Link href="/rezervace" className="text-gray-500 hover:text-black mr-2">
            Rezervace
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          <span className="font-medium">Seznam rezervací</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Seznam rezervací</h1>
          <Link href="/rezervace" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Nová rezervace
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Hledat podle vozidla, uživatele nebo organizace..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center text-gray-700 border rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              Filtry
              {filterOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </button>
          </div>

          {filterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="block text-gray-700 mb-2">Status rezervace</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="all">Všechny statusy</option>
                  <option value="active">Aktivní</option>
                  <option value="upcoming">Nadcházející</option>
                  <option value="completed">Dokončené</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Typ uživatele</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="all">Všechny typy</option>
                  <option value="journalist">Novináři</option>
                  <option value="influencer">Influenceři</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Reservations List */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-gray-500 font-medium">Vozidlo</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Uživatel</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Termín</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Status</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredReservations.length > 0 ? (
                  filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{reservation.vehicle}</div>
                        <div className="text-sm text-gray-500">{reservation.fleetType}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{reservation.user}</div>
                        <div className="text-sm text-gray-500">
                          {reservation.organization} ({reservation.type === "journalist" ? "Novinář" : "Influencer"})
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span>
                            {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(reservation.status)}`}
                        >
                          {getStatusText(reservation.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/rezervace/${reservation.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      Nebyly nalezeny žádné rezervace odpovídající zadaným kritériím.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
