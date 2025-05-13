"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Car, ChevronLeft, Download, FileText, User } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

export default function ProtocolDetailPage({ params }) {
  const { id } = params
  const [isEditing, setIsEditing] = useState(false)

  // Mock protocol data
  const protocol = {
    id: Number.parseInt(id),
    vehicle: "Renault Megane E-Tech",
    vehicleId: "1",
    licensePlate: "1AB 2345",
    vin: "VF1RFE00067123456",
    type: "pickup",
    date: "2025-05-14",
    time: "10:30",
    user: "Jan Novák",
    userId: "1",
    organization: "Auto Revue",
    userType: "journalist",
    status: "completed",
    mileage: 15000,
    fuelLevel: "full",
    condition: "excellent",
    damages: "",
    notes: "Vozidlo předáno v bezvadném stavu se všemi náležitostmi.",
    accessories: {
      warningTriangle: true,
      firstAidKit: true,
      spareTire: true,
      jackAndWrench: true,
      userManual: true,
    },
    insuranceConfirmed: true,
    createdBy: "Admin Uživatel",
    createdAt: "2025-05-14T10:35:00",
    protocolNumber: "P2025051401",
  }

  // Format date to Czech format
  const formatDateCzech = (dateString) => {
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

  // Get protocol type text and badge style
  const getProtocolTypeInfo = (type) => {
    switch (type) {
      case "pickup":
        return {
          text: "Předání",
          badge: "bg-blue-100 text-blue-800",
          title: "Protokol o předání vozidla",
        }
      case "return":
        return {
          text: "Vrácení",
          badge: "bg-purple-100 text-purple-800",
          title: "Protokol o vrácení vozidla",
        }
      default:
        return {
          text: type,
          badge: "bg-gray-100 text-gray-800",
          title: "Předávací protokol",
        }
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

  // Get fuel level text
  const getFuelLevelText = (level) => {
    switch (level) {
      case "full":
        return "Plná nádrž"
      case "three-quarters":
        return "3/4 nádrže"
      case "half":
        return "1/2 nádrže"
      case "quarter":
        return "1/4 nádrže"
      case "empty":
        return "Prázdná nádrž"
      default:
        return level
    }
  }

  // Get condition text
  const getConditionText = (condition) => {
    switch (condition) {
      case "excellent":
        return "Výborný"
      case "good":
        return "Dobrý"
      case "average":
        return "Průměrný"
      case "poor":
        return "Špatný"
      default:
        return condition
    }
  }

  const typeInfo = getProtocolTypeInfo(protocol.type)

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
          <Link href="/predavaci-protokol" className="text-gray-500 hover:text-black mr-2">
            Předávací protokol
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          <span className="font-medium">Detail protokolu</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/predavaci-protokol" className="mr-4 text-gray-500 hover:text-black">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold">{typeInfo.title}</h1>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Stáhnout PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Protocol Info */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${typeInfo.badge}`}
                  >
                    {typeInfo.text}
                  </span>
                  <h2 className="text-xl font-bold">Protokol č. {protocol.protocolNumber}</h2>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(protocol.status)}`}
                >
                  {getStatusText(protocol.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Datum a čas</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    {formatDateCzech(protocol.date)}, {protocol.time}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Vytvořeno</p>
                  <p className="font-medium">{formatDateTimeCzech(protocol.createdAt)}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Vozidlo</p>
                  <p className="font-medium flex items-center">
                    <Car className="h-4 w-4 mr-2 text-blue-500" />
                    {protocol.vehicle} ({protocol.licensePlate})
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">VIN</p>
                  <p className="font-mono text-sm">{protocol.vin}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Uživatel</p>
                  <p className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    {protocol.user} ({protocol.organization})
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Typ uživatele</p>
                  <p className="font-medium">{protocol.userType === "journalist" ? "Novinář" : "Influencer"}</p>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="font-medium mb-4">Stav vozidla</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Stav tachometru</p>
                    <p className="font-medium">{protocol.mileage.toLocaleString()} km</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Stav paliva</p>
                    <p className="font-medium">{getFuelLevelText(protocol.fuelLevel)}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Celkový stav</p>
                    <p className="font-medium">{getConditionText(protocol.condition)}</p>
                  </div>
                </div>

                {protocol.damages && (
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm mb-1">Poškození vozidla</p>
                    <p>{protocol.damages}</p>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-2">Příslušenství vozidla</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <div
                        className={`h-4 w-4 rounded border ${
                          protocol.accessories.warningTriangle ? "bg-blue-500 border-blue-500" : "border-gray-300"
                        } mr-2 flex items-center justify-center`}
                      >
                        {protocol.accessories.warningTriangle && (
                          <svg
                            className="h-3 w-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span>Výstražný trojúhelník</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`h-4 w-4 rounded border ${
                          protocol.accessories.firstAidKit ? "bg-blue-500 border-blue-500" : "border-gray-300"
                        } mr-2 flex items-center justify-center`}
                      >
                        {protocol.accessories.firstAidKit && (
                          <svg
                            className="h-3 w-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span>Lékárnička</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`h-4 w-4 rounded border ${
                          protocol.accessories.spareTire ? "bg-blue-500 border-blue-500" : "border-gray-300"
                        } mr-2 flex items-center justify-center`}
                      >
                        {protocol.accessories.spareTire && (
                          <svg
                            className="h-3 w-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span>Rezervní kolo</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`h-4 w-4 rounded border ${
                          protocol.accessories.jackAndWrench ? "bg-blue-500 border-blue-500" : "border-gray-300"
                        } mr-2 flex items-center justify-center`}
                      >
                        {protocol.accessories.jackAndWrench && (
                          <svg
                            className="h-3 w-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span>Zvedák a klíč na kola</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`h-4 w-4 rounded border ${
                          protocol.accessories.userManual ? "bg-blue-500 border-blue-500" : "border-gray-300"
                        } mr-2 flex items-center justify-center`}
                      >
                        {protocol.accessories.userManual && (
                          <svg
                            className="h-3 w-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span>Uživatelská příručka</span>
                    </div>
                  </div>
                </div>

                {protocol.notes && (
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm mb-1">Poznámky</p>
                    <p>{protocol.notes}</p>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-1">Potvrzení pojištění</p>
                  <div className="flex items-center">
                    <div
                      className={`h-4 w-4 rounded border ${
                        protocol.insuranceConfirmed ? "bg-blue-500 border-blue-500" : "border-gray-300"
                      } mr-2 flex items-center justify-center`}
                    >
                      {protocol.insuranceConfirmed && (
                        <svg
                          className="h-3 w-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span>
                      {protocol.type === "pickup"
                        ? "Uživatel byl seznámen s pojištěním vozidla a podmínkami jeho užívání."
                        : "Uživatel potvrdil, že vozidlo bylo vráceno ve výše uvedeném stavu."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-medium mb-4">Podpisy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Předávající / Přebírající</p>
                  <div className="border-b border-gray-400 h-16 flex items-end justify-center pb-2">
                    <p className="font-medium">Admin Uživatel</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-2">Přebírající / Vracející</p>
                  <div className="border-b border-gray-400 h-16 flex items-end justify-center pb-2">
                    <p className="font-medium">{protocol.user}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-medium mb-4">Informace o dokumentu</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Číslo protokolu</p>
                  <p className="font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    {protocol.protocolNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Vytvořil</p>
                  <p className="font-medium">{protocol.createdBy}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Datum vytvoření</p>
                  <p className="font-medium">{formatDateTimeCzech(protocol.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <p className="font-medium">{getStatusText(protocol.status)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h3 className="font-medium mb-4">Související dokumenty</h3>
              {protocol.type === "pickup" ? (
                <div className="text-gray-500 text-sm">Protokol o vrácení vozidla zatím nebyl vytvořen.</div>
              ) : (
                <Link href={`/predavaci-protokol/1`} className="flex items-center text-blue-600 hover:text-blue-800">
                  <FileText className="h-4 w-4 mr-2" />
                  Protokol o předání vozidla
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
