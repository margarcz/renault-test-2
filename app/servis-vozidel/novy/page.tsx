"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronLeft, Loader2 } from "lucide-react"

export default function NewServiceRecordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    vehicleId: "",
    serviceType: "",
    description: "",
    date: "",
    mileage: "",
    cost: "",
    notes: "",
    serviceProvider: "",
    invoiceNumber: "",
  })

  // Mock vehicles data
  const vehicles = [
    { id: "1", name: "Renault Megane E-Tech", licensePlate: "1AB 2345", vin: "VF1RFE00067123456" },
    { id: "2", name: "Dacia Duster", licensePlate: "2CD 3456", vin: "UU1HSDCVG67234567" },
    { id: "3", name: "Renault Austral", licensePlate: "3EF 4567", vin: "VF1FWERG067345678" },
    { id: "4", name: "Dacia Spring", licensePlate: "4GH 5678", vin: "UU1DSPRG067456789" },
    { id: "5", name: "Renault Clio", licensePlate: "5IJ 6789", vin: "VF1CLIO0067567890" },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSuccess(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        vehicleId: "",
        serviceType: "",
        description: "",
        date: "",
        mileage: "",
        cost: "",
        notes: "",
        serviceProvider: "",
        invoiceNumber: "",
      })
    }, 3000)
  }

  const selectedVehicle = vehicles.find((v) => v.id === formData.vehicleId)

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
          <Link href="/servis-vozidel" className="text-gray-500 hover:text-black mr-2">
            Servis vozidel
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          <span className="font-medium">Nový servisní záznam</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Nový servisní záznam</h1>
          <Link href="/servis-vozidel" className="flex items-center text-gray-600 hover:text-black">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Zpět na přehled
          </Link>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-2">Servisní záznam byl úspěšně vytvořen</h2>
            <p className="text-green-700 mb-4">Záznam byl přidán do systému.</p>
            <Link href="/servis-vozidel" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Zpět na přehled servisu
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Vozidlo *</label>
                <select
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Vyberte vozidlo</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} ({vehicle.licensePlate})
                    </option>
                  ))}
                </select>
              </div>

              {selectedVehicle && (
                <div>
                  <label className="block text-gray-700 mb-2">VIN</label>
                  <input
                    type="text"
                    value={selectedVehicle.vin}
                    className="w-full border rounded-lg p-2 bg-gray-50"
                    disabled
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Typ servisu *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Vyberte typ servisu</option>
                  <option value="regular">Pravidelný servis</option>
                  <option value="repair">Oprava</option>
                  <option value="tire">Výměna pneumatik</option>
                  <option value="inspection">STK</option>
                  <option value="other">Jiné</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Datum servisu *</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2 pl-10"
                    required
                  />
                  <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Stav tachometru (km) *</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Např. 15000"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Popis servisu *</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
                placeholder="Stručný popis servisního úkonu"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Servisní partner</label>
                <input
                  type="text"
                  name="serviceProvider"
                  value={formData.serviceProvider}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Název servisu"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Číslo faktury</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Např. 2025001234"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Náklady (Kč) *</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Např. 4500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Poznámky</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2 h-24"
                placeholder="Další informace o servisu..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <Link
                href="/servis-vozidel"
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded mr-4 hover:bg-gray-50"
              >
                Zrušit
              </Link>
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
                  "Uložit záznam"
                )}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
