"use client"

import { Button } from "@/components/ui/button"
import { Trophy, X } from "lucide-react"
import { useEffect, useState } from "react"

interface GameCompletedModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface UserData {
  firstName: string
  lastName: string
  country: string
  email: string
}

export function GameCompletedModal({ open, onOpenChange}: GameCompletedModalProps) {
  const [step, setStep] = useState<'celebration' | 'form' | 'success'>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    country: '',
    email: ''
  })

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      setStep('form')
      setUserData({ firstName: '', lastName: '', country: '', email: '' })
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = userData.firstName && userData.lastName && userData.country && userData.email

  const submitToGoogleSheets = async (data: UserData) => {
    // Replace with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

    if (!GOOGLE_SCRIPT_URL) {
      console.error('Google Script URL is not defined.')
      return false
    }
    
    const payload = {
      ...data,
      completedAt: new Date().toLocaleString(),
      sheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || ''
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      
      return true
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)
    
    try {
      const success = await submitToGoogleSheets(userData)
      if (success) {
        setStep('success')
      } else {
        alert('There was an error submitting your information. Please try again.')
      }
    } catch {
      alert('There was an error submitting your information. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    // Only allow closing after successful submission
    if (step === 'success') {
      onOpenChange(false)
      setTimeout(() => setStep('form'), 300)
    }
  }


  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-600 text-white max-w-sm sm:max-w-md w-full rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-600">
            <div className="flex items-center gap-2 text-[#E1000F] text-lg sm:text-xl font-semibold">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#FBA700]" />
              {step === 'form' && 'Vault Unlocked! Claim Your Achievement'}
              {step === 'success' && 'Achievement Recorded!'}
            </div>
            {step === 'success' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Content */}
          <div className="py-6 px-4">
            {step === 'form' && (
              <>
                <div className="text-center mb-6">
                  <div className="text-4xl sm:text-6xl mb-4">🏆</div>
                  <p className="text-slate-200 mb-2 font-medium text-sm sm:text-base">
                    Congratulations! You&#39;ve mastered all 5 levels!
                  </p>
                  <div className="bg-gradient-to-r from-[#E1000F] to-[#FBA700] text-white p-3 sm:p-4 rounded-lg mb-4">
                    <p className="font-bold text-sm sm:text-base">Master Prompt Engineer</p>
                    <p className="text-xs sm:text-sm opacity-90">
                      You&#39;ve proven your skills in extracting guarded information!
                    </p>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Enter your details to officially record your achievement in our Hall of Fame!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={userData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FBA700] focus:border-transparent text-sm"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={userData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FBA700] focus:border-transparent text-sm"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={userData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FBA700] focus:border-transparent text-sm"
                      placeholder="United States"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FBA700] focus:border-transparent text-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="bg-[#FBA700] hover:bg-[#FBA700]/80 text-slate-900 w-full font-medium text-sm sm:text-base"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit & Continue'}
                    </Button>
                  </div>
                </form>
              </>
            )}

            {step === 'success' && (
              <div className="text-center">
                <div className="text-4xl sm:text-6xl mb-4">✅</div>
                <p className="text-slate-200 mb-4 font-medium text-sm sm:text-base">
                  Your achievement has been recorded successfully!
                </p>
                <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-3 sm:p-4 rounded-lg mb-6">
                  <p className="font-bold text-sm sm:text-base">Welcome to the Hall of Fame!</p>
                  <p className="text-xs sm:text-sm opacity-90">
                    You&#39;re now officially recognized as a Master Prompt Engineer.
                  </p>
                </div>
                <div className="space-y-3">
                  
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="border-slate-600 text-henkel-red hover:bg-slate-700 w-full text-sm sm:text-base"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}