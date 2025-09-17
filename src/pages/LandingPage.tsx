import { LandingNavbar } from "@/components/molecules/landing-navbar"
import { FeaturesSection } from "@/components/organisms/feature-section"
import { HeroSection } from "@/components/organisms/hero-section"
import { LandingPageTemplate } from "@/components/templates/landingpage.template"

const LandingPage = () => {
  return (
    <LandingPageTemplate>
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </LandingPageTemplate>
  )
}

export default LandingPage