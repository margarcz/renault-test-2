"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CalendarIcon, ChevronLeft, Loader2, Check } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

export default function NewHandoverProtocolPage() {
  const searchParams = useSearchParams()
  const protocolType = searchParams.get("typ") || "pickup"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)
  const [signatureDrawn, setSignatureDrawn] = useState(false)

  const [formData, setFormData] = useState({
    vehicleId: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    userId: "",
    mileage: "",
    fuelLevel: "full",
    condition: "excellent",
    damages: "",
    notes: "",
    accessories: {
      warningTriangle: true,
      firstAidKit: true,
      spareTire: true,
      jackAndWrench: true,
      userManual: true,
    },
    insuranceConfirmed: false,
  })

  // Mock vehicles data
  const vehicles = [
    { id: "1", name: "Renault Megane E-Tech", licensePlate: "1AB 2345", vin: "VF1RFE00067123456" },
    { id: "2", name: "Dacia Duster", licensePlate: "2CD 3456", vin: "UU1HSDCVG67234567" },
    { id: "3", name: "Renault Austral", licensePlate: "3EF 4567", vin: "VF1FWERG067345678" },
    { id: "4", name: "Dacia Spring", licensePlate: "4GH 5678", vin: "UU1DSPRG067456789" },
    { id: "5", name: "Renault Clio", licensePlate: "5IJ 6789", vin: "VF1CLIO0067567890" },
  ]

  // Mock users data
  const users = [
    { id: "1", name: "Jan Novák", organization: "Auto Revue", type: "journalist" },
    { id: "2", name: "Petr Svoboda", organization: "Svět motorů", type: "journalist" },
    { id: "3", name: "Marie Nováková", organization: "Instagram", type: "influencer" },
    { id: "4", name: "Tomáš Novotný", organization: "Auto.cz", type: "journalist" },
    { id: "5", name: "Lucie Černá", organization: "YouTube", type: "influencer" },
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name.startsWith("accessories.")) {
      const accessoryName = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        accessories: {
          ...prev.accessories,
          [accessoryName]: checked,
        },
      }))
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
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
        vehicleId: "",
        date: format(new Date(), "yyyy-MM-dd"),
        time: format(new Date(), "HH:mm"),
        userId: "",
        mileage: "",
        fuelLevel: "full",
        condition: "excellent",
        damages: "",
        notes: "",
        accessories: {
          warningTriangle: true,
          firstAidKit: true,
          spareTire: true,
          jackAndWrench: true,
          userManual: true,
        },
        insuranceConfirmed: false,
      })
      setStep(1)
      setSignatureDrawn(false)
    }, 3000)
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const selectedVehicle = vehicles.find((v) => v.id === formData.vehicleId)
  const selectedUser = users.find((u) => u.id === formData.userId)

  // Format date to Czech format
  const formatDateCzech = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return format(date, "d. MMMM yyyy", { locale: cs })
  }

  const getProtocolTypeInfo = (type) => {
    switch (type) {
      case "pickup":
        return {
          title: "Protokol o předání vozidla",
          buttonText: "Předat vozidlo",
          color: "blue",
        }
      case "return":
        return {
          title: "Protokol o vrácení vozidla",
          buttonText: "Přijmout vozidlo",
          color: "purple",
        }
      default:
        return {
          title: "Předávací protokol",
          buttonText: "Dokončit",
          color: "black",
        }
    }
  }

  const typeInfo = getProtocolTypeInfo(protocolType)

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
          <span className="font-medium">Nový protokol</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{typeInfo.title}</h1>
          <Link href="/predavaci-protokol" className="flex items-center text-gray-600 hover:text-black">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Zpět na přehled
          </Link>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-2">Protokol byl úspěšně vytvořen</h2>
            <p className="text-green-700 mb-4">
              {protocolType === "pickup" ? "Vozidlo bylo úspěšně předáno." : "Vozidlo bylo úspěšně vráceno."}
            </p>
            <Link
              href="/predavaci-protokol"
              className={`bg-${typeInfo.color}-600 text-white px-4 py-2 rounded hover:bg-${typeInfo.color}-700`}
            >
              Zpět na přehled protokolů
            </Link>
          </div>
        ) : (
          <div className="bg-white border rounded-lg shadow-sm">
            {/* Progress Steps */}
            <div className="border-b px-6 py-4">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 1 ? `bg-${typeInfo.color}-500 text-white` : "bg-gray-200 text-gray-600"
                  } mr-2`}
                >
                  1
                </div>
                <span className={`mr-4 ${step >= 1 ? "font-medium" : "text-gray-500"}`}>Základní údaje</span>

                <div className="flex-1 h-px bg-gray-300 mx-2"></div>

                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 2 ? `bg-${typeInfo.color}-500 text-white` : "bg-gray-200 text-gray-600"
                  } mr-2`}
                >
                  2
                </div>
                <span className={`mr-4 ${step >= 2 ? "font-medium" : "text-gray-500"}`}>Stav vozidla</span>

                <div className="flex-1 h-px bg-gray-300 mx-2"></div>

                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 3 ? `bg-${typeInfo.color}-500 text-white` : "bg-gray-200 text-gray-600"
                  } mr-2`}
                >
                  3
                </div>
                <span className={step >= 3 ? "font-medium" : "text-gray-500"}>Potvrzení</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Základní údaje</h2>

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

                    <div>
                      <label className="block text-gray-700 mb-2">Uživatel *</label>
                      <select
                        name="userId"
                        value={formData.userId}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        required
                      >
                        <option value="">Vyberte uživatele</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.organization})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {selectedVehicle && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-2">Informace o vozidle</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Model:</p>
                          <p className="font-medium">{selectedVehicle.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">SPZ:</p>
                          <p className="font-medium">{selectedVehicle.licensePlate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">VIN:</p>
                          <p className="font-mono text-sm">{selectedVehicle.vin}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedUser && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-2">Informace o uživateli</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Jméno:</p>
                          <p className="font-medium">{selectedUser.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Organizace:</p>
                          <p className="font-medium">{selectedUser.organization}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Typ:</p>
                          <p className="font-medium">{selectedUser.type === "journalist" ? "Novinář" : "Influencer"}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Datum *</label>
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
                      <label className="block text-gray-700 mb-2">Čas *</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.vehicleId || !formData.userId || !formData.date || !formData.time}
                      className={`bg-${typeInfo.color}-600 text-white px-6 py-2 rounded flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed`}
                    >
                      Další
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Condition */}
              {step === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Stav vozidla</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

                    <div>
                      <label className="block text-gray-700 mb-2">Stav paliva *</label>
                      <select
                        name="fuelLevel"
                        value={formData.fuelLevel}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        required
                      >
                        <option value="full">Plná nádrž</option>
                        <option value="three-quarters">3/4 nádrže</option>
                        <option value="half">1/2 nádrže</option>
                        <option value="quarter">1/4 nádrže</option>
                        <option value="empty">Prázdná nádrž</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Celkový stav vozidla *</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    >
                      <option value="excellent">Výborný</option>
                      <option value="good">Dobrý</option>
                      <option value="average">Průměrný</option>
                      <option value="poor">Špatný</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Poškození vozidla</label>
                    <textarea
                      name="damages"
                      value={formData.damages}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2 h-24"
                      placeholder="Popište případná poškození vozidla..."
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Příslušenství vozidla</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="warningTriangle"
                          name="accessories.warningTriangle"
                          checked={formData.accessories.warningTriangle}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="warningTriangle" className="ml-2">
                          Výstražný trojúhelník
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="firstAidKit"
                          name="accessories.firstAidKit"
                          checked={formData.accessories.firstAidKit}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="firstAidKit" className="ml-2">
                          Lékárnička
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="spareTire"
                          name="accessories.spareTire"
                          checked={formData.accessories.spareTire}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="spareTire" className="ml-2">
                          Rezervní kolo
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="jackAndWrench"
                          name="accessories.jackAndWrench"
                          checked={formData.accessories.jackAndWrench}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="jackAndWrench" className="ml-2">
                          Zvedák a klíč na kola
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="userManual"
                          name="accessories.userManual"
                          checked={formData.accessories.userManual}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="userManual" className="ml-2">
                          Uživatelská příručka
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Poznámky</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-2 h-24"
                      placeholder="Další poznámky k předání vozidla..."
                    ></textarea>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
                    >
                      Zpět
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.mileage}
                      className={`bg-${typeInfo.color}-600 text-white px-6 py-2 rounded flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed`}
                    >
                      Další
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Potvrzení</h2>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium mb-3">Shrnutí protokolu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Vozidlo:</p>
                        <p className="font-medium">
                          {selectedVehicle?.name} ({selectedVehicle?.licensePlate})
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Uživatel:</p>
                        <p className="font-medium">
                          {selectedUser?.name} ({selectedUser?.organization})
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Datum a čas:</p>
                        <p className="font-medium">
                          {formatDateCzech(formData.date)}, {formData.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Stav tachometru:</p>
                        <p className="font-medium">{formData.mileage} km</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Stav paliva:</p>
                        <p className="font-medium">
                          {formData.fuelLevel === "full"
                            ? "Plná nádrž"
                            : formData.fuelLevel === "three-quarters"
                              ? "3/4 nádrže"
                              : formData.fuelLevel === "half"
                                ? "1/2 nádrže"
                                : formData.fuelLevel === "quarter"
                                  ? "1/4 nádrže"
                                  : "Prázdná nádrž"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Celkový stav vozidla:</p>
                        <p className="font-medium">
                          {formData.condition === "excellent"
                            ? "Výborný"
                            : formData.condition === "good"
                              ? "Dobrý"
                              : formData.condition === "average"
                                ? "Průměrný"
                                : "Špatný"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="insuranceConfirmed"
                        name="insuranceConfirmed"
                        checked={formData.insuranceConfirmed}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 rounded"
                        required
                      />
                      <label htmlFor="insuranceConfirmed" className="ml-2">
                        {protocolType === "pickup"
                          ? "Potvrzuji, že jsem byl seznámen s pojištěním vozidla a podmínkami jeho užívání."
                          : "Potvrzuji, že vozidlo bylo vráceno ve výše uvedeném stavu."}
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Podpis</label>
                    <div
                      className="border rounded-lg p-2 h-40 bg-white flex items-center justify-center cursor-pointer"
                      onClick={() => setSignatureDrawn(true)}
                    >
                      {signatureDrawn ? (
                        <div className="text-center">
                          <p className="font-medium text-green-600">Podpis byl přidán</p>
                          <p className="text-sm text-gray-500">Klikněte pro změnu</p>
                        </div>
                      ) : (
                        <p className="text-gray-500">Klikněte pro přidání podpisu</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
                    >
                      Zpět
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.insuranceConfirmed || !signatureDrawn}
                      className={`bg-${typeInfo.color}-600 text-white px-6 py-2 rounded flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Ukládání...
                        </>
                      ) : (
                        typeInfo.buttonText
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
