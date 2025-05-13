"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronDown, ChevronUp, Filter, Plus, Search, PenToolIcon as Tool, X } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

export default function VehicleServicePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock service data
  const serviceRecords = [
    {
      id: 1,
      vehicle: "Renault Megane E-Tech",
      licensePlate: "1AB 2345",
      serviceType: "regular",
      description: "Pravidelná servisní prohlídka",
      date: "2025-05-10",
      status: "completed",
      mileage: 15000,
      cost: 4500,
    },
    {
      id: 2,
      vehicle: "Dacia Duster",
      licensePlate: "2CD 3456",
      serviceType: "repair",
      description: "Výměna brzdových destiček",
      date: "2025-05-15",
      status: "scheduled",
      mileage: 22500,
      cost: 3200,
    },
    {
      id: 3,
      vehicle: "Renault Austral",
      licensePlate: "3EF 4567",
      serviceType: "tire",
      description: "Výměna pneumatik - letní",
      date: "2025-05-05",
      status: "completed",
      mileage: 18700,
      cost: 8000,
    },
    {
      id: 4,
      vehicle: "Dacia Spring",
      licensePlate: "4GH 5678",
      serviceType: "repair",
      description: "Oprava klimatizace",
      date: "2025-05-20",
      status: "scheduled",
      mileage: 9800,
      cost: 5500,
    },
    {
      id: 5,
      vehicle: "Renault Clio",
      licensePlate: "5IJ 6789",
      serviceType: "regular",
      description: "Pravidelná servisní prohlídka",
      date: "2025-05-08",
      status: "completed",
      mileage: 30200,
      cost: 3800,
    },
    {
      id: 6,
      vehicle: "Renault Megane E-Tech",
      licensePlate: "1AB 2345",
      serviceType: "repair",
      description: "Diagnostika a aktualizace software",
      date: "2025-05-25",
      status: "scheduled",
      mileage: 16500,
      cost: 1200,
    },
  ]

  // Filter service records based on search term and filters
  const filteredRecords = serviceRecords.filter((record) => {
    const matchesSearch =
      record.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesType = typeFilter === "all" || record.serviceType === typeFilter

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

  // Get service type text and icon
  const getServiceTypeInfo = (type) => {
    switch (type) {
      case "regular":
        return {
          text: "Pravidelný servis",
          icon: <Tool className="h-4 w-4 text-blue-500" />,
        }
      case "repair":
        return {
          text: "Oprava",
          icon: <Tool className="h-4 w-4 text-red-500" />,
        }
      case "tire":
        return {
          text: "Pneumatiky",
          icon: <Tool className="h-4 w-4 text-green-500" />,
        }
      default:
        return {
          text: type,
          icon: <Tool className="h-4 w-4 text-gray-500" />,
        }
    }
  }

  // Format cost with currency
  const formatCost = (cost) => {
    return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK" }).format(cost)
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
            <Link href="/servis-vozidel" className="text-yellow-400">
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
          <span className="font-medium">Servis vozidel</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Servis vozidel</h1>
          <Link
            href="/servis-vozidel/novy"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nový servisní záznam
          </Link>
        </div>

        {/* Service Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Celkem servisních záznamů</div>
            <div className="text-3xl font-bold">{serviceRecords.length}</div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Naplánované servisy</div>
            <div className="text-3xl font-bold">{serviceRecords.filter((r) => r.status === "scheduled").length}</div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Dokončené servisy</div>
            <div className="text-3xl font-bold">{serviceRecords.filter((r) => r.status === "completed").length}</div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Celkové náklady</div>
            <div className="text-3xl font-bold">
              {formatCost(serviceRecords.reduce((sum, record) => sum + record.cost, 0))}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Hledat podle vozidla, SPZ nebo popisu..."
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
                <label className="block text-gray-700 mb-2">Status servisu</label>
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
                <label className="block text-gray-700 mb-2">Typ servisu</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="all">Všechny typy</option>
                  <option value="regular">Pravidelný servis</option>
                  <option value="repair">Oprava</option>
                  <option value="tire">Pneumatiky</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Service Records List */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-gray-500 font-medium">Vozidlo</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Typ servisu</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Datum</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Stav tachometru</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Náklady</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Status</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{record.vehicle}</div>
                        <div className="text-sm text-gray-500">{record.licensePlate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getServiceTypeInfo(record.serviceType).icon}
                          <span className="ml-2">{getServiceTypeInfo(record.serviceType).text}</span>
                        </div>
                        <div className="text-sm text-gray-500">{record.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{formatDate(record.date)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{record.mileage.toLocaleString()} km</td>
                      <td className="px-6 py-4">{formatCost(record.cost)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}
                        >
                          {getStatusText(record.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/servis-vozidel/${record.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                      Nebyly nalezeny žádné servisní záznamy odpovídající zadaným kritériím.
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
