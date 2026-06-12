import ProfileHeader from "@/components/dashboard/profile/profile-header";
import ProfilePageDetails from "@/components/dashboard/profile/profile-page";

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
        <ProfileHeader />
        <ProfilePageDetails />
      </div>
    </div>
  );
}
