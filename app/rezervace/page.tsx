"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { format, addDays } from "date-fns"
import { cs } from "date-fns/locale"

export default function ReservationPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleModel: "",
    startDate: "",
    endDate: "",
    name: "",
    organization: "",
    email: "",
    phone: "",
    type: "journalist", // journalist or influencer
    fleetType: "PRESS", // PRESS or FLEET
    notes: "",
  })

  const vehicles = {
    Renault: ["Megane E-Tech", "Austral", "Clio", "Captur", "Arkana", "Espace", "Scenic"],
    Dacia: ["Duster", "Sandero", "Spring", "Jogger"],
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-calculate end date (Monday) if start date (Tuesday) is selected
    if (name === "startDate") {
      const start = new Date(value)
      // Add 6 days to get to the following Monday
      const end = addDays(start, 6)
      setFormData((prev) => ({
        ...prev,
        startDate: value,
        endDate: format(end, "yyyy-MM-dd"),
      }))
    }
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
        vehicleType: "",
        vehicleModel: "",
        startDate: "",
        endDate: "",
        name: "",
        organization: "",
        email: "",
        phone: "",
        type: "journalist",
        fleetType: "PRESS",
        notes: "",
      })
      setStep(1)
    }, 3000)
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
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
          <span className="font-medium">Rezervace</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Rezervace vozidel</h1>
          <Link href="/rezervace/seznam" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Seznam rezervací
          </Link>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-2">Rezervace byla úspěšně vytvořena</h2>
            <p className="text-green-700 mb-4">Potvrzení rezervace bylo odesláno na váš e-mail.</p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Zpět na rezervace
            </button>
          </div>
        ) : (
          <div className="bg-white border rounded-lg shadow-sm">
            {/* Progress Steps */}
            <div className="border-b px-6 py-4">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-600"} mr-2`}
                >
                  1
                </div>
                <span className={`mr-4 ${step >= 1 ? "font-medium" : "text-gray-500"}`}>Výběr vozidla</span>

                <div className="flex-1 h-px bg-gray-300 mx-2"></div>

                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-600"} mr-2`}
                >
                  2
                </div>
                <span className={`mr-4 ${step >= 2 ? "font-medium" : "text-gray-500"}`}>Termín</span>

                <div className="flex-1 h-px bg-gray-300 mx-2"></div>

                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-600"} mr-2`}
                >
                  3
                </div>
                <span className={step >= 3 ? "font-medium" : "text-gray-500"}>Kontaktní údaje</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Vehicle Selection */}
              {step === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Výběr vozidla</h2>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Značka vozidla</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${formData.vehicleType === "Renault" ? "border-yellow-400 bg-yellow-50" : "hover:border-gray-400"}`}
                        onClick={() => setFormData((prev) => ({ ...prev, vehicleType: "Renault", vehicleModel: "" }))}
                      >
                        <div className="font-bold mb-1">Renault</div>
                        <div className="text-sm text-gray-500">7 vozidel k dispozici</div>
                      </div>
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${formData.vehicleType === "Dacia" ? "border-yellow-400 bg-yellow-50" : "hover:border-gray-400"}`}
                        onClick={() => setFormData((prev) => ({ ...prev, vehicleType: "Dacia", vehicleModel: "" }))}
                      >
                        <div className="font-bold mb-1">Dacia</div>
                        <div className="text-sm text-gray-500">4 vozidla k dispozici</div>
                      </div>
                    </div>
                  </div>

                  {formData.vehicleType && (
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Model vozidla</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {vehicles[formData.vehicleType].map((model) => (
                          <div
                            key={model}
                            className={`border rounded-lg p-4 cursor-pointer ${formData.vehicleModel === model ? "border-yellow-400 bg-yellow-50" : "hover:border-gray-400"}`}
                            onClick={() => setFormData((prev) => ({ ...prev, vehicleModel: model }))}
                          >
                            <div className="font-medium">{model}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Typ flotily</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${formData.fleetType === "PRESS" ? "border-yellow-400 bg-yellow-50" : "hover:border-gray-400"}`}
                        onClick={() => setFormData((prev) => ({ ...prev, fleetType: "PRESS" }))}
                      >
                        <div className="font-bold mb-1">PRESS</div>
                        <div className="text-sm text-gray-500">Plná výbava</div>
                      </div>
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${formData.fleetType === "FLEET" ? "border-yellow-400 bg-yellow-50" : "hover:border-gray-400"}`}
                        onClick={() => setFormData((prev) => ({ ...prev, fleetType: "FLEET" }))}
                      >
                        <div className="font-bold mb-1">FLEET</div>
                        <div className="text-sm text-gray-500">Cenově výhodnější</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.vehicleType || !formData.vehicleModel || !formData.fleetType}
                      className="bg-black text-white px-6 py-2 rounded flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Další
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date Selection */}
              {step === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Termín rezervace</h2>
                  <p className="text-gray-500 mb-6">Standardní doba výpůjčky je od úterý do pondělí (7 dní).</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Datum vyzvednutí (úterý)</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 pl-10"
                          required
                        />
                        <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Datum vrácení (pondělí)</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className="w-full border rounded-lg p-2 pl-10"
                          required
                          readOnly
                        />
                        <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Datum vrácení je automaticky nastaveno na pondělí po vybraném datu vyzvednutí.
                      </p>
                    </div>
                  </div>

                  {formData.startDate && formData.endDate && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Shrnutí rezervace</h3>
                      <p className="text-gray-700">
                        {formData.vehicleType} {formData.vehicleModel} ({formData.fleetType})
                      </p>
                      <p className="text-gray-700">
                        {formData.startDate && format(new Date(formData.startDate), "d. MMMM yyyy", { locale: cs })} -{" "}
                        {formData.endDate && format(new Date(formData.endDate), "d. MMMM yyyy", { locale: cs })}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-gray-300 px-6 py-2 rounded flex items-center hover:bg-gray-50"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Zpět
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.startDate || !formData.endDate}
                      className="bg-black text-white px-6 py-2 rounded flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Další
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {step === 3 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Kontaktní údaje</h2>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Typ uživatele</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${formData.type === "journalist" ? "border-yellow-400 bg-yellow-50" : "hover:border-gray-400"}`}
                        onClick={() => setFormData((prev) => ({ ...prev, type: "journalist" }))}
                      >
                        <div className="font-bold mb-1">Novinář</div>
                        <div className="text-sm text-gray-500">Pro redakce a média</div>
                      </div>
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${formData.type === "influencer" ? "border-yellow-400 bg-yellow-50" : "hover:border-gray-400"}`}
                        onClick={() => setFormData((prev) => ({ ...prev, type: "influencer" }))}
                      >
                        <div className="font-bold mb-1">Influencer</div>
                        <div className="text-sm text-gray-500">Pro sociální média</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Jméno a příjmení</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        {formData.type === "journalist" ? "Redakce" : "Platforma"}
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Poznámka</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2 h-24"
                    ></textarea>
                  </div>

                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Shrnutí rezervace</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Vozidlo:</p>
                        <p className="font-medium">
                          {formData.vehicleType} {formData.vehicleModel}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Typ flotily:</p>
                        <p className="font-medium">{formData.fleetType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Datum vyzvednutí:</p>
                        <p className="font-medium">
                          {formData.startDate && format(new Date(formData.startDate), "d. MMMM yyyy", { locale: cs })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Datum vrácení:</p>
                        <p className="font-medium">
                          {formData.endDate && format(new Date(formData.endDate), "d. MMMM yyyy", { locale: cs })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-gray-300 px-6 py-2 rounded flex items-center hover:bg-gray-50"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Zpět
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                      className="bg-black text-white px-6 py-2 rounded flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Odesílání...
                        </>
                      ) : (
                        "Dokončit rezervaci"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
