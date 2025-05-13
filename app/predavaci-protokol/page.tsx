"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronDown, ChevronUp, Filter, Plus, Search, X } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

export default function HandoverProtocolPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock handover protocol data
  const protocols = [
    {
      id: 1,
      vehicle: "Renault Megane E-Tech",
      licensePlate: "1AB 2345",
      type: "pickup",
      date: "2025-05-14",
      user: "Jan Novák",
      organization: "Auto Revue",
      userType: "journalist",
      status: "completed",
    },
    {
      id: 2,
      vehicle: "Dacia Duster",
      licensePlate: "2CD 3456",
      type: "pickup",
      date: "2025-05-21",
      user: "Petr Svoboda",
      organization: "Svět motorů",
      userType: "journalist",
      status: "scheduled",
    },
    {
      id: 3,
      vehicle: "Renault Austral",
      licensePlate: "3EF 4567",
      type: "return",
      date: "2025-05-14",
      user: "Marie Nováková",
      organization: "Instagram",
      userType: "influencer",
      status: "completed",
    },
    {
      id: 4,
      vehicle: "Dacia Spring",
      licensePlate: "4GH 5678",
      type: "pickup",
      date: "2025-05-28",
      user: "Tomáš Novotný",
      organization: "Auto.cz",
      userType: "journalist",
      status: "scheduled",
    },
    {
      id: 5,
      vehicle: "Renault Clio",
      licensePlate: "5IJ 6789",
      type: "return",
      date: "2025-05-07",
      user: "Lucie Černá",
      organization: "YouTube",
      userType: "influencer",
      status: "completed",
    },
  ]

  // Filter protocols based on search term and filters
  const filteredProtocols = protocols.filter((protocol) => {
    const matchesSearch =
      protocol.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocol.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocol.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocol.organization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || protocol.status === statusFilter
    const matchesType = typeFilter === "all" || protocol.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Format date to Czech format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, "d. MMMM yyyy", { locale: cs })
  }

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get status text in Czech
  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Dokončeno"
      case "scheduled":
        return "Naplánováno"
      case "in-progress":
        return "Probíhá"
      case "cancelled":
        return "Zrušeno"
      default:
        return status
    }
  }

  // Get protocol type text and badge style
  const getProtocolTypeInfo = (type) => {
    switch (type) {
      case "pickup":
        return {
          text: "Předání",
          badge: "bg-blue-100 text-blue-800",
        }
      case "return":
        return {
          text: "Vrácení",
          badge: "bg-purple-100 text-purple-800",
        }
      default:
        return {
          text: type,
          badge: "bg-gray-100 text-gray-800",
        }
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
            <Link href="/rezervace" className="text-white hover:text-yellow-100">
              Rezervace
            </Link>
            <Link href="/servis-vozidel" className="text-white hover:text-yellow-100">
              Servis vozidel
            </Link>
            <Link href="/predavaci-protokol" className="text-yellow-400">
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
          <span className="font-medium">Předávací protokol</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Předávací protokoly</h1>
          <div className="flex space-x-4">
            <Link
              href="/predavaci-protokol/novy?typ=pickup"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nový protokol předání
            </Link>
            <Link
              href="/predavaci-protokol/novy?typ=return"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nový protokol vrácení
            </Link>
          </div>
        </div>

        {/* Protocol Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Celkem protokolů</div>
            <div className="text-3xl font-bold">{protocols.length}</div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Předání</div>
            <div className="text-3xl font-bold">{protocols.filter((p) => p.type === "pickup").length}</div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Vrácení</div>
            <div className="text-3xl font-bold">{protocols.filter((p) => p.type === "return").length}</div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Naplánované</div>
            <div className="text-3xl font-bold">{protocols.filter((p) => p.status === "scheduled").length}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Hledat podle vozidla, SPZ nebo uživatele..."
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
              <Filter className="h-4 w-4 mr-2" />
              Filtry
              {filterOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </button>
          </div>

          {filterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="block text-gray-700 mb-2">Status protokolu</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="all">Všechny statusy</option>
                  <option value="completed">Dokončené</option>
                  <option value="scheduled">Naplánované</option>
                  <option value="in-progress">Probíhající</option>
                  <option value="cancelled">Zrušené</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Typ protokolu</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="all">Všechny typy</option>
                  <option value="pickup">Předání</option>
                  <option value="return">Vrácení</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Protocols List */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-gray-500 font-medium">Vozidlo</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Typ protokolu</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Datum</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Uživatel</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Status</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProtocols.length > 0 ? (
                  filteredProtocols.map((protocol) => (
                    <tr key={protocol.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{protocol.vehicle}</div>
                        <div className="text-sm text-gray-500">{protocol.licensePlate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProtocolTypeInfo(protocol.type).badge}`}
                        >
                          {getProtocolTypeInfo(protocol.type).text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{formatDate(protocol.date)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{protocol.user}</div>
                        <div className="text-sm text-gray-500">
                          {protocol.organization} ({protocol.userType === "journalist" ? "Novinář" : "Influencer"})
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(protocol.status)}`}
                        >
                          {getStatusText(protocol.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/predavaci-protokol/${protocol.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      Nebyly nalezeny žádné protokoly odpovídající zadaným kritériím.
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
