"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Car, ChevronLeft, Edit, FileText, PenToolIcon as Tool } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

export default function ServiceDetailPage({ params }) {
  const { id } = params
  const [isEditing, setIsEditing] = useState(false)

  // Mock service record data
  const serviceRecord = {
    id: Number.parseInt(id),
    vehicle: "Renault Megane E-Tech",
    vehicleId: "1",
    licensePlate: "1AB 2345",
    vin: "VF1RFE00067123456",
    serviceType: "regular",
    description: "Pravidelná servisní prohlídka",
    date: "2025-05-10",
    status: "completed",
    mileage: 15000,
    cost: 4500,
    notes: "Výměna oleje, filtrů a kontrola brzdového systému. Vozidlo je v dobrém technickém stavu.",
    serviceProvider: "Renault Servis Praha",
    invoiceNumber: "2025001234",
    nextServiceDate: "2025-11-10",
    nextServiceMileage: 30000,
    completedItems: [
      "Výměna motorového oleje a filtru",
      "Výměna vzduchového filtru",
      "Kontrola brzdového systému",
      "Kontrola podvozku",
      "Kontrola světel a elektrických systémů",
    ],
  }

  // Format date to Czech format
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return format(date, "d. MMMM yyyy", { locale: cs })
  }

  // Format cost with currency
  const formatCost = (cost) => {
    return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK" }).format(cost)
  }

  // Get service type text
  const getServiceTypeText = (type) => {
    switch (type) {
      case "regular":
        return "Pravidelný servis"
      case "repair":
        return "Oprava"
      case "tire":
        return "Výměna pneumatik"
      case "inspection":
        return "STK"
      default:
        return type
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
          <span className="font-medium">Detail servisu</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/servis-vozidel" className="mr-4 text-gray-500 hover:text-black">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold">Detail servisního záznamu</h1>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            <Edit className="h-4 w-4 mr-2" />
            Upravit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Service Info */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{serviceRecord.description}</h2>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(serviceRecord.status)}`}
                >
                  {getStatusText(serviceRecord.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 text-sm">Typ servisu</p>
                  <p className="font-medium flex items-center">
                    <Tool className="h-4 w-4 mr-2 text-blue-500" />
                    {getServiceTypeText(serviceRecord.serviceType)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Datum servisu</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    {formatDate(serviceRecord.date)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Stav tachometru</p>
                  <p className="font-medium">{serviceRecord.mileage.toLocaleString()} km</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Náklady</p>
                  <p className="font-medium">{formatCost(serviceRecord.cost)}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Servisní partner</p>
                  <p className="font-medium">{serviceRecord.serviceProvider || "Neuvedeno"}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Číslo faktury</p>
                  <p className="font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    {serviceRecord.invoiceNumber || "Neuvedeno"}
                  </p>
                </div>
              </div>

              {serviceRecord.notes && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-gray-500 text-sm mb-2">Poznámky</p>
                  <p>{serviceRecord.notes}</p>
                </div>
              )}
            </div>

            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Provedené úkony</h3>
              <ul className="space-y-2">
                {serviceRecord.completedItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Příští servis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 text-sm">Doporučené datum</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    {formatDate(serviceRecord.nextServiceDate)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Doporučený stav tachometru</p>
                  <p className="font-medium">{serviceRecord.nextServiceMileage.toLocaleString()} km</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Info Sidebar */}
          <div>
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Informace o vozidle</h3>
              <div className="flex items-center mb-4">
                <Car className="h-10 w-10 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">{serviceRecord.vehicle}</p>
                  <p className="text-sm text-gray-500">{serviceRecord.licensePlate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">VIN</p>
                  <p className="font-mono text-sm">{serviceRecord.vin}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Aktuální stav tachometru</p>
                  <p className="font-medium">{serviceRecord.mileage.toLocaleString()} km</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/vozidla/${serviceRecord.vehicleId}`}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Detail vozidla
                </Link>
              </div>
            </div>

            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Historie servisu</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <div>
                    <p className="text-sm">10.05.2025</p>
                    <p className="font-medium">Pravidelná servisní prohlídka</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <div>
                    <p className="text-sm">15.11.2024</p>
                    <p className="font-medium">Výměna pneumatik - zimní</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <div>
                    <p className="text-sm">10.05.2024</p>
                    <p className="font-medium">Pravidelná servisní prohlídka</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href={`/servis-vozidel?vehicle=${serviceRecord.vehicleId}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Zobrazit celou historii
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
