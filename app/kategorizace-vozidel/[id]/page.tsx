"use client"

import { useState } from "react"
import Link from "next/link"
import { Car, ChevronLeft, Edit, Loader2, Plus, Trash2, X } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

export default function CategoryDetailPage({ params }) {
  const { id } = params
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [features, setFeatures] = useState([])
  const [vehicles, setVehicles] = useState([])

  // Mock category data
  const [category, setCategory] = useState({
    id: Number.parseInt(id),
    name: "Renault Megane E-Tech PRESS",
    brand: "Renault",
    model: "Megane E-Tech",
    fleetType: "PRESS",
    status: "active",
    description:
      "Plně elektrický Renault Megane E-Tech v nejvyšší výbavě určený pro novináře a mediální partnery. Vozidla jsou vybavena nejnovějšími technologiemi a poskytují maximální komfort.",
    features: [
      "Elektrický pohon",
      "Plná výbava",
      "Navigace",
      "Vyhřívaná sedadla",
      "Kožený interiér",
      "Panoramatická střecha",
      "Adaptivní tempomat",
      "LED světlomety",
    ],
    lastUpdated: "2025-05-01",
    createdBy: "Admin Uživatel",
    createdAt: "2025-04-15T10:30:00",
  })

  // Mock vehicles data
  const mockVehicles = [
    {
      id: 1,
      name: "Renault Megane E-Tech #1",
      licensePlate: "1AB 2345",
      vin: "VF1RFE00067123456",
      status: "available",
      mileage: 15000,
      lastService: "2025-04-20",
    },
    {
      id: 2,
      name: "Renault Megane E-Tech #2",
      licensePlate: "2CD 3456",
      vin: "VF1RFE00067234567",
      status: "reserved",
      mileage: 12500,
      lastService: "2025-04-15",
    },
    {
      id: 3,
      name: "Renault Megane E-Tech #3",
      licensePlate: "3EF 4567",
      vin: "VF1RFE00067345678",
      status: "service",
      mileage: 18200,
      lastService: "2025-05-01",
    },
  ]

  // Initialize state on component mount
  useState(() => {
    setFeatures([...category.features])
    setVehicles(mockVehicles)
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  const addFeature = () => {
    setFeatures([...features, ""])
  }

  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index)
    setFeatures(newFeatures)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Update category with new features
    setCategory((prev) => ({
      ...prev,
      features: features.filter((f) => f.trim() !== ""),
      lastUpdated: new Date().toISOString().split("T")[0],
    }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsDeleting(false)
    // Redirect to categories list
    window.location.href = "/kategorizace-vozidel"
  }

  // Format date to Czech format
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return format(date, "d. MMMM yyyy", { locale: cs })
  }

  // Format datetime to Czech format
  const formatDateTimeCzech = (dateTimeString) => {
    if (!dateTimeString) return ""
    const date = new Date(dateTimeString)
    return format(date, "d. MMMM yyyy, HH:mm", { locale: cs })
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

  // Get vehicle status badge style
  const getVehicleStatusBadge = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "reserved":
        return "bg-blue-100 text-blue-800"
      case "service":
        return "bg-yellow-100 text-yellow-800"
      case "unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get vehicle status text in Czech
  const getVehicleStatusText = (status) => {
    switch (status) {
      case "available":
        return "Dostupné"
      case "reserved":
        return "Rezervované"
      case "service":
        return "V servisu"
      case "unavailable":
        return "Nedostupné"
      default:
        return status
    }
  }

  // Renault and Dacia models
  const brandModels = {
    Renault: ["Megane E-Tech", "Austral", "Clio", "Captur", "Arkana", "Espace", "Scenic", "Trafic", "Master", "Kangoo"],
    Dacia: ["Duster", "Sandero", "Spring", "Jogger", "Logan"],
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
          <Link href="/kategorizace-vozidel" className="text-gray-500 hover:text-black mr-2">
            Kategorizace vozidel
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          <span className="font-medium">Detail kategorie</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/kategorizace-vozidel" className="mr-4 text-gray-500 hover:text-black">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold">Detail kategorie vozidel</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Zrušit úpravy" : "Upravit"}
            </button>
            <button
              onClick={() => setIsDeleting(true)}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Smazat
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Smazat kategorii</h2>
              <p className="mb-6">
                Opravdu chcete smazat kategorii "{category.name}"? Tato akce je nevratná a odstraní všechna přiřazení
                vozidel k této kategorii.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDeleting(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
                >
                  Zrušit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mazání...
                    </>
                  ) : (
                    "Smazat"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Category Info */}
          <div className="lg:col-span-2">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="bg-white border rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Název kategorie *</label>
                    <input
                      type="text"
                      name="name"
                      value={category.name}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={category.status}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="active">Aktivní</option>
                      <option value="inactive">Neaktivní</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Značka *</label>
                    <select
                      name="brand"
                      value={category.brand}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    >
                      <option value="Renault">Renault</option>
                      <option value="Dacia">Dacia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Model *</label>
                    <select
                      name="model"
                      value={category.model}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    >
                      <option value="">Vyberte model</option>
                      {brandModels[category.brand].map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Typ flotily *</label>
                    <select
                      name="fleetType"
                      value={category.fleetType}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    >
                      <option value="PRESS">PRESS (plná výbava)</option>
                      <option value="FLEET">FLEET (cenově výhodnější)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Popis kategorie</label>
                  <textarea
                    name="description"
                    value={category.description}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 h-24"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-gray-700">Výbava a vlastnosti</label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Přidat položku
                    </button>
                  </div>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="w-full border rounded-lg p-2"
                          placeholder={`Položka výbavy ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-2 text-gray-400 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded mr-4 hover:bg-gray-50"
                  >
                    Zrušit
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-6 py-2 rounded flex items-center disabled:bg-gray-400"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Ukládání...
                      </>
                    ) : (
                      "Uložit změny"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getFleetTypeBadge(category.fleetType)}`}
                    >
                      {category.fleetType}
                    </span>
                    <h2 className="text-xl font-bold">{category.name}</h2>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(category.status)}`}
                  >
                    {getStatusText(category.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Značka a model</p>
                    <p className="font-medium flex items-center">
                      <Car className="h-4 w-4 mr-2 text-blue-500" />
                      {category.brand} {category.model}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Poslední aktualizace</p>
                    <p className="font-medium">{formatDate(category.lastUpdated)}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Vytvořeno</p>
                    <p className="font-medium">{formatDateTimeCzech(category.createdAt)}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Vytvořil</p>
                    <p className="font-medium">{category.createdBy}</p>
                  </div>
                </div>

                {category.description && (
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm mb-1">Popis kategorie</p>
                    <p>{category.description}</p>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-2">Výbava a vlastnosti</p>
                  <div className="flex flex-wrap gap-2">
                    {category.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Vozidla v kategorii</h3>
                <Link
                  href={`/vozidla/nove?kategorie=${category.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Přidat vozidlo
                </Link>
              </div>

              {vehicles.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-4 py-2 text-gray-500 font-medium">Vozidlo</th>
                        <th className="px-4 py-2 text-gray-500 font-medium">SPZ</th>
                        <th className="px-4 py-2 text-gray-500 font-medium">Stav tachometru</th>
                        <th className="px-4 py-2 text-gray-500 font-medium">Status</th>
                        <th className="px-4 py-2 text-gray-500 font-medium">Poslední servis</th>
                        <th className="px-4 py-2 text-gray-500 font-medium">Akce</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{vehicle.name}</td>
                          <td className="px-4 py-3">{vehicle.licensePlate}</td>
                          <td className="px-4 py-3">{vehicle.mileage.toLocaleString()} km</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVehicleStatusBadge(vehicle.status)}`}
                            >
                              {getVehicleStatusText(vehicle.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3">{formatDate(vehicle.lastService)}</td>
                          <td className="px-4 py-3">
                            <Link
                              href={`/vozidla/${vehicle.id}`}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Detail
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">V této kategorii zatím nejsou žádná vozidla.</p>
                  <Link
                    href={`/vozidla/nove?kategorie=${category.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Přidat vozidlo
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-medium mb-4">Statistiky kategorie</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Celkem vozidel</p>
                  <p className="text-2xl font-bold">{vehicles.length}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Dostupná vozidla</p>
                  <p className="text-2xl font-bold">{vehicles.filter((v) => v.status === "available").length}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Rezervovaná vozidla</p>
                  <p className="text-2xl font-bold">{vehicles.filter((v) => v.status === "reserved").length}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Vozidla v servisu</p>
                  <p className="text-2xl font-bold">{vehicles.filter((v) => v.status === "service").length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h3 className="font-medium mb-4">Akce</h3>
              <div className="space-y-3">
                <Link
                  href={`/vozidla/nove?kategorie=${category.id}`}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Přidat vozidlo do kategorie
                </Link>
                <Link
                  href={`/rezervace?kategorie=${category.id}`}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Vytvořit rezervaci pro tuto kategorii
                </Link>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Upravit kategorii
                </button>
                <button
                  onClick={() => setIsDeleting(true)}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Smazat kategorii
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
