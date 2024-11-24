import { CommunityChat } from "@/components/community-chat"

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#424242]">Community</h1>
      <CommunityChat />
    </div>
  )
}

