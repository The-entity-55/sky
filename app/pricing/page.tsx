import { PricingSection } from "@/components/pricing-section"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
          Choose Your Plan
        </h1>
        <PricingSection />
      </div>
    </main>
  )
}
