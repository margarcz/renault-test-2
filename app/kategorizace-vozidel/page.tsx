"use client"

import { useState } from "react"
import Link from "next/link"
import { Car, ChevronDown, ChevronUp, Filter, Plus, Search, X } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

export default function VehicleCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [brandFilter, setBrandFilter] = useState("all")
  const [fleetTypeFilter, setFleetTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock categories data
  const categories = [
    {
      id: 1,
      name: "Renault Megane E-Tech PRESS",
      brand: "Renault",
      model: "Megane E-Tech",
      fleetType: "PRESS",
      vehicleCount: 3,
      status: "active",
      features: ["Elektrický pohon", "Plná výbava", "Navigace", "Vyhřívaná sedadla"],
      lastUpdated: "2025-05-01",
    },
    {
      id: 2,
      name: "Dacia Duster FLEET",
      brand: "Dacia",
      model: "Duster",
      fleetType: "FLEET",
      vehicleCount: 2,
      status: "active",
      features: ["Diesel", "Základní výbava", "Klimatizace"],
      lastUpdated: "2025-05-02",
    },
    {
      id: 3,
      name: "Renault Austral PRESS",
      brand: "Renault",
      model: "Austral",
      fleetType: "PRESS",
      vehicleCount: 2,
      status: "active",
      features: ["Hybrid", "Plná výbava", "Panoramatická střecha", "Kožená sedadla"],
      lastUpdated: "2025-05-03",
    },
    {
      id: 4,
      name: "Dacia Spring FLEET",
      brand: "Dacia",
      model: "Spring",
      fleetType: "FLEET",
      vehicleCount: 1,
      status: "active",
      features: ["Elektrický pohon", "Základní výbava", "Klimatizace"],
      lastUpdated: "2025-05-04",
    },
    {
      id: 5,
      name: "Renault Clio PRESS",
      brand: "Renault",
      model: "Clio",
      fleetType: "PRESS",
      vehicleCount: 1,
      status: "inactive",
      features: ["Benzín", "Plná výbava", "Navigace", "Automatická převodovka"],
      lastUpdated: "2025-05-05",
    },
    {
      id: 6,
      name: "Renault Captur FLEET",
      brand: "Renault",
      model: "Captur",
      fleetType: "FLEET",
      vehicleCount: 1,
      status: "active",
      features: ["Hybrid", "Střední výbava", "Navigace"],
      lastUpdated: "2025-05-06",
    },
    {
      id: 7,
      name: "Dacia Jogger PRESS",
      brand: "Dacia",
      model: "Jogger",
      fleetType: "PRESS",
      vehicleCount: 1,
      status: "active",
      features: ["LPG", "Plná výbava", "7 míst", "Střešní nosič"],
      lastUpdated: "2025-05-07",
    },
  ]

  // Filter categories based on search term and filters
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.model.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBrand = brandFilter === "all" || category.brand === brandFilter
    const matchesFleetType = fleetTypeFilter === "all" || category.fleetType === fleetTypeFilter
    const matchesStatus = statusFilter === "all" || category.status === statusFilter

    return matchesSearch && matchesBrand && matchesFleetType && matchesStatus
  })

  // Format date to Czech format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, "d. MMMM yyyy", { locale: cs })
  }

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
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
      case "inactive":
        return "Neaktivní"
      default:
        return status
    }
  }

  // Get fleet type badge style
  const getFleetTypeBadge = (type) => {
    switch (type) {
      case "PRESS":
        return "bg-blue-100 text-blue-800"
      case "FLEET":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
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
            <Link href="/predavaci-protokol" className="text-white hover:text-yellow-100">
              Předávací protokol
            </Link>
            <Link href="/kategorizace-vozidel" className="text-yellow-400">
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
          <span className="font-medium">Kategorizace vozidel</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Kategorizace vozidel</h1>
          <Link
            href="/kategorizace-vozidel/nova"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nová kategorie
          </Link>
        </div>

        {/* Categories Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Celkem kategorií</div>
            <div className="text-3xl font-bold">{categories.length}</div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Renault</div>
            <div className="text-3xl font-bold">{categories.filter((c) => c.brand === "Renault").length}</div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Dacia</div>
            <div className="text-3xl font-bold">{categories.filter((c) => c.brand === "Dacia").length}</div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Celkem vozidel</div>
            <div className="text-3xl font-bold">
              {categories.reduce((sum, category) => sum + category.vehicleCount, 0)}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Hledat podle názvu, značky nebo modelu..."
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="block text-gray-700 mb-2">Značka</label>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="all">Všechny značky</option>
                  <option value="Renault">Renault</option>
                  <option value="Dacia">Dacia</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Typ flotily</label>
                <select
                  value={fleetTypeFilter}
                  onChange={(e) => setFleetTypeFilter(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="all">Všechny typy</option>
                  <option value="PRESS">PRESS</option>
                  <option value="FLEET">FLEET</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="all">Všechny statusy</option>
                  <option value="active">Aktivní</option>
                  <option value="inactive">Neaktivní</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/kategorizace-vozidel/${category.id}`}
                className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFleetTypeBadge(category.fleetType)}`}
                        >
                          {category.fleetType}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(category.status)}`}
                        >
                          {getStatusText(category.status)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Car className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Vozidla v kategorii</p>
                    <p className="font-medium">{category.vehicleCount}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Výbava</p>
                    <div className="flex flex-wrap gap-1">
                      {category.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {feature}
                        </span>
                      ))}
                      {category.features.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{category.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">Poslední aktualizace: {formatDate(category.lastUpdated)}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 bg-white border rounded-lg p-8 text-center">
              <div className="text-gray-500 mb-2">Nebyly nalezeny žádné kategorie odpovídající zadaným kritériím.</div>
              <Link
                href="/kategorizace-vozidel/nova"
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Vytvořit novou kategorii
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
