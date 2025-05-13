"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Loader2, Plus, X } from "lucide-react"

export default function NewCategoryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [features, setFeatures] = useState([""])

  const [formData, setFormData] = useState({
    name: "",
    brand: "Renault",
    model: "",
    fleetType: "PRESS",
    status: "active",
    description: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSuccess(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        name: "",
        brand: "Renault",
        model: "",
        fleetType: "PRESS",
        status: "active",
        description: "",
      })
      setFeatures([""])
    }, 3000)
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
          <span className="font-medium">Nová kategorie</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Nová kategorie vozidel</h1>
          <Link href="/kategorizace-vozidel" className="flex items-center text-gray-600 hover:text-black">
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
            <h2 className="text-xl font-bold text-green-800 mb-2">Kategorie byla úspěšně vytvořena</h2>
            <p className="text-green-700 mb-4">Nová kategorie vozidel byla přidána do systému.</p>
            <Link href="/kategorizace-vozidel" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Zpět na přehled kategorií
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Název kategorie *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Např. Renault Megane E-Tech PRESS"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
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
                  value={formData.brand}
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
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Vyberte model</option>
                  {brandModels[formData.brand].map((model) => (
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
                  value={formData.fleetType}
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
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2 h-24"
                placeholder="Popište kategorii vozidel..."
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
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-2 text-gray-400 hover:text-red-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/kategorizace-vozidel"
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded mr-4 hover:bg-gray-50"
              >
                Zrušit
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.brand || !formData.model}
                className="bg-black text-white px-6 py-2 rounded flex items-center disabled:bg-gray-400"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ukládání...
                  </>
                ) : (
                  "Vytvořit kategorii"
                )}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
