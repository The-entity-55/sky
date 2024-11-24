import Link from "next/link"
import { AnimatedHero } from "@/components/animated-hero"
import { FeatureCard } from "@/components/feature-card"
import { SessionProgress } from "@/components/session-progress"
import { CommunityChat } from "@/components/community-chat"
import { PricingSection } from "@/components/pricing-section"

export default function Home() {
  return (
    <div className="space-y-20">
      <AnimatedHero />

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link href="/ai-tutor" className="block">
            <FeatureCard
              type="tutor"
              title="AI Tutor"
              description="Get personalized learning assistance from our advanced AI tutor."
              gradient="from-blue-600 to-cyan-500"
            />
          </Link>
          <FeatureCard
            type="notes"
            title="Smart Notes"
            description="Effortlessly capture and organize your thoughts with our intelligent note-taking system."
            gradient="from-green-500 to-emerald-400"
          />
          <Link href="/progress" className="block">
            <FeatureCard
              type="progress"
              title="Progress Tracking"
              description="Monitor your learning journey and identify areas for improvement."
              gradient="from-orange-500 to-amber-400"
            />
          </Link>
          <Link href="/community" className="block">
            <FeatureCard
              type="community"
              title="Community Hub"
              description="Connect with fellow learners and share knowledge in our vibrant community."
              gradient="from-purple-600 to-pink-500"
            />
          </Link>
        </div>
      </section>

      <PricingSection />

      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl shadow-lg">
        <SessionProgress />
      </section>

      <section className="container mx-auto px-4 py-16">
        <CommunityChat />
      </section>
    </div>
  )
}

