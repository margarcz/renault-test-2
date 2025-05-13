"use client"
import Link from "next/link"
import { Calendar, ChevronLeft, Download, Mail, Printer } from "lucide-react"
import { format, subDays, addDays } from "date-fns"
import { cs } from "date-fns/locale"

export default function ReportDetailPage({ params }) {
  const { id } = params

  // Current date for the report
  const currentDate = new Date()
  const reportDate = subDays(currentDate, Number(id) * 7) // Go back id * 7 days
  const startDate = subDays(reportDate, reportDate.getDay() - 1) // Monday of that week
  const endDate = addDays(startDate, 6) // Sunday of that week

  // Format date range
  const formatDateRange = (start, end) => {
    return `${format(start, "d. MMMM", { locale: cs })} - ${format(end, "d. MMMM yyyy", { locale: cs })}`
  }

  // Mock data for the report
  const report = {
    id: Number.parseInt(id),
    period: formatDateRange(startDate, endDate),
    createdAt: reportDate,
    sentTo: 15,
    status: "sent",
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
        startDate: addDays(reportDate, 2),
        endDate: addDays(reportDate, 9),
      },
      {
        id: 2,
        vehicle: "Dacia Duster",
        user: "Petr Svoboda",
        organization: "Svět motorů",
        startDate: addDays(reportDate, 4),
        endDate: addDays(reportDate, 11),
      },
    ],
    serviceSchedule: [
      {
        id: 1,
        vehicle: "Renault Clio",
        type: "regular",
        date: addDays(reportDate, 3),
        provider: "Renault Servis Praha",
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
          <Link href="/tydenni-report" className="text-gray-500 hover:text-black mr-2">
            Týdenní report
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          <span className="font-medium">Archivovaný report</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/tydenni-report" className="mr-4 text-gray-500 hover:text-black">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold">Archivovaný report</h1>
          </div>
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

        <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Report za období: {report.period}</h2>
              <p className="text-gray-500">Archivovaný stav vozového parku Renault Group</p>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Vygenerováno: {formatDate(report.createdAt)}</span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 border rounded-lg p-6">
              <div className="text-sm text-gray-500 mb-1">Celkem vozidel</div>
              <div className="text-3xl font-bold">{report.summary.totalVehicles}</div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-6">
              <div className="text-sm text-gray-500 mb-1">Dostupná vozidla</div>
              <div className="text-3xl font-bold">{report.summary.availableVehicles}</div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <div className="text-sm text-gray-500 mb-1">Rezervovaná vozidla</div>
              <div className="text-3xl font-bold">{report.summary.reservedVehicles}</div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
              <div className="text-sm text-gray-500 mb-1">Vozidla v servisu</div>
              <div className="text-3xl font-bold">{report.summary.inServiceVehicles}</div>
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
                      <div className="text-3xl font-bold mb-2">{report.fleetDistribution.renault}</div>
                      <div className="text-gray-500">Renault</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{report.fleetDistribution.dacia}</div>
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
                      <div className="text-3xl font-bold mb-2">{report.fleetDistribution.press}</div>
                      <div className="text-gray-500">PRESS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{report.fleetDistribution.fleet}</div>
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
                  {report.upcomingReservations.map((reservation) => (
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
            {report.serviceSchedule.length > 0 ? (
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
                    {report.serviceSchedule.map((service) => (
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
                  {report.vehicleAvailability.map((day, index) => (
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
          <div className="text-gray-500">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
              Odesláno
            </span>
            {report.sentTo} příjemcům dne {formatDate(report.createdAt)}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                // Here you would send the report via email
                alert("Report byl odeslán e-mailem.")
              }}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Mail className="h-4 w-4 mr-2" />
              Odeslat znovu
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
      </main>
    </div>
  )
}
