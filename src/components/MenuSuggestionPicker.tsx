import React, { useState } from 'react'
import { Button } from './Button'
import { CUISINES } from '@/consts/cuisine' // Use the structure above
import { CATEGORIES } from '@/consts/categories'

export default function MenuSuggestionChat() {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const [selectedSubCuisines, setSelectedSubCuisines] = useState<string[]>([])
  const [error, setError] = useState('')

  const toggleCuisine = (name: string) => {
    const isSelected = selectedCuisines.includes(name)

    if (!isSelected && selectedCuisines.length >= 2) {
      setError('You can select up to 2 cuisines only.')
      return
    }

    const updatedCuisines = isSelected
      ? selectedCuisines.filter((c) => c !== name)
      : [...selectedCuisines, name]

    setSelectedCuisines(updatedCuisines)

    // Also remove subcuisines if parent is deselected
    if (isSelected) {
      const removedSubs = CUISINES.find(c => c.name === name)?.subCuisines.map(sc => sc.name) || []
      setSelectedSubCuisines(prev => prev.filter(sc => !removedSubs.includes(sc)))
    }

    setError('')
  }

  const toggleSubCuisine = (name: string) => {
    const isSelected = selectedSubCuisines.includes(name)

    if (!isSelected && selectedSubCuisines.length >= 4) {
      setError('You can select up to 4 sub-cuisines only.')
      return
    }

    const updatedSubs = isSelected
      ? selectedSubCuisines.filter((s) => s !== name)
      : [...selectedSubCuisines, name]

    setSelectedSubCuisines(updatedSubs)
    setError('')
  }

  const toggleCategory = (name: string) => {
  const isSelected = selectedCategories.includes(name)

  if (!isSelected && selectedCategories.length >= 10) {
    setError('You can select up to 10 categories only.')
    return
  }

  const updatedCategories = isSelected
    ? selectedCategories.filter((c) => c !== name)
    : [...selectedCategories, name]

  setSelectedCategories(updatedCategories)

  // Remove subcategories if parent category is deselected
  

  setError('')
}


  // Get subcuisines from selected cuisines
  const visibleSubCuisines = CUISINES
    .filter(c => selectedCuisines.includes(c.name))
    .flatMap(c => c.subCuisines)

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Cuisines</h2>

      <div className="flex flex-wrap gap-3 mb-6">

         {CATEGORIES.map((cuisine) => {
          const isSelected = selectedCategories.includes(cuisine.name)
          return (
            <button
              key={cuisine.name}
              onClick={() => toggleCategory(cuisine.name)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-700'
                  : 'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200'
              }`}
            >
              {cuisine.label}
            </button>
          )
        })}
        </div>
      <div className="flex flex-wrap gap-3 mb-6">
        {CUISINES.map((cuisine) => {
          const isSelected = selectedCuisines.includes(cuisine.name)
          return (
            <button
              key={cuisine.name}
              onClick={() => toggleCuisine(cuisine.name)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-700'
                  : 'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200'
              }`}
            >
              {cuisine.label}
            </button>
          )
        })}
      </div>

      {visibleSubCuisines.length > 0 && (
        <>
          <h3 className="text-md font-semibold mb-2 text-gray-700">Sub-cuisines</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {visibleSubCuisines.map((sub) => {
              const isSelected = selectedSubCuisines.includes(sub.name)
              return (
                <button
                  key={sub.name}
                  onClick={() => toggleSubCuisine(sub.name)}
                  className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                    isSelected
                      ? 'bg-green-600 text-white border-green-700'
                      : 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                  }`}
                >
                  {sub.label}
                </button>
              )
            })}
          </div>
        </>
      )}


     
      {error && (
        <p className="text-sm text-red-600 mb-4">{error}</p>
      )}

      <Button
        onClick={() =>
          console.log('Selected:', { selectedCuisines, selectedSubCuisines })
        }
      >
        Generate
      </Button>
    </div>
  )
}
