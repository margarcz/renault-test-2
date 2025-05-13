"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Download, Mail, Printer, Settings, X } from "lucide-react"
import { format, subDays, addDays } from "date-fns"
import { cs } from "date-fns/locale"

export default function WeeklyReportPage() {
  const [activeTab, setActiveTab] = useState("current")
  const [emailSettingsOpen, setEmailSettingsOpen] = useState(false)
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    sendDay: "monday",
    sendTime: "08:00",
    recipients: "novak@autorevue.cz, svoboda@svetmotoru.cz, info@renault.cz",
    subject: "Týdenní report vozového parku Renault Group - {date}",
    includeAvailability: true,
    includeReservations: true,
    includeService: true,
  })

  // Current date for the report
  const currentDate = new Date()
  const startDate = subDays(currentDate, currentDate.getDay() - 1) // Monday of current week
  const endDate = addDays(startDate, 6) // Sunday of current week

  // Format date range
  const formatDateRange = (start, end) => {
    return `${format(start, "d. MMMM", { locale: cs })} - ${format(end, "d. MMMM yyyy", { locale: cs })}`
  }

  // Mock data for reports
  const reports = [
    {
      id: 1,
      period: formatDateRange(subDays(startDate, 7), subDays(endDate, 7)),
      createdAt: subDays(currentDate, 7),
      sentTo: 15,
      status: "sent",
    },
    {
      id: 2,
      period: formatDateRange(subDays(startDate, 14), subDays(endDate, 14)),
      createdAt: subDays(currentDate, 14),
      sentTo: 15,
      status: "sent",
    },
    {
      id: 3,
      period: formatDateRange(subDays(startDate, 21), subDays(endDate, 21)),
      createdAt: subDays(currentDate, 21),
      sentTo: 14,
      status: "sent",
    },
    {
      id: 4,
      period: formatDateRange(subDays(startDate, 28), subDays(endDate, 28)),
      createdAt: subDays(currentDate, 28),
      sentTo: 14,
      status: "sent",
    },
  ]

  // Mock data for current report
  const currentReport = {
    period: formatDateRange(startDate, endDate),
    summary: {
      totalVehicles: 11,
      availableVehicles: 7,
      reservedVehicles: 3,
      inServiceVehicles: 1,
    },
    fleetDistribution: {
      renault: 7,
      dacia: 4,
      press: 6,
      fleet: 5,
    },
    upcomingReservations: [
      {
        id: 1,
        vehicle: "Renault Megane E-Tech",
        user: "Jan Novák",
        organization: "Auto Revue",
        startDate: addDays(currentDate, 2),
        endDate: addDays(currentDate, 9),
      },
      {
        id: 2,
        vehicle: "Dacia Duster",
        user: "Petr Svoboda",
        organization: "Svět motorů",
        startDate: addDays(currentDate, 4),
        endDate: addDays(currentDate, 11),
      },
      {
        id: 3,
        vehicle: "Renault Austral",
        user: "Marie Nováková",
        organization: "Instagram",
        startDate: addDays(currentDate, 5),
        endDate: addDays(currentDate, 12),
      },
    ],
    serviceSchedule: [
      {
        id: 1,
        vehicle: "Renault Clio",
        type: "regular",
        date: addDays(currentDate, 3),
        provider: "Renault Servis Praha",
      },
      {
        id: 2,
        vehicle: "Dacia Spring",
        type: "tire",
        date: addDays(currentDate, 7),
        provider: "Pneuservis Rychlý",
      },
    ],
    vehicleAvailability: [
      { day: "Pondělí", available: 7, reserved: 3, service: 1 },
      { day: "Úterý", available: 7, reserved: 3, service: 1 },
      { day: "Středa", available: 6, reserved: 4, service: 1 },
      { day: "Čtvrtek", available: 5, reserved: 5, service: 1 },
      { day: "Pátek", available: 5, reserved: 5, service: 1 },
      { day: "Sobota", available: 5, reserved: 5, service: 1 },
      { day: "Neděle", available: 5, reserved: 5, service: 1 },
    ],
  }

  // Format date
  const formatDate = (date) => {
    return format(date, "d. MMMM yyyy", { locale: cs })
  }

  // Handle email settings change
  const handleEmailSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setEmailSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Handle save email settings
  const handleSaveEmailSettings = (e) => {
    e.preventDefault()
    // Here you would save the settings to your backend
    setEmailSettingsOpen(false)
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
            <Link href="/kategorizace-vozidel" className="text-white hover:text-yellow-100">
              Kategorizace vozidel
            </Link>
            <Link href="/tydenni-report" className="text-yellow-400">
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
          <span className="font-medium">Týdenní report</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Týdenní report</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setEmailSettingsOpen(true)}
              className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
            >
              <Settings className="h-4 w-4 mr-2" />
              Nastavení e-mailu
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
            >
              <Printer className="h-4 w-4 mr-2" />
              Tisk
            </button>
            <button className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Email Settings Modal */}
        {emailSettingsOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Nastavení e-mailových reportů</h2>
                <button onClick={() => setEmailSettingsOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEmailSettings}>
                <div className="mb-4">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="enabled"
                      name="enabled"
                      checked={emailSettings.enabled}
                      onChange={handleEmailSettingsChange}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="enabled" className="ml-2 font-medium">
                      Povolit automatické odesílání týdenních reportů
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Den odeslání</label>
                    <select
                      name="sendDay"
                      value={emailSettings.sendDay}
                      onChange={handleEmailSettingsChange}
                      className="w-full border rounded-lg p-2"
                      disabled={!emailSettings.enabled}
                    >
                      <option value="monday">Pondělí</option>
                      <option value="tuesday">Úterý</option>
                      <option value="wednesday">Středa</option>
                      <option value="thursday">Čtvrtek</option>
                      <option value="friday">Pátek</option>
                      <option value="saturday">Sobota</option>
                      <option value="sunday">Neděle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Čas odeslání</label>
                    <input
                      type="time"
                      name="sendTime"
                      value={emailSettings.sendTime}
                      onChange={handleEmailSettingsChange}
                      className="w-full border rounded-lg p-2"
                      disabled={!emailSettings.enabled}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Příjemci (e-maily oddělené čárkou)</label>
                  <textarea
                    name="recipients"
                    value={emailSettings.recipients}
                    onChange={handleEmailSettingsChange}
                    className="w-full border rounded-lg p-2 h-24"
                    placeholder="email1@example.com, email2@example.com"
                    disabled={!emailSettings.enabled}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Předmět e-mailu</label>
                  <input
                    type="text"
                    name="subject"
                    value={emailSettings.subject}
                    onChange={handleEmailSettingsChange}
                    className="w-full border rounded-lg p-2"
                    placeholder="Týdenní report vozového parku - {date}"
                    disabled={!emailSettings.enabled}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Použijte {"{date}"} pro automatické vložení data reportu.
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Obsah reportu</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeAvailability"
                        name="includeAvailability"
                        checked={emailSettings.includeAvailability}
                        onChange={handleEmailSettingsChange}
                        className="h-4 w-4 text-blue-600 rounded"
                        disabled={!emailSettings.enabled}
                      />
                      <label htmlFor="includeAvailability" className="ml-2">
                        Dostupnost vozidel
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeReservations"
                        name="includeReservations"
                        checked={emailSettings.includeReservations}
                        onChange={handleEmailSettingsChange}
                        className="h-4 w-4 text-blue-600 rounded"
                        disabled={!emailSettings.enabled}
                      />
                      <label htmlFor="includeReservations" className="ml-2">
                        Nadcházející rezervace
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeService"
                        name="includeService"
                        checked={emailSettings.includeService}
                        onChange={handleEmailSettingsChange}
                        className="h-4 w-4 text-blue-600 rounded"
                        disabled={!emailSettings.enabled}
                      />
                      <label htmlFor="includeService" className="ml-2">
                        Plánované servisy
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEmailSettingsOpen(false)}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
                  >
                    Zrušit
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                    onClick={() => {
                      // Here you would send a test email
                      alert("Testovací e-mail byl odeslán.")
                    }}
                    disabled={!emailSettings.enabled}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Odeslat testovací e-mail
                  </button>
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    Uložit nastavení
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            <button
              className={`px-1 py-4 ${activeTab === "current" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-black"}`}
              onClick={() => setActiveTab("current")}
            >
              Aktuální report
            </button>
            <button
              className={`px-1 py-4 ${activeTab === "history" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-black"}`}
              onClick={() => setActiveTab("history")}
            >
              Historie reportů
            </button>
          </nav>
        </div>

        {/* Current Report Tab */}
        {activeTab === "current" && (
          <div>
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Report za období: {currentReport.period}</h2>
                  <p className="text-gray-500">Aktuální stav vozového parku Renault Group</p>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Vygenerováno: {formatDate(currentDate)}</span>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 border rounded-lg p-6">
                  <div className="text-sm text-gray-500 mb-1">Celkem vozidel</div>
                  <div className="text-3xl font-bold">{currentReport.summary.totalVehicles}</div>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-lg p-6">
                  <div className="text-sm text-gray-500 mb-1">Dostupná vozidla</div>
                  <div className="text-3xl font-bold">{currentReport.summary.availableVehicles}</div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                  <div className="text-sm text-gray-500 mb-1">Rezervovaná vozidla</div>
                  <div className="text-3xl font-bold">{currentReport.summary.reservedVehicles}</div>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
                  <div className="text-sm text-gray-500 mb-1">Vozidla v servisu</div>
                  <div className="text-3xl font-bold">{currentReport.summary.inServiceVehicles}</div>
                </div>
              </div>

              {/* Fleet Distribution */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Rozdělení vozového parku</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-medium mb-4">Podle značky</h4>
                    <div className="flex items-center justify-center h-48">
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-2">{currentReport.fleetDistribution.renault}</div>
                          <div className="text-gray-500">Renault</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-2">{currentReport.fleetDistribution.dacia}</div>
                          <div className="text-gray-500">Dacia</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-medium mb-4">Podle typu flotily</h4>
                    <div className="flex items-center justify-center h-48">
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-2">{currentReport.fleetDistribution.press}</div>
                          <div className="text-gray-500">PRESS</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-2">{currentReport.fleetDistribution.fleet}</div>
                          <div className="text-gray-500">FLEET</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Reservations */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Nadcházející rezervace</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-3 text-gray-500 font-medium">Vozidlo</th>
                        <th className="px-6 py-3 text-gray-500 font-medium">Uživatel</th>
                        <th className="px-6 py-3 text-gray-500 font-medium">Organizace</th>
                        <th className="px-6 py-3 text-gray-500 font-medium">Termín</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {currentReport.upcomingReservations.map((reservation) => (
                        <tr key={reservation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{reservation.vehicle}</td>
                          <td className="px-6 py-4">{reservation.user}</td>
                          <td className="px-6 py-4">{reservation.organization}</td>
                          <td className="px-6 py-4">
                            {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Service Schedule */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Plánované servisy</h3>
                {currentReport.serviceSchedule.length > 0 ? (
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-left">
                        <tr>
                          <th className="px-6 py-3 text-gray-500 font-medium">Vozidlo</th>
                          <th className="px-6 py-3 text-gray-500 font-medium">Typ servisu</th>
                          <th className="px-6 py-3 text-gray-500 font-medium">Datum</th>
                          <th className="px-6 py-3 text-gray-500 font-medium">Servisní partner</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {currentReport.serviceSchedule.map((service) => (
                          <tr key={service.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{service.vehicle}</td>
                            <td className="px-6 py-4">
                              {service.type === "regular"
                                ? "Pravidelný servis"
                                : service.type === "tire"
                                  ? "Výměna pneumatik"
                                  : service.type}
                            </td>
                            <td className="px-6 py-4">{formatDate(service.date)}</td>
                            <td className="px-6 py-4">{service.provider}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-white border rounded-lg p-6 text-center text-gray-500">
                    Žádné plánované servisy v tomto týdnu.
                  </div>
                )}
              </div>

              {/* Vehicle Availability */}
              <div>
                <h3 className="text-lg font-bold mb-4">Dostupnost vozidel v průběhu týdne</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-3 text-gray-500 font-medium">Den</th>
                        <th className="px-6 py-3 text-gray-500 font-medium">Dostupná</th>
                        <th className="px-6 py-3 text-gray-500 font-medium">Rezervovaná</th>
                        <th className="px-6 py-3 text-gray-500 font-medium">V servisu</th>
                        <th className="px-6 py-3 text-gray-500 font-medium">Celkem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {currentReport.vehicleAvailability.map((day, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{day.day}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {day.available}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {day.reserved}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {day.service}
                            </span>
                          </td>
                          <td className="px-6 py-4">{day.available + day.reserved + day.service}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  // Here you would send the report via email
                  alert("Report byl odeslán e-mailem.")
                }}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Odeslat e-mailem
              </button>
              <div className="flex space-x-4">
                <button
                  onClick={() => window.print()}
                  className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Tisk
                </button>
                <button className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div>
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-gray-500 font-medium">Období</th>
                    <th className="px-6 py-3 text-gray-500 font-medium">Vytvořeno</th>
                    <th className="px-6 py-3 text-gray-500 font-medium">Odesláno</th>
                    <th className="px-6 py-3 text-gray-500 font-medium">Status</th>
                    <th className="px-6 py-3 text-gray-500 font-medium">Akce</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{report.period}</td>
                      <td className="px-6 py-4">{formatDate(report.createdAt)}</td>
                      <td className="px-6 py-4">{report.sentTo} příjemců</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === "sent"
                              ? "bg-green-100 text-green-800"
                              : report.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {report.status === "sent" ? "Odesláno" : report.status === "pending" ? "Čeká" : report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <Link
                            href={`/tydenni-report/${report.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Zobrazit
                          </Link>
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
